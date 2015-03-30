var data = {
  "System": {
		"Name": "MySystem",
		"Meta": {
			"OS": "OSX"
		}
  }
};

var transform = {
  "jsontl": {
    "version": "0.1",
    "transform": {
      "System": [
        {
          "in": {
            "Meta": [
              {
                "replace": {
                  "OS": {
                    "with": "Windows"
                  }
                }
              }
            ]
          }
        }
      ]
    }
  }
};

var assert = require('assert');

module.exports = function(jsontl) {
  describe('in locator', function() {

    before(function() {
      jsontl.transform(data, transform);
    });

    it('should enter nested object', function() {
      assert(data.System.Meta.OS, "Windows");
    });
  });
};
