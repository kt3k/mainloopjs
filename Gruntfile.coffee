
module.exports = (grunt) ->

  grunt.initConfig
    jshint:
      src:
        src: ['mainloop.js']

  grunt.loadNpmTasks ['grunt-contrib-jshint']

  grunt.registerTask 'default', ['jshint']
