define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Render = require('hadron/renders/Render');

  var gfx = require('hadron/gfx/GraphicSystem');

  function IsometricGridRender() { }
  S.theClass(IsometricGridRender).inheritsFrom(Render);

  IsometricGridRender.prototype.render = function(model) {
    var size, renderArea, top, bottom, left, right,
        drawer = gfx.drawer;

    if (!model.enabled) return;

    size = model.cellSize;
    renderArea = gfx.getVisualizationArea();
    if (!renderArea) return;
    top = Math.floor(renderArea.top / size) * size * 3;
    bottom = Math.ceil(renderArea.bottom / size) * size * 3;
    left = Math.floor(renderArea.left / size) * size * 3;
    right = Math.ceil(renderArea.right / size) * size * 3;

    drawer.save();
    drawer.setDimetricProjection();
    drawer.beginPath();
    drawer.strokeStyle = 'black';
    drawer.lineWidth = 1;
    for (var col = left; col <= right; col += size) {
      drawer.moveTo(col, top);
      drawer.lineTo(col, bottom);
    }
    for (var row = top; row <= bottom; row += size) {
      drawer.moveTo(left, row);
      drawer.lineTo(right, row);
    }
    drawer.stroke();
    drawer.restore();
  };

  return IsometricGridRender;
});
