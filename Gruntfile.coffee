
module.exports = (grunt) ->

  grunt.initConfig

    jshint:
      src:
        src:
          'mainloop.js'
        options:
          jshintrc: '.jshintrc'

    qunit:
      mainloopjs:
        'test/index.html'

  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-qunit'

  grunt.registerTask 'default', ['jshint', 'qunit']
