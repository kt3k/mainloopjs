
test 'basic', ->
  ok typeof mainloop is 'function', 'mainloop is defined and is a function.'
  ok typeof mainloop() is 'object', 'mainloop() is a object.'
  ok typeof mainloop({}) is 'object', 'mainloop({}) is a object.'

asyncTest 'fps 30', ->
  expect(5)
  i = 0

  mainloop
    fps: 30
    frameMonitor: (fps, arr, cnt) ->
      i += 1

      if i >= 10
        ok 28 <= fps && fps <= 32, "fps is about 30. (iteration #{i}, fps=#{fps}, #{arr}, #{cnt})"

      if i >= 14
        mainloop.stop()
        mainloop.removeFrameMonitor()
        start()

  mainloop.run()

asyncTest 'fps 60', ->
  expect(5)
  i = 0

  mainloop
    fps: 60
    frameMonitor: (fps, arr, cnt) ->
      i += 1

      if i >= 10
        ok 58 <= fps && fps <= 62, "fps is about 60. (iteration #{i}, fps=#{fps}, #{arr}, #{cnt})"

      if i >= 14
        mainloop.stop()
        mainloop.removeFrameMonitor()
        start()

  mainloop.run()
