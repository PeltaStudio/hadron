define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Render = require('hadron/Render'),
      Model = require('hadron/Model');

  var gfx = require('hadron/gfx/GraphicSystem');

  function ViewportRender() { }
  S.theClass(ViewportRender).inheritsFrom(Render);

  ViewportRender.prototype.postRender = function(viewport) {
    if (!viewport.scene) return;
    var sceneBuffer = viewport.scene.render.getBuffer(),
        windowDrawer = gfx.getBuffer(viewport.id).drawer,
        position = viewport.position;

    windowDrawer.save();
    windowDrawer.fillStyle = '#DDD';
    windowDrawer.fillRect(
      position[0], position[1],
      viewport.width, viewport.height
    );
    windowDrawer.drawImage(
      sceneBuffer,
      position[0], position[1],
      viewport.width, viewport.height
    );
    windowDrawer.restore();
  };

  function Viewport(width, height, position) {
    this.width = width || 300;
    this.height = height || 300;
    this.position = position || [0, 0];
    this.scene = null;
    Model.apply(this, arguments);
  }
  S.theClass(Viewport).inheritsFrom(Model);

  Viewport.prototype.setPointer = function(coordinates) {
    var factorX = this.scene.camera.width / this.width,
        factorY = this.scene.camera.height / this.height;

    this.scene.camera.setPointer([
      coordinates[0] * factorX,
      coordinates[1] * factorY
    ]);
  };

  Viewport.prototype.render = new ViewportRender();
  Viewport.prototype.getRenderSubmodels = function() {
    return [this.scene];
  };
  Viewport.prototype.getClearSubmodels = function() {
    return [this.scene];
  };

  return Viewport;
});
