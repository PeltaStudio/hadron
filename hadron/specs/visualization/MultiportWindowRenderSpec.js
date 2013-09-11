(function() {
  'use strict';

  var FakeGfx = {
    newBuffer: sinon.stub(),
    setBuffer: sinon.stub()
  };

  var context = newContext({
    'hadron/gfx/GraphicSystem': FakeGfx
  });

  context(['hadron/models/visualization/MultiportWindowRender'],
  function(MultiportWindowRender) {

    describe('MultiportWindowRender facets', function() {

      var multiportWindow;

      beforeEach(function() {
        FakeGfx.newBuffer.reset();
        FakeGfx.setBuffer.reset();
        multiportWindow = {
          id: 'multiportWindowId',
          _viewports: {
            'v1': { id: 'v1' },
            'v2': { id: 'v2' }
          }
        };
      });

      it('set a `windowBuffer` property when created.', function() {
        var mainBufferName = 'main', render, windowBufferFake = {};;
        FakeGfx.newBuffer.returns(windowBufferFake);

        render = new MultiportWindowRender(multiportWindow, mainBufferName);

        expect(FakeGfx.newBuffer.calledOnce).toBe(true);
        expect(FakeGfx.newBuffer.calledWith(mainBufferName)).toBe(true);
        expect(FakeGfx.newBuffer.returns[0]).toBe(multiportWindow.windowBuffer);
      });

      it('render by setting the window buffer to each viewport id.',
      function() {
        var mainBufferName = 'main', render, windowBufferFake = {},
            call1, call2;
        FakeGfx.newBuffer.returns(windowBufferFake);

        render = new MultiportWindowRender(multiportWindow, mainBufferName);
        render.render(multiportWindow);

        call1 = FakeGfx.setBuffer.getCall(0);
        call2 = FakeGfx.setBuffer.getCall(1);

        expect(FakeGfx.setBuffer.calledTwice).toBe(true);
        expect(call1.args).toEqual(['v1', windowBufferFake]);
        expect(call2.args).toEqual(['v2', windowBufferFake]);
      });

      it('add a `clear()` method to the model and clear by removing all in ' +
         'the window buffer.', function() {
        var mainBufferName = 'main', render, width = 800, height = 600,
            windowBufferFake = {
              width: width,
              height: height,
              drawer: { clearRect: sinon.spy() },
            }, clearRect = windowBufferFake.drawer.clearRect;

        FakeGfx.newBuffer.returns(windowBufferFake);

        render = new MultiportWindowRender(multiportWindow, mainBufferName);
        multiportWindow.clear();

        expect(clearRect.calledOnce).toBe(true);
        expect(clearRect.calledWith(0, 0, width, height)).toBe(true);
      });

    });
  });

}()); 
