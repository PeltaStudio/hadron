function Control(model) {
  'use strict'

  this.model = model;
}

Control.prototype.installListeners = function () {
  'use strict'

  var model = this.model,
      padSemiWidth = model.pad.width / 2;

  window.addEventListener('moveLeft', function (evt) {
    if (model.pad.position[X] - padSemiWidth > 0) {
      model.pad.position[X] -= 20;
    }
  });

  window.addEventListener('moveRight', function (evt) {
    if (model.pad.position[X] + padSemiWidth < model.scenario.width) {
      model.pad.position[X] += 20;
    }
  });

  window.addEventListener('gameover', function onGameover(evt) {
    window.removeEventListener('gameover', onGameover);
    alert("You won!");
  });
};

Control.prototype.update = function () {
  'use strict'

  var self = this;
  var model = this.model,
      radius = model.ball.radius,
      ballPos = model.ball.position,
      padHeight = model.scenario.height - model.pad.height,
      padSemiWidth = model.pad.width / 2,

      FACTOR = 10;

  var modulus = model.ball.modulus * FACTOR,
      dd = 1/FACTOR;

  function checkBallScenarioCollision() {
    if (same(ballPos[X] + radius, model.scenario.width) ||
        same(ballPos[X] - radius, 0)) {
      model.ball.direction[X] = -model.ball.direction[X];
    }

    if (same(ballPos[Y] - radius, 0)) {
      model.ball.direction[Y] = -model.ball.direction[Y];
    }

    if (ballPos[Y] - radius > model.scenario.height) {
      model.ball.position = [
        Math.floor(model.scenario.width / 2),
        Math.floor(model.scenario.height / 2)
      ];
    }
  }

  function checkBallPadCollision() {
    var overPad =
      ballPos[X] >= model.pad.position[X] - padSemiWidth &&
      ballPos[X] <= model.pad.position[X] + padSemiWidth;

    if (overPad && same(ballPos[Y] + radius, padHeight)) {
      model.ball.direction[Y] = -model.ball.direction[Y];
    }
  }

  function checkBallBlocksCollision() {
    var gameoverEvent, remainBlocks = false,
        block, blocks = model.scenario.blocks;
    for (var row = 0, rc = blocks.length; row < rc; row++){
      for (var col = 0, cc = blocks[row].length; col < cc; col++) {
        if (blocks[row][col]) {
          if (!checkBallBlockCollision(row, col)) {
            remainBlocks = true;
          };
        }
      }
    }
    if (!remainBlocks) {
      gameoverEvent = new CustomEvent('gameover');
      window.dispatchEvent(gameoverEvent);
    }
  }

  function checkBallBlockCollision(row, col) {
    var blocks = model.scenario.blocks;
    var blockWidth = Math.floor(model.scenario.width / blocks[0].length),
        blockHeight = model.pad.height,
        lateralCheck, frontalCheck, cornerCheck, atSide, onBlock,
        c1, c2, c3, c4;

    var topLeft = [
      col * blockWidth,
      row * blockHeight
    ];
    var topRight = [
      topLeft[X] + blockWidth,
      topLeft[Y]
    ];
    var bottomRight = [
      topRight[X],
      topRight[Y] + blockHeight
    ];
    var bottomLeft = [
      topLeft[X],
      bottomRight[Y]
    ];

    atSide = ballPos[Y] >= topLeft[Y] &&
              ballPos[Y] <= bottomRight[Y];

    onBlock = ballPos[X] >= topLeft[X] &&
               ballPos[X] <= bottomRight[X];

    lateralCheck = atSide && (same(ballPos[X] + radius, topLeft[X]) ||
                    same(ballPos[X] - radius, bottomRight[X]));
    if (lateralCheck) {
      model.ball.direction[X] = -model.ball.direction[X];
    }

    frontalCheck = onBlock && (same(ballPos[Y] + radius, topLeft[Y]) ||
                  same(ballPos[Y] - radius, bottomRight[Y]));
    if (frontalCheck) {
      model.ball.direction[Y] = -model.ball.direction[Y];
    }

    c1 = [
      topLeft[X]+1,
      topLeft[Y]+1
    ];

    c2 = [
      topRight[X]-1,
      topRight[Y]+1
    ];

    c3 = [
      bottomRight[X]-1,
      bottomRight[Y]-1
    ];

    c4 = [
      bottomLeft[X]+1,
      bottomLeft[Y]-1
    ];

    var r = d([0, 0], [1, 1]);
    cornerCheck = (same(d(ballPos, c1), radius + r, 0.1) ? 1 : 0) ||
                   (same(d(ballPos, c2), radius + r, 0.1) ? 2 : 0) ||
                   (same(d(ballPos, c3), radius + r, 0.1) ? 3 : 0) ||
                   (same(d(ballPos, c4), radius + r, 0.1) ? 4 : 0);

    switch (cornerCheck) {
      case 1:
        model.ball.direction = [-1, -1];
        break;
      case 2:
        model.ball.direction = [1, -1];
        break;
      case 3:
        model.ball.direction = [1, 1];
        break;
      case 4:
        model.ball.direction = [-1, 1];
        break;
    }

    if (lateralCheck || frontalCheck || cornerCheck) {
      model.scenario.blocks[row][col] = 0;
      return true;
    }

    return false;
  }

  for (var i = 0; i < modulus; i++) {
    model.ball.position[X] += model.ball.direction[X] < 0 ? -dd : dd;
    model.ball.position[Y] += model.ball.direction[Y] < 0 ? -dd : dd;

    checkBallScenarioCollision();
    checkBallPadCollision();
    checkBallBlocksCollision();
  }
};
