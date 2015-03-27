(function () {
	'use strict';

	var util = {
		getTransDescription: function(trans) {
			return JSON.stringify(trans);
		}
	};

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

		// add the specified data to the object provided
		var extend = function (data, trans, key) {
			if (typeof data[key] !== "object") {
				throw new SyntaxError('Cannot extend a scalar value.  Transform: ' + util.getTransDescription(trans));
			}

			for (var prop in trans) {
				if (typeof trans[prop] === "object") {
					return extend(data[key], trans[prop], prop);
				}
				data[key][prop] = trans[prop];
			}
		};

		var push = function (node, trans, key) {
			if (!node[key] instanceof Array) {
				throw new SyntaxError('The push operation is only valid on Array types.  Transform: ' + util.getTransDescription(trans));
			}
			if (!trans instanceof Array) {
				throw new SyntaxError('The "push" operator requires an Array value.  Transform: ' + util.getTransDescription(trans));
			}

			trans.forEach(function (val) {
				node[key].push(val);
			});
		};

		return {
			replace: replace,
			extend: extend,
			push: push
		};
	})();

	var locators = (function () {

		var _in = function (data, transform) {
			// look at the transform object for member to transform
			Object.keys(transform).forEach(function(definition) {
				// each tranform definition contains an array of transform instruction objects
				if (!(transform[definition] instanceof Array)) {
					throw new SyntaxError('Transform definitions should be Arrays.  Transform: ' + util.getTransDescription(transform[definition]));
				}
				transform[definition].forEach(function (def) {
					// perform each of the transform operations defined in `def`
					Object.keys(def).forEach(function(op) {
						// ensure the operation or locator exists
						if (transforms[op]) {
							// perform the transform
							if (data instanceof Array) {
								data.forEach(function (d) {
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
					});
				});
			});
			return data;
		};

		return {
			in : _in
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
			if (typeof transform.jsontl !== "undefined") {
				if (typeof transform.jsontl.transform !== "undefined") {
					return locators.in(data, transform.jsontl.transform);
				}
			}
			throw new Error("Tranform definition invalid");
		}
	};

	module.exports = lib;
})();
