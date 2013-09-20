define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      T = require('hadron/toolkit'),
      Simulator = require('hadron/Simulator');

  function SceneControl(scene, target, camera) {
    Simulator.apply(this, arguments);

    S.theObject(this).has('target', target);

    camera.addEventListener('pointermove', this.updateTargetPointer.bind(this));
    camera.addEventListener('click', this.doTargetClick.bind(this));
  }
  S.theClass(SceneControl).inheritsFrom(Simulator);

  SceneControl.prototype.updateTargetPointer = function(evt) {
    this.target.setPointer([evt.worldX, evt.worldY]);
  };

  SceneControl.prototype.doTargetClick = function(evt) {
    this.target.setPointer([evt.worldX, evt.worldY], true);
  };

  return SceneControl;
});
