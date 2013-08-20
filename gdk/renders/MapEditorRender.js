define(function (require) {
  'use strict';

  function MapEditorRender(drawer) {
    this.drawer = drawer;
  }

  MapEditorRender.prototype.apply = function (model) {
    var drawer = this.drawer;
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
