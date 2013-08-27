define(function (require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/models/Model');

  function TiledMap(cellSize) {
    S.theObject(this).has('cellSize', cellSize);
  }
  S.theClass(TiledMap).inheritsFrom(Model);

  TiledMap.prototype.getSubmodels = function (aspect) {
    return []; // this.columnSet, this.effectOverlay...
  };

  return TiledMap;
});
