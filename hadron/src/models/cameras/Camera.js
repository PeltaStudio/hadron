define(function (require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      Model = require('hadron/models/Model');

  // TODO: Consider change the name to a more concise one in favor of a more
  // abstract implementation for Camera.
  function Camera(position, width, height) {
    position = position || [];
    width = width = undefined ? 500 : width;
    height = height = undefined ? 500 : height;

    this.resize(width, height);
    this.setPosition(position);
  }
  S.inherit(Camera, Model);

  Camera.prototype.resize = function (width, height) {
    this.width = width;
    this.height = height;
    this.semiWidth = width / 2;
    this.semiHeight = height / 2;
    this._isVisualizationAreaOutOfDate = true;
    return this;
  };

  Camera.prototype.setPosition = function (newPosition) {
    this._position = newPosition;
    this._isVisualizationAreaOutOfDate = true;
    return this;
  };

  Camera.prototype.getPosition = function () {
    return T.clone(this._position);
  };

  Camera.prototype.getVisualizationArea = function () {
    if (this._isVisualizationAreaOutOfDate) {
      this.updateVisualizationArea();
    }
    return T.clone(this._visualizationArea);
  };

  Camera.prototype.updateVisualizationArea = function () {
    var position = this.getPosition(),
        semiWidth = this.semiWidth,
        semiHeight = this.semiHeight;

    this._visualizationArea = {
      top: position[1] - semiHeight,
      right: position[0] + semiWidth,
      bottom: position[1] + semiHeight,
      left: position[0] - semiWidth
    };
    this._isVisualizationAreaOutOfDate = false;
  };

  Camera.prototype.getTargetCoordinates = function (cameraCoordinates) {
    var visualizationArea = this.getVisualizationArea();
    return [
      visualizationArea.left + cameraCoordinates[0],
      visualizationArea.top + cameraCoordinates[1]
    ];
  };

  return Camera;
});
