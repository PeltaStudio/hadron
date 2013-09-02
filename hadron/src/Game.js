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

    var t, newTime, avgFrameTime = 0, currentTime,
        pauseTime, accumulator, startTime,
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
      currentTime = undefined;
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

    Calculating FPS according to:
    http://stackoverflow.com/questions/4787431/check-fps-in-js#answer-5111475
    */
    function gameStep(forcedSimulationTime) {
      var frameTime;

      try {
        newTime = Date.now();
        currentTime === undefined && (currentTime = newTime);
        frameTime = newTime - currentTime;
        avgFrameTime += (frameTime - avgFrameTime) / 20;
        currentTime = newTime;

        var timeToSimulate = Math.min(
          forcedSimulationTime !== undefined ? forcedSimulationTime : frameTime,
          options.maxSimulationTime
        );

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

        startTime = Date.now();
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

    return {
      start: start,
      reset: reset,
      pause: pause,
      resume: resume,
      step: step,
      get frameTime() {
        return avgFrameTime;
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
