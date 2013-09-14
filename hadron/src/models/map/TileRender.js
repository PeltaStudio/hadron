define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      WorldMetrics = require('hadron/models/visualization/WorldMetrics'),
      Render = require('hadron/Render');

  var gfx = require('hadron/gfx/GraphicSystem');

  function TileRender(tile, tileSize) {
    Render.apply(this, arguments);
    var bufferWidth = tile.metrics.H_DIAGONAL,
        bufferHeight = this.getBufferHeight(tile);

    tile.getRenderSubmodels = this.getRenderSubmodels;

    S.theObject(this)
      .has('buffer', gfx.newBuffer(tile.id, bufferWidth));

  }
  S.theClass(TileRender).inheritsFrom(Render);

  TileRender.prototype.render = function(tile) {
    // TODO: Make async
    var sprite, blocks = tile.blocks,
        worldPosition = tile.metrics.getWorldCoordinates(tile.position);

    for (var i = 0, block; block = blocks[i]; i++) {
      // TODO: Set the buffer for the future block instead and delegate into
      // the block to render.
      sprite = block.sprite;
      gfx.drawer.drawImage(
        sprite,
        worldPosition[0] - sprite.width / 2,
        worldPosition[1] - sprite.height - block.bottom
      );
    }
  };

  TileRender.prototype.getBufferHeight = function(tile) {
    return tile.getHeight() + tile.metrics.V_DIAGONAL;
  };

/*  TileRender.prototype.getRenderSubmodels = function() {
    return this.blocks;
  };*/

  return TileRender;
});
