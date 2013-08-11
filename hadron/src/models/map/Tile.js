define(function (require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      T = require('hadron/toolkit'),
      Model = require('hadron/Model'),
      Drawer = require('hadron/drawing/canvas2d/Drawer');

  var selected = [0, 0];
  function Tile() {
    Model.apply(this, arguments);
    this.size = 100;
    this.height = this.size;
    this.position = [0, 0, 0]; // X and Y are discretized but Z is continuous

    var self = this;
    document.getElementById('map-builder').onmousemove = function (evt) {
      var canvas = evt.target;
      var rect = canvas.getBoundingClientRect();
      var canvasCoords = [
        evt.clientX - rect.left - canvas.width / 2,
        evt.clientY - rect.top - canvas.height / 2
      ];
      var worldCoordinates = getWorldCoordinates(self.size)(canvasCoords[0], canvasCoords[1]);
      selected = getScreenCoordinates(self.size)(worldCoordinates[0], worldCoordinates[1]);
    };
  }
  S.inherit(Tile, Model);

  Tile.prototype.render = function (alpha, drawer) {
    var cubeSprite = drawer.getIsoCube(this.size, this.height);
    var origin = getScreenCoordinates(this.size)(2, 2);
    drawer.fillStyle = '#00F';
    drawer.beginPath();
    drawer.arc(selected[0], selected[1], 15, 0, 2 * Math.PI);
    drawer.fill();
      drawer.fillStyle = '#F00';
      drawer.beginPath();
      drawer.arc(xInt[0], xInt[1], 4, 0, 2 * Math.PI);
      drawer.fill();
      drawer.fillStyle = '#0F0';
      drawer.beginPath();
      drawer.arc(zInt[0], zInt[1], 4, 0, 2 * Math.PI);
      drawer.fill();
//    drawer.drawImage(cubeSprite, -cubeSprite.width/2 + origin[0], -cubeSprite.height + origin[1]);
    var origin = getScreenCoordinates(this.size)(-1, 2);
//    drawer.drawImage(cubeSprite, -cubeSprite.width/2 + origin[0], -cubeSprite.height + origin[1]);
  };

  function getScreenCoordinates(size) {
    var G_DIM = Math.atan(0.5);
    var SCALE = Math.sqrt(10)/4;
    var PROJECTED_SIZE = SCALE * size;
    var incX = Math.cos(G_DIM) * PROJECTED_SIZE;
    var incY = Math.sin(G_DIM) * PROJECTED_SIZE;
    return function (x, z) {
      return [(x - z) * incX, (x + z) * incY];
    };
  }

  var xInt = [0, 0], zInt = [0, 0];
  function getWorldCoordinates(size) {
    var G_DIM = Math.atan(0.5);
    var SCALE = Math.sqrt(10)/4;
    var PROJECTED_SIZE = SCALE * size;
    var incX = Math.cos(G_DIM) * PROJECTED_SIZE;
    var incY = Math.sin(G_DIM) * PROJECTED_SIZE;
    var XAxis = [incX, incY];
    var ZAxis = [-incX, incY];
    return function (x, y) {
      xInt = [
        x/2+y,
        x/4+y/2
      ];
      zInt = [
        x/2-y,
        -x/4+y/2
      ];
      return [getIndex(xInt, XAxis), getIndex(zInt, ZAxis)];

      function getIndex(point, axis) {
        var s, d = Math.sqrt(Math.pow(point[0], 2) + Math.pow(point[1], 2));
        if (sameSign(point[0], axis[0]) && sameSign(point[1], axis[1])) {
          s = 1;
        }
        else {
          s = -1;
        }
        return Math.floor(s * d / PROJECTED_SIZE) + 1;
      }

      function sameSign(a, b) {
        return a === b || a > 0 && b > 0 || a < 0 && b < 0;
      }
    };
  }

  return Tile;
});
