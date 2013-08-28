define(function(require) {
  'use strict';

  var Assembler = require('hadron/Assembler');

  describe('Assembler instances', function() {

    it('can use assembleModel() to join a model class with the facets.',
                                                                   function() {
      var assembler = new Assembler(),
          specification = {
            simulate: sinon.spy(),
            getSimulateSubmodels: sinon.spy(),

            clear: sinon.spy(),
            getClearSubmodels: sinon.spy(),

            render: sinon.spy(),
            getRenderSubmodels: sinon.spy()
          };

      function TestClass() {}

      assembler.assembleModel(TestClass, specification);

      for (var methodName in specification)
        if (specification.hasOwnProperty(methodName)) {
        expect(TestClass.prototype[methodName])
          .toBe(specification[methodName]);
      }
    });

  });

  return {
    name: 'AssemblerSpec'
  };
});
