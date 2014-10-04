module.exports = function(grunt) {
	grunt.initConfig({
		watch: {
			compass: {
				files: ['**/*.{scss,sass}'],
				tasks: ['compass:dev']
			}
		},
		compass: {
			dev: {
				options: {
					sassDir: ['public/assets/scss'],
					cssDir: ['public/assets/css']
				}
			}
		}
	});

	// DEPENDENT PLUGINS	
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// TASKS
	grunt.registerTask('default', ['compass:dev', 'watch']);
};