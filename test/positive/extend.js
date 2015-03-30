var data = {
  "Person": {
    "FirstName": "Bob"
  }
};

var transform = {
 "jsontl": {
    "version": "0.1",
    "transform": {
      "Person": [
        {
          "extend": {
            "LastName": "Jones"
          }
        },
        {
          "extend": {
            "Address": {
              "State": "FL",
              "City": "Jacksonville"
            }
          }
        }
      ]
    }
  }
};

var assert = require('assert');

module.exports = function(jsontl) {
  describe('extend operation', function() {

    before(function() {
      jsontl.transform(data, transform);
    });

    it('should extend simple objects', function() {
      assert(data.Person.LastName);
    });

    it('should recursively extend objects', function() {
      assert(data.Person.Address.State);
    });
  });
};
