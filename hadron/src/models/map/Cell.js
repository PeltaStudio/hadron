define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      WorldMetrics = require('hadron/models/visualization/WorldMetrics'),
      Model = require('hadron/Model'),
      Render = require('hadron/models/map/CellRender');

  var gfx = require('hadron/gfx/GraphicSystem');

  function Cell(cellSize) {
    S.theObject(this)
      .has('metrics', new WorldMetrics(cellSize))
      .has('tiles', []); // This must be a increasing in block.bottom serie

    Model.apply(this, arguments);
  }
  S.theClass(Cell).inheritsFrom(Model);

  Cell.prototype.render = Render;

  return Cell;
});
