module.exports = function(grunt) {

  // Configure tasks
  grunt.initConfig({
    postcss: {
      options: {
        map: true,
        processors: [
          // autoprefix for browsers selected by global usage statistics
          require('autoprefixer-core')({browsers: '> 5%'}),
        ]
      },
      build: {
        src: 'css/*.css'
      }
    },
    uglify: {
      build: {
        src: 'src/js/*.js',
        dest: 'js/script.min.js'
      },
      dev: {
        options: {
          beautify: true,
          mangle: false,
          compress: false,
          preserveComments: 'all'
        },
        src: 'src/js/*.js',
        dest: 'js/script.min.js'
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Register tasks
  grunt.registerTask('prefix', ['postcss:build']);
  grunt.registerTask('buildjs', ['uglify:build']);
  grunt.registerTask('cleanjs', ['uglify:dev']);

};
