/**
 * mainloop.js 1.0
 * author: kt3k (Yosiya Hinosawa)
 * license: MIT license
 */

this.mainloop = this.exports = (function (window) {
    'use strict';

    var nop = function () {};

    var instance = null;

    var exports = function (args) {
        return new Mainloop(args);
    };

    var Mainloop = function (args) {
        if (instance) {
            instance.setArgs(args);
            return instance;
        }

        this.frameFuncs = [];
        this.frameArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        this.setArgs(args);

        this.timeStart = (new Date()).getTime();
        this.timeStartPrev = this.timeStart - this.FRAME;

        this.isRunning = false;

        this.frameMonitorTimer = null;
        this.frameMonitor = nop;
        this.mainTimer = null;

        instance = this;
    };

    var mainloopPrototype = Mainloop.prototype = exports.prototype = {constructor: Mainloop};

    mainloopPrototype.setArgs = function (args) {
        args || (args = {});
        this.count = args.count ? +args.count : 0;
        this.FPS = args.fps || this.FPS || 30;
        this.FRAME = 1000 / this.FPS;

        this.addFrameFunc(args.frameFunc);
        this.setFrameMonitor(args.frameMonitor);

        return this;
    };

    mainloopPrototype.run = function () {
        if (!this.isRunning) {
            this.isRunning = true;
            __main__();
        }

        return this;
    };

    mainloopPrototype.stop = function () {
        if (this.mainTimer != null) {
            window.clearInterval(this.mainTimer);
            this.mainTimer = null;
        }

        this.isRunning = false;

        return this;
    };

    mainloopPrototype.reset = function () {
        this.setArgs({count: 0});

        this.clearFrameFuncs();

        this.removeFrameMonitor();

        this.stop();

        return this;
    };

    // main loop function

    var __main__ = function () {
        instance.timeStart = (new Date()).getTime();

        instance.frameArray.shift();
        instance.frameArray.push(instance.timeStart - instance.timeStartPrev);

        instance.timeStartPrev = instance.timeStart;

        instance.count ++;

        instance.frameFuncs.forEach(function (func) {
            func(instance.count);
        });

        if (instance.isRunning) {
            instance.mainTimer = window.setTimeout(__main__, instance.FRAME - (instance.timeStart - (new Date()).getTime()));
        }
    };

    mainloopPrototype.addFrameFunc = function (func) {
        if (typeof func === 'function') {
            this.frameFuncs.push(func);
        }

        return this;
    };

    mainloopPrototype.removeFrameFunc = function (func) {
        if (this.frameFuncs.indexOf(func) >= 0) {
            this.frameFuncs.splice(this.frameFuncs.indexOf(func), 1);
        }

        return this;
    };

    mainloopPrototype.clearFrameFuncs = function () {
        this.frameFuncs = [];

        return this;
    };

    mainloopPrototype.setFrameMonitor = function (frameMonitor) {
        if (typeof frameMonitor !== 'function') {
            return;
        }

        // remove an older frameMonitor
        // there is only one frameMonitor
        this.removeFrameMonitor();

        this.frameMonitorTimer = window.setInterval(function () {
            for (var i = 0, sum = 0, len = instance.frameArray.length; i < len; i++) {
                sum += instance.frameArray[i];
            }

            frameMonitor(Math.round(1000 * len / sum), instance.frameArray, instance.count);
        }, 100);

        return this;
    };

    mainloopPrototype.removeFrameMonitor = function () {
        if (this.frameMonitorTimer != null) {
            window.clearInterval(this.frameMonitorTimer);
            this.frameMonitorTimer = null;
        }

        return this;
    };

    return exports;
}(this));
