define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Render = require('hadron/renders/Render');

  function ScreenAxisRender() { }
  S.theClass(ScreenAxisRender).inheritsFrom(Render);

  ScreenAxisRender.prototype.render = function(model, drawer) {
    var renderArea;
    if (!model.enabled) return;

    renderArea = model.getVisualizationArea();
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

  return ScreenAxisRender;
});
