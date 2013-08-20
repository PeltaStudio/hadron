define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/Model');

  function CellHighlighter() { }
  S.inherit(CellHighlighter, Model);

  return CellHighlighter;
});
