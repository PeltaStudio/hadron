define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/models/Model');

  function CellHighlighter() { }
  S.inherit(CellHighlighter, Model);

  return CellHighlighter;
});
