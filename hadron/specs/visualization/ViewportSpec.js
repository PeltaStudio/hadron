(function() {
  'use strict';

  var context = newContext();
  context(['hadron/models/visualization/Viewport'], function(Viewport) {

    describe('Viewport instances', function() {

      it('have a position and dimensions.', function() {
        var width = 800, height = 600, position = [0, 0],
            viewport = new Viewport(width, height, position);

        expect(viewport.width).toBe(width);
        expect(viewport.height).toBe(height);
        expect(viewport.position).toEqual(position);
      });

      it('are bound to the scene-like object to render. Can be set by ' +
      'setting the `scene` property and it is retrieved when ' +
      '`getSubmodels()` is called', function() {
        var fakeScene = {}, viewport, submodels;
        viewport = new Viewport();
        viewport.scene = fakeScene;

        submodels = viewport.getSubmodels();

        expect(submodels.length).toBe(1);
        expect(submodels[0]).toBe(fakeScene);
      });

      it('allow to set pointer coordinates into the viewport which causes ' +
      'to automatically set scene camera pointer coordinates accordingly.',
      function() {
        var viewportWidth = 800, viewportHeight = 600,
            viewport = new Viewport(viewportWidth, viewportHeight, [0, 0]),
            cameraWidth = 100, cameraHeight = 100,
            fakeScene = {
              camera: {
                setPointer: sinon.spy(),
                width: cameraWidth,
                height: cameraHeight
              }
            }, cameraSetPointer = fakeScene.camera.setPointer,
            expectedCameraPointer = [cameraWidth / 2, cameraHeight / 2];
        viewport.scene = fakeScene;

        viewport.setPointer([viewportWidth / 2, viewportHeight / 2]);

        expect(cameraSetPointer.calledOnce).toBe(true);
        expect(cameraSetPointer.args[0])
          .toEqual([expectedCameraPointer]);
      });

    });
  });

}()); 
