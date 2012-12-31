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
    var instance = {
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

    var frameMonitorTimer = null;
    var count = 0;
    var FPS = 30;
    var FRAME = 1000 / FPS;
    var frameArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var timeStart = 0;
    var timeStartPrev = 0;

    var isRunning = false;

    var frameFunc = nop;

    // module funcs

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

    var setFrameFunc = function (func) {
        if (typeof func === 'function') {
            frameFunc = func;
        }
    };

    var setFrameMonitor = function (frameMonitor) {
        if (typeof frameMonitor !== 'function') {
            return;
        }

        if (frameMonitorTimer != null) {
            // remove the older frameMonitor
            // because there should be only one frameMonitor for the mainloop.
            window.clearInterval(frameMonitorTimer);
        }

        frameMonitorTimer = window.setInterval(function () {
            for (var i = 0, sum = 0, len = frameArray.length; i < len; i++) {
                sum += frameArray[i];
            }

            frameMonitor(Math.round(1000 * len / sum));
        }, 100);
    };

    var exports = function (args) {

        count = args.count instanceof Number ? args.count : count;
        FPS = args.fps || FPS;
        FRAME = 1000 / FPS;

        timeStart = getTime();
        timeStartPrev = timeStart - FPS;

        setFrameFunc(args.frameFunc);
        setFrameMonitor(args.frameMonitor);

        return instance;
    };

    return exports;

}(this);
