module.exports = function(grunt) {

  grunt.initConfig({
    copy: {
      project: {
        expand: true,
        cwd: '.',
        src: ['**', '!Gruntfile.js', '!package.json', '!public/bower.json'],
        dest: 'dist'
      }
    },
    clean: {
      dist: {
        src: 'dist'
      }
    }
  });

  grunt.registerTask('dist', ['clean', 'copy']);
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
};
