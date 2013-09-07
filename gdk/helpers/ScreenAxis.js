define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/Model'),
      Render = require('helpers/ScreenAxisRender');

  function ScreenAxis() {
    this.enabled = true;

    Model.apply(this, arguments);
  }
  S.theClass(ScreenAxis).inheritsFrom(Model);

  ScreenAxis.prototype.render = Render;

  return ScreenAxis;
});
