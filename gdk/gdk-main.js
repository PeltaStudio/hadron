requirejs.config({
  baseUrl: '/gdk',
  urlArgs: 'bust=' + Date.now(),
  paths: {
    hadron: '../hadron/src'
  }
});

var mapBuilder, isoDrawer;

requirejs(
  [
    'hadron/drawing/canvas2d/Drawer',
    'hadron/RenderAspect',
    'hadron/ControlAspect',
    'hadron/Game',
    'MapBuilder'
  ],
  function (Drawer, RenderAspect, ControlAspect, Game, MapBuilder) {
    var mapBuilderViewport = document.getElementById('map-builder');
        isoDrawer = new Drawer(mapBuilderViewport.getContext('2d'));

    mapBuilder = new Game({
      rootModel: new MapBuilder(mapBuilderViewport, isoDrawer),
      control: new ControlAspect(),
      render: new RenderAspect(isoDrawer)
    });
    mapBuilder.start();
  }
);
