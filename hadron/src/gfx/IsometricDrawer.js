/*
 * A drawer is the component for drawing into a rendering context such as 2D
 * context of a canvas. The IsometricDrawer is the Hadron main drawer and is
 ^ in charge of provide isometric drawing utilities.
 */
define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      T = require('hadron/toolkit');

  var G_30 = Math.PI / 6,
      COS_30 = Math.cos(Math.PI / 6),
      SIN_30 = 0.5,
      TAN_30 = Math.tan(G_30);

  var G_60 = Math.PI / 3,
      COS_60 = Math.cos(G_60),
      SIN_60 = Math.sin(G_60);

  var ROOT_2 = Math.sqrt(2),
      SEMI_ROOT_2 = ROOT_2 / 2,
      SCALE = Math.sqrt(10 / 16);

  function Drawer(context) {
    S.the(context)
      .has(getIsoCube)
      .has(setDimetricProjection);

    return context;
  }

  // Remember transformation are applied from bottom to top.
  function setDimetricProjection() {
    this.scale(1, 0.5);
    this.rotate(-Math.PI / 4);
  }

  function getIsoCube(size, height, options) {
    options = T.extend({
      lineColor: false,
      lineWidth: 1,
      lightSource: 'top',
      faceColor: [237, 12, 70, 1]
    }, options || {});

    var canvas = document.createElement('canvas'),
        buffer = canvas.getContext('2d'),
        points, colors;

    canvas.height = (size * SEMI_ROOT_2) + (SCALE * height);
    canvas.width = (size * ROOT_2);

    points = makePoints(size, height);
    colors = makeColors(options.lightSource, options.faceColor);

    buffer.save();
    buffer.strokeStyle = options.lineColor;
    buffer.lineWidth = options.lineWidth;
    buffer.fillStyle = colors.top;
    drawSide([0, 2, 1, 6]); // top
    buffer.fillStyle = colors.front;
    drawSide([0, 2, 3, 4]); // front
    buffer.fillStyle = colors.right;
    drawSide([0, 6, 5, 4]); // right
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

    function makeColors(lightSource, faceColor) {
      var brightestColor, shadeColor, mediumColor, darkestColor,
          top, right, front;

      if (!Array.isArray(faceColor)) {
        return {
          top: faceColor,
          front: faceColor,
          right: faceColor
        };
      }

      brightestColor = T.clone(faceColor);
      brightestColor[2] = Math.min(brightestColor[2] * 1.20, 100);

      shadeColor = T.clone(faceColor);
      shadeColor[2] = brightestColor[2] * 0.8;

      mediumColor = T.clone(faceColor);

      darkestColor = T.clone(faceColor);
      darkestColor = brightestColor[2] * 0.1;

      switch (lightSource) {
        case 'top':
          top = brightestColor;
          front = mediumColor;
          right = shadeColor;
          break;
        case 'right':
          top = mediumColor;
          front = shadeColor;
          right = brightestColor;
          break;
        case 'front':
          top = mediumColor;
          front = brightestColor;
          right = shadeColor;
          break;

        case 'bottom':
        case 'left':
        case 'back':
          top = right = front = darkestColor;
          break;
      }

      return {
        top: getHSLA(top),
        right: getHSLA(right),
        front: getHSLA(left)
      };

      function getHSLA(color) {
        return 'hsla(' +
                color[0] + ', ' +
                color[1] + '%, ' +
                color[2] + '%, ' +
                color[3] + ')';
      };
    }

    function drawSide(indices) {
      buffer.beginPath();
      buffer.moveTo.apply(buffer, points[indices[0]]);
      for (var i = 1, l = indices.length; i < l; i++) {
        buffer.lineTo.apply(buffer, points[indices[i]]);
      }
      buffer.closePath();
      if (options.faceColor) buffer.fill();
      if (options.lineColor) buffer.stroke();
    }
  }

  return Drawer;
});
