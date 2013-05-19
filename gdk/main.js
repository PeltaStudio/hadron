requirejs.config({
  baseUrl: '/hadron',
  urlArgs: 'bust=' + Date.now(),
  paths: {
    gdk: '../gdk'
  }
});

var game;

requirejs(
  ['RenderAspect', 'ControlAspect', 'Model', 'Game'],
  function (RenderAspect, ControlAspect, Model, Game) {

    var zoneEditor = document.getElementById('zone-editor');

    var rootModel = new Model(),
        controlAspect = new ControlAspect(),
        renderAspect = new RenderAspect(zoneEditor);

    game = new Game({
      rootModel: rootModel,
      control: controlAspect,
      render: renderAspect
    });

    game.start();
  }
);
