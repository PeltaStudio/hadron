define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Hexagon = require('models/Hexagon'),
      Render = require('renders/HexCellRender'),
      Simulator = require('simulators/HexCellSimulator');

  function HexCell(cellId, size, position, alive) {
    this.cellId = cellId;
    this.alive = alive || false;

    Hexagon.call(this, size, position);
  }
  S.theClass(HexCell).inheritsFrom(Hexagon);

  HexCell.prototype.render = Render;
  HexCell.prototype.simulate = Simulator;

  return HexCell;
});
