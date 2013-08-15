define(function (require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/Model');

  function ScreenAxis() {
    this.enabled = true;
  }
  S.inherit(ScreenAxis, Model);

  ScreenAxis.prototype.render = function (alpha, drawer) {
    var renderArea;
    if (!this.enabled) return;

    renderArea = this.getVisualizationArea();
    drawer.save();
    drawer.beginPath();
    drawer.strokeStyle = 'red';
    drawer.lineWidth = 1;
    drawer.moveTo(0.5, renderArea.top);
    drawer.lineTo(0.5, renderArea.bottom);
    drawer.moveTo(renderArea.left, 0);
    drawer.lineTo(renderArea.right, 0);
    drawer.stroke();
    drawer.restore();
  };

  return ScreenAxis;
});
