requirejs.config({
  baseUrl: '/gdk',
  urlArgs: 'bust=' + Date.now(),
  paths: {
    hadron: '../hadron/src'
  }
});

define(function (require) {
    var MapBuilderTool = require('MapBuilderTool');

    var mapBuilderTool = new MapBuilderTool();
    mapBuilderTool.init();
});
