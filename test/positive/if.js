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
                "Id": 2,
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

    it('should execute transform if any criteria are met', function () {
      assert.equal(data.Customer.Name, "Jerry");
    });
  });
};
