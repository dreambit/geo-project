'use strict';

module.exports = function (grunt) {

  var parts,
      proxies = [],
      proxyConfig = grunt.option('proxy'),
      skipTests = grunt.option('skipTests'),
      defTsk = skipTests && skipTests.indexOf('true') >= 0 ? ['newer:jshint', 'build']
                                                           : ['newer:jshint', 'test', 'build'];

  if (proxyConfig) {
    parts = proxyConfig.split(':');
    proxies.push({
      context: '/',
      host: parts[0],
      port: parts[1]
    });
  }

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    conf: {
      app: grunt.file.readJSON('bower.json').appPath || 'app',
      dist: 'dist'
    },

    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['bowerInstall']
      },
      js: {
        options: {
          livereload: true
        },
        files: ['<%= conf.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all']
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      styles: {
        files: ['<%= conf.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= conf.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= conf.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= conf.app %>'
          ],
          middleware: function (connect, options, middlewares) {
            middlewares.push(require('grunt-connect-proxy/lib/utils').proxyRequest);
            return middlewares;
          }
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= conf.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= conf.dist %>'
        }
      },
      proxies: proxies
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= conf.app %>/scripts/{,*/}*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    clean: {
      dist: {
        options: {
          force: true
        },
        dot: true,
        src: [
          '.tmp',
          '<%= conf.dist %>/!(css)',
          '<%= conf.dist %>/css/!(error.css)',
        ]
      },
      server: '.tmp'
    },

    autoprefixer: {
      options: {
        browsers: ['> 1%']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    bowerInstall: {
      app: {
        src: ['<%= conf.app %>/index.html'],
        ignorePath: '<%= conf.app %>/'
      }
    },

    rev: {
      dist: {
        files: {
          src: [
            '<%= conf.dist %>/js/{,*/}*.js',
            '<%= conf.dist %>/css/{,*/}*.css',
            '<%= conf.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '!<%= conf.dist %>/css/error.css'
          ]
        }
      }
    },

    useminPrepare: {
      options: {
        dest: '<%= conf.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      },
      html: '<%= conf.app %>/index.html'
    },

    usemin: {
      options: {
        assetsDirs: ['<%= conf.dist %>']
      },
      html: ['<%= conf.dist %>/{,*/}*.html'],
      css: ['<%= conf.dist %>/css/{,*/}*.css']
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= conf.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= conf.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= conf.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= conf.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= conf.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= conf.dist %>'
        }]
      }
    },

    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/js',
          src: '*.js',
          dest: '.tmp/concat/js'
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= conf.app %>',
          dest: '<%= conf.dist %>',
          src: [
            '*.{ico,png}',
            '*.html',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            '{fonts,i18n}/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= conf.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '<%= conf.app %>/styles/images',
          dest: '<%= conf.dist %>/css/images',
          src: '*.{gif,png,jpg}'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= conf.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    concurrent: {
      options: {
        limit: 5
      },
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'svgmin'
      ]
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });


  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'bowerInstall',
      'concurrent:server',
      'autoprefixer',
      'configureProxies',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'bowerInstall',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', defTsk);

};
