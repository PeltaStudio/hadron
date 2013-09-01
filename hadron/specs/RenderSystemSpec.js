(function(){
  'use strict';

  var context = newContext({
    'hadron/render_system/graphics/GraphicSystem': sinon.spy()
  });

  context(['hadron/render_system/RenderSystem'], function(RenderSystem) {

    describe('RenderSystem instances', function() {

      it('have a `gfx` property holding the Graphic subsystem.', function() {
        var canvas = { getContext: function() { } };
        var renderSystem = new RenderSystem(canvas);
        expect()
      });

    });

  });

}());
