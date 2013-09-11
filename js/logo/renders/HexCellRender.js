define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      HexagonRender = require('renders/HexagonRender');

  function HexCellRender() { HexagonRender.apply(this, arguments); }
  S.theClass(HexCellRender).inheritsFrom(HexagonRender);

  HexCellRender.prototype.render = function(model) {
    model.fillColor = model.alive ? 'black' : 'white';
    HexagonRender.prototype.render.call(this, model);
  };

  return HexCellRender;
});
