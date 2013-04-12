'use strict';

function GameEngine(model, target, input, controlClass, renderClass, config) {
  var self = this;

  config = config || {};

  this.debug = config.debug;
  this.debugLog = config.debugLog;
  this.debugControl = {
    pause: config.pause || 'p',
    step: config.step || '+'
  };

  this.input = input;

  this.control = new controlClass(model);

  window.addEventListener('keypress', function (evt) {
    var code = evt.keyCode || evt.charCode,
        event;
    if (self.debugControl.pause.charCodeAt(0) === code) {
      self.pause();
    }
    else if (!self.execution &&
             self.debugControl.step.charCodeAt(0) === code ) {
      self.step();
    }
  });

  this.render = new renderClass(model, target);

  this.fps = config.fps || 60;
  this.period = 1000/this.fps;
  this.timeFrame = 0;
  this.lastTimeFrame = 0;

  this.gameLoop = function () {
    self.lastFrameTime = Date.now();
    self.control.simulate();
    self.render.clear();
    self.render.render();
    self.timeFrame = Date.now() - self.lastFrameTime;

    if (self.debug && self.debugLog) {
      self.debugLog.innerHTML = 'fps: ' + Math.floor(1000/self.timeFrame);
    }
  };
  this.execution = 0;
}

GameEngine.prototype.start = function() {
  clearInterval(this.execution);
  this.execution = setInterval(this.gameLoop, this.period);
};

GameEngine.prototype.pause = function() {
  if (this.execution) {
    clearInterval(this.execution);
    this.execution = 0;
  }
  else {
    this.start();
  }
}

GameEngine.prototype.step = function() {
  this.gameLoop();
}
