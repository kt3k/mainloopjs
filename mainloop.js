/**
 * mainloop.js 1.0
 * author: kt3k (Yosiya Hinosawa)
 * license: MIT license
 */

this.mainloop = this.exports = function (window) {
    'use strict';

    var nop = function () {};

    var funcOrNop = function (func) {
        return typeof func === 'function' ? func : nop;
    };

    var getTime = function () {
        return +new Date();
    };

    var exports = function (args) {

        var count = typeof args.count === 'number' ? args.count : 0;
        var FPS = args.fps || 30;
        var FRAME = 1000 / FPS;
        var isRunning = false;

        var frameArray = [FPS, FPS, FPS, FPS, FPS, FPS, FPS, FPS, FPS, FPS];

        var timeStart = getTime();
        var timeStartPrev = timeStart - FPS;

        var frameFunc = funcOrNop(args.frameFunc);
        var frameMonitor = funcOrNop(args.frameMonitor);

        var main = function () {
            timeStart = getTime();

            frameArray.shift();
            frameArray.push(timeStart - timeStartPrev);

            timeStartPrev = timeStart;

            frameFunc(count++);

            if (isRunning) {
                window.setTimeout(main, FRAME - (timeStart - getTime()));
            }

        };

        window.setInterval(function () {
            for (var i = 0, sum = 0, len = frameArray.length; i < len; i++) {
                sum += frameArray[i];
            }

            frameMonitor(Math.round(1000 * len / sum));
        }, 100);

        return {
            run: function () {
                if (!isRunning) {
                    isRunning = true;
                    main();
                }
                return this;
            },

            stop: function () {
                isRunning = false;
                return this;
            }
        };
    };

    return exports;

}(this);
