(function() {
  'use strict';

  var context = newContext();
  context(['hadron/simulators/Simulator'], function(Simulator){

    describe('Simulator instances', function() {

      it('have an apply() method delegating on simulate().', function() {
        var simulator = new Simulator(),
            model = {}, args = [1, 2, 3];
        sinon.spy(simulator, 'apply');
        sinon.spy(simulator, 'simulate');
        sinon.spy(simulator, 'postSimulate');

        simulator.apply(model, args);

        expect(simulator.simulate.withArgs(model, 1, 2, 3));
        expect(simulator.postSimulate.withArgs(model, 1, 2, 3));
      });

    });

  });
}());
