module.exports = {
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
						}
					},
					"extend": {
						"MiddleInitial": "X"
					}
				},
        {
          "replace": {
            "LastName": {
              "with": "Jones",
              "when": {
                "FirstName": "Bob",
                "MiddleInitial": "X"
              }
            }
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
								}
							}
						]
					}
				}
			],
			"Customers": [
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
								},
								"push": [
									{
										"Type": "Vacation",
										"Address1": "123 Bahamas Ave",
										"City": "The",
										"State": "Bahamas"
									}
								]
							}
						]
					}
				}
			]
		}
	}
};
