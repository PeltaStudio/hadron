define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      WorldMetrics = require('hadron/models/visualization/WorldMetrics'),
      Render = require('hadron/Render');

  var gfx = require('hadron/gfx/GraphicSystem');

  function CellHighlighterRender() { }
  S.theClass(CellHighlighterRender).inheritsFrom(Render);

  CellHighlighterRender.prototype.render = function(model) {
    var metrics = new WorldMetrics(model.cellSize),
        worldPosition = metrics.getWorkSpaceCoordinates(model.position),
        drawer = gfx.drawer,
        gizmo = drawer.getIsoCube(model.cellSize, 0, {
          faceColor: false,
          lineColor: '#00E000',
          lineWidth: 2
        });

    // TODO: For eficency reasons, consider to draw in the buffer directly.
    drawer.drawImage(gizmo,
      worldPosition[0] - gizmo.width / 2,
      worldPosition[1] - gizmo.height
    );
  };

  return CellHighlighterRender;
});
