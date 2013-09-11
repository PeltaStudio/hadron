define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/Model'),
      Render = require('renders/HexagonRender');

  function Hexagon(size, position) {
    this.fillColor = 'transparent';
    this.lineColor = 'black';
    this.size = size || 150;
    this.position = position || [0, 0];
    this.rotation = 0;

    Model.apply(this, arguments);
  }
  S.theClass(Hexagon).inheritsFrom(Model);

  Hexagon.prototype.render = Render;

  return Hexagon;
});
