define(function (require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      Assembler = require('hadron/Assembler'),
      Hexagon = require('models/Hexagon'),
      HexagonRender = require('renders/HexagonRender'),
      HexCell = require('models/HexCell'),
      HexCellRender = require('renders/HexCellRender'),
      HexCellSimulator = require('simulators/HexCellSimulator'),
      GameOfLife = require('models/GameOfLife');

  var noop = T.noop;

  function LogoAssembler(canvas) {
    Assembler.call(this);
    this.canvas = canvas;
  }
  S.theClass(LogoAssembler).inheritsFrom(Assembler);

  LogoAssembler.prototype.assembleModels = function () {
    var canvas = this.canvas;

    this.assembleModel(Hexagon, {
      render: new HexagonRender(),
    });

    this.assembleModel(HexCell, {
      render: new HexCellRender(),
      simulate: new HexCellSimulator()
    });

    this.assembleModel(GameOfLife, {
      clear: clear,
      getClearSubmodels: noop
    });

    function clear() { canvas.width = canvas.width; }
  };

  return LogoAssembler;
});
