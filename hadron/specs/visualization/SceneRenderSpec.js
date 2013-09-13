(function() {
  'use strict';

  var FakeGfx = {
    newBuffer: sinon.stub().returns({ drawer: {
      setTransform: sinon.stub()
    } }),
    setVisualizationArea: sinon.stub(),
    getVisualizationArea: sinon.stub()
  };

  var context = newContext({
    'hadron/gfx/GraphicSystem': FakeGfx
  });

  context([
    'hadron/Model',
    'hadron/models/visualization/SceneRender'
  ], function(Model, SceneRender) {

    describe('SceneRender facets', function() {

      var scene, camera, target;

      beforeEach(function() {
        scene = {};
        target = {};
        camera = new Model();
        camera.getPosition = sinon.stub().returns([0, 0]);
      });

      it('listen for changes in the camera to change the drawer ' +
      'transformation or the visible area.', function() {

        var remaining, sceneRender;
        sinon.stub(SceneRender.prototype, 'onCameraChange');

        sceneRender = new SceneRender(scene, target, camera);
        SceneRender.prototype.onCameraChange.reset();

        runs(function() {
          remaining = 2;
          camera.addEventListener('move', function() { remaining--; });
          camera.addEventListener('resize', function() { remaining--; });
          camera.dispatchEvent('move', {});
          camera.dispatchEvent('resize', {});
        });

        waitsFor(function() {
          return remaining === 0;
        }, 'All events should be treated.', 100);

        runs(function() {
          expect(SceneRender.prototype.onCameraChange.calledTwice).toBe(true);
          SceneRender.prototype.onCameraChange.restore();
        })
      });

      it('add a `clear()` method to the model.', function() {
        var sceneRender = new SceneRender(scene, target, camera);

        expect(scene.clear).toBeDefined();
      });

    });
  });

}()); 
