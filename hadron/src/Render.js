define(function(require) {
  'use strict';

  var T = require('hadron/toolkit');

  var NOOP = T.noop;

  function Render() { }

  Render.prototype.apply = function(model, args) {
    var isPostCall = args[0],
        newArgs = [model].concat(args.slice(1));
    this[isPostCall ? 'postRender' : 'render'].apply(this, newArgs);
  };

  Render.prototype.render = NOOP;
  Render.prototype.postRender = NOOP;

  return Render;
});
