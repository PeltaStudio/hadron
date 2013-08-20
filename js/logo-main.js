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
        Assembler = require('Assembler'),
        Game = require('hadron/Game'),
        GameOfLife = require('models/GameOfLife');

    var hadronLogo = document.getElementById('hadron-logo'),
        drawer = hadronLogo.getContext('2d'),
        logoComputedStyle, canvasCenter,
        gameOfLife, assembler;

    assembler = new Assembler(hadronLogo);
    assembler.assembleModels();

    logoComputedStyle = window.getComputedStyle(hadronLogo);
    hadronLogo.width = parseInt(logoComputedStyle.width, 10);
    hadronLogo.height = parseInt(logoComputedStyle.height, 10);
    canvasCenter = [hadronLogo.width/2, hadronLogo.height/2];

    gameOfLife = new GameOfLife(10, 8, canvasCenter),
    simulation = new Game({
      rootModel: gameOfLife,
      renderSystem: drawer,
    });
    simulation.start();
  }
);
