
define(function (require) {
  'use strict'

  var T = require('toolkit');
  var SortedArray = T.SortedArray;

  function ControlAspect() {
    var updateQueue,
        updateManager;

    updateQueue = new SortedArray();
    updateQueue.key = function (item) {
      return item.priority || Infinity;
    };

    function reveal(entity, t, dt, model) {
      var helper, simulateMethod = entity.simulate;
      if (typeof entity.simulate === 'function') {
        helper = typeof simulateMethod.helper === 'function' ?
                 simulateMethod.helper.call(entity, model) :
                 model;

        simulateMethod.call(entity, t, dt, model, updateManager);
      }
    }

    function addUpdate(task) {
      updateQueue.push(task);
    }

    function runUpdateQueue() {
      var task;
      while (updateQueue.length) {
        task = updateQueue.shift();
        task();
      }
    }

    updateManager = {
      addUpdate: addUpdate
    };

    return {
      reveal: reveal,
      runUpdateQueue: runUpdateQueue
    }
  }

  return ControlAspect;
});
