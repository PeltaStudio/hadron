define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Render = require('hadron/Render');

  var gfx = require('hadron/gfx/GraphicSystem');

  function ScreenAxisRender() { }
  S.theClass(ScreenAxisRender).inheritsFrom(Render);

  ScreenAxisRender.prototype.render = function(model) {
    var renderArea, drawer;
    if (!model.enabled) return;

    drawer = gfx.drawer;
    renderArea = gfx.getVisualizationArea();
    if (!renderArea) return;

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
