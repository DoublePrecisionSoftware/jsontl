module.exports = function (grunt) {


  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          bail: true
        },
        src: ['test/test.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', 'mochaTest');
};
