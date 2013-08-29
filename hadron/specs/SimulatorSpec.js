define(function(require) {
  'use strict';

  var Simulator = require('hadron/simulators/Simulator');

  describe('Simulator instances', function() {

    it('have an apply() method delegating on simulate().', function() {
      var simulator = new Simulator(),
          model = {}, args = [1, 2, 3];
      sinon.spy(simulator, 'apply');
      sinon.spy(simulator, 'simulate');

      simulator.apply(model, args);

      expect(simulator.simulate.withArgs(model, 1, 2, 3));
    });

  });

  return {
    name: 'SimulatorSpec'
  };
});
