define(function(require) {
  'use strict';

  var Render = require('hadron/renders/Render');

  describe('Render instances', function() {

    it('have an apply() method delegating on render().', function() {
      var render = new Render(),
          model = {}, args = [1, 2, 3];
      sinon.spy(render, 'apply');
      sinon.spy(render, 'render');

      render.apply(model, args);

      expect(render.render.withArgs(model, 1, 2, 3));
    });

  });

  return {
    name: 'RenderSpec'
  };
});
