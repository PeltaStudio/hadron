define(function (require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/Model');

  function TiledMap(cellSize) {
    S.to(this)
      .addGet('cellSize', function() { return cellSize; });
    ;
  }
  S.inherit(TiledMap, Model);

  TiledMap.prototype.getSubmodels = function (aspect) {
    return []; // this.columnSet, this.effectOverlay...
  };

  return TiledMap;
});
