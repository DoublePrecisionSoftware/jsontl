/*	jsont
 *	Copyright 2014, Stephen Collins
 */

var jsont = (function () {
	'use strict';

	var _conditions = (function () {
		function allTrue(e) {
			return e;
		}

		function _if(conds, node) {

			if (node instanceof Array) {
				return _every(conds, node);
			}

			var results = [];
			for (var type in conds) {
				switch(type) {
				case "and":
					results.push(_and(conds.and, node));
					break;
				case "or":
					results.push(_or(conds.or, node));
					break;
				}
			}


			return results.every(allTrue);
		}

		function _eval(conds, node) {
			function eq(e) {
				return node[e] === conds[op][e];
			}

			function gt(e) {
				return node[e] > conds[op][e];
			}
			var results = [];
			for (var op in conds) {
				switch (op) {
				case "eq":
					results.push(Object.keys(conds[op]).every(eq));
					break;
				case "gt":
					results.push(Object.keys(conds[op]).every(gt));
					break;
				}
			}
			return results;
		}

		function _every(conds, node) {
			var i = -1,
				len = node.length;
			var results = [];
			while (++i < len) {
				results.push(_if(conds, node[i]));
			}
			return results.every(allTrue);
		}

		function _and(cond, node) {
			var results = _eval(cond, node);
			return results.every(allTrue);
		}

		function _or(cond, node) {
			var results = _eval(cond, node);
			return results.some(allTrue);
		}

		return {
			if: _if
		};
	})();

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
					if (_conditions[op]) {
						if (!_conditions[op](transform[dataKey][op], data[dataKey])) {
							continue;
						}
					}
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

							if (_conditions[op]) {
								if (!_conditions[op](transform[dataKey][op], data[i][dataKey])) {
									continue;
								}
							}
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
			"in" : _in,
			"for" : _for
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
