define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/models/Model');

  function CellHighlighter() { }
  S.theClass(CellHighlighter).inheritsFrom(Model);

  return CellHighlighter;
});
