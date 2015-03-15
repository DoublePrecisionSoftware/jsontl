var jsont = (function () {

  var transforms = (function () {

    function getMatch(node, trans) {
      function nodeMatch(e) {
        return node[e] === match[e];
      }

      for (var prop in trans) {
        var newVal = trans[prop].with;
        var match = trans[prop].when;
        if (node.hasOwnProperty(prop)) {
          if (typeof match === 'object') {
            var matched = Object.keys(match).every(nodeMatch);
            if (matched) {
              node[prop] = newVal;
            }
          } else if (!match || (node[prop] == match)) {
            node[prop] = newVal;
          }
        }
      }
    }

    function replace(node, trans, key) {
      if (node[key] instanceof Array) {
        var i = -1,
          len = node[key].length;
        while (++i < len) {
          getMatch(node[key][i], trans);
        }
      } else if (typeof node[key] === 'object') {
        getMatch(node[key], trans);
      } else {
        var newVal = trans.with;
        var match = trans.when;
        if (!match || (node[key] == match)) {
          node[key] = newVal;
        }
      }
    }

    // replace a value in the object provided with the supplied value
//    var replace = function (data, transform, key) {
//      if (typeof data[key] === "object") {
//        // data[condition] is an object, so step through the property names
//        for (var prop in transform) {
//          // if there's a `when`, check first
//          if (transform[prop].hasOwnProperty('when')) {
//            // if any of the values don't match, don't replace
//            for (var cond in transform[prop].when) {
//              if (data[key][cond] !== transform[prop].when[cond]) {
//                break;
//              }
//              // replce the value
//              data[key][prop] = transform[prop].with;
//            }
//          } else {
//            // no `when`, just replace
//            data[key][prop] = transform[prop].with;
//          }
//        }
//      } else {
//        // data[condition] is scalar value, so we expect only a `with` and/or `when`
//        if (transform.hasOwnProperty('when')) {
//          // for each condition...
//          for (var cond in transform.when) {
//            // ensure the condition is met
//            if (data[key].when[cond] !== transform.when[cond]) {
//              // otherwise, bail and don't modify anything
//              break;
//            }
//            // replace the value
//            data[key] = transform.with;
//          }
//        } else {
//          // replace the value
//          data[key] = transform.with;
//        }
//      }
//    }

    // add the specified data to the object provided
    var extend = function (data, trans, key) {
      if (typeof data[key] !== "object") {
        throw new TypeError("Cannot extend a scalar value.");
      }

      for (var prop in trans) {
        if (typeof trans[prop] === "object") {
          return extend(data[key], trans[prop], prop);
        }
        data[key][prop] = trans[prop];
      }
    }

    return {
      replace: replace,
      extend: extend
    };
  })();

  var locators = (function () {

    var _in = function (data, transform) {
      // look at the transform object for member to transform
      for (var definition in transform) {
        // each tranform definition contains an array of transform instruction objects
        transform[definition].forEach(function (def) {
          // perform each of the transform operations defined in `def`
          for (var op in def) {
            // ensure the operation or locator exists
            if (transforms[op]) {
              // perform the transform
              if (data instanceof Array) {
                data.forEach(function(d) {
                  transforms[op](d, def[op], definition);
                });
              } else {
                transforms[op](data, def[op], definition);
              }
            } else if (locators[op]) {
              // navigate to each location
              return locators[op](data[definition], def[op]);
            }
            // otherwise, move on
          }
        });
      }
      return data;
    }

    var _for = function(data, transform) {

    }

    return { in : _in
    };
  })();


  var lib = {

    /**
     * Perform the provided transform on the data
     * @param   {Object} data  Data to transform
     * @param   {Object} trans Transform definition
     * @returns {Object} The transformed data
     */
    transform: function (data, transform) {
      if (typeof transform.jsont !== "undefined") {
        if (typeof transform.jsont.transform !== "undefined") {
          return locators.in(data, transform.jsont.transform);
        }
      }
      throw Error("Tranform definition invalid");
    }
  };

  return lib;
})();

module.exports = jsont;
