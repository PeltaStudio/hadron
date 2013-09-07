define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Render = require('hadron/renders/Render');

  function MapEditorRender() { }
  S.theClass(MapEditorRender).inheritsFrom(Render);

  return MapEditorRender;
});
