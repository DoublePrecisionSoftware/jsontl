/*jshint mocha: true*/
/* Unit tests for jsont */

var assert = require("assert");

var data = require('./fixtures/data.js');
var transform = require('./fixtures/transform.js');

var jsont = require('../src/jsontl.js');

jsont.transform(data, transform);

describe('Transform Engine', function () {

  describe('"replace" operation', function() {
    it('should replace scalar values', function() {
      assert.equal(data.Value, "Two");
    });

    it('should replace values in objects', function() {
      assert.equal(data.Person.LastName, "Jones");
    });

    it('should replace values in arrays', function() {
      assert.equal(data.Customers[0].Name, "Jerry");
    });

    it('should replace all matching values in an array', function() {
      assert.equal(data.Customers[0].Addresses[0].Address1, "321 Code Street");
      assert.equal(data.Customers[1].Addresses[0].Address1, "321 Code Street");
    });

  });

  describe('"extend" operation', function() {
    it('should extend objects', function() {
      assert.equal(data.Person.MiddleInitial, "X");
    });
  });

  describe('"in" locator', function() {
    it('should find nested objects', function() {
      assert.equal(data.System.Meta.OS, "Windows");
    });
  });

  describe('"when" condition', function() {
    it('should perform operation when all criteria are met', function() {
      assert.equal(data.Person.LastName, "Jones");
    });
  });

  describe('"if" condition', function() {
    it('should perform operation if any criteria are met', function() {
      assert.equal(data.Customers[0].Name, "Jerry");
    });
  });

  describe('"push" operation', function() {
    it('should push an object to an array', function() {
      assert.equal(data.Customers[0].Addresses[2].Type, "Vacation");
    });
  });
});
