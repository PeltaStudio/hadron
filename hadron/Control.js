
define(function (require) {
  'use strict'

  function Control(model, canvas) {
    this.model = model;
    this.entities = [];
  }

  Control.prototype.add = function(entity, controller) {
    if (this.entities.indexOf(entity) !== -1) {
      return;
    }

    if (typeof controller === 'function') {
      entity.simulate = controller;
    }

    if (typeof entity !== 'function') {
      this.entities.push(entity);
    }
  };

  Control.prototype.simulate = function(dt) {
    var self = this;
    this.entities.forEach(function onEach(entity) {
      entity.simulate(dt, self.model, self);
    });
  }

  return Control;
});
