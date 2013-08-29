define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Render = require('hadron/renders/Render');

  var step = Math.PI / 3;

  function HexagonRender() { }
  S.theClass(HexagonRender).inheritsFrom(Render);

  HexagonRender.prototype.render = function(model, ctx) {
    var startPoint = [
          model.position[0],
          model.position[1] - model.size
        ], nextPoint;

    ctx.save();
    ctx.beginPath();
    for (var v = 0; v < 6; v++) {
      nextPoint = [
        model.size * Math.cos(v * step + model.rotation) + model.position[0],
        model.size * Math.sin(v * step + model.rotation) + model.position[1]
      ];
      ctx[v ? 'lineTo' : 'moveTo'].apply(ctx, nextPoint);
    }
    ctx.closePath();
    ctx.fillStyle = model.fillColor;
    ctx.lineWidth = 0.15 * model.size;
    ctx.strokeStyle = model.lineColor;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  };

  return HexagonRender;
});
