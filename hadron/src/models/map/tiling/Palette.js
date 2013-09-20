define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding');

  function Palette() {
    S.theObject(this).has('_tiles', {});
  }

  Palette.prototype.addTile = function(name, tile) {
    this._tiles[name] = tile;
  };

  Palette.prototype.removeTile = function(name) {
    var existed = this._tiles[name] !== undefined;
    delete this._tiles[name];
    return existed;
  };

  Palette.prototype.getTile = function(name) {
    return this._tiles[name];
  };

  return Palette;
});
