define(function(require) {
  'use strict';

  var T = require('hadron/toolkit');

  var defaultGameOptions = {
    maxSimulationTime: 300,
    simulationDelta: 10
  };

  // TODO: Rename to HadronSimulation or something like that
  function Game(customOptions) {

    checkOptions(customOptions);

    var runningGameId = null,
        options = getCustomizedOptions(customOptions),
        rootModel = options.rootModel,
        renderSystem = options.renderSystem;

    var t, newTime, currentTime, pauseTime, accumulator, startTime, fps,
        simulationQueue = [];

    Object.defineProperty(this, 'rootModel', { value: rootModel });

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
      accumulator = 0;
    }

    function pause() {
      pauseTime = Date.now();
      clearInterval(runningGameId);
      runningGameId = null;
    }

    function resume() {
      if (!runningGameId) {
        runningGameId = setInterval(gameStep, 0);
      }
    }

    function step(timeToSimulate) {
      timeToSimulate = timeToSimulate || options.simulationDelta;
      if (!runningGameId) {
        gameStep();
      }
    }

    /*
    Based on article: Fix your timestep! by Glenn Fiedler
    http://gafferongames.com/game-physics/fix-your-timestep/
    */
    function gameStep(forcedSimulationTime) {

      try {
        newTime = Date.now();
        var frameTime = newTime - currentTime;
        var timeToSimulate = Math.min(
          forcedSimulationTime !== void 0 ? forcedSimulationTime : frameTime,
          options.maxSimulationTime
        );
        currentTime = newTime;

        accumulator += timeToSimulate;
        var dt = options.simulationDelta;
        while (accumulator >= dt) {
          simulate(rootModel, t, dt, newTask);
          runSimulation();
          t += dt;
          accumulator -= dt;
        }

        var interpolationValue = accumulator / dt;
        clear(rootModel, renderSystem, interpolationValue);
        render(rootModel, renderSystem, interpolationValue);

        updateFPS();
      } catch (error) {
        pause();
        console.log(error.message + '\n' + error.stack);
        throw error;
      }
    }

    function render(model, renderSystem, interpolationValue) {
      model.traverse('render', 'getRenderSubmodels',
                                            [renderSystem, interpolationValue]);
    };

    function clear(model, renderSystem, interpolationValue) {
      model.traverse('clear', 'getClearSubmodels',
                                            [renderSystem, interpolationValue]);
    };

    function simulate(model, t, dt, newTask) {
      model.traverse('simulate', 'getSimulateSubmodels', [t, dt, newTask]);
    };

    function newTask(f) {
      simulationQueue.push(f);
    }

    function runSimulation() {
      while (simulationQueue.length) {
        simulationQueue.shift()();
      }
    }

    function updateFPS() {
      fps = 1000 / (Date.now() - startTime);
      startTime = Date.now();
    }

    return {
      start: start,
      reset: reset,
      pause: pause,
      resume: resume,
      step: step,
      get fps() {
        return fps;
      }
    };
  };

  function checkOptions(customOptions) {
    T.assert.isDefined(customOptions.rootModel,
      'The `rootModel` key is mandatory!');

    T.assert.isDefined(customOptions.renderSystem,
      'The `renderSystem` key is mandatory!');
  };

  function getCustomizedOptions(customOptions) {
    return T.extend({}, defaultGameOptions, customOptions);
  }

  return Game;
});
