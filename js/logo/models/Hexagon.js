define(function (require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/models/Model');

  function Hexagon(size, position) {
    Model.apply(this, arguments);
    this.fillColor = "transparent";
    this.lineColor = "black";
    this.size = size || 150;
    this.position = position || [0, 0];
    this.rotation = 0;
  }
  S.theClass(Hexagon).inheritsFrom(Model);

  return Hexagon;
});
