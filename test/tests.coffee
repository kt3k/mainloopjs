
test 'basic properties', ->
  ok typeof mainloop is 'function', 'mainloop is defined and is a function.'
  ok typeof mainloop() is 'object', 'mainloop() is a object.'
  ok typeof mainloop({}) is 'object', 'mainloop({}) is a object.'

test 'mainloop object is singleton', ->
  ok mainloop() is mainloop(), 'mainloop() === mainloop().'
  ok mainloop() is mainloop(frameFunc: ->), 'mainloop() === mainloop({frameFunc: function () {}}).'
  ok mainloop() is mainloop(frameMonitor: ->), 'mainloop() === mainloop({frameMonitor: function () {}}).'

asyncTest 'frameMonitor invoked at least once', ->
  expect(1)

  inst = mainloop(
    frameMonitor: ->
      ok true, 'frameMonitor invoked at least once.'
      mainloop.reset()
      start()
  ).run()

asyncTest 'frameMonitor called about 10 times a second', ->
  expect(1)

  i = 0

  inst = mainloop(
    frameMonitor: ->
      i += 1
  ).run()

  setTimeout ->
    mainloop.reset()
    ok 9 <= i <= 11, 'frameMonitor called abount 10 times a second.'
    start()
  , 1000

asyncTest 'clearFrameFuncs', ->
  expect(1)

  i = 0

  mainloop(
    frameFunc: ->
      i += 1
  ).clearFrameFuncs().run()

  setTimeout ->
    ok i is 0, 'frameFuncs is not called.'
    start()
    mainloop.reset()
  , 200

asyncTest 'clearFrameFuncs', ->
  expect(1)

  i = 0

  frameFunc = ->
    i += 1

  mainloop(frameFunc: frameFunc).removeFrameFunc(frameFunc).run()

  setTimeout ->
    ok i is 0, 'frameFuncs is not called.'
    start()
    mainloop.reset()
  , 200

testFps = (fpsToSet, min, max, fpsLabel, callback) ->
  i = 0

  instance = mainloop(
    frameRate: fpsToSet
    frameMonitor: (fps, arr, cnt) ->
      i += 1

      if i >= 10
        ok min <= fps && fps <= max, "fps is about #{fpsLabel} (#{min} <= fps && fps <= #{max}). (iteration #{i}, fps=#{fps}, #{JSON.stringify(arr)}, #{cnt})"

      if i >= 14
        mainloop.reset()

        callback?()
  ).run()

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

