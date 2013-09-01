define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      Model = require('hadron/models/Model');

  function Camera(position, width, height) {
    position = position || [];
    width = width === undefined ? 500 : width;
    height = height === undefined ? 500 : height;

    this.resize(width, height);
    this.setPosition(position);
  }
  S.theClass(Camera).inheritsFrom(Model);

  Camera.prototype.resize = function(width, height) {
    this.width = width;
    this.height = height;
    this.semiWidth = width / 2;
    this.semiHeight = height / 2;
    return this;
  };

  Camera.prototype.setPosition = function(newPosition) {
    this._position = newPosition;
    return this;
  };

  Camera.prototype.getPosition = function() {
    return T.clone(this._position);
  };

/*  Camera.prototype.getTargetCoordinates = function(cameraCoordinates) {
    var visualizationArea = this.getVisualizationArea();
    return [
      visualizationArea.left + cameraCoordinates[0],
      visualizationArea.top + cameraCoordinates[1]
    ];
  };*/

  return Camera;
});
