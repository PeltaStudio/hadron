(function() {
  'use strict';

  function IsometricDrawerFake() { }

  var context = newContext({
    'hadron/gfx/IsometricDrawer': IsometricDrawerFake
  });
  context(['hadron/gfx/GraphicSystem'], function(gfx) {

    describe('GraphicSystem singleton', function() {

      describe('Buffers', function() {

        it('are canvas elements created by `newBuffer()`.', function() {
          var buffer = gfx.newBuffer('buffer', 100, 100);
          expect(buffer.tagName).toBe('CANVAS');
        });

        it('have an IsometricDrawer property `drawer`.', function() {
          var buffer = gfx.newBuffer('buffer', 100, 100);
          expect(buffer.drawer).toBeDefined();
          expect(buffer.drawer.constructor).toBe(IsometricDrawerFake);
        });

      });

      it('allows to retrieve a named buffer.', function() {
        var newBuffer = gfx.newBuffer('test'),
            buffer = gfx.getBuffer('test');

        expect(buffer).toBe(newBuffer);
      });

      it('allows to set a named buffer.', function() {
        var newBuffer = gfx.newBuffer('new'), buffer;
        gfx.setBuffer('test', newBuffer);
        buffer = gfx.getBuffer('test');
        expect(buffer).toBe(newBuffer);
      });

      it('allows to destroy a named buffer.', function() {
        var deleted, buffer;
        gfx.newBuffer('test');
        deleted = gfx.destroyBuffer('test');
        buffer = gfx.getBuffer('test');
        expect(buffer).toBeNull();
        expect(deleted).toBe(true);
      });

    });
  });

}()); 
