
define(function (require) {
  'use strict';

  function inherit(child, base) {
    child.prototype = Object.create(base.prototype);
    child.prototype.constructor = child;
  }

  function to(object) {
    return {
      add: function(property) {
        if (typeof property === 'function') {
          object[property.name] = property;
        }
        return this;
      },
      addGet: function (name, f) {
        Object.defineProperty(object, name, { get: f });
        return this;
      }
    }
  }

  return {
    inherit: inherit,
    to: to
  };

});
