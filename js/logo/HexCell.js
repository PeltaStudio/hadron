define(function (require) {
  'use strict';

  var TICK_TIME = 1000;
  var Hexagon = require('Hexagon');

  function HexCell(id, size, position, alive) {
    Hexagon.call(this, size, position);
    this.id = id;
    this.alive = alive || false;
    this._t = TICK_TIME;
  }

  HexCell.prototype = Object.create(Hexagon.prototype);
  HexCell.prototype.constructor = Hexagon;

  HexCell.prototype.render = function (alpha, ctx) {
    this.fillColor = this.alive ? 'black' : 'white';
    Hexagon.prototype.render.apply(this, arguments);
  };

  HexCell.prototype.simulate = function (t, dt, aliveCount, mgr) {
    var self = this;

    self._t -= dt;
    if (self._t > 0) {
      return;
    }
    self._t = TICK_TIME;

    if (self.alive && (aliveCount < 2 || aliveCount > 3)) {
      mgr.addUpdate(function () {
        self.alive = false;
      });
    }

    else if (!self.alive && aliveCount === 3) {
      mgr.addUpdate(function () {
        self.alive = true;
      });
    }
  };

  HexCell.prototype.simulate.helper = function (model) {
    var aliveCount = 0,
        neighbourhood = model.getNeighbourhood(this.id);
    for (var i = 0, l = neighbourhood.length; i < l; i++) {
      if (neighbourhood[i].alive) {
        aliveCount++;
      }
    }
    return aliveCount;
  };

  return HexCell;
});
