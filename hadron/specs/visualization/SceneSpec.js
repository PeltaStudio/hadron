(function() {
  'use strict';

  var context = newContext({
    'hadron/models/visualization/SceneRender': function() {},
    'hadron/models/visualization/SceneControl': function() {}
  });

  context(['hadron/models/visualization/Scene'], function(Scene) {

    describe('Scene instances', function() {

      it('return the target as the unique submodel.', function() {
        var target = {}, camera = {}, submodels,
            scene = new Scene(target, camera);

        submodels = scene.getSubmodels();

        expect(submodels).toEqual([target]);
      });

    });
  });

}()); 
