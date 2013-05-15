
define(function (require) {
  'use strict'

  function Render(model, canvas) {
    var model = model,
        canvas = canvas,
        drawer = canvas.getContext('2d'),
        entities = [];

    function add(entity, render) {
      if (entities.indexOf(entity) !== -1) {
        return;
      }

      if (typeof render === 'function') {
        if (typeof entity === 'function') {
          entity.prototype.render = render;
        }
        else {
          entity.render = controller;
        }
      }

      if (typeof entity !== 'function') {
        entities.push(entity);
      }
    }

    function render(interpolationValue) {
      var self = this;
      entities.forEach(function onEach(entity) {
        entity.render(interpolationValue, drawer, model, self);
      });
    }

    return {
      add: add,
      render: render
    }
  }

  return Render;
});
