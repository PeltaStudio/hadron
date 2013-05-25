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
                                           new HexCell(0.9 * cellRadius, [x, y]);
          board[r][c] = cell;
          self.add(cell);
          x += stepX;
        }
        y += stepY;
      }
    }

    // Consider a hexagon as:
    // A top triangle:     /\
    // A central zone:    |  |
    // A bottom triangle:  \/
    function isOutOfTheHexagon(r, c) {
      var topBoundary, bottomBoundary,
          leftBoundary, rightBoundary,
          isRowEven = (r % 2 === 0),
          middle = (side / 2) - 1;

      return isNotInCentralZone(r, c) &&
             isNotInTopTriangle(r, c) &&
             isNotInBottomTriangle(r, c);

      function isNotInCentralZone(r, c) {
        topBoundary = side - 1;
        bottomBoundary = rows - side;

        if (r < topBoundary || r > bottomBoundary ||
            isRowEven && c === side - 1) {
          return true;
        }
      }

      function isNotInTopTriangle(r, c) {
        var index; // index in the odd/even serie

        if (r >= topBoundary) {
          return true;
        }

        index = isRowEven ? r/2 : (r - 1)/2;
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

      function isNotInBottomTriangle(r, c) {
        var equivalentRowForTopTriangle;

        if (r <= bottomBoundary || r === side * 4) {
          return true;
        }

        equivalentRowForTopTriangle = side - (r - bottomBoundary) - 1;
        return isNotInTopTriangle(equivalentRowForTopTriangle, c);
      }
    }
  }

  GameOfLife.prototype = Object.create(Model.prototype);
  GameOfLife.prototype.constructor = GameOfLife;

  return GameOfLife;
});
