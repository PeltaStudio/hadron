
define(function(require) {
  'use strict';

  function the(object) {
    return {
      has: function(a1, a2) {
        var value, name;
        if (typeof a1 === 'function') {
          value = a1;
          name = value.name;
        }
        else if (typeof a1 === 'string' && typeof a2 !== 'undefined') {
          name = a1;
          value = a2;
        }
        else if (typeof a2 === 'undefined') {
          throw new Error('provide a `name` for values');
        }
        Object.defineProperty(object, name, { value: value });
        return this;
      },

      hasGet: function(a1, a2) {
        var getter, name;
        if (typeof a1 === 'function') {
          getter = a1;
          name = getter.name;
        }
        else if (typeof a1 === 'string') {
          name = a1;
          getter = a2;
        }
        Object.defineProperty(object, name, { get: getter });
        return this;
      },

      hasSet: function(a1, a2) {
        var setter, name;
        if (typeof a1 === 'function') {
          setter = a1;
          name = setter.name;
        }
        else if (typeof a1 === 'string') {
          name = a1;
          setter = a2;
        }
        Object.defineProperty(object, name, { set: setter });
        return this;
      }
    };
  }

  function theClass(klass) {
    var prototype = the(klass.prototype);
    return {
      has: function() {
        prototype.has.apply(prototype, arguments);
        return this;
      },

      inheritsFrom: function(base) {
        klass.prototype = Object.create(base.prototype);
        klass.prototype.constructor = klass;
        return this;
      }
    };
  }

  return {
    the: the,
    theObject: the,
    theClass: theClass
  };

});
