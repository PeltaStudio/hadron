function Control(model) {
  this.model = model;
  var padSemiWidth = model.pad.width / 2;

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
}

Control.prototype.simulate = function () {
  var model = this.model,
      radius = model.ball.radius,
      ballPos = model.ball.position,
      padSemiHeight = model.pad.height / 2,
      padSemiWidth = model.pad.width / 2,
      padTopLeft = [
        model.pad.position[X] - padSemiWidth,
        model.pad.position[Y] - padSemiHeight
      ],
      SUBSTEPS, dv;

  function checkBallBlockCollision(topLeft, width, height) {
    var lateralCheck, frontalCheck, cornerCheck, atSide, onBlock,
        c1, c2, c3, c4, bounceVelocity, r;

    // get corners
    var topRight = [
      topLeft[X] + width,
      topLeft[Y]
    ];
    var bottomRight = [
      topRight[X],
      topRight[Y] + height
    ];
    var bottomLeft = [
      topLeft[X],
      bottomRight[Y]
    ];

    // check side collision
    atSide = ballPos[Y] >= topLeft[Y] && ballPos[Y] <= bottomRight[Y];
    lateralCheck = atSide && (equal(ballPos[X] + radius, topLeft[X]) ||
                    equal(ballPos[X] - radius, bottomRight[X]));

    if (lateralCheck) {
      model.ball.velocity[X] = -model.ball.velocity[X];
    }

    // check frontal collistion
    onBlock = ballPos[X] >= topLeft[X] && ballPos[X] <= bottomRight[X];
    frontalCheck = onBlock && (equal(ballPos[Y] + radius, topLeft[Y]) ||
                  equal(ballPos[Y] - radius, bottomRight[Y]));
    if (frontalCheck) {
      model.ball.velocity[Y] = -model.ball.velocity[Y];
    }

    // check corner collision
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

    // select corner
    r = radius + Math.sqrt(2);
    cornerCheck = (equal(distance(ballPos, c1), r, 0.1) ? 1 : 0) ||
                  (equal(distance(ballPos, c2), r, 0.1) ? 2 : 0) ||
                  (equal(distance(ballPos, c3), r, 0.1) ? 3 : 0) ||
                  (equal(distance(ballPos, c4), r, 0.1) ? 4 : 0);

    // output velocity
    bounceVelocity = [
      Math.abs(model.ball.velocity[X]),
      Math.abs(model.ball.velocity[Y])
    ];
    switch (cornerCheck) {
      case 1:
        model.ball.velocity = [
          -bounceVelocity[X],
          -bounceVelocity[Y]
        ];
        break;
      case 2:
        model.ball.velocity = [
          bounceVelocity[X],
          -bounceVelocity[Y]
        ];
        break;
      case 3:
        model.ball.velocity = [
          bounceVelocity[X],
          bounceVelocity[Y]
        ];
        break;
      case 4:
        model.ball.velocity = [
          -bounceVelocity[X],
          bounceVelocity[Y]
        ];
        break;
    }

    // a collision
    return lateralCheck || frontalCheck || cornerCheck;
  }

  function checkBallScenarioCollision() {
    // walls
    checkBallBlockCollision([0, -1], model.scenario.width, 1);
    checkBallBlockCollision([-1, 0], 1, model.scenario.height);
    checkBallBlockCollision([model.scenario.width, 0], 1, model.scenario.height);

    // check if fall below the scenario
    if (ballPos[Y] - radius > model.scenario.height) {
      model.ball.position = [
        Math.floor(model.scenario.width / 2),
        Math.floor(model.scenario.height / 2)
      ];
    }
  }

  function checkBallPadCollision() {
    checkBallBlockCollision(padTopLeft, model.pad.width, model.pad.height);
  }

  function checkBallBlocksCollision() {
    var gameoverEvent, remainBlocks = false,
        block, blocks = model.scenario.blocks;
    var blockWidth = model.scenario.width / blocks[0].length,
        topLeft, blockHeight = model.pad.height;

    // check each block
    for (var row = 0, rc = blocks.length; row < rc; row++){
      for (var col = 0, cc = blocks[row].length; col < cc; col++) {
        if (blocks[row][col]) {
          remainBlocks = true;
          topLeft = [
            col * blockWidth,
            row * blockHeight
          ];

          // if there is a collision, remove the block
          if (checkBallBlockCollision(topLeft, blockWidth, blockHeight)) {
            model.scenario.blocks[row][col] = 0;
          }
        }
      }
    }

    // no remaining blocks -> game over
    if (!remainBlocks) {
      gameoverEvent = new CustomEvent('gameover');
      window.dispatchEvent(gameoverEvent);
    }
  }

  model.ball.position[X] += model.ball.velocity[X];
  model.ball.position[Y] += model.ball.velocity[Y];

  checkBallScenarioCollision();
  checkBallPadCollision();
  checkBallBlocksCollision();
};
