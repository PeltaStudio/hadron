define(function (require) {
  'use strict';

  var TICK_TIME = 1000;
  var S = require('hadron/scaffolding'),
      Hexagon = require('Hexagon');

  function HexCell(id, size, position, alive) {
    Hexagon.call(this, size, position);
    this.id = id;
    this.alive = alive || false;
    this._t = TICK_TIME;
  }
  S.inherit(HexCell, Hexagon);

  HexCell.prototype.render = function (alpha, ctx) {
    this.fillColor = this.alive ? 'black' : 'white';
    Hexagon.prototype.render.apply(this, arguments);
  };

  HexCell.prototype.simulate = function (t, dt, mgr) {
    var self = this;
    var aliveCount = this.getAliveNeightboursCount();

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

  return HexCell;
});
