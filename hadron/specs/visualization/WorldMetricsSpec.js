(function() {
  'use strict';

  var context = newContext();
  context(['hadron/models/visualization/WorldMetrics'], function(WorldMetrics) {

    describe('WorldMetrics instances', function() {

      var CELL_SIZE = 100;

      var metrics;

      beforeEach(function() {
        metrics = new WorldMetrics(CELL_SIZE);
      });

      it('are cached by cell size to improve the performance.', function() {
        var metrics2 = new WorldMetrics(CELL_SIZE),
            metrics3 = new WorldMetrics(CELL_SIZE + 1);

        expect(metrics).toBe(metrics2);
        expect(metrics).not.toBe(metrics3);
      });

      describe('World coordinates into Map coordiantes', function() {

        it('places w(0, 0) inside m(0, 0).', function() {
          var worldCoords = [0.0, 0.0],
              mapCoords = metrics.getMapCoordinates(worldCoords);

          expect(mapCoords).toEqual([0, 0]);
        });

        it('places bottom-most corner of the isometric tile m(0, 0) just ' +
           'over w(0, 0).', function() {
          var bottom = [0.0, 0.0],
              top = [0.0, -metrics.V_DIAGONAL],
              left = [-metrics.H_RADIUS, -metrics.V_RADIUS],
              right = [metrics.H_RADIUS, -metrics.V_RADIUS],
              getCoords = metrics.getMapCoordinates.bind(metrics);

          expect(getCoords(bottom)).toEqual([0, 0]);
          expect(getCoords(left)).toEqual([-1, 0]);
          expect(getCoords(top)).toEqual([-1, -1]);
          expect(getCoords(right)).toEqual([0, -1]);
        });

      });

      describe('Map coordinates into World coordinates', function() {

        it('places m(0, 0) at w(0, 0).', function() {
          var mapCoords = [0, 0],
              worldCoords = metrics.getWorldCoordinates(mapCoords);

          expect(worldCoords).toEqual([0.0, 0.0]);
        });

        it('makes one operation to be the inverse of the other one for tile ' +
           'origins (bottom-most corners)', function() {
          var mX = Math.floor((Math.random() - 0.5) * 10),
              mY = Math.floor((Math.random() - 0.5) * 10),
              mapSample = [mX, mY],
              wCoordinates, mCoordinates;

          wCoordinates = metrics.getWorldCoordinates(mapSample);
          mCoordinates = metrics.getMapCoordinates(wCoordinates);

          expect(mapSample).toEqual(mCoordinates);
        });

      });

    });
  });

}()); 
