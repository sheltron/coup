module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
        livereload: true,
      },

      sass: {
        files: ['public/assets/sass/**/*.{scss,sass}', 'public/assets/scss/_partials/**/*.{scss,sass}'],
        tasks: ['sass:dist']
      },

      js: {
        files: ['public/assets/js/source/**/*.js'],
        tasks: ['uglify:dev']
      }
    },

    postcss: {
      options: {
        map: {
          inline: true
        },
        processors: [
          require('autoprefixer-core')({browsers: 'last 3 versions'})
        ]
      },
      dist: {
        src: 'public/assets/css/*.css',
        dest: 'public/assets/css/all.css'
      }
    },

    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'compressed',
        includePaths: [
          'node_modules/bootstrap-sass/assets/stylesheets',
          'node_modules/node-bourbon/assets/stylesheets'
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'public/assets/sass',
          src: ['**/*.scss'],
          dest: 'public/assets/css/',
          ext: '.css'
        }]
      }
    },

    uglify: {
      dev: {
        options: {
          sourceMap: true,
          sourceMapName: 'public/assets/js/source.js.map'
        },
        files: {
          'public/assets/js/app.min.js': [
            'public/assets/js/source/app.js'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('bootstrap-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('autoprefixer-core');

  // Default task(s).
  grunt.registerTask('production', ['postcss:dist']);
  grunt.registerTask('default', ['watch']);
};