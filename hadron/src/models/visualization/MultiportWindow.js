define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/models/Model'),
      Viewport = require('hadron/models/visualization/Viewport');

  function MultiportWindow() {
    S.theObject(this).has('_viewports', Object.create(null));
  }
  S.theClass(MultiportWindow).inheritsFrom(Model);

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
    var submodels = [];
    for (name in this._viewports) {
      submodels.push(this._viewports[name]);
    }
    return submodels;
  };

  return MultiportWindow;
});
