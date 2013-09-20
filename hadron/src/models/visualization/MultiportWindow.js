define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/Model'),
      Render = require('hadron/models/visualization/MultiportWindowRender'),
      Viewport = require('hadron/models/visualization/Viewport');

  function MultiportWindow(mainBufferName) {
    S.theObject(this).has('_viewports', Object.create(null));

    Model.apply(this, arguments);
  }
  S.theClass(MultiportWindow).inheritsFrom(Model);

  MultiportWindow.prototype.render = Render;

  MultiportWindow.prototype.newViewport =
  function(name, width, height, position) {
    var newViewport = new Viewport(width, height, position);
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

  MultiportWindow.prototype.setPointer = function(coordinates, isClicking) {
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
        coordinates[1] - viewport.position[1],
        isClicking
      ]);
      return selectedViewport;
    }
    return undefined;
  };

  return MultiportWindow;
});
