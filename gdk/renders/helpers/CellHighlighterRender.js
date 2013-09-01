define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      WorldMetrics = require('hadron/models/visualization/WorldMetrics'),
      Render = require('hadron/renders/Render');

  function CellHighlighterRender() { }
  S.theClass(CellHighlighterRender).inheritsFrom(Render);

  CellHighlighterRender.prototype.render = function(model, system) {
    var metrics = new WorldMetrics(model.cellSize),
        worldPosition = metrics.getWorldCoordinates(model.position),
        drawer = system.gfx.drawer,
        gizmo = drawer.getIsoCube(model.cellSize, 0, {
          faceColor: false,
          lineColor: '#333',
          lineWidth: 3
        });

    drawer.drawImage(gizmo,
      worldPosition[0] - gizmo.width / 2,
      worldPosition[1] - gizmo.height
    );
  };

  return CellHighlighterRender;
});
