define(function (require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      T = require('hadron/toolkit'),
      Model = require('hadron/Model'),
      Drawer = require('hadron/drawing/canvas2d/Drawer');

  function Tile() {
    Model.apply(this, arguments);
    this.size = 70;
    this.height = this.size;
    this.position = [0, 0, 0]; // X and Y are discretized but Z is continuous
  }
  S.inherit(Tile, Model);

  Tile.prototype.render = function (alpha, drawer) {
    var cubeSprite = drawer.getIsoCube(this.size, this.height);
    drawer.drawImage(cubeSprite, 0, 0);
  };

  return Tile;
});
