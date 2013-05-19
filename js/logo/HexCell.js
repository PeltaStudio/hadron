define(function (require) {
  'use strict';

  var Hexagon = require('Hexagon');

  function HexCell(size, position, alive) {
    Hexagon.apply(this, arguments);
    this.alive = alive || false;
  }

  HexCell.prototype = Object.create(Hexagon.prototype);
  HexCell.prototype.constructor = Hexagon;

  HexCell.prototype.render = function (alpha, ctx) {
    this.lineColor = this.alive ? 'black' : 'grey';
    Hexagon.prototype.render.apply(this, arguments);
  };

  HexCell.prototype.simulate = function (t, dt, neighbourhood, mgr) {
  };

  return HexCell;
});
