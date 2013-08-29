define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      HexagonRender = require('renders/HexagonRender');

  function HexCellRender(drawer) {
    HexagonRender.call(this, drawer);
  }
  S.theClass(HexCellRender).inheritsFrom(HexagonRender);

  HexCellRender.prototype.render = function(model, ctx) {
    model.fillColor = model.alive ? 'black' : 'white';
    HexagonRender.prototype.render.call(this, model, ctx);
  };

  return HexCellRender;
});
