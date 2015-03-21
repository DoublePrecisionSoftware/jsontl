module.exports = function(grunt) {

  grunt.initConfig({
		githubMarkdown: {
			all: {
				options: {
					template: 'templates/index.html'
				},
				files: {
					'index.html': ['md/proposal.md']
				}
			}
		}
  });

  grunt.loadNpmTasks('grunt-github-markdown');

  grunt.registerTask('default', ['githubMarkdown']);

};
