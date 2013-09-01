define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/models/Model');

  function CellHighlighter(cellSize) {
    this.cellSize = cellSize;
    this.position = [0, 0];
  }
  S.theClass(CellHighlighter).inheritsFrom(Model);

  return CellHighlighter;
});
