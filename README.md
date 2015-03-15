jsont
=====

jsont is a library inteded to allow tranformation of JSON data using a
JSON-based transformation language.

##Format
The format for jsont transforms (`.jsont` files) is as follows:

```json
{
	"jsont": {
		"version": "0.1",
		"transform": {
			// transform definition
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

####The `when` condition
The `when` condition in JSONT transform operations contains an object with a set of key/value pairs that must *all* exist and match the values of that in the target object.