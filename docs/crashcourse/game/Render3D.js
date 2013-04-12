function Render3D(model, canvas) {
  'use strict';

  canvas.width = model.scenario.width;
  canvas.height = model.scenario.height;
  canvas.style.width = canvas.width + 'px';
  canvas.style.height = canvas.height + 'px';
  this.model = model;
  this.canvas = canvas;

  this.camera = new THREE.PerspectiveCamera(
    75, 
    canvas.width/canvas.height,
    0.1,
    1000
  );

  this.renderer = new THREE.WebGLRenderer({ canvas: canvas });
  this.renderer.setSize(canvas.width, canvas.height);
  this.camera.position.x = this.model.scenario.width / 2;
  this.camera.position.y = -this.model.scenario.height / 2;
  this.camera.position.z = 270;
}

Render3D.prototype.clear = function() {
  'use strict';

  this.renderer.clear(true, true, true);
}

Render3D.prototype.render = function() {
  'use strict';

  var m = this.model,
      scene = new THREE.Scene();

  function paintPad() {
    var geometry = new THREE.CubeGeometry(m.pad.width,m.pad.height,20);
    var material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    var pad = new THREE.Mesh(geometry, material);
    pad.position.x = m.pad.position[X];
    pad.position.y = -m.pad.position[Y];
    scene.add(pad);
  }

  function paintBall() {
    var geometry = new THREE.SphereGeometry(m.ball.radius);
    var material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    var ball = new THREE.Mesh(geometry, material);
    ball.position.x = m.ball.position[X];
    ball.position.y = -m.ball.position[Y];
    scene.add(ball);
  }

  function paintBlocks() {
    var blocks = m.scenario.blocks,
        blockWidth = Math.floor(m.scenario.width / blocks[0].length),
        blockHeight = m.pad.height,
        geometry, material, blockMesh,
        block, topLeft;

    for (var row=0, rc=blocks.length; row < rc; row++) {
      for (var column=0, cc=blocks[row].length; column < cc; column++) {
        block = blocks[row][column];
        if (block) {
          topLeft = [
            column * blockWidth,
            row * blockHeight,
          ];
          geometry = new THREE.CubeGeometry(blockWidth,blockHeight,20);
          material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
          blockMesh = new THREE.Mesh(geometry, material);
          blockMesh.position.x = topLeft[X] + blockWidth / 2;
          blockMesh.position.y = -(topLeft[Y] + blockHeight / 2);
          scene.add(blockMesh);
        }
      }
    }
  }

  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(0, 100, 270);
  scene.add(directionalLight);

  paintBlocks();
  paintPad();
  paintBall();

  this.renderer.render(scene, this.camera);
};
