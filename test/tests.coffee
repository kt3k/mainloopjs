
test 'basic', ->
  ok typeof mainloop is 'function', 'mainloop is defined and is a function.'
  ok typeof mainloop() is 'object', 'mainloop() is a object.'
  ok typeof mainloop({}) is 'object', 'mainloop({}) is a object.'

testFps = (fpsToSet, min, max, fpsLabel) ->
  i = 0

  mainloop
    fps: fpsToSet
    frameMonitor: (fps, arr, cnt) ->
      i += 1

      if i >= 10
        ok min <= fps && fps <= max, "fps is about #{fpsLabel} (#{min} <= fps && fps <= #{max}). (iteration #{i}, fps=#{fps}, #{JSON.stringify(arr)}, #{cnt})"

      if i >= 14
        mainloop.stop()
        mainloop.removeFrameMonitor()
        start()

  mainloop.run()

asyncTest 'initial fps default is 30', ->
  expect(5)
  testFps undefined, 28, 32, 30

asyncTest 'fps 30', ->
  expect(5)
  testFps 30, 28, 32, 30

asyncTest 'fps 60', ->
  expect(5)
  testFps 60, 57, 63, 60

asyncTest 'fps default is previous fps', ->
  expect(5)
  testFps undefined, 57, 63, 60

