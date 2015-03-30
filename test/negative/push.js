var data = {
  "Items": "1,2,3"
};

var transform = {
  "jsontl": {
    "version": "0.1",
    "transform": {
      "Items": [
        {
          "push": [4,5,6]
        }
      ]
    }
  }
};

var assert = require('assert');

module.exports = function(jsontl) {
  describe('push operation', function() {

    it('should throw TypeError if target is not an array', function() {
      assert.throws(function() {
        jsontl.transform(data, transform);
      }, TypeError);
    });
  });
};
