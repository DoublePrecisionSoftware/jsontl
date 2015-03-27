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
