define(function (require) {
  'use strict';

  var NEXT_ID = 1;

  var T = require('hadron/toolkit');

  function Model() {
    Object.defineProperty(this, 'id', { value: NEXT_ID++ });
    Object.defineProperty(this, '_listeners', { value: [] });
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

  Model.prototype.simulate = T.noop;

  Model.prototype.getSimulateSubmodels = function () {
    return this.getSubmodels();
  };

  Model.prototype.clear = T.noop;

  Model.prototype.getClearSubmodels = function () {
    return this.getSubmodels();
  };

  Model.prototype.render = T.noop;

  Model.prototype.getRenderSubmodels = function () {
    return this.getSubmodels();
  };

  Model.prototype.getSubmodels = function () {
    return [];
  };

  Model.prototype.setupAsynchronousBehaviours = function () {
    if (T.isApplicable(this.simulate.setupAsync)) {
      this.render.setupAsync.apply(this, []);
    }
    if (T.isApplicable(this.clear.setupAsync)) {
      this.render.setupAsync.apply(this, []);
    }
    if (T.isApplicable(this.render.setupAsync)) {
      this.render.setupAsync.apply(this, []);
    }
  };

  Model.prototype.dispatchEvent = function (type, event) {
    this.runListeners(type, event);
  };

  Model.prototype.runListeners = function (type, event) {
    var listeners = this._listeners[type] || [];
    event.type = type;
    event.target = this;
    listeners.forEach(function onCallback(callback) {
      setTimeout(function doCallback() {
        callback.call(null, event);
      });
    });
  };

  Model.prototype.addEventListener = function (type, callback) {
    var listeners = this._listeners,
        typeListeners = listeners[type] = listeners[type] || [];

    if (typeListeners.indexOf(callback) === -1) {
      typeListeners.push(callback);
    }
  };

  Model.prototype.removeEventListener = function (type, callback) {
    var listeners = this._listeners,
        typeListeners = listeners[type] = listeners[type] || [],
        position = typeListeners.indexOf(callback);

    if (position !== -1) {
      listeners[type].splice(position, 1);
    }
  };

  return Model;
});
