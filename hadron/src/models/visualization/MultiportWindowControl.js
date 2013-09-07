define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/Model'),
      Viewport = require('hadron/models/visualization/Viewport');

  var gfx = require('hadron/gfx/GraphicSystem');

  // TODO: Let this class to create the viewport
  function MultiportWindow(mainBufferName) {
    S.theObject(this).has('windowBuffer', gfx.getBuffer(mainBufferName));
    S.theObject(this).has('_viewports', Object.create(null));
  }
  S.theClass(MultiportWindow).inheritsFrom(Model);

  MultiportWindow.prototype.newViewport =
  function(name, width, height, position) {
    var newViewport = new Viewport(width, height, position);
    gfx.setBuffer(newViewport.id, this.windowBuffer);
    this._viewports[name] = newViewport;
    return newViewport;
  };

  MultiportWindow.prototype.getViewport = function(name) {
    return this._viewports[name];
  };

  MultiportWindow.prototype.getSubmodels = function() {
    var name, submodels = [];
    for (name in this._viewports) {
      submodels.push(this._viewports[name]);
    }
    return submodels;
  };

  MultiportWindow.prototype.setPointer = function(coordinates) {
    var name, viewport, selectedViewport;
    for (name in this._viewports) {
      viewport = this._viewports[name];
      if (coordinates[0] >= viewport.position[0] &&
          coordinates[0] < viewport.position[0] + viewport.width &&
          coordinates[1] >= viewport.position[1] &&
          coordinates[1] < viewport.position[1] + viewport.height) {

        selectedViewport = viewport;
        break;
      }
    }
    if (selectedViewport) {
      selectedViewport.setPointer([
        coordinates[0] - viewport.position[0],
        coordinates[1] - viewport.position[1]
      ]);
    }
  };

  MultiportWindow.prototype.clear = function() {
    var buffer = this.windowBuffer,
        drawer = buffer.drawer;
    drawer.clearRect(0, 0, buffer.width, buffer.height);
  };

  return MultiportWindow;
});
