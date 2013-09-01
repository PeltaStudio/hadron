define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Drawer = require('hadron/render_system/graphics/IsometricDrawer');

  function GraphicSystem(canvas) {
    canvas = canvas || document.createElement('canvas');

    S.theObject(this).has('_bufferStack', []);
    this.buffer = canvas;
    this.drawer = new Drawer(canvas.getContext('2d'));
  }

  GraphicSystem.prototype.newBuffer = function(width, height) {
    this._bufferStack.push([this.buffer, this.drawer]);
    this.buffer = document.createElement('canvas');
    this.buffer.width = width || this.buffer.width;
    this.buffer.height = height || this.buffer.height;
    this.drawer = new Drawer(this.buffer.getContext('2d'));
  };

  GraphicSystem.prototype.restoreBuffer = function() {
    var bufferAndDrawer = this._bufferStack.pop();
    this.buffer = bufferAndDrawer[0];
    this.drawer = bufferAndDrawer[1];
  };

  GraphicSystem.prototype.setVisualizationArea = function(area) {
    this._visualizationArea = area;
  };

  GraphicSystem.prototype.getVisualizationArea = function() {
    return this._visualizationArea || null;
  };

  return GraphicSystem;
});
