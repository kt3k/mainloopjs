
test 'basic properties', ->
  ok typeof mainloop is 'function', 'mainloop is defined and is a function.'
  ok typeof mainloop() is 'object', 'mainloop() is a object.'
  ok typeof mainloop({}) is 'object', 'mainloop({}) is a object.'

test 'mainloop object is singleton', ->
  ok mainloop() is mainloop(), 'mainloop() === mainloop().'
  ok mainloop() is mainloop(frameFunc: ->), 'mainloop() === mainloop({frameFunc: function () {}}).'
  ok mainloop() is mainloop(frameMonitor: ->), 'mainloop() === mainloop({frameMonitor: function () {}}).'

testFps = (fpsToSet, min, max, fpsLabel, callback) ->
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

        callback?()

  mainloop.run()

asyncTest 'initial fps default is 30', ->
  expect(5)
  testFps undefined, 28, 32, 30, ->
    start()

asyncTest 'fps 30', ->
  expect(5)
  testFps 30, 28, 32, 30, ->
    start()

asyncTest 'fps 60', ->
  expect(5)
  testFps 60, 57, 63, 60, ->
    start()

asyncTest 'fps default is previous fps', ->
  expect(10)
  testFps 45, 43, 47, 45, ->
    testFps undefined, 43, 47, 45, ->
      start()

