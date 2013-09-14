define(function(require) {
  'use strict';

  var DEFAULT_CELL_SIZE = 100;

  var S = require('hadron/scaffolding'),
      Model = require('hadron/Model'),
      Simulator = require('hadron/Simulator'),
      Tile = require('hadron/models/map/Tile'),
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

  MapEditor.prototype.setPointer = function(coordinates) {
    this._viewportManager.setPointer(coordinates);
  };

  MapEditor.prototype.getSubmodels = function(aspect) {
    return [this._viewportManager];
  };

  MapEditor.prototype.getMapEditorBuffer = function() {
    return this._viewportManager.render.windowBuffer;
  };

  MapEditor.prototype.doTestScenario = function(palette) {
    var tile, block, centerObject, throneTile;

    // Suelo
   for (var x = -3; x <= 3; x++) {
      for (var z = -3; z <= 3; z++) {
        tile = new Tile(DEFAULT_CELL_SIZE);
        tile.position = [x, z];
        block = {
          sprite: palette.getSprite(0),
          bottom: 0
        };
        block.top = block.sprite.height - this.metrics.V_DIAGONAL;
        tile.blocks.push(block);
        this.target.map.addTile(tile);
      }
    }

    centerObject = palette.getSprite(1);
    if (centerObject) {
      throneTile = this.target.map.getTile([0, 0]);
      block = {
        sprite: centerObject,
        bottom: 0
      }
      block.top = block.sprite.height - this.metrics.V_DIAGONAL;
      throneTile.blocks.push(block);
    }
  }

  return MapEditor;
});
