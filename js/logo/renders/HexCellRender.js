define(function (require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      HexagonRender = require('renders/HexagonRender');

  function HexCellRender(drawer) {
    HexagonRender.call(this, drawer);
  }
  S.theClass(HexCellRender).inheritsFrom(HexagonRender);

  HexCellRender.prototype.apply = function (model, args) {
    model.fillColor = model.alive ? 'black' : 'white';
    HexagonRender.prototype.apply.call(this, model, args);
  };

  return HexCellRender;
});
