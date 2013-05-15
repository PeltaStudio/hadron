
define(function () {
  'use strict';

  var T = require('toolkit');

  var defaultSimulationOptions = {
    fps: 60,
    maxSimulationTime: 300,
    simulationDelta: 10
  };

  function Simulation(customOptions) {

    checkOptions(customOptions);

    var simulationId = null,
        model = customOptions.model,
        render = customOptions.render,
        control = customOptions.control,
        options = getCustomizedOptions(customOptions);

    var t, newTime, currentTime, accumulator;

    function gameStep() {
      newTime = Date.now();
      var frameTime = newTime - currentTime;
      var timeToSimulate = Math.min(frameTime, optionsMaxSimulationTime);
      currentTime = newTime;

      accumulator += timeToSimulate;
      var dt = options.simulationDelta;
      while (timeToSimulate >= dt) {
        control.simulate(t, dt);
        t += dt;
        accumulator -= dt;
      }

      var interpolationValue = accumulator / dt;
      render.render(interpolationValue);
    }

    function start() {
      if (!simulationId) {
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
      clearInterval(simulationId);
      simulationId = null;
    }

    function resume() {
      if (!simulationId) {
        var periodInMillis = 1000/options.fps;
        simulationId = setInterval(gameStep, periodInMillis);
      }
    }

    // fixme: add the duration of the step or it will be since the last pause
    function step() {
      if (!simulationId) {
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
    T.assertDefined(customOptions.model, 'The `model` key is mandatory!');
    T.assertDefined(customOptions.render, 'The `render` key is mandatory!');
    T.assertDefined(customOptions.control, 'The `control` key is mandatory!');
  };

  function getCustomizedOptions(customOptions) {
    return T.extend({}, defaultSimulationOptions, customOptions);
  }

  return Simulation;
});
