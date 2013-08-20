define(function (require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),

      IsometricDrawer = require('hadron/renders/canvas2d/IsometricDrawer'),

      Camera = require('hadron/models/cameras/Camera'),
      Tile = require('hadron/models/map/Tile'),
      TiledMap = require('hadron/models/map/TiledMap'),

      Assembler = require('hadron/Assembler');

  var noop = T.noop;

  function HadronAssembler(canvas) {
    Assembler.apply(this, arguments);
    this.canvas = canvas;
    this.drawer = new IsometricDrawer(canvas.getContext('2d'));
  }
  S.inherit(HadronAssembler, Assembler);

  HadronAssembler.prototype.assembleModels = function () {
  };

  return HadronAssembler;
});
