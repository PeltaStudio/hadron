
define(function (require) {
  'use strict';

  var ZoneRender = require('hadron/graphics/ZoneRender');
  function GTKZoneRender() {
    ZoneRender.apply(this, arguments);
  }
  GTKZoneRender.prototype = Object.create(ZoneRender.prototype);

  return GTKZoneRender;
});
