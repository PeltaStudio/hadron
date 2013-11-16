define(function(require) {
  'use strict';

  var DEFAULT_CELL_SIZE = 100;

  var S = require('hadron/scaffolding'),
      Model = require('hadron/Model'),
      Simulator = require('hadron/Simulator'),
      Tile = require('hadron/models/map/tiling/Tile'),
      Camera = require('hadron/models/visualization/Camera'),
      Scene = require('hadron/models/visualization/Scene'),
      MultiportWindow = require('hadron/models/visualization/MultiportWindow'),
      WorldMetrics = require('hadron/models/visualization/WorldMetrics'),
      AssistedMap = require('editors/AssistedMap');

  function MapEditor() {
    var target = new AssistedMap(DEFAULT_CELL_SIZE),
        camera = new Camera([0, 0]),
        scene = new Scene(target, camera);

    var viewportManager = new MultiportWindow('map-editor');
    S.theObject(this)
      .has('target', target)
      .has('_viewportManager', viewportManager)
      .has('metrics', new WorldMetrics(DEFAULT_CELL_SIZE));

    this._viewportManager
      .newViewport('main')
      .scene = scene
    ;

    Model.apply(this, arguments);
  }
  S.theClass(MapEditor).inheritsFrom(Model);

  MapEditor.prototype.resizeWindow = function(width, height) {
    var mainViewport = this._viewportManager.getViewport('main');
    mainViewport.width = width;
    mainViewport.height = height;
    mainViewport.scene.camera.resize(width, height);
  };

  MapEditor.prototype.setPointer = function(coordinates, isClicking) {
    this._viewportManager.setPointer(coordinates, isClicking);
  };

  MapEditor.prototype.getSubmodels = function(aspect) {
    return [this._viewportManager];
  };

  MapEditor.prototype.getMapEditorBuffer = function() {
    return this._viewportManager.render.windowBuffer;
  };

  MapEditor.prototype.doTestScenario = function(palette) {
    var cell, tile, centerObject, throneCell;

    // Suelo
   for (var x = -3; x <= 3; x++) {
      for (var z = -3; z <= 3; z++) {
        cell = this.target.map.getCell([x, z]);
        cell.clearTiles();
        // TODO: Replace by retrieving from Palette
        tile = new Tile(DEFAULT_CELL_SIZE, palette.getSprite(1));
        cell.tiles.push(tile);
      }
    }

    centerObject = palette.getSprite(2);
    if (centerObject) {
      throneCell = this.target.map.getCell([0, 0]);
      tile = new Tile(DEFAULT_CELL_SIZE, centerObject);
      throneCell.tiles.push(tile);
    }
  }

  return MapEditor;
});
