define(function (require) {
  'use strict';

  var TICK_TIME = 1000;

  function HexCellSimulator() {
    this.remainToTick = {};
  }

  HexCellSimulator.prototype.apply = function (model, args) {
    var self = this;
    var t = args[0], dt = args[1], newTask = args[2],
        aliveCount, isTimeToTick;

    updateTimeToTick();
    if (!isTimeToTick) return;

    aliveCount = model.getAliveNeightboursCount();
    if (model.alive && (aliveCount < 2 || aliveCount > 3)) {
      newTask(function () {
        model.alive = false;
      });
    }

    else if (!model.alive && aliveCount === 3) {
      newTask(function () {
        model.alive = true;
      });
    }

    function updateTimeToTick() {
      if (!self.remainToTick[model.id]) {
        self.remainToTick[model.id] = TICK_TIME;
      }

      self.remainToTick[model.id] -= dt;
      isTimeToTick = self.remainToTick[model.id] <= 0;
      if (isTimeToTick) self.remainToTick[model.id] = TICK_TIME;
    }
  };

  return HexCellSimulator;
});
