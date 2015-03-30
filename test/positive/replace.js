var data = {
  "Key": "Value",
  "Person": {
    "FirstName": "Bob"
  }
};

var transform = {
	"jsontl": {
		"version": "0.1",
		"transform": {
			"Key": [
				{
					"replace": {
						"with": "Value2"
					}
				}
			],
			"Person": [
				{
					"replace": {
						"FirstName": {
							"with": "Jerry"
						}
					}
        }
			]
		}
  }
};

var assert = require('assert');

module.exports = function(jsontl) {
  describe('replace operation', function() {

    before(function() {
      jsontl.transform(data, transform);
    });

    it('should replace scalar values', function() {
      assert.equal(data.Key, "Value2");
    });

    it('should replace object properties', function() {
      assert.equal(data.Person.FirstName, "Jerry");
    });
  });
};
