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
		},
		watch: {
			markdown: {
				files: ['md/proposal.md'],
				tasks: ['githubMarkdown']
			}
		}
  });

  grunt.loadNpmTasks('grunt-github-markdown');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['githubMarkdown']);


	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});
};
