
module.exports = (grunt) ->

  grunt.initConfig
    jshint:
      src:
        src:
          'mainloop.js'
        options:
          jshintrc: '.jshintrc'

  grunt.loadNpmTasks 'grunt-contrib-jshint'

  grunt.registerTask 'default',
    'jshint'
