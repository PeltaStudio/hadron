define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      Render = require('hadron/Render');

  var gfx = require('hadron/gfx/GraphicSystem');

  function TiledMapRender(celldMap) {
    Render.apply(this, arguments);
    celldMap.getRenderSubmodels = this.getRenderSubmodels;
  }
  S.theClass(TiledMapRender).inheritsFrom(Render);

  // TODO: This could be asyncrhonous and cached
  TiledMapRender.prototype.getRenderSubmodels = function() {
    if (this.minRow === undefined) return [];

    var minZ = this.minRow,
        maxZ = this.maxRow,
        minN = this.minColumn,
        maxN = this.maxColumn,
        submodels = [], cells = this._cells, cell;

    for (var z = minZ; z <= maxZ; z++) {
      for (var n = minN; n <= maxN; n++) {
        // TODO: Crop by visualization area
        cell = cells[z] ? cells[z][n] : null;
        if (cell)
          submodels.push(cell);
      }
    }

    return submodels;
  };

  return TiledMapRender;
});
