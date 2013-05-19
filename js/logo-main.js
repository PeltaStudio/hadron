requirejs.config({
  baseUrl: '/js/logo',
  urlArgs: 'bust=' + Date.now(),
  paths: {
    hadron: '../../hadron'
  }
});

var game;

requirejs(
  [
    'hadron/toolkit',
    'hadron/RenderAspect',
    'hadron/ControlAspect',
    'hadron/Game',
    'GameOfLife'
  ],
  function (T, RenderAspect, ControlAspect, Game, GameOfLife) {

    var hadronLogo = document.getElementById('hadron-logo'),
        canvasCenter = [hadronLogo.width/2, hadronLogo.height/2];

    var gameOfLife = new GameOfLife(10, 8, canvasCenter),
        controlAspect = new ControlAspect(),
        renderAspect = new RenderAspect(hadronLogo);

    game = new Game({
      rootModel: gameOfLife,
      control: controlAspect,
      render: renderAspect
    });

    game.start();
  }
);
