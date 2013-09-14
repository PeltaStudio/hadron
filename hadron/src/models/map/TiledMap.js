define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      Model = require('hadron/Model'),
      Render = require('hadron/models/visualization/TiledMapRender');

  function TiledMap(tileSize) {
    S.theObject(this)
      .has('tileSize', tileSize)
      .has('topLeft', [0, 0])
      .has('bottomRight', [0, 0])
      .has('_tiles', {});

    Model.apply(this, arguments);
  }
  S.theClass(TiledMap).inheritsFrom(Model);

  TiledMap.prototype.render = Render;

  TiledMap.prototype.addTile = function(tile) {
    var tilePosition = tile.position,
        zIndex = this.getZIndex(tilePosition),
        naturalIndex = this.getNaturalIndex(tilePosition);

    !this._tiled[zIndex] && (this._tiled[zIndex] = {});
    this._tiles[zIndex][naturalIndex] = tile;
    this.expandBoundingBox(tilePosition);
  };

  TiledMap.prototype.removeTile = function(tilePosition) {
    var tilePosition = Array.isArray(tilePosition) ?
                       tilePosition : tilePosition.position,
        zIndex = this.getZIndex(tilePosition),
        naturalIndex = this.getNaturalIndex(tilePosition);

    !this._tiled[zIndex] && (this._tiled[zIndex] = {});
    delete this._tiles[zIndex][naturalIndex];
    // TODO: constrainBoundingBox?
  };

  TiledMap.prototype.getTile = function(tilePosition) {
    var tilePosition = tile.position,
        zIndex = this.getZIndex(tilePosition),
        naturalIndex = this.getNaturalIndex(tilePosition);

    !this._tiled[zIndex] && (this._tiled[zIndex] = {});
    return this._tiles[zIndex][naturalIndex] || null;
  };

  TiledMap.prototype.getZIndex = function(position) {
    return position[0] + position[1];
  };

  TiledMap.prototype.getNaturalIndex = function(position) {
    return position[0] - position[1];
  };

  TiledMap.prototype.expandBoundingBox = function(position) {
    this.topLeft[0] = Math.min(this.topLeft[0], position[0]);
    this.topLeft[1] = Math.min(this.topLeft[1], position[1]);
    this.bottomRight[0] = Math.max(this.bottomRight[0], position[0]);
    this.bottomRight[1] = Math.max(this.bottomRight[1], position[1]);
  };

  return TiledMap;
});
