define(function (require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Hexagon = require('models/Hexagon');

  function HexCell(cellId, size, position, alive) {
    Hexagon.call(this, size, position);
    this.cellId = cellId;
    this.alive = alive || false;
  }
  S.theClass(HexCell).inheritsFrom(Hexagon);

  return HexCell;
});
