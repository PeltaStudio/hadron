
define(function () {
  'use script';

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
      arguments[0] = this;
      aspect.reveal.apply(aspect, arguments);
      for (var i = 0, l = children.length; i < l; i++) {
        children[i].as(aspect);
      }
    }

    return {
      as: as,
      add: add,
      getChildren: getChildren,
      remove: remove
    };
  }

  return Model;
});
