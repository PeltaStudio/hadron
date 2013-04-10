function Input() {
  'use strict'

  window.addEventListener('keypress', function (evt) {
    var code = evt.keyCode || evt.charCode,
        event;
    if (code === 97) {
      event = new CustomEvent('moveLeft');
      window.dispatchEvent(event);
    }
    else if (code === 100) {
      event = new CustomEvent('moveRight');
      window.dispatchEvent(event);
    }
  });
}
