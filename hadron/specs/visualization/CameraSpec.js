(function() {
  'use strict';

  var context = newContext();
  context(['hadron/models/visualization/Camera'], function(Camera) {

    describe('Camera instances', function() {

      var camera;

      beforeEach(function() {
        camera = new Camera();
      });

      describe('Camera events', function() {

        it('`resize` is triggered when `resize()` is called', function() {

          var width = 800, height = 600, type = 'resize', event;

          runs(function() {
            camera.addEventListener(type, function(evt) {
              event = evt;
            });
            camera.resize(width, height);
          });

          waitsFor(function() {
            return event;
          }, 'The event should be triggered.', 100);

          runs(function() {
            expect(event.type).toBe(type);
            expect(event.target).toBe(camera);

            expect(event.width).toBe(width);
            expect(event.height).toBe(height);
            expect(event.semiWidth).toBe(width / 2);
            expect(event.semiHeight).toBe(height / 2);
          });

        });

        it('`move` is triggered when `setPosition()` is called', function() {

          var newX = 8, newY = 6, type = 'move', event;

          runs(function() {
            camera.addEventListener(type, function(evt) {
              event = evt;
            });
            camera.setPosition([newX, newY]);
          });

          waitsFor(function() {
            return event;
          }, 'The event should be triggered.', 100);

          runs(function() {
            expect(event.type).toBe(type);
            expect(event.target).toBe(camera);

            expect(event.worldX).toBe(newX);
            expect(event.worldY).toBe(newY);
          });

        });

        it('`pointermove` is triggered when `setPointer()` is called',
        function() {

          var newX = 8, newY = 6, type = 'pointermove', event;

          runs(function() {
            camera.addEventListener(type, function(evt) {
              event = evt;
            });
            camera.setPointer([newX, newY]);
          });

          waitsFor(function() {
            return event;
          }, 'The event should be triggered.', 100);

          runs(function() {
            expect(event.type).toBe(type);
            expect(event.target).toBe(camera);
          });

        });

        it('`pointermove` includes the world coordinates where pointer is.',
        function() {

          var onCameraCoords = [0, 0], type = 'pointermove', event;

          runs(function() {
            camera.addEventListener(type, function(evt) {
              event = evt;
            });
            camera.setPointer(onCameraCoords);
          });

          waitsFor(function() {
            return event;
          }, 'The event should be triggered.', 100);

          runs(function() {
            expect(event.worldX).toBe(-250);
            expect(event.worldY).toBe(-250);
          });

        });

      });

      it('has a `resize()` method to change the dimensions of the camera ' +
         'viewport.', function() {

        var width = 800, height = 600;

        camera.resize(width, height);

        expect(camera.width).toBe(width);
        expect(camera.height).toBe(height);
        expect(camera.semiWidth).toBe(width / 2);
        expect(camera.semiHeight).toBe(height / 2);
      });

      it('has a `setPosition()` method to change the position of the camera.',
      function() {

        var newX = 8, newY = 6;

        camera.setPosition([newX, newY]);

        expect(camera._position[0]).toBe(newX);
        expect(camera._position[1]).toBe(newY);
      });

      it('has a `getPosition()` method to retrieve a copy of position.',
      function() {

        var newX = 8, newY = 6, position, anotherPosition;

        camera.setPosition([newX, newY]);
        position = camera.getPosition();
        anotherPosition = camera.getPosition();

        expect(position).not.toBe(anotherPosition);
        expect(position[0]).toBe(newX);
        expect(position[1]).toBe(newY);
      });

    });
  });

}()); 
