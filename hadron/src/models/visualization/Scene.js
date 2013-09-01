define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      T = require('hadron/toolkit'),
      Render = require('hadron/renders/Render'),
      Model = require('hadron/models/Model');

  function SceneRender() { }
  S.theClass(SceneRender).inheritsFrom(Render);

  SceneRender.prototype.render = function(scene, system) {
    var gfx = system.gfx,
        camera = scene.camera,
        position = camera.getPosition(),
        semiWidth = camera.semiWidth,
        semiHeight = camera.semiHeight,
        offsetX, offsetY;

    offsetX = -position[0] + semiWidth;
    offsetY = -position[1] + semiHeight;

    // TODO: take in count zoom factor
    gfx.drawer.setTransform(1, 0, 0, 1, offsetX, offsetY);
    gfx.setVisualizationArea({
      top: position[1] - semiHeight,
      right: position[0] + semiWidth,
      bottom: position[1] + semiHeight,
      left: position[0] - semiWidth
    });
  };

  function Scene(target, camera) {
    var message = 'parameter `target` is mandatory and can not be null.';
    T.assert.isDefined(target, message);

    S.theObject(this).has('target', target);
    S.theObject(this).has('camera', camera || new Camera());
  }
  S.theClass(Scene).inheritsFrom(Model);

  Scene.prototype.render = new SceneRender();
  Scene.prototype.getSubmodels = function() {
    return [this.target];
  };

  return Scene;
});
