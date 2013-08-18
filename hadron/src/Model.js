define(function (require) {
  'use strict';

  var NEXT_ID = 1;

  var T = require('hadron/toolkit');

  function Model() {
    Object.defineProperty(this, 'id', { value: NEXT_ID++ });
  }

  Model.prototype.traverse =
  function (methodName, submodelsGetterName, methodArgs) {

    var submodels,
        submodelsMethod,
        method = this[methodName];

    if (T.isApplicable(method)) {
      method.apply(this, methodArgs);
    }

    // get submodules
    submodels = [];
    submodelsMethod = this[submodelsGetterName];
    if (T.isApplicable(submodelsMethod)) {
      submodels = submodelsMethod.apply(this) || [];
    }

    // traverse submodules
    for (var i = 0, submodel; submodel = submodels[i]; i++) {
      submodel.traverse.apply(submodel, arguments);
    }
  };

  Model.prototype.render = T.noop;
  Model.prototype.clear = T.noop;
  Model.prototype.simulate = T.noop;

  Model.prototype.getRenderSubmodels = function () {
    return this.getSubmodels();
  };

  Model.prototype.getClearSubmodels = function () {
    return this.getSubmodels();
  };

  Model.prototype.getSimulateSubmodels = function () {
    return this.getSubmodels();
  };

  Model.prototype.getSubmodels = function () {
    return [];
  };

  return Model;
});
