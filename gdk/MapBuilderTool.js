/*
 * The map builder tool is a complex application composed by several modules.
 ^ Among them, the most important is the map editor. The map editor is rendered
 * upon an extended version of the Hadron main isometric render engine
 * inlcuding extensions for specific aiding gizmos.
 */
define(function (require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      MapEditor = require('models/map/MapEditor'),
      ControlAspect = require('hadron/ControlAspect'),
      RenderAspect = require('hadron/RenderAspect'),
      IsometricDrawer = require('hadron/rendering/canvas2d/IsometricDrawer'),
      Game = require('hadron/Game');

  function MapBuilderTool() { }

  MapBuilderTool.prototype.init = function () {
    this.setupEditor();
    this.setupControl();
  };

  MapBuilderTool.prototype.setupEditor = function () {
    var self = this;
    var mapEditorCanvas = document.getElementById('map-editor-canvas'),
        target = mapEditorCanvas.getContext('2d'),
        mapEditorDrawer = new IsometricDrawer(target),
        mapEditor = new MapEditor(),
        mapEditorSimulation;

    // FIXME: look for a better name. Problem can be with Game.
    mapEditorSimulation = new Game({
      rootModel: mapEditor,
      control: new ControlAspect(),
      render: new RenderAspect(mapEditorDrawer)
    });
    mapEditorSimulation.start();

    S.to(self)
      .addGet('mapEditorCanvas', function() { return mapEditorCanvas; })
      .addGet('mapEditor', function () { return mapEditor; });
    ;

    self.updateViewport();
    self.mapEditor.goToOrigin();

    mapEditorCanvas.onmousemove = updateViewportPointer;

    function updateViewportPointer(evt) {
      var canvas = evt.target;
      var rect = canvas.getBoundingClientRect();
      var canvasCoords = [
        evt.clientX - rect.left,
        evt.clientY - rect.top
      ];
      var viewportSize = self.mapEditor.getViewportSize()
      var cameraCoords = [
        canvasCoords[0] / canvas.width * viewportSize.width,
        canvasCoords[1] / canvas.height * viewportSize.height,
      ];
      self.mapEditor.setPointer(cameraCoords);
    };
  };

  MapBuilderTool.prototype.setupControl = function () {
    var self = this;
    window.onresize = this.updateViewport.bind(this);
  };

  MapBuilderTool.prototype.updateViewport = function () {
    var newWidth = document.documentElement.offsetWidth,
        newHeight = document.documentElement.clientHeight;

    // maximize canvas
    this.mapEditorCanvas.width = newWidth;
    this.mapEditorCanvas.height = newHeight;

    this.mapEditor.resizeViewport(newWidth, newHeight);
  };

  return MapBuilderTool;
});
