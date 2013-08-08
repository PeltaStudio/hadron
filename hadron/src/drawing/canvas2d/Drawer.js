define(function (require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      COS_30 = Math.cos(Math.PI/6), SIN_30 = 0.5,
      G_60 = Math.PI/3, COS_60 = Math.cos(G_60), SIN_60 = Math.sin(G_60);

  function dp(value) {
    return 1 * value;
  }

  function Drawer(context2D) {
    S.to(context2D)
      .add(clear)
      .add(getIsoCube)
      .add(showScreenAxis)
    ;
    return context2D;
  }

  function clear() {
    var maxNumber = Number.MAX_VALUE,
        minNumber = -maxNumber;
    this.clearRect(minNumber, minNumber, maxNumber, maxNumber);
  }

  function showScreenAxis() {
    var maxNumber = Number.MAX_VALUE,
        minNumber = -maxNumber;

    this.save();
    this.fillStyle = 'red';
    this.lineWidth = 1;
    this.beginPath();
    this.moveTo(0.5, -100);
    this.lineTo(0.5, 100);
    this.moveTo(-100, 0);
    this.lineTo(100, 0);
    this.stroke();
    this.restore();
  }

  function getIsoCube(size, height) {
    var color = 'blue',
        strokeColor = 'black';

    var canvas = document.createElement('canvas'),
        buffer = canvas.getContext('2d');

    var points;

    canvas.height = dp(height + size);
    canvas.width = dp(size * COS_30 * 2);

    points = makePoints(size, height);
    buffer.save();
    buffer.fillStyle = color;
    buffer.strokeStyle = strokeColor;
    buffer.lineWidth = dp(1);
    drawSide([0, 2, 1, 6]); // top
    drawSide([0, 6, 5, 4]); // left
    drawSide([0, 2, 3, 4]); // right
    buffer.restore();

    return canvas;

    function makePoints(radius, height) {
      var points = new Array(7);

      points[0] = [dp(size * COS_30), dp(size)];
      points[1] = [points[0][0], 0];
      points[2] = [canvas.width, dp(size * SIN_30)];
      points[6] = [0, points[2][1]];

      points[3] = [points[2][0], points[2][1] + dp(height)];
      points[4] = [points[0][0], points[0][1] + dp(height)];
      points[5] = [points[6][0], points[6][1] + dp(height)];

      return points;
    }

    function drawSide(indices) {
      buffer.beginPath();
      buffer.moveTo.apply(buffer, points[indices[0]]);
      for (var i = 1, l = indices.length; i < l; i++) {
        buffer.lineTo.apply(buffer, points[indices[i]]);
      }
      buffer.closePath();
      buffer.stroke();
      buffer.fill();
    }
  }

  return Drawer;
});
