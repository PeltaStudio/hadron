
define(function (require) {
  'use strict'

  var T = require('toolkit');
  var SortedArray = T.SortedArray;

  function RenderAspect(canvas) {
    var renderQueue,
        renderManager,
        canvas = canvas,
        drawer = canvas.getContext('2d'),

    renderQueue = new SortedArray();
    renderQueue.key = function (item) {
      return item.zIndex || Infinity;
    };

    function reveal(entity, interpolationValue, model) {
      var helper, renderMethod = entity.render;
      if (typeof renderMethod === 'function') {
        helper = typeof renderMethod.helper === 'function' ?
                 renderMethod.helper.call(entity, model) :
                 model;

        renderMethod.call(
          entity,
          interpolationValue, drawer, helper, renderManager
        );
      }
    }

    function addRenderProcedure(task) {
      renderQueue.push(task);
    }

    function runRenderQueue() {
      var task;
      while (renderQueue) {
        task = renderQueue.shift();
        task();
      }
    }

    renderManager = {
      addRenderProcedure: addRenderProcedure
    };

    return {
      reveal: reveal,
      runRenderQueue: runRenderQueue
    }
  }

  return RenderAspect;
});
