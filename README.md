mainloop.js
===========

[![Build Status](https://travis-ci.org/kt3k/mainloopjs.png?branch=master)](https://travis-ci.org/kt3k/mainloopjs)

_mainloop.js_ provides the functionality to make the mainloop of an application and to monitor the fps of it.

How to Use
----------

Load the script.
```html
<script src="path/to/mainloop.js" type="text/javascript"></script>
```

Call `mainloop` function to initialize the mainloop and then call `mainloop.run` to run it.
```html
<script type="text/javascript">
var i = 0;

mainloop({
  frameRate: 30,

  frameFunc: function () {
    i += 1;
  },

  frameMonitor: function(fps) {
    $('#frameMonitor').text('fps: ' + fps);
  }
});

mainloop.run();

</script>
```


Parameters
----------

 name          | description
---------------|------------
 `frameFunc`   | function to be executed each frame.
 `monitorFunc` | function to be executed every 100 msec with arguments[0] as mainloop's fps. (the value is average of latest 10 frames.)
 `frameRate`   | frame rate to run the mainloop.

Methods
-------

 name                 | description
----------------------|---------
 `run`                | run the mainloop. (if mainloop is already running, do nothing.)
 `stop`               | stop the mainloop. (if mainloop is already stopped, then do nothing.)
 `addFrameFunc`       | add a frame function.
 `removeFrameFunc`    | remove a frame funcion.
 `removeFrameMonitor` | remove the frameMonitor function.
 `reset`              | stop the mainloop and remove frame functions and frame monitor function.
