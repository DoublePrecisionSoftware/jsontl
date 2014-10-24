/*	jsont
 *	Copyright 2014, Stephen Collins
 */

var jsont = (function () {
  'use strict';



  var _transforms = (function () {
    function replace(node, trans, key) {
      if (node[key] instanceof Array) {
        var i = -1,
          len = node[key].length;
        while (++i < len) {
          _getMatch(node[key][i], trans);
        }
      } else if (typeof node[key] === 'object') {
        _getMatch(node[key], trans);
      } else {
        var newVal = trans.with;
        var match = trans.when;
        if (!match || (node[key] == match)) {
          node[key] = newVal;
        }
      }
    }

    function _getMatch(node, trans) {
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

    function extend(node, trans, key) {
      if (typeof node[key] !== 'object') {
        throw new TypeError("Cannot extend a scalar value.");
      }

      for (var val in trans) {
        node[key][val] = trans[val];
      }
    }

    return {
      replace: replace,
      extend: extend
    };
  })();

  var _locators = (function () {
    function _in(data, transform) {
      for (var dataKey in transform) {
        for (var op in transform[dataKey]) {
          if (_locators[op]) {
            _locators[op](data[dataKey], transform[dataKey][op]);
          } else if (_transforms[op]) {
            _transforms[op](data, transform[dataKey][op], dataKey);
          }

        }
      }
    }

    function _for(data, transform) {
      for (var dataKey in transform) {
        for (var op in transform[dataKey]) {

          var i = -1,
            dataLen = data.length;
          while (++i < dataLen) {
            if (_locators[op]) {
              _locators[op](data[i][dataKey], transform[dataKey][op]);
            } else if (_transforms[op]) {
              _transforms[op](data[i], transform[dataKey][op], dataKey);
            }
          }
        }
      }
    }

    return {
      "in": _in,
      "for": _for
    };

  })();

  var lib = (function () {
    function transform(data, trans) {
      var transforms = [];
      if (!(trans instanceof Array)) {
        transforms = trans.jsont.transform;
      } else {
        transforms = trans;
      }

      _locators.in(data, transforms);
      return data;
    }

    return {
      transform: transform
    };
  })();

  return lib;
})(jsont || {});
