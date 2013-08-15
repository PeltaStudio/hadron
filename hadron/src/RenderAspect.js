define(function (require) {
  'use strict';

  var T = require('hadron/toolkit');
  var SortedArray = T.SortedArray;

  function RenderAspect(drawer) {
    var renderQueue,
        renderManager;

    renderQueue = new SortedArray();
    renderQueue.key = function (item) {
      return item.zIndex || Infinity;
    };

    function clearCanvas() {
      drawer.clear();
    }

    function reveal(entity, interpolationValue) {
      var renderMethod = entity.render;
      if (typeof renderMethod === 'function') {
        renderMethod.call(
          entity,
          interpolationValue, drawer, renderManager
        );
      }
    }

    function addRenderProcedure(task) {
      renderQueue.push(task);
    }

    function runRenderQueue() {
      var task;
      while (renderQueue.length) {
        task = renderQueue.shift();
        task();
      }
    }

    renderManager = {
      addRenderProcedure: addRenderProcedure
    };

    // FIXME: this is a violation of the paradigm, lets stay here until we
    // have implemented the proper way. ClearAspect?
    this.clearCanvas = clearCanvas;
    this.reveal = reveal;
    this.runRenderQueue = runRenderQueue;
  }

  return RenderAspect;
});
