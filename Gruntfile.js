module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    less: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.less',
        dest: 'src/<%= pkg.name %>.css'
      }
    },
    cssmin:{
      build: {
        src: 'src/<%= pkg.name %>.css',
        dest: 'dist/<%= pkg.name %>.min.css'
      }
    },
    jshint: {
      build: ['Gruntfile.js', 'src/<%= pkg.name %>.js']
    },
    watch:{
      jsfiles: {
        files: ['src/<%= pkg.name %>.js'],
        tasks: ['jshint']
      },
      lessfiles: {
        files: ['src/<%= pkg.name %>.less'],
        tasks: ['less:build']
      }
    },
    connect: {
      testserver: {
        options: {
          port: 9000,
          base: '.',
          keepalive: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('build', ['jshint:build','uglify:build','less:build','cssmin:build']);
  grunt.registerTask('default', ['connect:testserver','watch']);
};