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
    var buffer = this.buffer, drawer = buffer.drawer, sprite;
    buffer.height = this.getBufferHeight(tile);
    tile.blocks.forEach(function(block) {
      // TODO: Set the buffer for the future block instead and delegate into
      // the block to render.
      sprite = block.sprite;
      drawer.save();
      drawer.drawImage(
        sprite,
        0,
        buffer.height - block.bottom - sprite.height
      );
      drawer.restore();
    });
  };

  TileRender.prototype.getBufferHeight = function(tile) {
    return tile.getHeight() + tile.metrics.V_DIAGONAL;
  };

  TileRender.prototype.postRender = function(tile) {
    var buffer = this.buffer,
        worldPosition = tile.metrics.getWorldCoordinates(tile.position);

    gfx.drawer.drawImage(
      buffer,
      worldPosition[0] - buffer.width / 2,
      worldPosition[1] - buffer.height
    );
  };

/*  TileRender.prototype.getRenderSubmodels = function() {
    return this.blocks;
  };*/

  return TileRender;
});
