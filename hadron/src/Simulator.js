define(function(require) {
  'use strict';

  var T = require('hadron/toolkit');

  var NOOP = T.noop;

  function Simulator() { }

  Simulator.prototype.apply = function(model, args) {
    var isPostCall = args[0],
        newArgs = [model].concat(args.slice(1));
    this[isPostCall ? 'postSimulate' : 'simulate'].apply(this, newArgs);
  };

  Simulator.prototype.simulate = NOOP;
  Simulator.prototype.postSimulate = NOOP;

  return Simulator;
});
