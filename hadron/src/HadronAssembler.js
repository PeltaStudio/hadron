define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      Assembler = require('hadron/Assembler');

  var noop = T.noop;

  function HadronAssembler() {
    Assembler.apply(this, arguments);
  }
  S.theClass(HadronAssembler).inheritsFrom(Assembler);

  HadronAssembler.prototype.assembleModels = function() {
  };

  return HadronAssembler;
});
