define(function (require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      T = require('hadron/toolkit'),
      Model = require('hadron/Model'),
      Drawer = require('hadron/drawing/canvas2d/Drawer');

  function Tile() {
    Model.apply(this, arguments);
    this.size = 100;
    this.height = this.size;
    this.position = [0, 0, 0]; // X and Z are discretized but Y is continuous
  }
  S.inherit(Tile, Model);

  Tile.prototype.render = function (alpha, drawer) {
    var cubeSprite = drawer.getIsoCube(this.size, this.height);
    var origin = getScreenCoordinates(this.size)(
      this.position[1], this.position[2]
    );
    drawer.drawImage(
      cubeSprite,
      -cubeSprite.width/2 + origin[0],
      -cubeSprite.height + origin[1] - this.position[1]
    );
  };

  return Tile;
});
