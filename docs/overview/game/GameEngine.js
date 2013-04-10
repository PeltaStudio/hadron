function GameEngine(model, target, input, controlClass, renderClass, config) {
  'use strict'

  var self = this;

  config = config || {};

  this.debug = config.debug;
  this.debugLog = config.debugLog;

  this.input = input;

  this.control = new controlClass(model);
  this.control.installListeners();

  window.addEventListener('keypress', function (evt) {
    var code = evt.keyCode || evt.charCode,
        event;
    if (code === 32) {
      self.pause();
    }
    else if (code === 43 && !self.execution) {
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
    self.control.update();
    self.render.clear();
    self.render.render();
    self.timeFrame = Date.now() - self.lastFrameTime;

    if (self.debug) {
      self.debugLog.innerHTML = 'fps: ' + Math.floor(1000/self.timeFrame);
    }
  };
  this.execution = 0;
}

GameEngine.prototype.start = function() {
  'use strict'

  clearInterval(this.execution);
  this.execution = setInterval(this.gameLoop, this.period);
};

GameEngine.prototype.pause = function() {
  'use strict'

  if (this.execution) {
    clearInterval(this.execution);
    this.execution = 0;
  }
  else {
    this.start();
  }
}

GameEngine.prototype.step = function() {
  'use strict'

  this.gameLoop();
}
