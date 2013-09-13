(function() {
  'use strict';

  var FakeGfx = {};

  var context = newContext({
    'hadron/gfx/GraphicSystem': FakeGfx
  });
  context(['hadron/models/visualization/ViewportRender'],
  function(ViewportRender) {

    var fakeSceneBuffer, viewport, fakeViewportId = 'viewportId';

    beforeEach(function() {
      fakeSceneBuffer = {};

      viewport = {
        id: fakeViewportId,
        scene: { render: {
          getBuffer: sinon.stub().returns(fakeSceneBuffer)
        }},
        position: [0, 0],
        width: 800,
        height: 600
      };
    });

    describe('ViewportRender facets', function() {

      it('draw the scene buffer into the window buffer in the postRender ' +
      'stage.', function() {
        var render = new ViewportRender(viewport),
            sceneGetBuffer = viewport.scene.render.getBuffer,
            fakeWindowBuffer = { drawer: {
              save: sinon.spy(),
              restore: sinon.spy(),
              fillRect: sinon.spy(),
              drawImage: sinon.spy()
            }};

        FakeGfx.getBuffer = sinon.stub().withArgs(fakeViewportId)
                            .returns(fakeWindowBuffer);

        render.postRender(viewport);

        expect(sceneGetBuffer.calledOnce).toBe(true);
        expect(FakeGfx.getBuffer.calledOnce).toBe(true);
        expect(FakeGfx.getBuffer.calledWith(viewport.id)).toBe(true);
      });

    });
  });

}()); 
