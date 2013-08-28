define(function(require) {
  'use strict';

  var T = require('hadron/toolkit');

  var noop = T.noop;

  function Assembler() { }

  Assembler.prototype.assembleModels = function() { };

  Assembler.prototype.assembleModel = function(modelClass, specification) {
    modelClass.prototype.render = specification.render || noop;
    if (specification.getRenderSubmodels) {
      modelClass.prototype.getRenderSubmodels =
        specification.getRenderSubmodels;
    }

    modelClass.prototype.simulate = specification.simulate || noop;
    if (specification.getSimulateSubmodels) {
      modelClass.prototype.getSimulateSubmodels =
        specification.getSimulateSubmodels;
    }

    modelClass.prototype.clear = specification.clear || noop;
    if (specification.getClearSubmodels) {
      modelClass.prototype.getClearSubmodels =
        specification.getClearSubmodels;
    }
  };

  return Assembler;
});
