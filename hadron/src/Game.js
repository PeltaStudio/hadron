// As every class in Hadron, it is wrapped into a [require.js][1] module.
//
// [1]: http://requirejs.org/
define(function(require) {
  'use strict';

  // Only the `toolkit` library is needed.
  var T = require('hadron/toolkit');

  // Default game options include **300ms** of max simulation time. This leads
  // to slow behaviours under rendering stress but avoid spiral of death.
  var defaultGameOptions = {
    maxSimulationTime: 300,
    simulationDelta: 10
  };

  // ## Game
  // This is a good starting point to begin to discover Hadron. The Game class
  // is in charge of simulate, clear and render the model.
  //
  /* TODO: Rename to HadronSimulation or something like that. */
  function Game(customOptions) {

    checkOptions(customOptions);

    var runningGameId = null,
        options = getCustomizedOptions(customOptions),
        rootModel = options.rootModel;

    var t, newTime, avgFrameTime = 0, currentTime,
        pauseTime, accumulator, startTime,
        simulationQueue = [];

    Object.defineProperty(this, 'rootModel', { value: rootModel });

    // `start()` reset the simulation from the beginning.
    function start() {
      if (!runningGameId) {
        reset();
        resume();
      }
    }

    // `reset()` pauses the game, stablishes the current time to 0 or the
    // passed value if any and leaves the simulation as if it was starting
    // at that moment.
    function reset(newOffset) {
      pause();
      t = newOffset || 0;
      currentTime = undefined;
      accumulator = 0;
    }

    // `pause()` freezes the simulation, clearing the interval of the game step.
    function pause() {
      pauseTime = Date.now();
      clearInterval(runningGameId);
      runningGameId = null;
    }

    // `resume()` continues with the game, programming a new interval for the
    // game step.
    function resume() {
      if (!runningGameId) {
        runningGameId = setInterval(gameStep, 0);
      }
    }

    // `step()` performs **one, and only one** game step.
    function step(timeToSimulate) {
      timeToSimulate = timeToSimulate || options.simulationDelta;
      if (!runningGameId) {
        gameStep();
      }
    }

    // The game step is based on article [Fix your timestep!][2]
    // by Glenn Fiedler.
    function gameStep(forcedSimulationTime) {
      var frameTime;

      try {
        // Take the time now
        newTime = Date.now();
        currentTime === undefined && (currentTime = newTime);

        // Calculates frame time
        frameTime = newTime - currentTime;
        currentTime = newTime;

        // Calculating FPS according to:
        // http://stackoverflow.com/questions/4787431/check-fps-in-js#answer-5111475
        avgFrameTime += (frameTime - avgFrameTime) / 20;

        // The simulation time can not be more than a specified max in order
        // to avoid simulation times longer than the time being simulated.
        var timeToSimulate = Math.min(
          forcedSimulationTime !== undefined ? forcedSimulationTime : frameTime,
          options.maxSimulationTime
        );

        // Simulate in chunks. Keeping the accumulator updated we can maintain
        // a regular rate of simulation.
        accumulator += timeToSimulate;
        var dt = options.simulationDelta;
        while (accumulator >= dt) {
          simulate(rootModel, t, dt, newTask);
          runSimulation();
          t += dt;
          accumulator -= dt;
        }

        // The interpolation value is a measure of where we are between two
        // frames. It can be interesting to interpolate animations or other
        // render aspects.
        var interpolationValue = accumulator / dt;

        clear(rootModel, interpolationValue);
        render(rootModel, interpolationValue);

        startTime = Date.now();
      }

      // On error, the game is paused and the stack is dumped into the console.
      catch (error) {
        pause();
        console.log(error.message + '\n' + error.stack);
        throw error;
      }
    }

    // The render stage traverses the model passing the interpolation value
    // as parameter.
    function render(model, interpolationValue) {
      model.traverse('render', 'getRenderSubmodels', [interpolationValue]);
    };

    // The clear stage is almost identical to the render stage.
    function clear(model, renderSystem, interpolationValue) {
      model.traverse('clear', 'getClearSubmodels', [interpolationValue]);
    };

    // The simulate stage traverses the model passing the current time, delta
    // to simulate and the `newTask()` utility to the simulator.
    function simulate(model, t, dt, newTask) {
      model.traverse('simulate', 'getSimulateSubmodels', [t, dt, newTask]);
    };

    // The `newTask()` utility allows to circumvent the problem of the
    // simultaneous reading and simultaneous writing of the model. Each
    // simulator can read the model and schedule an update which will be
    // executed once all the models' simulations have been given an opportunity
    // of reading the unaltered model. Each update is stored in what we called
    // the **simulation queue**.
    function newTask(f) {
      simulationQueue.push(f);
    }

    // Consumes the simulation queue executing all the tasks scheduled inside.
    function runSimulation() {
      while (simulationQueue.length) {
        simulationQueue.shift()();
      }
    }

    // ### Public API
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

  // Utility function to check if mandatory parameters are present.
  function checkOptions(customOptions) {
    T.assert.isDefined(customOptions.rootModel,
      'The `rootModel` key is mandatory!');
  };

  // Utility function to create a customized object with the options.
  function getCustomizedOptions(customOptions) {
    return T.extend({}, defaultGameOptions, customOptions);
  }

  // Exports the `Game` class.
  return Game;
});
