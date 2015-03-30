var data = {
  "Items": [1, 2, 3]
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

    before(function() {
      jsontl.transform(data, transform);
    });

    it('should add items to an array', function() {
      assert.equal(data.Items.length, 6);
    });
  });
};
