define(function (require) {
  'use strict';

  function MapEditorRender() { }

  MapEditorRender.prototype.apply = function (model, args) {
    var drawer = args[0];
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
