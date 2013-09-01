(function() {
  'use strict';

  var context = newContext();
  context(['hadron/renders/Render'], function(Render) {

    describe('Render instances', function() {

      it('have an apply() method delegating on render().', function() {
        var render = new Render(),
            model = {}, args = [1, 2, 3];
        sinon.spy(render, 'apply');
        sinon.spy(render, 'render');
        sinon.spy(render, 'postRender');

        render.apply(model, args);

        expect(render.render.withArgs(model, 1, 2, 3));
        expect(render.postRender.withArgs(model, 1, 2, 3));
      });

    });


  });

}());
