mainloop.js
===========

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
  fps: 30,

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
 `monitorFunc` | function to be executed every .1 sec with arguments[0] as mainloop's fps. (the value is average of latest 10 frames.)
 `fps`         | fps to run the mainloop.

Methods
-------

 name                 | description
----------------------|---------
 `run`                | run the mainloop. (if mainloop is already running, do nothing.)
 `stop`               | stop the mainloop. (if mainloop is already stopped, then do nothing.)
 `removeFrameMonitor` | remove the frameMonitor function.
 `isRunning`          | return true if the mainloop is running and return false if it's not.
 `reset`              | reset everything.
