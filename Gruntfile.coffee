
module.exports = (grunt) ->

  grunt.initConfig

    jshint:
      src:
        src: [
          'mainloop.js'
        ]
        options:
          jshintrc: '.jshintrc'

    qunit:
      mainloopjs: [
        'test/index.html'
      ]

  [
    'grunt-contrib-jshint'
    'grunt-contrib-qunit'
    'grunt-contrib-connect'
  ]
  .forEach grunt.loadNpmTasks

  grunt.registerTask 'default', [
    'jshint'
    'qunit'
  ]
