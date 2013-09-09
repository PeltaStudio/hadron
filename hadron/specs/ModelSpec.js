(function() {
  'use strict';

  var context = newContext({
    'hadron/Render': Object,
    'hadron/Simulator': Object
  });

  context(['hadron/Model'], function(Model) {
    describe('Model instances', function() {

      it('when created, creates its render and simulator passing ' +
         'the model and the model constructor\'s parameters.', function() {
        var MyModel = function () { Model.apply(this, arguments); },
            model, simulate, clear, render, args;

        MyModel.prototype = Object.create(Model.prototype),
        simulate = MyModel.prototype.simulate = sinon.spy(),
        clear = MyModel.prototype.clear = sinon.spy(),
        render = MyModel.prototype.render = sinon.spy(),

        model = new MyModel(1, 2, 3);
        args = [model, 1, 2, 3];

        expect(simulate.calledWithNew()).toBe(true);
        expect(simulate.calledOnce).toBe(true);
        expect(simulate.calledWithExactly(model, 1, 2, 3)).toBe(true);

        // TODO: There is no facet yet (see Model.js)
        //expect(clear.calledWithNew()).toBe(true);
        //expect(clear.calledOnce).toBe(true);
        //expect(clear.calledWithExactly(model, 1, 2, 3)).toBe(true);

        expect(render.calledWithNew()).toBe(true);
        expect(render.calledOnce).toBe(true);
        expect(render.calledWithExactly(model, 1, 2, 3)).toBe(true);
      });

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
            .alwaysCalledWith('test', 'getTestSubmodels', methodArgs)
        ).toBe(true);

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
