/**
 * mainloop.js 1.0
 * author: kt3k (Yosiya Hinosawa)
 * license: MIT license
 */

this.mainloop = this.exports = function (window) {
    'use strict';

    // static util funcs
    var nop = function () {};

    var getTime = function () {
        return +new Date();
    };

    // module variables

    var isRunning = false;

    var instance = {
        run: function () {
            if (!isRunning) {
                isRunning = true;
                main();
            }
            return this;
        },

        stop: function () {
            if (mainTimer != null) {
                window.clearInterval(mainTimer);
                mainTimer = null;
            }
            isRunning = false;
            return this;
        },

        isRunning: function () {
            return isRunning;
        }
    };

    var frameMonitorTimer = null;
    var frameFunc = nop;

    var mainTimer = null;

    var count = 0;
    var FPS = 30;
    var FRAME = 1000 / FPS;
    var frameArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var timeStart = 0;
    var timeStartPrev = 0;



    // module funcs

    var main = function () {
        timeStart = getTime();

        frameArray.shift();
        frameArray.push(timeStart - timeStartPrev);

        timeStartPrev = timeStart;

        frameFunc(count++);

        if (isRunning) {
            mainTimer = window.setTimeout(main, FRAME - (timeStart - getTime()));
        }
    };

    var setFrameFunc = function (func) {
        if (typeof func === 'function') {
            frameFunc = func;
        }
    };

    var setFrameMonitor = function (frameMonitor) {
        if (typeof frameMonitor !== 'function') {
            return;
        }

        // remove the older frameMonitor
        // because there should be only one frameMonitor for the mainloop.
        removeFrameMonitor();

        frameMonitorTimer = window.setInterval(function () {
            for (var i = 0, sum = 0, len = frameArray.length; i < len; i++) {
                sum += frameArray[i];
            }

            frameMonitor(Math.round(1000 * len / sum), JSON.stringify(frameArray), count);
        }, 100);
    };

    var removeFrameMonitor = function () {
        if (frameMonitorTimer != null) {
            window.clearInterval(frameMonitorTimer);
            frameMonitorTimer = null;
        }
    };

    var exports = function (args) {

        args || (args = {});
        count = args.count instanceof Number ? args.count : count;
        FPS = args.fps || FPS;
        FRAME = 1000 / FPS;

        timeStart = getTime();
        timeStartPrev = timeStart - FPS;

        setFrameFunc(args.frameFunc);
        setFrameMonitor(args.frameMonitor);

        return instance;
    };

    exports.removeFrameMonitor = removeFrameMonitor;

    Object.keys(instance).forEach(function (method) {
        exports[method] = function () {
            instance[method]();
        };
    });

    return exports;
}(this);
