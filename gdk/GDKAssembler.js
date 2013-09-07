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

  function GDKAssembler() {
    HadronAssembler.apply(this, arguments);
  }
  S.theClass(GDKAssembler).inheritsFrom(HadronAssembler);

  GDKAssembler.prototype.assembleModels = function() {
    HadronAssembler.prototype.assembleModels.call(this);

    this.assembleModel(MapEditor, {
      render: new MapEditorRender()
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
  };

  return GDKAssembler;
});
