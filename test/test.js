/*jshint mocha: true*/
/* Unit tests for jsont */

var assert = require("assert");

var data = require('./data.js');
var transform = require('./transform.js');

var jsont = require('../jsontl.js');

jsont.transform(data, transform);

describe('Transform', function () {
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
	it('Sets Customer[0]\'s Name to "Jerry"', function() {
		assert.equal(data.Customers[0].Name, "Jerry");
	});
	it('Sets all Customers obect\'s Addresses[0].Address1 to "321 Code Street"', function() {
		assert.equal(data.Customers[0].Addresses[0].Address1, "321 Code Street");
		assert.equal(data.Customers[1].Addresses[0].Address1, "321 Code Street");
	});
	it('Adds an address to Customers[0].Addresses', function() {
		assert.equal(data.Customers[0].Addresses[2].Type, "Vacation");
	});
});
