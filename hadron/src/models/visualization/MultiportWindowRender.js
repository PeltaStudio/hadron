define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Render = require('hadron/Render');

  var gfx = require('hadron/gfx/GraphicSystem');

  function MultiportWindowRender(multiportWindow, windowBufferName) {
    Render.apply(this, arguments);

    var windowBuffer = gfx.newBuffer(windowBufferName);
    S.theObject(this).has('windowBuffer', windowBuffer);

    multiportWindow.clear = clearMultiportWindow.bind(this);
  }
  S.theClass(MultiportWindowRender).inheritsFrom(Render);

  MultiportWindowRender.prototype.render = function(multiportWindow) {
    for (var name in multiportWindow._viewports) {
      gfx.setBuffer(multiportWindow._viewports[name].id, this.windowBuffer);
    }
  };

  function clearMultiportWindow() {
    var buffer = this.windowBuffer,
        drawer = buffer.drawer;
    drawer.clearRect(0, 0, buffer.width, buffer.height);
  };

  return MultiportWindowRender;
});
