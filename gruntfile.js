module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			options: {
				livereload: true,
			},

			sass: {
				files: ['assets/sass/**/*.{scss,sass}', 'assets/scss/_partials/**/*.{scss,sass}'],
				tasks: ['sass:dist']
			},

			js: {
				files: ['assets/js/source/**/*.js'],
				tasks: ['uglify:dev']
			}
		},

		sass: {
			options: {
				sourceMap:    true,
				outputStyle:  'compressed',
				includePaths: [
					'node_modules/bootstrap-sass/assets/stylesheets',
					'node_modules/node-bourbon/assets/stylesheets'
				]
			},
			dist:    {
				files: [{
	        expand: true,
	        cwd:    'assets/sass',
	        src:    ['**/*.scss'],
	        dest:   'assets/css/',
	        ext:    '.css'
        }]
			}
		},

		uglify: {
			dev: {
				options: {
					sourceMap:     true,
					sourceMapName: 'assets/js/source.js.map'
				},
				files:   {
					'assets/js/app.min.js': [
						'assets/js/source/master.js'
					]
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('bootstrap-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', ['watch']);
};