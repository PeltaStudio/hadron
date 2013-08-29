define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Simulator = require('hadron/simulators/Simulator');

  var TICK_TIME = 1000;

  function HexCellSimulator() {
    this.remainToTick = {};
  }
  S.theClass(HexCellSimulator).inheritsFrom(Simulator);

  HexCellSimulator.prototype.simulate = function(model, t, dt, newTask) {
    var self = this;
    var aliveCount, isTimeToTick;

    updateTimeToTick();
    if (!isTimeToTick) return;

    aliveCount = model.getAliveNeightboursCount();
    if (model.alive && (aliveCount < 2 || aliveCount > 3)) {
      newTask(function() {
        model.alive = false;
      });
    }

    else if (!model.alive && aliveCount === 3) {
      newTask(function() {
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
