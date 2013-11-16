define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding');

  var DIMETRIC_ANGLE = Math.atan(0.5),
      SCALATION_FACTOR = Math.sqrt(10) / 4;

  var metricCache = { };

  function WorldMetrics(cellSize) {
    if (!metricCache[cellSize]) {

      var PROJECTED_SIZE = cellSize * SCALATION_FACTOR,
          H_RADIUS = Math.cos(DIMETRIC_ANGLE) * PROJECTED_SIZE,
          V_RADIUS = Math.sin(DIMETRIC_ANGLE) * PROJECTED_SIZE,
          X_AXIS = [H_RADIUS, V_RADIUS],
          Z_AXIS = [-H_RADIUS, V_RADIUS];

      S.theObject(this)
        .has('DIMETRIC_ANGLE', DIMETRIC_ANGLE)
        .has('SCALATION_FACTOR', SCALATION_FACTOR)
        .has('CELL_SIZE', cellSize)
        .has('H_RADIUS', H_RADIUS)
        .has('V_RADIUS', V_RADIUS)
        .has('H_DIAGONAL', 2 * H_RADIUS)
        .has('V_DIAGONAL', 2 * V_RADIUS)
        .has('X_AXIS', X_AXIS)
        .has('Z_AXIS', Z_AXIS)
        .has('PROJECTED_SIZE', PROJECTED_SIZE);

      metricCache[cellSize] = this;
    }

    return metricCache[cellSize];
  }

  WorldMetrics.prototype.getWorkSpaceCoordinates = function(cellPosition) {
    var x = cellPosition[0], z = cellPosition[1];
    return [(x - z) * this.H_RADIUS, (x + z) * this.V_RADIUS];
  };

  WorldMetrics.prototype.getMapCoordinates = function(worldPosition) {
    var self = this;
    var x = worldPosition[0], y = worldPosition[1],
        intersectionWithX, intersectionWithZ, indexX, indexZ;

    intersectionWithX = [x / 2 + y, x / 4 + y / 2];
    indexX = getIndex(intersectionWithX, self.X_AXIS);

    intersectionWithZ = [x / 2 - y, -x / 4 + y / 2];
    indexZ = getIndex(intersectionWithZ, self.Z_AXIS);

    return [indexX, indexZ];

    function getIndex(point, axis) {
      var s, d = Math.sqrt(Math.pow(point[0], 2) + Math.pow(point[1], 2));
      if (sameSign(point[0], axis[0]) && sameSign(point[1], axis[1])) {
        s = 1;
      }
      else {
        s = -1;
      }
      return Math.ceil(s * d / self.PROJECTED_SIZE);
    }

    function sameSign(a, b) {
      return a === b || a > 0 && b > 0 || a < 0 && b < 0;
    }
  };

  return WorldMetrics;

});
