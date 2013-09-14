define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      Model = require('hadron/Model'),
      Render = require('hadron/models/map/TiledMapRender');

  function TiledMap(tileSize) {
    S.theObject(this)
      .has('tileSize', tileSize)
      .has('_tiles', {});

    this.topLeft = undefined;
    this.bottomRight = undefined;

    Model.apply(this, arguments);
  }
  S.theClass(TiledMap).inheritsFrom(Model);

  TiledMap.prototype.render = Render;

  TiledMap.prototype.addTile = function(tile) {
    var tilePosition = tile.position,
        zIndex = this.getZIndex(tilePosition),
        naturalIndex = this.getNaturalIndex(tilePosition);

    !this._tiles[zIndex] && (this._tiles[zIndex] = {});
    this._tiles[zIndex][naturalIndex] = tile;
    this.expandBoundingBox(zIndex, naturalIndex);
  };

  TiledMap.prototype.removeTile = function(tilePosition) {
    var zIndex = this.getZIndex(tilePosition),
        naturalIndex = this.getNaturalIndex(tilePosition);

    !this._tiles[zIndex] && (this._tiles[zIndex] = {});
    delete this._tiles[zIndex][naturalIndex];
    // TODO: constrainBoundingBox?
  };

  TiledMap.prototype.getTile = function(tilePosition) {
    var zIndex = this.getZIndex(tilePosition),
        naturalIndex = this.getNaturalIndex(tilePosition);

    !this._tiles[zIndex] && (this._tiles[zIndex] = {});
    return this._tiles[zIndex][naturalIndex] || null;
  };

  TiledMap.prototype.getZIndex = function(position) {
    return position[0] + position[1];
  };

  TiledMap.prototype.getNaturalIndex = function(position) {
    return position[0] - position[1];
  };

  TiledMap.prototype.expandBoundingBox = function(z, n) {
    if (!this.minRow) {
      this.minRow = this.maxRow = z;
      this.minColumn = this.maxColumn = n;
    }
    else {
      this.minRow = Math.min(this.minRow, z);
      this.minColumn = Math.min(this.minColumn, n);
      this.maxRow = Math.max(this.maxRow, z);
      this.maxColumn = Math.max(this.maxColumn, n);
    }
  };

  return TiledMap;
});
