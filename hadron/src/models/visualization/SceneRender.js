define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      T = require('hadron/toolkit'),
      Render = require('hadron/Render');

  var gfx = require('hadron/gfx/GraphicSystem');

  function SceneRender(scene, target, camera) {
    Render.call(this);

    var buffer = gfx.newBuffer(scene.id, camera.width, camera.height),
        drawer = buffer.drawer;

    S.theObject(this)
      .has('target', target)
      .has('camera', camera)
      .has('buffer', buffer)
    ;

    scene.clear = clearScene.bind(this);

    camera.addEventListener('move', onCameraChange);
    camera.addEventListener('resize', onCameraChange);
    onCameraChange();

    function onCameraChange() {
      var position = camera.getPosition(),
          worldX = position[0], worldY = position[1],
          semiWidth = camera.semiWidth,
          semiHeight = camera.semiHeight,
          offsetX, offsetY;

      offsetX = -worldX + semiWidth;
      offsetY = -worldY + semiHeight;

      buffer.width = camera.width;
      buffer.height = camera.height;

      // TODO: take into account zoom factor
      drawer.setTransform(1, 0, 0, 1, offsetX, offsetY);

      // FIXME: Move to the drawer?
      gfx.setVisualizationArea({
        top: position[1] - semiHeight,
        right: position[0] + semiWidth,
        bottom: position[1] + semiHeight,
        left: position[0] - semiWidth
      });
    }
  }
  S.theClass(SceneRender).inheritsFrom(Render);

  SceneRender.prototype.render = function(scene) {
    gfx.buffer = this.buffer;
    gfx.drawer = this.buffer.drawer;
  };

  SceneRender.prototype.getBuffer = function() {
    return this.buffer;
  };

  function clearScene(scene) {
    var visualization = gfx.getVisualizationArea();

    if (!visualization) {
      this.buffer.width = this.buffer.width;
    }
    else {
      this.buffer.drawer.clearRect(
        visualization.left,
        visualization.top,
        visualization.right - visualization.left,
        visualization.bottom - visualization.top
      );
    }
  };

  return SceneRender;
});
