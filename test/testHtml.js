var msg = document.getElementById('msg');
var resultText = document.getElementById('result');

var transform = {
  "jsontl": {
    "version": "0.1",
    "transform": {
      "Value": [
        {
          "replace": {
            "with": "Two"
          }
        }
     ],
      "Person": [
        {
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
          }
        }, {
          "extend": {
            "MiddleInitial": "X"
          }
        }
      ],
      "System": [
        {
          "in": {
            "Meta": [
              {
                "replace": {
                  "OS": {
                    "with": "Windows"
                  }
                },
                "extend": {
                  "User": "Bob"
                }
              }
            ]
          }
        }, {
          "replace": {
            "Name": {
              "with": "MySytem2"
            }
          }
        }
      ],
      "Customers": [
        {
          "replace": {
            "Name": {
              "with": "Jerry",
              "when": {
                "Id": 1
              }
            }
          }
    },
        {
          "in": {
            "Addresses": [
              {
                "replace": {
                  "Address1": {
                    "with": "321 Code Street",
                    "when": {
                      "Type": "Work"
                    }
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


var data = {
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
          "State": "ST"
    }, {
          "Type": "Home",
          "Address1": "123 Home Street",
          "City": "Place",
          "State": "ST"
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



var result = jsontl.transform(data, transform);


resultText.innerText = JSON.stringify(result, undefined, 4);
