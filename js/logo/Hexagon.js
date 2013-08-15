define(function (require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/Model');

  var step = Math.PI / 3;

  function Hexagon(size, position) {
    Model.apply(this, arguments);
    this.fillColor = "transparent";
    this.lineColor = "black";
    this.size = size || 150;
    this.position = position || [0, 0];
    this.rotation = 0;
  }
  S.inherit(Hexagon, Model);

  Hexagon.prototype.render = function (alpha, drawer) {
    var ctx = drawer.getContext('2d');
    var startPoint = [
      this.position[0],
      this.position[1] - this.size
    ], nextPoint;

    ctx.save();
    ctx.beginPath();
    for (var v = 0; v < 6; v++) {
      nextPoint = [
        this.size * Math.cos(v * step + this.rotation) + this.position[0],
        this.size * Math.sin(v * step + this.rotation) + this.position[1]
      ];
      ctx[v ? 'lineTo' : 'moveTo'].apply(ctx, nextPoint);
    }
    ctx.closePath();
    ctx.fillStyle = this.fillColor;
    ctx.lineWidth = 0.15 * this.size;
    ctx.strokeStyle = this.lineColor;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  };

  return Hexagon;
});
