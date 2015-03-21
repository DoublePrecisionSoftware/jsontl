#A Proposal for JSON Transforms

As JSON is quickly becoming the standard for both over-the-wire and flat file
data, there has become a need for utilties for dealing with data of this type.

Many tools have been created: countless JSON parsing libraries, 
[JSONPath](http://goessner.net/articles/JsonPath/), etc, but none so far have
addressed the need for *transormation* of JSON data.

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
defined in the `PATH`, but as the amount of configuration changes grows, this 
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
			"Data": [
				{
					"in": {
						"DefaultConnection": {
							"replace": {
								"ConnectionString": {
									"with" : 'Server=ProductionServier..."
								}
							}
						}
					}
				}
			]
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
			files: [{
				expand: true,
				src: ['config.json],
				ext: '.Staging.json'
			}]
			transform: 'staging.jsontl'	
		},
		production: {
			files: [{
				expand: true,
				src: ['config.json],
				ext: '.Production.json'
			}]
			transform: 'production.jsontl'	
		}
	}
});

grunt.laodNpmTasks("grunt-jsontl");
```

The example above, when wired with `grunt-watch` or IDE tooling, can now perform
transforms automatically, in this case changing connection strings for the
necessary environments with no effort post-deployment.