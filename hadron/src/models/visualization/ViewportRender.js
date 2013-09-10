define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Render = require('hadron/Render'),
      Model = require('hadron/Model');

  var gfx = require('hadron/gfx/GraphicSystem');

  function ViewportRender(viewport) {
    Render.apply(this, arguments);
  }
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

  return ViewportRender;
});
