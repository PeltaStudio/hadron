(function() {
  'use strict';

  var context = newContext();
  context([
    'hadron/Model',
    'hadron/models/visualization/SceneControl'
  ], function(Model, SceneControl) {

    describe('SceneControl facets', function() {

      var scene, camera, target;

      beforeEach(function() {
        target = { setPointer: sinon.spy() };
        camera = new Model();
        camera.getPosition = sinon.stub().returns([0, 0]);
      });

      it('changes in the camera pointer are transmitted to the target.',
      function() {

        var done = false, sceneControl,
            worldPosition = { worldX: 100, worldY: 200 },
            targetPosition = [worldPosition.worldX, worldPosition.worldY];
        sceneControl = new SceneControl(scene, target, camera);

        runs(function() {
          camera.addEventListener('pointermove', function() { done = true; });
          camera.dispatchEvent('pointermove', worldPosition);
        });

        waitsFor(function() {
          return done;
        }, 'All events should be treated.', 100);

        runs(function() {
          expect(target.setPointer.calledOnce).toBe(true);
          expect(target.setPointer.calledWith(targetPosition)).toBe(true);
        })
      });

    });
  });

}()); 
