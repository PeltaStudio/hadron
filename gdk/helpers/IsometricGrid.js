define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/Model'),
      Render = require('helpers/IsometricGridRender');

  function IsometricGrid(cellSize) {
    this.enabled = true;
    this.cellSize = cellSize;

    Model.apply(this, arguments);
  }
  S.theClass(IsometricGrid).inheritsFrom(Model);

  IsometricGrid.prototype.render = Render;

  return IsometricGrid;
});
