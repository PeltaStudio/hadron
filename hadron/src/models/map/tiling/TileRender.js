define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      WorldMetrics = require('hadron/models/visualization/WorldMetrics'),
      Render = require('hadron/Render');

  var gfx = require('hadron/gfx/GraphicSystem');

  function TileRender(tile, cellSize, spriteImage) {
    Render.apply(this, arguments);
    S.theObject(this)
      .has('sprite', spriteImage)
      .has('metrics', new WorldMetrics(cellSize));

    this.setOffset([0, 0]);
  }
  S.theClass(TileRender).inheritsFrom(Render);

  TileRender.prototype.setOffset = function(offset) {
    this._offset = offset;
  };

  TileRender.prototype.getOffset = function() {
    return this._offset;
  };

  TileRender.prototype.render = function(tile) {
    var offset = this.getOffset(),
        sprite = this.sprite;

    gfx.drawer.drawImage(
      sprite,
      offset[0] - this.metrics.H_RADIUS,
      offset[1] - sprite.height - tile.bottom
    );
  };

  return TileRender;
});
