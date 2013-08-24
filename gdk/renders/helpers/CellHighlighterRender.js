define(function(require) {
  'use strict';

  function CellHighlighterRender() { }

  CellHighlighterRender.prototype.apply = function (model, args) {
    var drawer = args[0],
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
