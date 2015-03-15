/* Unit tests for jsont */

var assert = require("assert");

var data = require('./data.js');
var transform = require('./transform.js');

var jsont = require('../jsont.js');

jsont.transform(data, transform);

describe('Tranform', function () {
	it('Sets Value to "Two"', function() {
		assert.equal(data.Value, "Two");
	});
	it('Sets Person.FirstName to "Bob"', function() {
		assert.equal(data.Person.FirstName, "Bob");
	});
	it('Adds Person.MiddleInitial and sets it to "X"', function() {
		assert.equal(data.Person.MiddleInitial, "X");
	});
	it('Sets System.Meta.OS to "Windows"', function() {
		assert.equal(data.System.Meta.OS, "Windows");
	});
	it('Adds System.Meta.User and sets it to "Bob"', function() {
		assert.equal(data.System.Meta.User, "Bob");
	});
	it('Sets all Customers obect\'s Addresses[0].Address1 to "321 Code Street"', function() {
		assert.equal(data.Value, "Two");
	});
});
