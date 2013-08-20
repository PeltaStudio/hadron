requirejs.config({
  baseUrl: './js/logo',
  urlArgs: 'bust=' + Date.now(),
  paths: {
    hadron: '../../hadron/src'
  }
});

var game;

define(function (require) {

    var T = require('hadron/toolkit'),
        Assembler = require('Assembler'),
        Game = require('hadron/Game'),
        GameOfLife = require('models/GameOfLife');

    var hadronLogo = document.getElementById('hadron-logo'),
        drawer = hadronLogo.getContext('2d'),
        canvasCenter;

    var logoComputedStyle = window.getComputedStyle(hadronLogo);
    hadronLogo.width = parseInt(logoComputedStyle.width, 10);
    hadronLogo.height = parseInt(logoComputedStyle.height, 10);
    canvasCenter = [hadronLogo.width/2, hadronLogo.height/2];

    var gameOfLife = new GameOfLife(10, 8, canvasCenter),

    game = new Game({
      rootModel: gameOfLife,
      assembler: new Assembler(hadronLogo),
    });
    game.start();
  }
);
