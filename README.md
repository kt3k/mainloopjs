mainloop.js
===========

_mainloop_ function creates the mainloop for an application and monitor the fps of it.

```javascript
mainloop({
  fps: 30,

  frameFunc: function() {
    ...
  },

  frameMonitor: function(fps) {
    ...
  }
});

mainloop.run(); // run the mainloop.

...

mainloop.stop(); // stop the mainloop.
```
