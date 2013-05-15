
define(function (require) {
  'use strict'

  function extend() {
    var target = arguments[0],
        sources = [].slice.call(arguments, 1),
        key;

    sources.forEach(function augmentTarget(source) {
      for (key in source) if (source.hasOwnAttribute(key)) {
        target[key] = source[key];
      }
    });

    return target;
  }

  function clone(obj) {
    if (obj === null || !(obj instanceof Object)) {
      return target;
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

  function assertDefined(obj, errorMessage) {
    errorMessage = errorMessage || (obj + ' is undefined or null');
    if (typeof obj === 'undefined' || obj === null)
      throw new Error(errorMessage);

    return true;
  }

  return {
    extend: extend,
    clone: clone,
    assertDefined: assertDefined
  };
});
