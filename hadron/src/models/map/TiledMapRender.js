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
    var minZ = this.getZIndex(this.topLeft),
        maxZ = this.getZIndex(this.bottomRight),
        minN = this.getNaturalIndex(this.topLeft),
        maxN = this.getNaturalIndex(this.bottomRight),
        submodels = [], tiles = this._tiles;

    for (var z = minZ; z <= maxZ; z++) {
      for (var n = minN; n <= maxN; n++) {
        // TODO: Crop by visualization area
        submodels.push(tiles[z][n]);
      }
    }

    return submodels;
  };

  return TiledMapRender;
});
