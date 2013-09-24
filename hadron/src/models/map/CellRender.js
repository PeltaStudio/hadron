define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      WorldMetrics = require('hadron/models/visualization/WorldMetrics'),
      Render = require('hadron/Render');

  var gfx = require('hadron/gfx/GraphicSystem');

  function CellRender(tile, tileSize) {
    Render.apply(this, arguments);

    tile.getRenderSubmodels = this.getRenderSubmodels;
  }
  S.theClass(CellRender).inheritsFrom(Render);

  CellRender.prototype.render = function(cell) {
    // TODO: Make ALL async
    var sprite, tiles = cell.tiles,
        worldPosition = cell.metrics.getWorkSpaceCoordinates(cell.position);

    for (var i = 0, tile; tile = tiles[i]; i++) {
      tile.render.setOffset(worldPosition);
    }
  };

  CellRender.prototype.getRenderSubmodels = function() {
    return this.tiles;
  };

  return CellRender;
});
