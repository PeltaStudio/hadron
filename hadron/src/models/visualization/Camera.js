define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      Model = require('hadron/models/Model');

  function Camera(position, width, height) {
    Model.call(this);

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

  Camera.prototype.setPointer = function(coordinates) {
    // TODO: Apply zoom factor
    this.dispatchEvent('pointermove', {
      worldX: coordinates[0] + this._position[0] - this.semiWidth,
      worldY: coordinates[1] + this._position[1] - this.semiHeight
    });
  };

  return Camera;
});
