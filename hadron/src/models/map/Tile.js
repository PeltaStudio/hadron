define(function (require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/Model');

  function Tile() {
    Model.apply(this, arguments);
    this.size = 100;
    this.height = this.size;
    this.position = [0, 0, 0]; // X and Z are discretized but Y is continuous
  }
  S.inherit(Tile, Model);

  return Tile;
});
