define(function (require) {
  'use strict';

  var T = require('hadron/toolkit'),
      Model = require('hadron/Model'),
      Hexagon = require('Hexagon'),
      HexCell = require('HexCell'),
      FOSSIL_CELL;

  // Ad-hoc completely dead (no render / no behaviour) cell
  FOSSIL_CELL = new HexCell(0, [0,0], false);
  FOSSIL_CELL.render = void 0;
  FOSSIL_CELL.simulate = void 0;

  function GameOfLife(side, cellRadius, center) {
    var self = this;
    Model.apply(this, arguments);

    var BOARD_cellRadius = 150,
        START_OF_THE_FILL_AREA = Math.sqrt(3) * cellRadius * (side - 1),
        board = [], cols, rows;

    setupFrame();
    setupBoard();

    function setupFrame() {
      var board = new Hexagon(BOARD_cellRadius, center);
      board.fillColor = 'white';
      board.rotation = Math.PI / 2;
      self.add(board);
    }

    function setupBoard() {
      var cell,
          isRowOdd, evenRowStartingX, oddRowStartingX,
          x, y, stepX, stepY;

      cols = side;
      rows = ((side * 2 - 1) * 2) - 1;

      stepX = 3 * cellRadius;
      stepY = Math.sqrt(3)/2 * cellRadius;
      oddRowStartingX = center[0] - (3/2 * cellRadius * (side - 1));
      evenRowStartingX = center[0] - (3/2 * cellRadius * (side - 2));

      y = center[1] - START_OF_THE_FILL_AREA;
      for (var r = 0; r < rows; r++) {
        board[r] = [];
        isRowOdd = (r % 2 === 1);
        x = isRowOdd ? oddRowStartingX : evenRowStartingX;
        for (var c = 0; c < cols; c++) {
          cell = isOutOfTheHexagon(r, c) ? FOSSIL_CELL :
                                           new HexCell(cellRadius, [x, y]);
          board[r][c] = cell;
          self.add(cell);
          x += stepX;
        }
        y += stepY;
      }
    }

    // Determine if a pair row, colum is inside the a hexagon shape according
    // to the size of the hexagon (`side`). A pair is inside the hexagon if
    // it is in the central zone, or inside one of the triangles that are over
    // and below the central zone.
    function isOutOfTheHexagon(r, c) {
      var topBoundary, bottomBoundary,
          leftBoundary, rightBoundary,
          isRowEven = (r % 2 === 0),
          middle = (side / 2) - 1,
          index; // index in the odd/even serie

      // TODO: this is the last column; could it be generalized?
      if (isRowEven && c === side - 1 || r === side * 4) {
        return true;
      }

      topBoundary = side - 1;
      bottomBoundary = rows - side;

      if (topBoundary <= r && r <= bottomBoundary) {
        return false;
      }
      else {
        if (r > bottomBoundary) {
          r -= bottomBoundary;
          r = side - r;
        }

        index = isRowEven ? r / 2 : (r - 1) / 2;
        if (isRowEven) {
          leftBoundary = middle - index;
          rightBoundary = middle + index;
        }
        else {
          leftBoundary = middle - index;
          rightBoundary = (middle + index) + 1;
        }
        return c < leftBoundary || c > rightBoundary;
      }
    }
  }

  GameOfLife.prototype = Object.create(Model.prototype);
  GameOfLife.prototype.constructor = GameOfLife;

  return GameOfLife;
});
