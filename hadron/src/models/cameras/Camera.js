define(function (require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      T = require('hadron/toolkit');

  function Camera(viewport, drawer) {
    S.to(this)
      .addGet('viewport', function () { return viewport; })
      .addGet('drawer', function () { return drawer; })
    ;
    this._position = [0, 0];
  }

  Camera.prototype.maximize = function() {
    this.resize(
      document.documentElement.offsetWidth,
      document.documentElement.clientHeight
    );
  };

  Camera.prototype.resize = function(newWidth, newHeight) {
    this.viewport.width = newWidth;
    this.viewport.height = newHeight;
    this.setPosition(this._position);
  };

  Camera.prototype.centerOnViewport = function () {
    this.setPosition([this.viewport.width/2, this.viewport.height/2]);
  };


  Camera.prototype.setPosition = function (newPosition) {
    T.assert(
      Array.isArray(newPosition) && newPosition.length >= 2,
      'The `newPostion` must be an array of at last 2 elements.'
    );
    var X = newPosition[0], Y = newPosition[1];
    this._position = [X, Y];
    this.drawer.setTransform(1, 0, 0, 1, X, Y);
    return this;
  };

  Camera.prototype.getPosition = function () {
    return T.clone(this._position);
  };

  return Camera;
});
