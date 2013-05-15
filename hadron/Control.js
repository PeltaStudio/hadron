
define(function (require) {
  'use strict'

  function Control(model, canvas) {
    var model = model,
        entities = [];

    function add(entity, controller) {
      if (entities.indexOf(entity) !== -1) {
        return;
      }

      if (typeof controller === 'function') {
        if (typeof entity === 'function') {
          entity.prototype.simulate = controller;
        }
        else {
          entity.simulate = controller;
        }
      }

      if (typeof entity !== 'function') {
        entities.push(entity);
      }
    };

    function simulate(t, dt) {
      var self = this;
      entities.forEach(function onEach(entity) {
        entity.simulate(t, dt, model, self);
      });
    }

    return {
      add: add,
      simulate: simulate
    };
  }

  return Control;
});
