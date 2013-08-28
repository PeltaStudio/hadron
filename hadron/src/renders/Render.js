define(function(require) {
  'use strict';

  var T = require('hadron/toolkit');

  function Render() { }

  Render.prototype.apply = function(model, args) {
    var newArgs = [model].concat(args);
    this.render.apply(this, newArgs);
  };

  Render.prototype.render = T.noop;

  return Render;
});
