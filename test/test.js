var fs = require('fs'),
    path = require('path');

var jsontl = require('../src/jsontl.js');

function getTests(srcpath) {
  return fs.readdirSync(srcpath).map(function(file) {
    return require(path.join(srcpath, file));
  });
}

describe('Positive Tests', function() {
  var tests = getTests(path.join(__dirname, 'positive'));
  tests.forEach(function(test) {
    test(jsontl);
  });
});

describe('Negative Tests', function() {
  var tests = getTests(path.join(__dirname, 'negative'));
  tests.forEach(function(test) {
    test(jsontl);
  });
});
