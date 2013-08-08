define(function (require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/Model'),
      Tile = require('hadron/models/map/Tile'),
      Camera = require('hadron/models/cameras/Camera');

  function MapBuilder(viewport, drawer) {
    var self = this;
    Model.call(this);
    this.tile = new Tile([0, 0]);
    this.mapViewport = new Camera(viewport, drawer);
    this.mapViewport.maximize();
    this.mapViewport.centerOnViewport();
    window.onresize = function() {
      self.mapViewport.maximize();
      self.mapViewport.centerOnViewport();
    };
  }
  S.inherit(MapBuilder, Model);

  MapBuilder.prototype.getComponents = function (aspect) {
    return [this.tile];
  };

  MapBuilder.prototype.render = function (alpha, drawer) {
    drawer.showScreenAxis();
  };

  return MapBuilder;
});
