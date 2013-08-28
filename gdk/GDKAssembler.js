define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),

      MapEditor = require('models/MapEditor'),
      CellHighlighter = require('models/helpers/CellHighlighter'),
      IsometricGrid = require('models/helpers/IsometricGrid'),
      ScreenAxis = require('models/helpers/ScreenAxis'),

      MapEditorRender = require('renders/MapEditorRender'),
      CellHighlighterRender = require('renders/helpers/CellHighlighterRender'),
      IsometricGridRender = require('renders/helpers/IsometricGridRender'),
      ScreenAxisRender = require('renders/helpers/ScreenAxisRender'),

      HadronAssembler = require('hadron/HadronAssembler');

  var noop = T.noop;

  function GDKAssembler(canvas) {
    HadronAssembler.apply(this, arguments);
    this.canvas = canvas;
  }
  S.theClass(GDKAssembler).inheritsFrom(HadronAssembler);

  GDKAssembler.prototype.assembleModels = function() {
    HadronAssembler.prototype.assembleModels.call(this);

    var canvas = this.canvas;

    this.assembleModel(MapEditor, {
      render: new MapEditorRender(),
      clear: clear,
      getClearSubmodels: noop
    });

    this.assembleModel(CellHighlighter, {
      render: new CellHighlighterRender()
    });

    this.assembleModel(IsometricGrid, {
      render: new IsometricGridRender()
    });

    this.assembleModel(ScreenAxis, {
      render: new ScreenAxisRender()
    });

    function clear() { canvas.width = canvas.width; }
  };

  return GDKAssembler;
});
