define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Render = require('hadron/renders/Render'),
      Model = require('hadron/models/Model');

  function ViewportRender() { }
  S.theClass(ViewportRender).inheritsFrom(Render);

  ViewportRender.prototype.render = function(viewport, system) {
    if (!viewport.scene) return;

    var gfx = system.gfx,
        camera = viewport.scene.camera;

    gfx.newBuffer(camera.width, camera.height);
  };

  ViewportRender.prototype.postRender = function(viewport, system) {
    if (!viewport.scene) return;

    var gfx = system.gfx,
        buffer = gfx.buffer,
        position = viewport.position;

    gfx.restoreBuffer();
    gfx.drawer.drawImage(
      buffer,
      position[0], position[1],
      viewport.width, viewport.height
    );
  };

  function Viewport(width, height, position) {
    this.width = width || 300;
    this.height = height || 300;
    this.position = position || [0, 0];
    this.scene = null;
  }
  S.theClass(Viewport).inheritsFrom(Model);

  Viewport.prototype.render = new ViewportRender();
  Viewport.prototype.getRenderSubmodels = function() {
    return [this.scene];
  };

  return Viewport;
});
