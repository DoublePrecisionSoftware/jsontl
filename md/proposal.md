#A Proposal for JSON Transforms

As JSON is quickly becoming the standard for both over-the-wire and flat file
data, there has become a need for utilties for dealing with data of this type.

Many tools have been created: countless JSON parsing libraries, JSONPath,
JSONPatch, etc, but none so far have addressed the need for a fully featured
transformation language for JSON data.

Traditionally, XML has been the standard storage and transfer mechanism for
complex data, and thus it was necessary for XSLT to become a standard language
for transforming XML data into various permutaions for consumption outside its
originating source.  Such a mechanism has yet to be created for JSON, a format
that has been increasing in popularity in recent years.

##A Test Case
One of the biggest changes to Microsoft's new ASP.NET 5 is the elimination of
the `web.config` for configuration of web applications.  This as been replaced
by a JSON formatted file, `config.json`.  This has many advantages, but
also one distincive disadvantage: the elimination of `web.config` Transforms.
ASP.NET has provided some flexibility in this area by providing overrides as
environment variables, but as the amount of configuration changes grows, this 
may quickly become an unmanageable task.  JSONTL provides a much more flexible
option, and when applied correctly, can fully replace the whole of functionality
provided by the previous `web.config` Transorm approach.

###Example

config.json
```json
{
	"Data": {
		"DefaultConnection": {
			"ConnectionString": "Server=DevServer..."
		}
	}
}
```

production.jsontl
```json
{
	"jsontl": {
		"transform": {
			"Data": [{
				"in": {
					"DefaultConnection": [{
						"replace": {
							"ConnectionString": {
								"with" : 'Server=ProductionServer...'
							}
						}
					}]
				}
			}]
		}
	}
}
```

Startup.cs
```cs
public Startup(IHostingEnvironment env) {
	Configuration = new Configruation()
		.AddJsonFile(string.Format("config.{0}.json", env.EnvironmentName));
}
```

gruntfile.js
```js
grunt.initConfig({
	jsontl: {
		staging: {
			files: {
				'config.Staging.json' : ['config.json']
			},
			transform: 'staging.jsontl'	
		},
		production: {
			files: {
				'config.Production.json' : ['config.json']
			},
			transform: 'production.jsontl'	
		}
	}
});

grunt.laodNpmTasks("grunt-jsontl");
```

The example above, when wired with `grunt-watch` or IDE tooling, can now perform
transforms automatically, in this case changing connection strings for the
necessary environments with no effort post-deployment.

##Current Syntax

The syntax for JSONTL is designed to "read" naturally.

```json
{
	"jsontl": {
		"version", "0.1",
		"transform": {
			"Data": [{
				"replace": {
					"ConnectionString": {
						"with" : 'Server=ProductionServer...'
					}
				}
			}]
		}
	}
}
```

Reading JSONTL syntax begins with the word "in," and continues with each word
in the nested JSON syntax.  For example, the above transform will be read as:

> In Data, replace ConnectionString with "Server=ProductionsServer..."

Since JSONTL files are actually JSON, the syntax is simple and familiar, with
some notable exceptions.  Operations, Locators, and certain other words (e.g., 
`in`, `replace`, `extend`, `when`, etc) are considered "keywords" and are reserved
for use by the JSONTL engine.

###Transform Definitions

A transform definition consists of a name of a property as an object key, with
an `Array` value containing a set of objects which can be any combination of
Operations and/or Locators.

###Transform Locators

Currently, the only Locator is `in`, which tells 
the JSONTL engine to look further into the object hierarcy, essentially further
nesting the "context" of the transform operations.  This enables transformation
of infinitely nested objects.

###Transform Operations

JSONTL provides a few basic Operations to perform on data.  These include 
`replace`, which replaces scalar values with the value specified by the `with`
parameter, and `extend`, which adds new key/value pairs to an object.

Many further Operations are planned, specifically around transforms pertaining 
to `Array` types, such as `push`, `pop`, `slice`, etc.

###Conditional Operations

JSONTL also provides conditional logic for transform operations through the `when`
and `if` keywords.

```json
"Person": [{
	"replace": {
		"FirstName": {
			"with": "Bob",
			"when": {
				"LastName": "Smith"
				"MiddleInitial": "X"
			}
		}
	}
}]
```

This syntax tells the transformation engine to only perform the tranform operation
when the `Person` object being processed matches the criteria specified.  (e.g., 
the object has a `LastName` and `MiddleInitial` property that match the specified
values.)  The `if` keyword is similar, but checks if *any* of the criteria are met,
rather than *all* (`when` is an `AND`, `if` is an `OR`).

####Pending Improvements
I've considered further extending the syntax of conditional operations for
more granular control.

```json
"replace": {
	"MaxItems": {
		"with": 8,
		"when": {
			"CurrentItems": {
				"gt": 4
			}
		}
	}
}
```

This syntax provides much more control, but can also get quite complex quite
quickly.

###Destructive Transform
Currently the transform process is destructive (that is, the data passed to the 
transform operation is modified during the trandformation process).  Efforts to
perform a non-destructive transform have been considered, but not yet implemented.

##Futher Development

As of the time of this writing, conditionals for transform operations only have
access to the properties within the current transformation context.  I have
considered implementing "parent" and "root" locators in order to allow for more
flexible conditions, but have not yet pursued development in that area.

The `version` property of the transform file is currently not used, but is
recommended for future validation in case the API changes such that tranformation
engines need to ensure compatability.