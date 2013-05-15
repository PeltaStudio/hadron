
define(function () {
  'use strict';

  function Grid() {

    function render(alpha, ctx, modelMgr) {
      var gridSize = modelMgr.gameConstrains.tileSize;
      // Do render things
    }

    return {
      render: render
    };
  }

  return Grid;
});
