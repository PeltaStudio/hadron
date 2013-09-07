define(function(require) {
  'use strict';

  var DEFAULT_CELL_SIZE = 100;

  var S = require('hadron/scaffolding'),
      Model = require('hadron/Model'),
      WorldMetrics =  require('hadron/models/visualization/WorldMetrics'),
      ScreenAxis = require('helpers/ScreenAxis'),
      IsometricGrid = require('helpers/IsometricGrid'),
      CellHighlighter = require('helpers/CellHighlighter'),
      Control = require('editors/AssistedMapControl');

  function AssistedMap() {
    this.setupGizmos();
    Model.call(this);
  }
  S.theClass(AssistedMap).inheritsFrom(Model);

  AssistedMap.prototype.simulate = Control;

  AssistedMap.prototype.setupGizmos = function() {
    this.screenAxis = new ScreenAxis();
    this.grid = new IsometricGrid(DEFAULT_CELL_SIZE);
    this.pointedCellGizmo = new CellHighlighter(DEFAULT_CELL_SIZE);
  };

  AssistedMap.prototype.getSubmodels = function() {
    return [this.grid, this.pointedCellGizmo, this.screenAxis];
  };

  AssistedMap.prototype.setPointer = function(coordinates) {
    var metrics = new WorldMetrics(DEFAULT_CELL_SIZE),
        mapPosition = metrics.getMapCoordinates(coordinates);

    this.dispatchEvent('pointermove', {
      mapX: mapPosition[0],
      mapZ: mapPosition[1]
    })
  };

  return AssistedMap;
});
