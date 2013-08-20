define(function(require) {
  'use strict';

  function CellHighlighterRender(drawer) {
    this.drawer = drawer;
  }

  CellHighlighterRender.prototype.apply = function (model) {
    var drawer = this.drawer,
        position = model.getPosition(),
        gizmo = drawer.getIsoCube(model.getCellSize(), 0, {
          faceColor: false,
          lineColor: '#333',
          lineWidth: 3
        });

    position[0] -= gizmo.width / 2;
    position[1] -= gizmo.height;
    drawer.drawImage(gizmo, position[0], position[1]);
  };

  return CellHighlighterRender;
});
