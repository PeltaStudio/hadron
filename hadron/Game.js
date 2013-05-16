
define(function () {
  'use strict';

  var T = require('toolkit');

  var defaultGameOptions = {
    fps: 60,
    maxSimulationTime: 300,
    simulationDelta: 10
  };

  function Game(customOptions) {

    checkOptions(customOptions);

    var runningGameId = null,
        rootModel = customOptions.rootModel,
        render = customOptions.render,
        control = customOptions.control,
        options = getCustomizedOptions(customOptions);

    var t, newTime, currentTime, pauseTime, accumulator;

    function gameStep(forcedSimulationTime) {
      newTime = Date.now();
      var frameTime = newTime - currentTime;
      var timeToSimulate = Math.min(
        forcedSimulationTime !== void 0 ? forcedSimulationTime : frameTime,
        options.maxSimulationTime
      );
      currentTime = newTime;

      accumulator += timeToSimulate;
      var dt = options.simulationDelta;
      while (timeToSimulate >= dt) {
        rootModel.as(control, t, dt, rootModel);
        t += dt;
        accumulator -= dt;
      }

      var interpolationValue = accumulator / dt;
      rootModel.as(render, interpolationValue, rootModel);
    }

    function start() {
      if (!runningGameId) {
        reset();
        resume();
      }
    }

    function reset(newOffset) {
      pause();
      t = newOffset || 0;
      currentTime = Date.now();
      accumulator();
    }

    function pause() {
      pauseTime = Date.now();
      clearInterval(runningGameId);
      runningGameId = null;
    }

    function resume() {
      if (!runningGameId) {
        var periodInMillis = 1000/options.fps;
        runningGameId = setInterval(gameStep, periodInMillis);
      }
    }

    function step(timeToSimulate) {
      timeToSimulate = timeToSimulate || options.simulationDelta;
      if (!runningGameId) {
        gameStep();
      }
    }

    return {
      start: start,
      reset: reset,
      pause: pause,
      resume: resume,
      step: step
    };
  };

  function checkOptions(customOptions) {
    T.assertDefined(customOptions.rootModel, 'The `rootModel` key is mandatory!');
    T.assertDefined(customOptions.render, 'The `render` key is mandatory!');
    T.assertDefined(customOptions.control, 'The `control` key is mandatory!');
  };

  function getCustomizedOptions(customOptions) {
    return T.extend({}, defaultGameOptions, customOptions);
  }

  return Game;
});
