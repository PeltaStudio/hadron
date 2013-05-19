define(function (require) {
  'use strict';

  var T = require('hadron/toolkit'),
      Model = require('hadron/Model'),
      Hexagon = require('Hexagon'),
      HexCell = require('HexCell');

  function GameOfLife(side, size, center) {
    var self = this;
    Model.apply(this, arguments);

    var BOARD_SIZE = 150,
        FILL_AREA = Math.sqrt(3) * size * (side - 1);

    setupBoard();
    setupTop();
    setupMiddle();
    setupBottom();

    function setupBoard() {
      var board = new Hexagon(BOARD_SIZE, center);
      board.fillColor = 'white';
      board.rotation = Math.PI / 2;
      self.add(board);
    }

    // 0-based row counting
    function setupTop() {
      var cell, row, col, colCount, X, Y, hexagonsByRow;
      for (row = 0; row < side; row++) {
        X = center[0] - (3/2 * size * row);
        Y = center[1] - FILL_AREA + (size * Math.sqrt(3)/2 * row);
        hexagonsByRow = row + 1;
        for (col = 0, colCount = hexagonsByRow; col < colCount; col++) {
          cell = new HexCell(size, [X, Y]);
          self.add(cell);
          X += 3 * size;
        }
      }
    }

    function setupMiddle() {
      var cell, row, lastRow, col, colCount, X, Y, hexagonsByRow,
          fillingHoles = true,
          fillingStartingPosition = center[0] - (3/2 * size * (side - 2)),
          defaultStartingPosition = center[0] - (3/2 * size * (side - 1)),
          holes = side - 1;

      lastRow = side + 2 * (side - 1);
      for (row = side; row < lastRow; row++) {
        X = fillingHoles ? fillingStartingPosition : defaultStartingPosition;
        Y = center[1] - FILL_AREA + (size * Math.sqrt(3)/2 * row);
        hexagonsByRow = fillingHoles ? holes : side;
        for (col = 0, colCount = hexagonsByRow; col < colCount; col++) {
          cell = new HexCell(size, [X, Y]);
          self.add(cell);
          X += 3 * size;
        }
        fillingHoles = !fillingHoles;

      }
    }

    function setupBottom() {
      var cell, rowOffset, i, row, col, colCount, X, Y, hexagonsByRow;
      rowOffset = side + 2 * (side - 1);
      for (row = side - 2, i = 0; row >= 0; row--, i++) {
        X = center[0] - (3/2 * size * row);
        Y = center[1] - FILL_AREA + (size * Math.sqrt(3)/2 * (rowOffset + i));
        hexagonsByRow = row + 1;
        for (col = 0, colCount = hexagonsByRow; col < colCount; col++) {
          cell = new HexCell(size, [X, Y]);
          self.add(cell);
          X += 3 * size;
        }
      }
    }
  }

  GameOfLife.prototype = Object.create(Model.prototype);
  GameOfLife.prototype.constructor = GameOfLife;

  return GameOfLife;
});
