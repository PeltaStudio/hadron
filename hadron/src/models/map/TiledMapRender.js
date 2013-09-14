define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      Render = require('hadron/Render');

  var gfx = require('hadron/gfx/GraphicSystem');

  function TiledMapRender(tiledMap) {
    Render.apply(this, arguments);
    tiledMap.getRenderSubmodels = this.getRenderSubmodels;
  }
  S.theClass(TiledMapRender).inheritsFrom(Render);

  // TODO: This could be asyncrhonous and cached
  TiledMapRender.prototype.getRenderSubmodels = function() {
    if (this.minRow === undefined) return [];

    var minZ = this.minRow,
        maxZ = this.maxRow,
        minN = this.minColumn,
        maxN = this.maxColumn,
        submodels = [], tiles = this._tiles, tile;

    for (var z = minZ; z <= maxZ; z++) {
      for (var n = minN; n <= maxN; n++) {
        // TODO: Crop by visualization area
        tile = tiles[z][n];
        if (tile)
          submodels.push(tile);
      }
    }

    return submodels;
  };

  return TiledMapRender;
});
