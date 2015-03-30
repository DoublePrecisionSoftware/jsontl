var data = {
  "Key": "Value",
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
              "when": {
                "Id": 2,
                "Type": "VIP"
              }
            }
          }
        }
      ],
      "Key": [{
        "replace": {
          "with": "Value2",
          "when": "Value"
        }
      }]
    }
  }
};

var assert = require('assert');

module.exports = function (jsontl) {
  describe('when condition', function () {

    before(function () {
      jsontl.transform(data, transform);
    });

    it('should execute transform if any criteria are met', function () {
      assert.equal(data.Customer.Name, "Jerry");
    });

    it('should execute for scalar value check', function() {
      assert.equal(data.Key, "Value2");
    });
  });
};
