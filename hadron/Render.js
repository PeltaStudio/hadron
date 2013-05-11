
define(function (require) {
  'use strict'

  var _ = require('hadron/toolkit');

  function Render(model, canvas) {
    this.model = model;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.entities = [];
  }

  Render.prototype.add = function(entity, render) {
    if (this.entities.indexOf(entity) !== -1) {
      return;
    }

    if (typeof render === 'function') {
      entity.render = render;
    }

    if (typeof entity !== 'function') {
      this.entities.push(entity);
    }
  };

  Render.prototype.render = function() {
    var self = this;
    this.entities.forEach(function onEach(entity) {
      entity.render(self.model, self);
    });
  }

  return Render;
});
