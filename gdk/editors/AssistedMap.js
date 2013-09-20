define(function(require) {
  'use strict';

  var DEFAULT_CELL_SIZE = 100;

  var S = require('hadron/scaffolding'),
      Model = require('hadron/Model'),
      TiledMap = require('hadron/models/map/TiledMap'),
      WorldMetrics =  require('hadron/models/visualization/WorldMetrics'),
      ScreenAxis = require('helpers/ScreenAxis'),
      IsometricGrid = require('helpers/IsometricGrid'),
      CellHighlighter = require('helpers/CellHighlighter'),
      Control = require('editors/AssistedMapControl');

  function AssistedMap(tileSize, palette) {
    this.setupGizmos(tileSize);
    this.setupMap(tileSize, palette);
    Model.call(this);
  }
  S.theClass(AssistedMap).inheritsFrom(Model);

  AssistedMap.prototype.simulate = Control;

  AssistedMap.prototype.setupGizmos = function(tileSize) {
    this.metrics = new WorldMetrics(tileSize);
    this.screenAxis = new ScreenAxis();
    this.grid = new IsometricGrid(tileSize);
    this.pointedCellGizmo = new CellHighlighter(tileSize);
  };

  AssistedMap.prototype.setupMap = function(tileSize, palette) {
    this.map = new TiledMap(tileSize, palette);
  };

  AssistedMap.prototype.getSubmodels = function() {
    return [this.map, this.pointedCellGizmo, this.grid, this.screenAxis];
  };

  AssistedMap.prototype.setPointer = function(coordinates) {
    var mapPosition = this.metrics.getMapCoordinates(coordinates);

    this.dispatchEvent('pointermove', {
      mapX: mapPosition[0],
      mapZ: mapPosition[1]
    })
  };

  return AssistedMap;
});
