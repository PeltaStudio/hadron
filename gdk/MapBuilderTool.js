/*
 * The map builder tool is a complex application composed by several modules.
 ^ Among them, the most important is the map editor. The map editor is rendered
 * upon an extended version of the Hadron main isometric render engine
 * inlcuding extensions for specific aiding gizmos.
 */
define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      R = require('hadron/res/ResourceManager'),
      Tile = require('hadron/models/map/tiling/Tile'),
      MapEditor = require('editors/MapEditor'),
      Game = require('hadron/Game');

  var gfx = require('hadron/gfx/GraphicSystem');

  function MapBuilderTool() { }

  MapBuilderTool.prototype.init = function() {
    this.setupEditor();
    this.setupControl();
    this.setupInfoArea();
    this.setupPanels();
  };

  MapBuilderTool.prototype.setupEditor = function() {
    var self = this;
    var mapEditor = new MapEditor(),
        mapEditorWindow = mapEditor.getMapEditorBuffer(),
        mapEditorSimulation;

    // Attach the buffer (canvas) to the DOM
    document.getElementById('map-editor-canvas').appendChild(mapEditorWindow);

    // FIXME: look for a better name. Problem can be with Game.
    mapEditorSimulation = new Game({
      rootModel: mapEditor
    });
    mapEditorSimulation.start();

    S.theObject(self)
      .has('mapEditorWindow', mapEditorWindow)
      .has('mapEditor', mapEditor)
      .has('mapEditorSimulation', mapEditorSimulation);

    self.updateViewport();

    mapEditorWindow.onmousemove = function(evt) {
      updateWindowPointer(evt);
    };
    mapEditorWindow.onclick = function(evt) {
      updateWindowPointer(evt, true);
    };

    function updateWindowPointer(evt, isClicking) {
      var canvas = evt.target;
      var rect = canvas.getBoundingClientRect();
      var canvasCoords = [
        evt.clientX - rect.left,
        evt.clientY - rect.top
      ];
      self.mapEditor.setPointer(canvasCoords, isClicking);
    };
  };

  MapBuilderTool.prototype.setupControl = function() {
    var self = this;
    window.onresize = this.updateViewport.bind(this);
    self.mapEditor.target.map.addEventListener('click', function(evt) {
      var cell, img, sprite, tile;
      img = document.querySelector('#tile-palette .selected img');
      if (!img) return;

      cell = self.mapEditor.target.map.getCell([evt.mapX, evt.mapZ]);
      sprite = R.getImage(img.dataset.resourceId);
      tile = new Tile(self.mapEditor.target.map.cellSize, sprite);
      if (!self.pushMode) {
        cell.clearTiles();
      }
      cell.tiles.push(tile);
    });
    self.pushMode = false;
    window.addEventListener('keyup', function(evt) {
      var keyCode = evt.keyCode || evt.which;
      if ('p'.charCodeAt(0)) {
        self.pushMode = !self.pushMode;
      }
    });
    window.addEventListener('keypress', function(evt) {
      var keyCode = evt.keyCode || evt.which;
      if ('t'.charCodeAt(0) === keyCode) {
        self.mapEditor.doTestScenario({
          getSprite: function(n) {
            var query = '#tile-palette :nth-of-type(' + n + ') img',
                img = document.querySelector(query),
                resourceId = img ? img.dataset.resourceId : undefined;

            return resourceId !== undefined ?
                   R.getImage(resourceId) :
                   undefined;
          }
        });
      }
    });
  };

  MapBuilderTool.prototype.setupInfoArea = function() {
    var self = this;
    var updateFPS, mapEditorInfoArea, fpsHolder, avgFrameTime = 0;
    fpsHolder = document.querySelector('#fps-info + dd');
    updateFPS = setInterval(function() {
      var frameTime = self.mapEditorSimulation.frameTime;
      fpsHolder.textContent = (1000/frameTime).toFixed(1);
    }, 1000);
  };

  MapBuilderTool.prototype.setupPanels = function() {
    var tilePalette = document.getElementById('tile-palette');
    S.theObject(this).has('tilePalette', new PalettePanel(tilePalette));
  };

  MapBuilderTool.prototype.updateViewport = function() {
    var newWidth = document.documentElement.offsetWidth,
        newHeight = document.documentElement.clientHeight;

    // maximize canvas
    this.mapEditorWindow.width = newWidth;
    this.mapEditorWindow.height = newHeight;

    this.mapEditor.resizeWindow(newWidth, newHeight);
  };

  var spriteId = 0;
  function Panel(panel) {
    S.theObject(this)
      .has('panel', panel)
      .has('pinButton', panel.querySelector('.pin'));

    this.pinButton.addEventListener('click', this.togglePin.bind(this));
  };

  Panel.prototype.togglePin = function(evt) {
    this.panel.classList.toggle('pinned');
  };

  function PalettePanel(panel, imageWidth) {
    Panel.apply(this, arguments);
    S.theObject(this)
      .has('addTileButton', panel.querySelector('.add-tile'))
      .has('addTileInput', panel.querySelector('.add-tile + input'));

    this.addTileButton.addEventListener('click', this.selectFile.bind(this));
    this.addTileInput.addEventListener('change', this.addImages.bind(this));
  }
  S.theClass(PalettePanel).inheritsFrom(Panel);

  PalettePanel.prototype.selectFile = function(evt) {
    this.addTileInput.click();
  };

  PalettePanel.prototype.addImages = function(evt) {
    var self = this;
    var files = [].slice.call(evt.target.files, 0), tileList,
        pathComponents,
        fragment = document.createDocumentFragment();

    files.forEach(function(file) {
      var img, li, p;
      img = document.createElement('img');
      p = document.createElement('p');
      p.textContent = file.name;
      p.classList.add('file-name');
      li = document.createElement('li');
      li.appendChild(img);
      li.appendChild(p);
      li.onclick = function(evt) {
        var brothers = [].slice.call(li.parentNode.children, 0);
        brothers.forEach(function(element) {
          element.classList.remove('selected');
        });
        li.classList.add('selected');
      };
      fragment.appendChild(li);

      loadImage(img, file);
    });

    function loadImage(img, file) {
      R.newImageFromFile(file).then(function(id) {
        img.src = R.getImage(id).src;
        img.dataset.resourceId = id;
      });
    }

    tileList = this.panel.querySelector('.tile-list');
    tileList.appendChild(fragment);
  };

  return MapBuilderTool;
});
