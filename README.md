jsont
=====

jsont is a library inteded to allow tranformation of JSON data using a
JSON-based transformation language.

###Format
The format for jsont transforms (`.jsont` files) is as follows:

    {
      "jsont": {
        "version": "0.1",
        "transform": {
          // transform definition
        }
    }
    
An example transform can be found in `test/transfrom.jsont`.

###Issues
- The basic `replace` and `extend` transforms currently do not work for arrays
- First-order conditionals are currently broken

##TODO
- Finish conditional logic implementation
- Add unit tests