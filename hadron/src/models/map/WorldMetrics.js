define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding');

  function WorldMetrics(cellSize) {
    var DIMETRIC_ANGLE = Math.atan(0.5),
        SCALATION_FACTOR = Math.sqrt(10) / 4,
        PROJECTED_SIZE = cellSize * SCALATION_FACTOR,
        bigR = Math.cos(DIMETRIC_ANGLE) * PROJECTED_SIZE,
        smallR = Math.sin(DIMETRIC_ANGLE) * PROJECTED_SIZE,
        XAxis = [bigR, smallR],
        ZAxis = [-bigR, smallR];

    S.theObject(this)
      .has('cellSize', cellSize)
      .has('bigR', bigR)
      .has('smallR', smallR)
      .has('XAxis', XAxis)
      .has('ZAxis', ZAxis)
      .has('PROJECTED_SIZE', PROJECTED_SIZE);

  }

  WorldMetrics.prototype.getTargetCoordinates = function(cellPosition) {
    var x = cellPosition[0], z = cellPosition[1];
    return [(x - z) * this.bigR, (x + z) * this.smallR];
  };

  WorldMetrics.prototype.getWorldCoordinates = function(targetPosition) {
    var self = this;
    var x = targetPosition[0], y = targetPosition[1],
        intersectionWithX, intersectionWithZ, indexX, indexZ;

    intersectionWithX = [x / 2 + y, x / 4 + y / 2];
    indexX = getIndex(intersectionWithX, self.XAxis);

    intersectionWithZ = [x / 2 - y, -x / 4 + y / 2];
    indexZ = getIndex(intersectionWithZ, self.ZAxis);

    return [indexX, indexZ];

    function getIndex(point, axis) {
      var s, d = Math.sqrt(Math.pow(point[0], 2) + Math.pow(point[1], 2));
      if (sameSign(point[0], axis[0]) && sameSign(point[1], axis[1])) {
        s = 1;
      }
      else {
        s = -1;
      }
      return Math.floor(s * d / self.PROJECTED_SIZE) + 1;
    }

    function sameSign(a, b) {
      return a === b || a > 0 && b > 0 || a < 0 && b < 0;
    }
  };

  return WorldMetrics;

});
