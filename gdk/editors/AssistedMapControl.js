define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Simulator = require('hadron/Simulator');

  function AssistedMapControl(assistedMap) {
    Simulator.call(this)

    assistedMap.addEventListener('pointermove', moveCellGizmo);

    function moveCellGizmo(evt) {
      assistedMap.pointedCellGizmo.position = [evt.mapX, evt.mapZ];
    }
  };
  S.theClass(AssistedMapControl).inheritsFrom(Simulator);

  return AssistedMapControl;
});
