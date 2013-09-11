(function() {
  'use strict';

  var FakeViewport = function() {},
      FakeRender = sinon.spy(),
      viewportSetPointer;

  viewportSetPointer = FakeViewport.prototype.setPointer = sinon.spy();
  FakeViewport = sinon.spy(FakeViewport);

  var context = newContext({
    'hadron/models/visualization/Viewport': FakeViewport,
    'hadron/models/visualization/MultiportWindowRender': FakeRender
  });

  context(['hadron/models/visualization/MultiportWindow'],
  function(MultiportWindow) {

    describe('MultiportWindow instances', function() {

      beforeEach(function() {
        FakeViewport.reset();
        FakeRender.reset();
      });

      it('allow adding named viewports by using `newViewport()`.', function() {
        var portManager = new MultiportWindow(), viewport,
            viewportArgs = [100, 100, [50, 50]], name = 'test';

        viewport =
          portManager.newViewport.apply(
                                      portManager, [name].concat(viewportArgs));

        expect(FakeViewport.calledOnce).toBe(true);
        expect(FakeViewport.calledWithNew()).toBe(true);
        expect(FakeViewport.getCall(0).args).toEqual(viewportArgs);
        expect(viewport instanceof FakeViewport).toBe(true);
      });

      it('allow getting a viewport by using `getViewport()`.', function() {
        var portManager = new MultiportWindow(), name = 'test', viewport;

        portManager.newViewport(name, 100, 100, [50, 50]);
        viewport = portManager.getViewport(name);

        expect(viewport instanceof FakeViewport).toBe(true);
      });

      // TODO: Order must be taken into account
      it('return a list of submodels (order is unimportant) by calling ' +
      '`getViewport()`.', function() {

        var portManager = new MultiportWindow(), name = 'test',
            anotherName = 'test2', submodels;

        portManager.newViewport(name, 100, 100, [50, 50]);
        portManager.newViewport(anotherName, 100, 100, [50, 50]);
        submodels = portManager.getSubmodels();

        expect(Array.isArray(submodels)).toBe(true);
        expect(submodels.length).toBe(2);
        expect(submodels[0] instanceof FakeViewport).toBe(true)
        expect(submodels[1] instanceof FakeViewport).toBe(true)
      });

      it('allow to set the pointer on Window coordinates positioning ' +
      'the pointer on the viewport.', function() {

        var portManager, viewport, vPosition = [50, 50], pointedViewport,
            vWidth = 100, vHeight = 100;

        portManager = new MultiportWindow();
        viewport = portManager.newViewport('test', vWidth, vHeight, vPosition);
        viewport.width = vWidth;
        viewport.height = vHeight;
        viewport.position = vPosition;
        viewport.setPointer = sinon.spy();
        pointedViewport = portManager.setPointer(vPosition);

        expect(viewport.setPointer.calledWith([0, 0])).toBe(true);
        expect(pointedViewport).toBe(viewport);
      });

      it('return `undefined` if trying to call `setPointer()` on no' +
      'viewport.', function() {

        var portManager, viewport, vPosition = [50, 50], pointedViewport,
            vWidth = 100, vHeight = 100;

        portManager = new MultiportWindow();
        viewport = portManager.newViewport('test', vWidth, vHeight, vPosition);
        viewport.width = vWidth;
        viewport.height = vHeight;
        viewport.position = vPosition;
        viewport.setPointer = sinon.spy();
        pointedViewport = portManager.setPointer([0, 0]);

        expect(pointedViewport).toBeUndefined();
      });

    });
  });

}()); 
