var data = {
  "Customer": {
    "Id": 2,
    "Name": "Joe",
    "Type": "VIP"
  }
};

var transform = {
  "jsontl": {
    "version": "0.1",
    "transform": {
      "Customer": [
        {
          "replace": {
            "Name": {
              "with": "Jerry",
              "if": {
                "Id": 1,
                "Type": "None"
              }
            }
          }
        }
      ]
    }
  }
};

var assert = require('assert');

module.exports = function (jsontl) {
  describe('if condition', function () {

    before(function () {
      jsontl.transform(data, transform);
    });

    it('should not execute transform if no criteria are met', function () {
      assert.notEqual(data.Customer.Name, "Jerry");
    });
  });
};
