define(function(require) {
  'use strict';

  var DEFAULT_CELL_SIZE = 100;

  var S = require('hadron/scaffolding'),
      Model = require('hadron/models/Model'),
      Simulator = require('hadron/simulators/Simulator'),
      Camera = require('hadron/models/visualization/Camera'),
      Scene = require('hadron/models/visualization/Scene'),
      MultiportWindow = require('hadron/models/visualization/MultiportWindow'),
      WorldMetrics =  require('hadron/models/visualization/WorldMetrics'),
      ScreenAxis = require('models/helpers/ScreenAxis'),
      IsometricGrid = require('models/helpers/IsometricGrid'),
      CellHighlighter = require('models/helpers/CellHighlighter');

  function AssistedMapControl() { Simulator.call(this) };
  S.theClass(AssistedMapControl).inheritsFrom(Simulator);

  AssistedMapControl.prototype.setupAsync = function() {
    var assistedMap = this;
    assistedMap.addEventListener('pointermove', moveCellGizmo);

    function moveCellGizmo(evt) {
      assistedMap.pointedCellGizmo.position = [evt.mapX, evt.mapZ];
    }
  }

  function AssistedMap() {
    Model.call(this);
    this.setupGizmos();
    this.setupAsynchronousBehaviours();
  }
  S.theClass(AssistedMap).inheritsFrom(Model);

  AssistedMap.prototype.simulate = new AssistedMapControl();

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

  function MapEditor() {
    Model.call(this);
    var target = new AssistedMap(),
        camera = new Camera([0, 0]),
        scene = new Scene(target, camera);

    S.theObject(this).has('_viewportManager', new MultiportWindow());

    this._viewportManager
      .newViewport('main')
      .scene = scene
    ;

    this._viewportManager.newViewport('another', 300, 300)
    .scene = new Scene(target, new Camera([-100, -100], 300, 300));
  }
  S.theClass(MapEditor).inheritsFrom(Model);

  MapEditor.prototype.resizeWindow = function(width, height) {
    var mainViewport = this._viewportManager.getViewport('main');
    mainViewport.width = width;
    mainViewport.height = height;
    mainViewport.scene.camera.resize(width, height);
  };

  MapEditor.prototype.setPointer = function(coordinates) {
    this._viewportManager.setPointer(coordinates);
  };

  MapEditor.prototype.getSubmodels = function(aspect) {
    return [this._viewportManager];
  };

  return MapEditor;
});
