(function() {
  'use strict';

  var context = newContext({
    'hadron/render_system/graphics/IsometricDrawer': function dummy() { }
  });
  context(['hadron/render_system/graphics/GraphicSystem'],
                                                      function(GraphicSystem) {

    describe('GraphicSystem instances', function() {

      it('allows to create new buffers.', function() {
        var system = new GraphicSystem(),
            formerBuffer, newBuffer,
            formerDrawer, newDrawer;

        formerBuffer = system.buffer;
        formerDrawer = system.drawer;
        system.newBuffer(100, 100);
        newBuffer = system.buffer;
        newDrawer = system.drawer;

        expect(formerBuffer).not.toBe(newBuffer);
        expect(formerDrawer).not.toBe(newDrawer);
      });

      it('allows to restore the former buffer.', function() {
        var system = new GraphicSystem(),
            formerBuffer, newBuffer,
            formerDrawer, newDrawer;

        formerBuffer = system.buffer;
        formerDrawer = system.drawer;
        system.newBuffer(100, 100);
        system.restoreBuffer();
        newBuffer = system.buffer;
        newDrawer = system.drawer;

        expect(formerBuffer).toBe(newBuffer);
        expect(formerDrawer).toBe(newDrawer);
      });

    });
  });

}()); 
