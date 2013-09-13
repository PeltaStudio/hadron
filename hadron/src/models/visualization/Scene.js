define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Render = require('hadron/models/visualization/SceneRender'),
      Control = require('hadron/models/visualization/SceneControl'),
      Model = require('hadron/Model');

  function Scene(target, camera) {
    S.theObject(this).has('target', target);
    S.theObject(this).has('camera', camera);

    Model.apply(this, arguments);
  }
  S.theClass(Scene).inheritsFrom(Model);

  Scene.prototype.simulate = Control;

  Scene.prototype.render = Render;

  Scene.prototype.getSubmodels = function() {
    return [this.target];
  };

  return Scene;
});
