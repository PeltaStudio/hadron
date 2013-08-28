define(function(require) {
  'use strict';

  function extend() {
    var target = arguments[0],
        sources = [].slice.call(arguments, 1),
        key;

    sources.forEach(function augmentTarget(source) {
      for (key in source) if (source.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    });

    return target;
  }

  function clone(obj) {
    if (obj === null || !(obj instanceof Object)) {
      return obj;
    }

    var copy,
        constructor = obj.constructor;

    switch (constructor) {
      case RegExp:
        copy = new RegExp(
          obj.source,
          'g'.substring(0, Number(obj.global)) +
          'i'.substring(0, Number(obj.ignoreCase))
        );
        break;

      case Date:
        copy = new Date(obj.getTime());
        break;

      default:
        copy = new constructor();
        break;
    }

    for (var key in obj) {
      copy[key] = clone(obj[key]);
    }

    return copy;
  }

  function assert(test, errorMessage) {
    if (!test) {
      throw new Error(errorMessage);
    }
  }

  Object.defineProperty(assert, 'isDefined', {
    value: function isDefined(obj, errorMessage) {
      errorMessage = errorMessage || (obj + ' is undefined or null');
      assert(typeof obj !== 'undefined' && obj !== null, errorMessage);
      return true;
    }
  });

  function isApplicable(obj) {
    return obj && typeof obj.apply === 'function';
  }

  function capitalize(string) {
    return string[0].toUpperCase() + string.substring(1);
  }

  function noop() {}

  return {
    assert: assert,
    clone: clone,
    extend: extend,
    isApplicable: isApplicable,
    capitalize: capitalize,
    noop: noop
  };
});
