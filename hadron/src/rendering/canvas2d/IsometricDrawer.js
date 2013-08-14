define(function (require) {
  'use strict';

  var S = require('hadron/scaffolding');

  var G_30 = Math.PI/6,
      COS_30 = Math.cos(Math.PI/6),
      SIN_30 = 0.5,
      TAN_30 = Math.tan(G_30);

  var G_60 = Math.PI/3,
      COS_60 = Math.cos(G_60),
      SIN_60 = Math.sin(G_60);

  var ROOT_2 = Math.sqrt(2),
      SEMI_ROOT_2 = ROOT_2/2,
      SCALE = Math.sqrt(10/16);

  function Drawer(context2D) {
    S.to(context2D)
      .add(clear)
      .add(getIsoCube)
      .add(showScreenAxis)
      .add(showIsometricGrid)
      .add(setIsometricProjection)
      .add(setDimetricProjection)
    ;
    return context2D;
  }

  function clear() {
    this.clearRect(-10000, -10000, 20000, 20000);
  }

  function showScreenAxis(renderArea) {
    this.save();
    this.beginPath();
    this.strokeStyle = 'red';
    this.lineWidth = 1;
    this.moveTo(0.5, renderArea.top);
    this.lineTo(0.5, renderArea.bottom);
    this.moveTo(renderArea.left, 0);
    this.lineTo(renderArea.right, 0);
    this.stroke();
    this.restore();
  }

  function showIsometricGrid(size, renderArea) {
    var top = Math.floor(renderArea.top / size) * size * 3,
        bottom = Math.ceil(renderArea.bottom / size) * size * 3,
        left = Math.floor(renderArea.left / size) * size * 3,
        right = Math.ceil(renderArea.right / size) * size * 3;

    this.save();
    this.setDimetricProjection();
    this.beginPath();
    this.strokeStyle = 'black';
    this.lineWidth = 1;
    for (var col = left; col <= right; col += size) {
      this.moveTo(col, top);
      this.lineTo(col, bottom);
    }
    for (var row = top; row <= bottom; row += size) {
      this.moveTo(left, row);
      this.lineTo(right, row);
    }
    this.stroke();
    this.restore();
  }

  // Based on SSR (Scale, Skew, Rotate).
  // Remember transformation are applied from bottom to top.
  function setIsometricProjection() {
    this.rotate(-G_30); // Rotate
    this.transform(1, 0, TAN_30, 1, 0, 0); // Skew
    this.transform(1, 0, 0, COS_30, 0, 0); // Scale
  }

  function setDimetricProjection() {
    this.scale(1, 0.5); // Scale
    this.rotate(-Math.PI/4); // Rotate
  }

  function getIsoCube(size, height) {
    var brightestColor = 'hsla(237, 12%, 80%, 1)',
        mediumColor = 'hsla(237, 12%, 70%, 1)',
        shadeColor = 'hsla(237, 12%, 60%, 1)',
        strokeColor = 'black';

    var canvas = document.createElement('canvas'),
        buffer = canvas.getContext('2d');

    var points;

    canvas.height = (size * SEMI_ROOT_2) + (SCALE * height);
    canvas.width = (size * ROOT_2);

    points = makePoints(size, height);
    buffer.save();
    buffer.strokeStyle = strokeColor;
    buffer.lineWidth = 1;
    buffer.fillStyle = brightestColor;
    drawSide([0, 2, 1, 6]); // top
    buffer.fillStyle = mediumColor;
    drawSide([0, 2, 3, 4]); // right
    buffer.fillStyle = shadeColor;
    drawSide([0, 6, 5, 4]); // left
    buffer.restore();

    return canvas;

    function makePoints(radius, height) {
      var points = new Array(7);
      points[0] = [size * SEMI_ROOT_2, size * SEMI_ROOT_2];
      points[1] = [points[0][0], 0];
      points[2] = [canvas.width, size * SEMI_ROOT_2 / 2];
      points[6] = [0, points[2][1]];

      points[3] = [points[2][0], points[2][1] + SCALE * height];
      points[4] = [points[0][0], points[0][1] + SCALE * height];
      points[5] = [points[6][0], points[6][1] + SCALE * height];

      return points;
    }

    function drawSide(indices) {
      buffer.beginPath();
      buffer.moveTo.apply(buffer, points[indices[0]]);
      for (var i = 1, l = indices.length; i < l; i++) {
        buffer.lineTo.apply(buffer, points[indices[i]]);
      }
      buffer.closePath();
      buffer.fill();
    }
  }

  return Drawer;
});
