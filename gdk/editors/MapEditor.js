define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/Model'),
      Simulator = require('hadron/Simulator'),
      Camera = require('hadron/models/visualization/Camera'),
      Scene = require('hadron/models/visualization/Scene'),
      MultiportWindow = require('hadron/models/visualization/MultiportWindow'),
      AssistedMap = require('editors/AssistedMap');

  function MapEditor() {
    var target = new AssistedMap(),
        camera = new Camera([0, 0]),
        scene = new Scene(target, camera);

    var viewportManager = new MultiportWindow('map-editor');
    S.theObject(this).has('_viewportManager', viewportManager);

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

  return MapEditor;
});
