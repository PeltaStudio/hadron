define(function (require) {
  'use strict';

  var T = require('hadron/toolkit');

  function Model() { }

  Model.prototype.as = function (aspect) {
    T.assert.isAspect(aspect);
    var components, args = [].slice.call(arguments, 0);
    args[0] = this;
    aspect.reveal.apply(aspect, args);
    components = this.getComponents(aspect);
    for (var i = 0, l = components.length; i < l; i++) {
      components[i].as.apply(components[i], arguments);
    }
  };

  Model.prototype.getComponents = function (aspect) {
    return [];
  };

  return Model;
});
