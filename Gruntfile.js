module.exports = function (grunt) {
    const sass = require('node-sass');
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'project/client/',
                    //report: 'gzip',
                    src: ['src/**/*.main.js'],
                    dest: 'project/client/build/static/js/',
                    ext: '.build.js',

                    rename: function (dest, src) {
                        var filename = src.replace(/^.*[\\\/]/, '')
                        res = dest + filename
                        return res;
                    }
                }],
                options: {
                    transform: [
                        ['babelify', {
                            presets: "es2015"
                        }]
                    ],
                    browserifyOptions: {
                        debug: false
                    }
                }
            }
        },


        uglify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'project/client/',
                    //report: 'gzip',
                    src: ['build/static/js/*.js', '!build/static/js/*.min.js'],
                    dest: 'project/client/dest/static/js/',
                    //ext: '.min.js',

                    rename: function (dest, src) {
                        var filename = src.replace(/^.*[\\\/]/, '')
                        filename = filename.split('.').slice(0, -1).join('.')
                        res = dest + filename + '.min.js'
                        return res;
                    }
                }],
            }
        },



        sass: {
            options: {
                implementation: sass,
                sourceMap: false,

            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'project/client/',
                    //report: 'gzip',
                    src: ['src/**/*.scss'],
                    dest: 'project/client/build/static/css/',
                    //ext: '.min.js',

                    rename: function (dest, src) {
                        var filename = src.replace(/^.*[\\\/]/, '')
                        filename = filename.split('.').slice(0, -1).join('.')
                        res = dest + filename + '.bundle.css'
                        return res;
                    }
                }],
            }
        },



        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'project/client/build/static/css/',
                    report: 'gzip',
                    src: ['*.css', '!*.min.css'],
                    dest: 'project/client/dest/static/css/',
                    ext: '.min.css'
                }]
            }
        },



        htmlmin: { // Task
            dist: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                
                files: [{
                    expand: true,
                    cwd: 'project/client/src/templates',
                    report: 'gzip',
                    src: ['**/*.html'],
                    dest: 'project/client/dest/templates/',
                    //ext: '.min.html'
                }]
            },
        },
        
        
        
        watch: {
            js: {
              files: 'project/client/src/**/*.js',
              tasks: ['browserify', 'uglify'],
              options: {
                interrupt: true,
              },
            },
            
            css: {
                files: 'project/client/src/**/*.scss',
                tasks: ['sass', 'cssmin'],
                options: {
                  interrupt: true,
                },
            },
            
            html: {
                files: 'project/client/src/templates/**/*.html',
                tasks: ['htmlmin'],
                options: {
                  interrupt: true,
                },
            },
          },


    });
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks("grunt-contrib-watch");


    grunt.registerTask('default', [
        'browserify:dist',
        'uglify',
        'sass',
        'cssmin',
        'htmlmin',
    ]);
}