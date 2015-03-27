JSON Trasnformation Language
=====

jsontl is a library inteded to allow tranformation of JSON data using a JSON-based transformation language.  For more information, see the [specification proposal](http://doubleprecisionsoftware.github.io/jsontl/).

##Format

The format for jsontl transforms (`.jsontl` files) is as follows:

```json
{
	"jsont": {
		"version": "0.1",
		"transform": {
			"Property": [{
				"operation": {
					"param": "value"
				}
			}]
		}
	}
}
```
##Transform Definitions

JSONT transform definitions are defined by a JavaScript object containing, at a minimum, the name of a property of the object to transform, and an array of one or more Transform Operations to perform on that data.

###Example

```javascript
{
	"Value": [
		"replace": {
			"with": "Two"
		}
	]
}
```

##Transformation Operations

So far, JSONT provides two basic transform operations:  `replace`, and `expand`.

###replace

The `replace` operation replaces one value with another. It has one required and one optional argument.

```javascript
{
	"replace": {
	"FirstName": {
		"with": "Bob",				// `with` value is required
		"when": {					// conditional `when` is optional
			"LastName": "Smith"
		}
	}
}
```

###extend

The `extend` operation recursively adds properties to an object.  It has one required and one optional argument.

```javascript
{
	"extend": {
		"MiddleInitial": "X",		// must provide at least one key/value pair to add
		"when" : {					// may optionally provide a `when` condition
			"FirstName" : "Bob"
		}
	}
}
```

###push

The `push` operation adds a value to a property, if that property's value is an `Array` type.

```javascript
{
	"push": {
		"some": "object"
	}
}
```

####Conditional Operations

The `when` condition in JSONT transform operations defines an object with a set of key/value pairs that must *all* and match the values of that in the target object.

The `if` condition is similar to the `when` condition, but performs an `OR` operation.  If *any* values provided match that of the data, the operation is excuted.

##Changelog

- 0.1.0
	- Initial release.  Includes `replace` and `extend` operations
- 0.1.1
	- Major rewrite; no functional changes
- 0.1.2
	- Added `push` operation
- 0.1.3
	- Added `if` condition
	
##Planned Improvements
- Add `pop` operation, as well as other `Array`-related operations
- Add extensiblity points (custom operations, conditions, etc.)
- General code clean-up, extensive comments