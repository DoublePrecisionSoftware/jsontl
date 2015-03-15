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

//  var tests = [
//    result.Value === "Two",
//    result.Person.FirstName === "Bob",
//    result.Person.MiddleInitial === "X",
//    result.System.Meta.OS === "Windows",
//    result.System.Meta.User === "Bob",
//    result.Customers[0].Name === "Jerry",
//    result.Customers[0].Addresses[0].Address1 === "321 Code Street",
//    result.Customers[1].Addresses[0].Address1 === "321 Code Street"
// ];
