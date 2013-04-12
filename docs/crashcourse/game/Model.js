'use strict';

function Model(blocks, scenarioWidth, scenarioHeight) {

  // Default block configuration
  //
  // Blocks will have a implicit width equal to:
  //  scenario.width / how many blocks in blocks[0]
  //
  // Blocks will have a implicit height equal to:
  //  pad.height
  blocks = blocks || [
    [0,1,1,0,0,1,1,0],
    [0,1,1,0,0,1,1,0],
    [0,0,1,1,1,1,0,0],
    [0,0,0,1,1,0,0,0]
  ];

  scenarioWidth = scenarioWidth || 500;
  scenarioHeight = scenarioHeight || 400;

  var PAD_HEIGHT = 20;
  var PAD_WIDTH = 70;
  var PAD_MARGIN = 5;

  this.pad = {
    width: PAD_WIDTH,
    height: PAD_HEIGHT,
    position: [
      scenarioWidth / 2,
      scenarioHeight - (PAD_HEIGHT / 2) - PAD_MARGIN
    ]
  };

  this.ball = {
    radius: 8,
    position: [
      Math.floor(scenarioWidth / 2),
      Math.floor(scenarioHeight / 2),
    ],
    velocity: [2.5, 2.5],
  };

  this.scenario = {
    width: scenarioWidth,
    height: scenarioHeight,
    blocks: blocks // blocks before : is a name
                   // blocks after : refer to the parameter
  };
}
