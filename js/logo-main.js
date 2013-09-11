requirejs.config({
  baseUrl: './js/logo',
  urlArgs: 'bust=' + Date.now(),
  paths: {
    hadron: '../../hadron/src'
  }
});

var simulation;

define(function (require) {

    var T = require('hadron/toolkit'),
        Game = require('hadron/Game'),
        GameOfLife = require('models/GameOfLife');

    var hadronLogo = document.getElementById('hadron-logo'),
        logoComputedStyle, canvasCenter,
        gameOfLife, assembler;

    window.buffer = hadronLogo;
    window.drawer = hadronLogo.getContext('2d');

    logoComputedStyle = window.getComputedStyle(hadronLogo);
    hadronLogo.width = parseInt(logoComputedStyle.width, 10);
    hadronLogo.height = parseInt(logoComputedStyle.height, 10);
    canvasCenter = [hadronLogo.width/2, hadronLogo.height/2];

    gameOfLife = new GameOfLife(10, 8, canvasCenter),
    simulation = new Game({
      rootModel: gameOfLife
    });
    simulation.start();
  }
);
