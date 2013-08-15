define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/Model');

  function CellHighlighter() { }
  S.inherit(CellHighlighter, Model);

  CellHighlighter.prototype.render = function (alpha, drawer) {
    var position = this.getPosition(),
        gizmo = drawer.getIsoCube(this.getCellSize(), 0, {
          faceColor: false,
          lineColor: '#333',
          lineWidth: 3
        });

    position[0] -= gizmo.width / 2;
    position[1] -= gizmo.height;
    drawer.drawImage(gizmo, position[0], position[1]);
  };

  return CellHighlighter;
});
