(function() {
  'use strict';

  var context = newContext();
  context(['hadron/models/Model'], function(Model) {
    describe('Model instances', function() {

      it('have a traverse() method to implement a simple visitor.', function() {
        var model = new Model(),
            submodel = {
              traverse: sinon.spy()
            },
            methodArgs = [1, 2, 3],
            submodels = [submodel, submodel],
            IS_PRECALL = false, IS_POSTCALL = true;
        model.test = sinon.spy();
        model.getTestSubmodels = sinon.stub().returns(submodels);

        model.traverse('test', 'getTestSubmodels', methodArgs);

        // call the model method with precall flag and methodArgs
        expect(model.test.calledTwice).toBe(true);
        expect(model.test.getCall(0).args)
          .toEqual([IS_PRECALL].concat(methodArgs));

        // retrieve the submodels
        expect(model.getTestSubmodels.calledOnce).toBe(true);

        // call traverse for each submodel with the same parameters
        expect(submodel.traverse.callCount).toEqual(submodels.length);
        expect(
          submodel.traverse
            .alwaysCalledWith('test', 'getTestSubmodels', methodArgs)).toBe(true);

        // call the model method with postcall flag and methodArgs
        expect(model.test.getCall(1).args)
          .toEqual([IS_POSTCALL].concat(methodArgs));
      });

      describe('Event methods', function() {

        it('allow to add callbacks without repetitions.', function() {
          var model = new Model();
          function callback() {}

          model.addEventListener('anytype', callback);
          model.addEventListener('anytype', callback);

          expect(model._listeners['anytype']).toBeDefined();
          expect(model._listeners['anytype'].length).toEqual(1);
          expect(model._listeners['anytype'][0]).toBe(callback);
        });

        it('allow to remove a callback.', function() {
          var model = new Model();
          function callback() {}

          model.addEventListener('anytype', callback);
          model.removeEventListener('anytype', callback);

          expect(model._listeners['anytype']).toBeDefined();
          expect(model._listeners['anytype'].length).toEqual(0);
        });

        it('allow to dispatch an event of a given type.', function() {
          var model = new Model(),
              event = { details: {} },
              receivedEvent = null;

          function callback(evt) { receivedEvent = event; }
          model.addEventListener('anytype', callback);

          runs(function() {
            model.dispatchEvent('anytype', event);
          });

          waitsFor(function() {
            return receivedEvent;
          }, 'callback to be called.', 100);

          runs(function() {
            expect(receivedEvent).toBe(event);
            expect(receivedEvent.type).toBe('anytype');
            expect(receivedEvent.target).toBe(model);
            expect(receivedEvent.details).toBe(event.details);
          });

        });

      });

    });
  });

}()); 
