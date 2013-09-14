define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      WorldMetrics = require('hadron/models/visualization/WorldMetrics'),
      Model = require('hadron/Model'),
      Render = require('hadron/models/map/TileRender');

  var gfx = require('hadron/gfx/GraphicSystem');

  function Tile(tileSize) {
    S.theObject(this)
      .has('metrics', new WorldMetrics(tileSize))
      .has('blocks', []);

    Model.apply(this, arguments);
  }
  S.theClass(Tile).inheritsFrom(Model);

  Tile.prototype.getHeight = function() {
    return 0 + this.metrics.V_DIAGONAL;
  };

  return Tiled;
});
