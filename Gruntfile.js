module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      app: {
        src: ['lib/**/*.js', '!lib/**/*.min.js']
      },
      test: {
        options: {
          expr: true // so that jshint doesn't complain about chai assertions that look like expressions
        },
        src: ['test/**/*.spec.js']
      },
      gruntfile: {
        src: ['Gruntfile.js']
      }
    },

    karma: {
      options: {
        basePath: '',
        frameworks: ['browserify', 'mocha', 'chai'],
        plugins: [
          'karma-phantomjs-launcher',
          'karma-mocha',
          'karma-chai',
          'karma-browserify',
          'karma-mocha-reporter'
        ],
        files: [
          'test/karma-mocha/*.spec.js',
          {
            pattern: 'lib/*.js',
            watched: true,
            included: false,
            served: false
          }
        ],
        preprocessors: {
          'test/karma-mocha/*.spec.js': ['browserify']
        },
        reporters: ['mocha'],
        browsers: ['PhantomJS'],
        port: 9876,
        colors: true,
      },
      watch: {
        options: {
          autoWatch: true,
          singleRun: false
        }
      },
      once: {
        options: {
          autoWatch: false,
          singleRun: true
        }
      }
    },

    uglify: {
      options: {
        mangle: false,
        quoteStyle: 3 // preserve original quotation marks
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'lib',
          src: ['**/*.js', '!**/*.min.js'],
          dest: 'lib',
          rename: function(dest, src) {
            return dest + '/' + src.replace('.js','.min.js');
          }
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('dist', [
    'jshint',
    'uglify',
    'karma:once'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'uglify',
    'karma:watch'
  ]);

};