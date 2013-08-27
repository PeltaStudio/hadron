define(function (require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),

      Camera = require('hadron/models/cameras/Camera'),
      Tile = require('hadron/models/map/Tile'),
      TiledMap = require('hadron/models/map/TiledMap'),

      Assembler = require('hadron/Assembler');

  var noop = T.noop;

  function HadronAssembler() {
    Assembler.apply(this, arguments);
  }
  S.theClass(HadronAssembler).inheritsFrom(Assembler);

  HadronAssembler.prototype.assembleModels = function () {
  };

  return HadronAssembler;
});
