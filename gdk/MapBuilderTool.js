/*
 * The map builder tool is a complex application composed by several modules.
 ^ Among them, the most important is the map editor. The map editor is rendered
 * upon an extended version of the Hadron main isometric render engine
 * inlcuding extensions for specific aiding gizmos.
 */
define(function (require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      MapEditor = require('models/MapEditor'),
      GDKAssembler = require('GDKAssembler'),
      Game = require('hadron/Game');

  function MapBuilderTool() { }

  MapBuilderTool.prototype.init = function () {
    this.setupEditor();
    this.setupControl();
    this.setupInfoArea();
  };

  MapBuilderTool.prototype.setupEditor = function () {
    var self = this;
    var mapEditorCanvas = document.getElementById('map-editor-canvas'),
        mapEditor = new MapEditor(),
        mapEditorSimulation;

    // FIXME: look for a better name. Problem can be with Game.
    mapEditorSimulation = new Game({
      rootModel: mapEditor,
      assembler: new GDKAssembler(mapEditorCanvas),
    });
    mapEditorSimulation.start();

    S.to(self)
      .addGet('mapEditorCanvas', function() { return mapEditorCanvas; })
      .addGet('mapEditor', function () { return mapEditor; })
      .addGet('mapEditorSimulation', function () { return mapEditorSimulation; })
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

  MapBuilderTool.prototype.setupInfoArea = function () {
    var self = this;
    var updateFPS, mapEditorInfoArea, fpsHolder, avgFPS = 0, counter = 0;
    fpsHolder = document.querySelector('#fps-info + dd');
    updateFPS = setInterval(function () {
      var fps = self.mapEditorSimulation.fps;
      avgFPS = (avgFPS * counter + fps)/(counter + 1);
      counter++;

      fpsHolder.textContent = avgFPS.toFixed(2);
    }, 50);
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
