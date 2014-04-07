module.exports = function(grunt) {
  //grunt plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-recess');
  
  //config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      options: {
        host: 'localhost',
        port: 7777
      },
      server: {
        options: {
          base: 'dist',
          open: {
            target: 'http://localhost:<%= connect.options.port %>'
          }
        }
      }
    },

    concat: {
      funnel: {
        src: ['src/js/plugin/**/*.*'],
        dest: 'dist/FunnelViz.js'
      },
      angular: {
        src: ['src/js/angular/**/*.*'],
        dest: 'dist/CoolaData.UI.FunnelViz.js'
      },
      app: {
        src: ['src/js/app/**/*.*'],
        dest: 'dist/app.js'
      }
    },

    recess: {
      less: {
        options: { compile: true },
        src: ['src/less/style.less'],
        dest: 'dist/FunnelViz.css'
      },
      min: {
        options: {
          compile:  true,
          compress: true
        },
        src: ['./dist/vendor/legend-bar/LegendBar.css', './dist/vendor/barchart-html/BarChartHTML.css', './dist/FunnelViz.css'],
        dest: 'dist/funnel-viz.min.css'
      }
    },

    uglify: {
      funnel: {
        options: {
          banner: '/*<%= pkg.name %> - v<%= pkg.version %> - ' +
                  '<%= grunt.template.today("yyyy-mm-dd") %> */',
          drop_console: true
        },
        src: ['./dist/vendor/smart-array-js/SmartArray.js', './dist/vendor/legend-bar/LegendBar.js', './dist/vendor/barchart-html/BarChartHTML.js', './dist/FunnelViz.js'],
        dest: './dist/funnel-viz.min.js'
      }
    },

    watch: {
      css: {
        files: ['src/**/*.*', 'dist/index.html'],
        tasks: ['recess:less', 'concat'],
        options: {
          livereload: {
            port: 7001,
            // keepalive: true,
            // you can pass in any other options you'd like to the https server, as listed here: http://nodejs.org/api/tls.html#tls_tls_createserver_options_secureconnectionlistener
          }
        }
      }
    },
  });

  grunt.registerTask('server', [
    'connect:server',
    'watch',
    ]);
}