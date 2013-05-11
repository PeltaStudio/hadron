
define(function (require) {

  function _add(obj, behaviour) {
    if (this.entities.indexOf(obj) !== -1) {
      return;
    }

    if (typeof behaviour === 'function') {
      obj[method] = behaviour;
    }

    if (typeof obj !== 'function') {
      this.entities.push(obj);
    }
  };

  function _delegateMethod() {
    this.entities.forEach(function onEachEntity(entity) {
      entity[method](this.model, this);
    });
  };

  function delegateBuilder(method) {
    var delegate = {};
    delegate['add'] = _add;
    delegate[method] = _delegateMethod;
    return delegate;
  }

  return {
    delegateBuilder: delegateBuilder
  };
});
