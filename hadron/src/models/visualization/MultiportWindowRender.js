define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Render = require('hadron/Render');

  var gfx = require('hadron/gfx/GraphicSystem');

  // TODO: Let this class to create the viewport
  function MultiportWindowRender(multiportWindow, mainBufferName) {
    Render.apply(this, arguments);

    var windowBuffer = gfx.newBuffer(mainBufferName);
    S.theObject(this).has('windowBuffer', windowBuffer);

    // FIXME: Extract the function
    multiportWindow.clear = function() {
      var buffer = windowBuffer,
          drawer = buffer.drawer;
      drawer.clearRect(0, 0, buffer.width, buffer.height);
    };
  }
  S.theClass(MultiportWindowRender).inheritsFrom(Render);

  MultiportWindowRender.prototype.render = function(multiportWindow) {
    // FIXME: Make this asynchronous (performance improvement?)
    for (var name in multiportWindow._viewports) {
      gfx.setBuffer(multiportWindow._viewports[name].id, this.windowBuffer);
    }
  };

  return MultiportWindowRender;
});
