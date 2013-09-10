define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      T = require('hadron/toolkit'),
      Simulator = require('hadron/Simulator');

  function SceneControl(scene, target, camera) {
    Simulator.apply(this, arguments);

    camera.addEventListener('pointermove', updateTargetPointer);

    function updateTargetPointer(evt) {
      scene.target.setPointer([evt.worldX, evt.worldY]);
    }
  }
  S.theClass(SceneControl).inheritsFrom(Simulator);

  return SceneControl;
});
