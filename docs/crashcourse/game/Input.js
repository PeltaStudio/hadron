'use strict';

function Input() {
  window.addEventListener('keypress', function (evt) {
    var code = evt.keyCode || evt.charCode,
        event;
    if (code === 97) { // a key
      event = new CustomEvent('moveLeft');
      window.dispatchEvent(event);
    }
    else if (code === 100) { // d key
      event = new CustomEvent('moveRight');
      window.dispatchEvent(event);
    }
  });
}
