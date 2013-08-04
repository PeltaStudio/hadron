define(function (require) {
  'use strict';

  var Model = require('hadron/Model');

  describe('Model instances', function () {
    it('have a .getChildren() method which returns a copy of children',
      function () {
        var m = new Model(),
            children1, children2;

        expect(m.getChildren).toBeDefined();
        expect(m.getChildren()).toEqual([]);

        children1 = m.getChildren(),
        children2 = m.getChildren();
        expect(children1).not.toBe(children2);
      }
    );
  });

  return {
    name: 'ModelSpec'
  };
});
