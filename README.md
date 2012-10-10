mainloop.js
===========

_mainloop_ function creates the mainloop for an application and monitor the fps of it.

```javascript
var main = mainloop({
  frameFunc: function() {
    ...
  },

  monitorFunc: function(fps) {
    ...
  }
});

main.run(); // run the mainloop.

...

main.stop(); // stop the mainloop.
```
