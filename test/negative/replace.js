var data = {
  "Key" : "Value"
};

var transform = {
  "jsontl": {
    "version": "0.1",
    "transform": {
      "Key": [
        {
          "replace": "Value2"
        }
      ]
    }
  }
};

var assert = require('assert');

module.exports = function(jsontl) {
  describe('replace operation', function() {

    it('should throw SyntaxError when no "with" value is provided', function() {
      assert.throws(function() {
        jsontl.transform(data, transform);
      }, SyntaxError);
    });
  });
};
