module.exports = function(grunt) {
    grunt.initConfig({
        postcss: {
            options: {
                processors: [
                    require('autoprefixer-core')({
                        browsers: 'last 3 versions'
                    }),
                    require('csswring')
                ]
            },
            dist: {
                src: 'css/*.css'
            }
        },
        sass: {
            all: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/mdbw.css': 'sass/mdbw.scss'
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1,
                sourceMap: true
            },
            target: {
                files: {
                    'css/styles.css': ['css/bootstrap.css', 'css/mdbw.css']
                }
            }
        },
        watch: {
            sass: {
                files: ['sass/mdbw.scss'],
                tasks: ['sass:all']
            },
            livereload: {
                files: ['css/mdbw.css', '../**/*.hbs', 'js/**/*.js'],
                options: {
                    livereload: true
                }
            }
        }
    });
    // Automatic Dependency Loading
    require('load-grunt-tasks')(grunt);
    // Default Grunt Task, used during main development.
    grunt.registerTask('default', ['watch']);
    // Production task, minifies and concatenates (must change <head> refs)
    grunt.registerTask('production', ['postcss', 'cssmin'])
}