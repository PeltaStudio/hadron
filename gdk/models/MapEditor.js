define(function(require) {
  'use strict';

  var DEFAULT_CELL_SIZE = 100;

  var S = require('hadron/scaffolding'),
      Model = require('hadron/models/Model'),
      Camera = require('hadron/models/visualization/Camera'),
      Scene = require('hadron/models/visualization/Scene'),
      MultiportWindow = require('hadron/models/visualization/MultiportWindow'),
      ScreenAxis = require('models/helpers/ScreenAxis'),
      IsometricGrid = require('models/helpers/IsometricGrid');
      CellHighlighter = require('models/helpers/CellHighlighter');

  function AssistedMap() {
    Model.call(this);
    this.setupGizmos();
  }
  S.theClass(AssistedMap).inheritsFrom(Model);

  AssistedMap.prototype.setupGizmos = function() {
    this.screenAxis = new ScreenAxis();
    this.grid = new IsometricGrid(DEFAULT_CELL_SIZE);
    this.pointedCellGizmo = new CellHighlighter(DEFAULT_CELL_SIZE);
  };

  AssistedMap.prototype.getSubmodels = function() {
    return [this.grid, this.screenAxis];
  };


  function MapEditor() {
    Model.call(this);
    var target = new AssistedMap(),
        camera = new Camera([0, 0]),
        scene = new Scene(target, camera);

    S.theObject(this).has('_viewportManager', new MultiportWindow());

    this._viewportManager
      .newViewport('main', 600, 600)
      .scene = scene
    ;
  }
  S.theClass(MapEditor).inheritsFrom(Model);

  MapEditor.prototype.resizeWindow = function(width, height) {
    var mainViewport = this._viewportManager.getViewport('main');
    mainViewport.width = width;
    mainViewport.height = height;
    mainViewport.scene.camera.resize(width, height);
  };

  MapEditor.prototype.getSubmodels = function(aspect) {
    return [this._viewportManager];
  };

  return MapEditor;
});
