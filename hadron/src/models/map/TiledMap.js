define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      Cell = require('hadron/models/map/Cell'),
      Model = require('hadron/Model'),
      Render = require('hadron/models/map/TiledMapRender');

  function TiledMap(cellSize, palette) {
    S.theObject(this)
      .has('cellSize', cellSize)
      .has('_cells', {});

    this.palette = palette; // TODO: dynamic switch of palette?
    this.topLeft = undefined;
    this.bottomRight = undefined;

    Model.apply(this, arguments);
  }
  S.theClass(TiledMap).inheritsFrom(Model);

  TiledMap.prototype.render = Render;

  TiledMap.prototype.removeCell = function(cellPosition) {
    var zIndex = this.getZIndex(cellPosition),
        naturalIndex = this.getNaturalIndex(cellPosition);

    !this._cells[zIndex] && (this._cells[zIndex] = {});
    delete this._cells[zIndex][naturalIndex];
    // TODO: constrainBoundingBox?
  };

  TiledMap.prototype.getCell = function(cellPosition) {
    var zIndex = this.getZIndex(cellPosition),
        naturalIndex = this.getNaturalIndex(cellPosition);

    !this._cells[zIndex] && (this._cells[zIndex] = {});
    return this._cells[zIndex][naturalIndex] || this.newCell(cellPosition);
  };

  TiledMap.prototype.newCell = function(cellPosition) {
    var zIndex = this.getZIndex(cellPosition),
        naturalIndex = this.getNaturalIndex(cellPosition),
        newCell = new Cell(this.cellSize);

    !this._cells[zIndex] && (this._cells[zIndex] = {});
    this._cells[zIndex][naturalIndex] = newCell;
    this.expandBoundingBox(zIndex, naturalIndex);

    newCell.position = cellPosition;
    return newCell;
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
