define(function (require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/models/Model');

  function ScreenAxis() {
    this.enabled = true;
  }
  S.inherit(ScreenAxis, Model);

  return ScreenAxis;
});
