define(function (require) {
  'use strict';

  var T = require('hadron/toolkit'),
      Model = require('hadron/Model'),
      Hexagon = require('Hexagon'),
      HexCell = require('HexCell');

  function GameOfLife(side, size, center) {
    Model.apply(this, arguments);

    var BOARD_SIZE = 150, FILL_AREA = BOARD_SIZE * 0.83,
        cell, X, Y, f, c, fc, cc, r, fillHoles = true,
        board = new Hexagon(BOARD_SIZE, center);
    board.fillColor = 'white';
    board.rotation = Math.PI / 2;
    this.add(board);

    for (f = 0; f < side; f++) {
      X = center[0] - (3/2 * size * f);
      Y = center[1] - FILL_AREA + (size * Math.sqrt(3)/2 * f);
      for (c = 0, cc = f + 1; c < cc; c++) {
        cell = new HexCell(size, [X, Y]);
        this.add(cell);
        X += 3 * size;
      }
    }

    for (fc = f + 2 * (side - 1); f < fc; f++) {
      X = center[0] - (3/2 * size * (side - (fillHoles ? 2 : 1)));
      Y = center[1] - FILL_AREA + (size * Math.sqrt(3)/2 * f);
      for (c = 0, cc = side - (fillHoles ? 1 : 0); c < cc; c++) {
        cell = new HexCell(size, [X, Y]);
        this.add(cell);
        X += 3 * size;
      }
      fillHoles = !fillHoles;
    }

    for (r = side, fc = f + (side - 1); f < fc; f++, r--) {
      X = center[0] - (3/2 * size * (r - (fillHoles ? 2 : 1)));
      Y = center[1] - FILL_AREA + (size * Math.sqrt(3)/2 * f);
      for (c = 0, cc = r - 1; c < cc; c++) {
        cell = new HexCell(size, [X, Y]);
        this.add(cell);
        X += 3 * size;
      }
    }

    function setupBoard() {
      
    }

    setupBoard();
    setupTop();
    setupMiddle();
    setupBottom();
  }

  GameOfLife.prototype = Object.create(Model.prototype);
  GameOfLife.prototype.constructor = GameOfLife;

  return GameOfLife;
});
