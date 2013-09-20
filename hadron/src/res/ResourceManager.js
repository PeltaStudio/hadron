define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding');

  var RESOURCE_ID = 0;

  function ResourceManager() {
    var categories = {};
    S.theObject(categories).has('image', {});
    S.theObject(this).has('categories', categories);
  }

  ResourceManager.prototype.newId = function() {
    return ++RESOURCE_ID;
  };

  ResourceManager.prototype.newResource = function(category, data) {
    var resourceId = this.newId();
    this.categories[category][resourceId] = data;
    return resourceId;
  };

  ResourceManager.prototype.deleteResource = function(category, data) {
    var existed = this.categories[category] &&
                  this.categories[category][resourceId] !== undefined;

    delete this.categories[category][resourceId];
    return existed;
  };

  ResourceManager.prototype.getResource = function(category, resourceId) {
    return this.categories[category] ?
           this.categories[category][resourceId] :
           undefined;
  };

  ResourceManager.prototype.newImage = function(rawData) {
    var image = new Image();
    image.src = rawData;
    return this.newResource('image', image);
  };

  ResourceManager.prototype.newImageFromFile = function(file) {
    var self = this;
    return new Promise(function(resolver) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(evt) {
        var rawData = evt.target.result,
            resourceId;

        resourceId = self.newImage(rawData);
        resolver.fulfill(resourceId);
      };
    });
  };

  ResourceManager.prototype.deleteImage = function(resourceId) {
    return this.deleteResource('image', resourceId);
  };

  ResourceManager.prototype.getImage = function(resourceId) {
    return this.getResource('image', resourceId);
  };

  return new ResourceManager();
});
