mainloop.js
===========

function _mainloop_ creates the mainloop for an application and monitor the fps of it.

```
var main = mainloop({
  frameFunc: function() {
    ...
  },

  monitorFunc: function(fps) {
  }
});

var main.run();

...

var main.stop();
```
