define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      Model = require('hadron/Model');

  function Camera(position, width, height) {
    position = position || [];
    width = width === undefined ? 500 : width;
    height = height === undefined ? 500 : height;

    Model.apply(this, arguments);

    this.resize(width, height);
    this.setPosition(position);
  }
  S.theClass(Camera).inheritsFrom(Model);

  Camera.prototype.resize = function(width, height) {
    this.width = width;
    this.height = height;
    this.semiWidth = width / 2;
    this.semiHeight = height / 2;
    this.dispatchEvent('resize', {
      width: this.width,
      height: this.height,
      semiWidth: this.semiWidth,
      semiHeight: this.semiHeight
    });
    return this;
  };

  Camera.prototype.setPosition = function(newPosition) {
    this._position = newPosition;
    this.dispatchEvent('move', {
      worldX: newPosition[0],
      worldY: newPosition[1]
    });
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
