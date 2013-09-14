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
      .has('blocks', []); // This must be a increasing in height serie

    Model.apply(this, arguments);
  }
  S.theClass(Tile).inheritsFrom(Model);

  Tile.prototype.render = Render;

  Tile.prototype.getHeight = function() {
    if (this.blocks.length === 0) return 0;

    var lowest = this.blocks[0].bottom,
        highest = this.blocks[this.blocks.length - 1].top;

    return highest - lowest;
  };

  return Tile;
});
