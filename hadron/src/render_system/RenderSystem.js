define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      GraphicSystem = require('hadron/render_system/graphics/GraphicSystem');

  function RenderSystem(mainCanvas) {
    S.theObject(this).has('gfx', new GraphicSystem(mainCanvas));
  }

  return RenderSystem;
});
