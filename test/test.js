/*global jsont */

(function () {

  var xhr = (function () {
    var request = new XMLHttpRequest();
    return function (method, url, callback) {
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          callback(request.responseText, request.status, request.statusText);
        }
      };
      request.open(method, url);
      request.send();
    };
  })(xhr || {});

  //	xhr("GET", "/transform.jsont", function (transform) {
  //
  //		xhr("GET", "/data.json", function (data) {
  //
  //			var result = jsont.transform(JSON.parse(data), JSON.parse(transform));
  //
  //			document.getElementById('result').innerHTML = JSON.stringify(result, undefined, 4);
  //		});
  //	});

  var transform = getTransform();
  var data = getData();
  var result = jsont.transform(data, transform);

  var tests = [
    result.Value === "Two",
    result.Person.FirstName === "Bob",
    result.Person.MiddleInitial === "X",
    result.System.Meta.OS === "Windows",
    result.System.Meta.User === "Bob",
    result.Customers[0].Name === "Jerry",
    result.Customers[0].Addresses[0].Address1 === "321 Code Street",
    result.Customers[1].Addresses[0].Address1 === "321 Code Street"
 ];

  var passed = tests.every(function (e) {
    return e;
  });

  document.getElementById('msg').className = (passed ? "pass" : "fail");
  document.getElementById('result').innerHTML =
    JSON.stringify(result, undefined, 4);
})();



function getTransform() {
  return {
    "jsont": {
      "version": "0.1",
      "transform": {
        "Value": {
          "replace": {
            "with": "Two"
          }
        },
        "Person": {
          "replace": {
            "FirstName": {
              "with": "Bob",
              "when": {
                "LastName": "Smith"
              }
            },
            "LastName": {
              "with": "Jones"
            }
          },
          "extend": {
            "MiddleInitial": "X"
          }
        },
        "System": {
          "in": {
            "Meta": {
              "replace": {
                "OS": {
                  "with": "Windows"
                }
              },
              "extend": {
                "User": "Bob"
              }
            }

          },
          "replace": {
            "Name": {
              "with": "MySytem2"
            }
          }
        },
        "Customers": {
          "replace": {
            "Name": {
              "with": "Jerry",
              "when": {
                "Id": 1
              }
            }
          },
          "for": {
            // ALL Addresses with Type of "Work"
            "Addresses": {
              "replace": {
                "Address1": {
                  "with": "321 Code Street",
                  "when": {
                    "Type": "Work"
                  }
                }
              }
            }
          }
        }
      }
    }
  };
}

function getData() {
  return {
    "Value": "One",
    "Person": {
      "FirstName": "Jerry",
      "LastName": "Smith"
    },
    "System": {
      "Meta": {
        "OS": "OSX"
      },
      "Name": "MySystem"
    },
    "Customers": [
      {
        "Id": 1,
        "Name": "Bob",
        "Addresses": [
          {
            "Type": "Work",
            "Address1": "123 Code Street",
            "City": "Place",
            "State": "ST",
            "Phone": {
              "Work": "555-1234"
            }
    }, {
            "Type": "Home",
            "Address1": "123 Home Street",
            "City": "Place",
            "State": "ST",
            "Phone": {
              "Work": "555-1234"
            }
    }
   ]
  }, {
        "Id": 2,
        "Name": "Joe",
        "Addresses": [
          {
            "Type": "Work",
            "Address1": "123 Code Street",
            "City": "Place",
            "State": "ST"
    }, {
            "Type": "Home",
            "Address1": "123 Home Street",
            "City": "Place",
            "State": "ST"
     }
    ]
   }
  ]
  };
}
