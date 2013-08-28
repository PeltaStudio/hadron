define(function(require) {
  'use strict';

  var T = require('hadron/toolkit');

  function Simulator() { }

  Simulator.prototype.apply = function(model, args) {
    var newArgs = [model].concat(args);
    this.simulate.apply(this, newArgs);
  };

  Simulator.prototype.simulate = T.noop;

  return Simulator;
});
