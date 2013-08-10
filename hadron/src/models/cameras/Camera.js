define(function (require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      T = require('hadron/toolkit');

  function Camera(viewport, drawer) {
    S.to(this)
      .addGet('viewport', function () { return viewport; })
      .addGet('drawer', function () { return drawer; })
    ;
    this.setPosition([0, 0]);
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
    this.viewport._semiWidth = newWidth / 2;
    this.viewport._semiHeight = newHeight / 2;
    this.setPosition(this._position);
  };

  Camera.prototype.getViewport = function() {
    return T.clone(this._viewport);
  };

  Camera.prototype.getPosition = function () {
    return T.clone(this._position);
  };

  Camera.prototype.goToOrigin = function () {
    this.setPosition([0, 0]);
  };

  Camera.prototype.setPosition = function (newPosition) {
    T.assert(
      Array.isArray(newPosition) && newPosition.length >= 2,
      'The `newPostion` must be an array of at last 2 elements.'
    );
    var X = newPosition[0], Y = newPosition[1];
    this._position = [X, Y];
    this.drawer.setTransform(
      1, 0, 0,
      1, X + this.viewport._semiWidth, Y + this.viewport._semiHeight
    );
    this.updateViewport();
    return this;
  };

  Camera.prototype.updateViewport = function () {
    var position = this.getPosition(),
        semiWidth = this.viewport._semiWidth,
        semiHeight = this.viewport._semiHeight;

    // FIXME: change this name to not conflict with viewport!
    this._viewport = {
      top: position[1] - semiHeight,
      right: position[0] + semiWidth,
      bottom: position[1] + semiHeight,
      left: position[0] - semiWidth
    };
  }

  return Camera;
});
