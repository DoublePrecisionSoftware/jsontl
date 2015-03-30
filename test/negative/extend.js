var data = {
  "Key": "Value"
};

var transform = {
 "jsontl": {
    "version": "0.1",
    "transform": {
      "Key": [
        {
          "extend": {
            "Property": "Value"
          }
        }
      ]
    }
  }
};

var assert = require('assert');

module.exports = function(jsontl) {
  describe('extend operation', function() {

    it('should throw SyntaxError on scalar value', function() {
      assert.throws(function() {
        jsontl.transform(data, transform);
      }, SyntaxError);
    });
  });
};
