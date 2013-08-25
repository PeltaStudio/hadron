define(function (require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/models/Model');

  function IsometricGrid() {
    this.enabled = true;
  }
  S.inherit(IsometricGrid, Model);

  return IsometricGrid;
});
