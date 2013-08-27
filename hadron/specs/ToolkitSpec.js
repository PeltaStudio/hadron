define(function (require) {
  'use strict';

  var T = require('hadron/toolkit');

  describe('The tookit library', function () {

    describe('The assert() library', function () {

      it('has a simple assert() which throws a custom exception.', function() {
        function passingTest() {
          T.assert(true, 'Custom error');
        }
        function failingTest() {
          T.assert(false, 'Custom error');
        }

        expect(passingTest).not.toThrow();
        expect(failingTest).toThrow();
      });

      it('includes isDefined() to check if an object is defined.', function() {
        function failingTest() {
          var v;
          T.assert.isDefined(v, 'Custom error');
        }

        expect(failingTest).toThrow();
      });

    });

    it('has a clone() function to perform deep copies.', function() {
      var source = { a: [], b: {} },
          target = T.clone(source);

      expect(target).toEqual(source);
      expect(target).not.toBe(source);
      expect(target.a).not.toBe(source.a);
      expect(target.b).not.toBe(source.b);
    });

    it('has a extend() function to perform mixings.', function() {
      var source1 = { a: [], b: {} },
          source2 = { c: 1, d: 's' },
          source3 = { a: {} },
          target = {}, result;


      result = T.extend(target, source1, source2, source3);

      expect(result).toBe(target);
      expect(target.a).toBe(source3.a);
      expect(target.b).toBe(source1.b);
      expect(target.c).toBe(source2.c);
      expect(target.d).toBe(source2.d);
    });

    it('has an isApplicable() function to check if an object can be applyed' +
                                                  'as a function.', function() {
      var notApplicable = {};
      var applicable = { apply: function () {} };
      function f() {}

      expect(T.isApplicable(f)).toBe(true);
      expect(T.isApplicable(applicable)).toBe(true);
      expect(T.isApplicable(notApplicable)).toBe(false);
    });

    it('has a capitalize() function to make the first letter to be uppercase',
                                                                    function() {

      expect(T.capitalize('value')[0]).toBe('V');
      expect(T.capitalize('Value')).toEqual('Value');
      expect(T.capitalize('1value')).toEqual('1value');
      expect(T.capitalize(' 1value')).toEqual(' 1value');
    });

  });

  return {
    name: 'ToolkitSpec'
  };
});
