define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/Model'),
      Render = require('hadron/models/visualization/ViewportRender');

  function Viewport(width, height, position) {
    this.width = width || 300;
    this.height = height || 300;
    this.position = position || [0, 0];
    this.scene = null;

    Model.apply(this, arguments);
  }
  S.theClass(Viewport).inheritsFrom(Model);

  Viewport.prototype.render = Render;

  Viewport.prototype.getSubmodels = function() {
    return [this.scene];
  };

  Viewport.prototype.setPointer = function(coordinates, isClicking) {
    var factorX = this.scene.camera.width / this.width,
        factorY = this.scene.camera.height / this.height;

    this.scene.camera.setPointer([
      coordinates[0] * factorX,
      coordinates[1] * factorY,
      isClicking
    ]);
  };

  return Viewport;
});
