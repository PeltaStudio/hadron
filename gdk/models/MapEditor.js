define(function (require) {
  'use strict';

  var DEFAULT_CELL_SIZE = 100;

  var S = require('hadron/scaffolding'),
      Model = require('hadron/models/Model'),
      Camera = require('hadron/models/cameras/Camera'),
      WorldMetrics = require('hadron/models/map/WorldMetrics'),
      TiledMap = require('hadron/models/map/TiledMap'),
      ScreenAxis = require('models/helpers/ScreenAxis'),
      IsometricGrid = require('models/helpers/IsometricGrid'),
      CellHighlighter = require('models/helpers/CellHighlighter');

  function MapEditor() {
    Model.apply(self, arguments);

    this.setupMap();
    this.setupCamera();
    this.setupGizmos();
    this.metrics = new WorldMetrics(DEFAULT_CELL_SIZE);
    this.pointedCell = [0, 0];
  }
  S.theClass(MapEditor).inheritsFrom(Model);

  MapEditor.prototype.setupMap = function () {
    var cellSize = DEFAULT_CELL_SIZE;
    this.map = new TiledMap(cellSize);
  };

  MapEditor.prototype.setupCamera = function () {
    var camera = new Camera();
    camera.setPosition([0, 0]);
    camera.resize(500, 500);
    S.theObject(this).has('camera', camera);
  };

  MapEditor.prototype.setupGizmos = function () {
    var self = this;
    self.grid = new IsometricGrid();
    self.screenAxis = new ScreenAxis();
    self.pointedCellGizmo = new CellHighlighter();

    extendGizmosForRendering();

    function extendGizmosForRendering() {
      self.screenAxis.getVisualizationArea = getVisualizationArea;

      self.grid.getVisualizationArea = getVisualizationArea;
      self.grid.getCellSize = getCellSize;

      self.pointedCellGizmo.getPosition = getPointedCellPosition;
      self.pointedCellGizmo.getCellSize = getCellSize;

      function getVisualizationArea() {
        return self.camera.getVisualizationArea();
      }

      function getCellSize() {
        return self.map.cellSize;
      }

      function getPointedCellPosition() {
        return self.metrics.getTargetCoordinates(self.pointedCell);
      }
    }
  };

  MapEditor.prototype.getSubmodels = function (aspect) {
    return [this.map, this.screenAxis, this.grid, this.pointedCellGizmo]; // this.screenAxis, this.intersectionGizmos
  };

  MapEditor.prototype.resizeViewport = function (newWidth, newHeight) {
    return this.camera.resize(newWidth, newHeight);
  };

  MapEditor.prototype.goToOrigin = function () {
    return this.camera.setPosition([0,0]);
  };

  MapEditor.prototype.getViewportSize = function () {
    return {
      width: this.camera.width,
      height: this.camera.height
    };
  };

  MapEditor.prototype.setPointer = function (cameraCoords) {
    var targetCoordinates = this.camera.getTargetCoordinates(cameraCoords);
    this.pointedCell = this.metrics.getWorldCoordinates(targetCoordinates);
  };

  return MapEditor;
});
