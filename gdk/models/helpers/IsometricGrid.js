define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/models/Model');

  function IsometricGrid(cellSize) {
    this.enabled = true;
    this.cellSize = cellSize;
  }
  S.theClass(IsometricGrid).inheritsFrom(Model);

  return IsometricGrid;
});
