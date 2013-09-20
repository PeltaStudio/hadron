define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      WorldMetrics = require('hadron/models/visualization/WorldMetrics'),
      Render = require('hadron/models/map/tiling/TileRender'),
      Model = require('hadron/Model');

  // TODO: Change the name to SpriteTile
  function Tile(cellSize, spriteImage) {
    var metrics = new WorldMetrics(cellSize);

    S.theObject(this).has('cellSize', cellSize);

    // TODO: A Geometry abstraction is needed!
    this.bottom = 0;
    this.height = spriteImage.height - metrics.V_DIAGONAL;

    Model.apply(this, arguments);
  }
  S.theClass(Tile).inheritsFrom(Model);

  Tile.prototype.render = Render;

  return Tile;
});
