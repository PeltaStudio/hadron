function Model(blocks) {
  'use strict';

  var PAD_HEIGHT = 20;

  this.scenario = {
    width: 500,
    height: 400,
    blocks: blocks
  };

  this.pad = {
    width: 100,
    height: PAD_HEIGHT,
    position: [
      this.scenario.width / 2,
      this.scenario.height - (PAD_HEIGHT / 2)
    ]
  };

  this.ball = {
    radius: 8,
    position: [
      Math.floor(this.scenario.width / 2),
      Math.floor(this.scenario.height / 2),
    ],
    direction: [1, 1],
    modulus: 2.5
  };
}
