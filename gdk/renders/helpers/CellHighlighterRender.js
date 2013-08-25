define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Render = require('hadron/renders/Render');

  function CellHighlighterRender() { }
  S.inherit(CellHighlighterRender, Render);

  CellHighlighterRender.prototype.render = function (model, drawer) {
    var position = model.getPosition(),
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
