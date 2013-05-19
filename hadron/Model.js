define(function (require) {
  'use strict';

  var T = require('hadron/toolkit');

  function Model() {

    var children = [];

    function add(obj, aspects) {
      aspects = aspects || {};
      if (typeof aspects.render === 'function') {
        obj.render = aspects.render;
      }
      if (typeof aspects.control === 'function') {
        obj.simulate = aspects.control;
      }
      if (children.indexOf(obj) < 0) {
        children.push(obj);
      }
    }

    function remove(obj) {
      var indexToRemove = children.indexOf(obj);
      if (indexToRemove < 0) {
        return;
      }
      children.splice(indexToRemove, 1);
    }

    function getChildren() {
      return children.slice(0);
    }

    function as(aspect) {
      T.assert.isAspect(aspect);
      var args = [].slice.call(arguments, 0);
      args[0] = this;
      aspect.reveal.apply(aspect, args);
      for (var i = 0, l = children.length; i < l; i++) {
        children[i].as.apply(children[i], arguments);
      }
    }

    this.as = as;
    this.add = add;
    this.getChildren = getChildren;
    this.remove = remove;
  }

  return Model;
});
