define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/Model'),
      Render = require('helpers/CellHighlighterRender');

  function CellHighlighter(cellSize) {
    this.cellSize = cellSize;
    this.position = [0, 0];

    Model.apply(this, arguments);
  }
  S.theClass(CellHighlighter).inheritsFrom(Model);

  CellHighlighter.prototype.render = Render;

  return CellHighlighter;
});
