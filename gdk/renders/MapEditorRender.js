define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Render = require('hadron/renders/Render');

  function MapEditorRender() { }
  S.theClass(MapEditorRender).inheritsFrom(Render);

  MapEditorRender.prototype.render = function(model, drawer) {
    applyCameraTransformation();

    function applyCameraTransformation() {
      var position = model.camera.getPosition(),
          X = position[0], Y = position[1];

      drawer.setTransform(
        1, 0, 0, 1,
        X + model.camera.semiWidth,
        Y + model.camera.semiHeight
      );
    }
  };

  return MapEditorRender;
});
