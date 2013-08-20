define(function (require) {
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
    HadronAssembler.call(this, canvas);
  }
  S.inherit(GDKAssembler, HadronAssembler);

  GDKAssembler.prototype.assembleModels = function () {
    HadronAssembler.prototype.assembleModels.call(this);

    var canvas = this.canvas,
        drawer = this.drawer;

    this.assembleModel(MapEditor, {
      render: new MapEditorRender(drawer),
      clear: clear,
      getClearSubmodels: noop
    });

    this.assembleModel(CellHighlighter, {
      render: new CellHighlighterRender(drawer)
    });

    this.assembleModel(IsometricGrid, {
      render: new IsometricGridRender(drawer)
    });

    this.assembleModel(ScreenAxis, {
      render: new ScreenAxisRender(drawer)
    });

    function clear() { canvas.width = canvas.width; }
  };

  return GDKAssembler;
});
