define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Drawer = require('hadron/gfx/IsometricDrawer');

  function GraphicSystem() {
    S.theObject(this).has('_buffers', {});
  }

  GraphicSystem.prototype.newBuffer = function(name, width, height) {
    var buffer = document.createElement('canvas');
    buffer.width = width || buffer.width;
    buffer.height = height || buffer.height;
    buffer.drawer = new Drawer(buffer.getContext('2d'));
    this._buffers[name] = buffer;
    return buffer;
  };

  GraphicSystem.prototype.getBuffer = function(name) {
    var buffer = this._buffers[name];
    if (!buffer) return null;
    return buffer;
  };

  GraphicSystem.prototype.setBuffer = function(name, buffer) {
    this._buffers[name] = buffer;
    return this;
  };

  // TODO: Can we force to free the memory, not only the reference?
  GraphicSystem.prototype.destroyBuffer = function(name) {
    var existed = !!this._buffers[name];
    delete this._buffers[name];
    return existed;
  };

  GraphicSystem.prototype.setVisualizationArea = function(area) {
    this._visualizationArea = area;
  };

  GraphicSystem.prototype.getVisualizationArea = function() {
    return this._visualizationArea || null;
  };

  return new GraphicSystem();
});
