(function() {
  'use strict';

  var context = newContext();
  context(['hadron/scaffolding'], function(S) {

    describe('The the(clarative) scaffolding library', function() {

      describe('The object constructor', function() {

        it('has both the() and theObject() constructor as aliases.',
                                                                   function() {
          expect(S.the).toBe(S.theObject);
        });

        it('allows to add getter functions.', function() {
          var o = {};
          function value() {
            return 42;
          };

          function deleteValue() {
            delete o.value;
          }

          function changeValue() {
            o.value = 50;
          }

          S.the(o).hasGet(value);

          expect(o.value).toEqual(42);
          expect(deleteValue).toThrow();
          expect(changeValue).toThrow();
        });

        it('allows to add named getter functions.', function() {
          var o = {};
          function value() {
            return 42;
          };

          function deleteValue() {
            delete o.getter;
          }

          function changeValue() {
            o.getter = 50;
          }

          S.the(o).hasGet('getter', value);

          expect(o.getter).toEqual(42);
          expect(deleteValue).toThrow();
          expect(changeValue).toThrow();
        });

        it('allows to add setter functions.', function() {
          var o = {};
          function value(v) {
            this.result = v * v;
          }

          function deleteValue() {
            delete o.value;
          }

          S.the(o).hasSet(value);
          o.value = 7;

          expect(o.result).toEqual(49);
          expect(deleteValue).toThrow();
        });

        it('allows to add named setter functions.', function() {
          var o = {};
          function value(v) {
            this.result = v * v;
          }

          function deleteValue() {
            delete o.setter;
          }

          S.the(o).hasSet('setter', value);
          o.setter = 7;

          expect(o.result).toEqual(49);
          expect(deleteValue).toThrow();
        });

        it('allows to add arbitrary read-only functions.', function() {
          var o = {};
          function f() { }

          function deleteF() {
            delete o.f;
          }

          function changeF() {
            o.f = 50;
          }

          S.the(o).has(f);
          expect(o.f).toBe(f);
          expect(deleteF).toThrow();
          expect(changeF).toThrow();
        });

        it('allows to add arbitrary named, read-only functions.', function() {
          var o = {};
          function f() { }

          function deleteF() {
            delete o.namedFunction;
          }

          function changeF() {
            o.namedFunction = 50;
          }

          S.the(o).has('namedFunction', f);
          expect(o.namedFunction).toBe(f);
          expect(deleteF).toThrow();
          expect(changeF).toThrow();
        });

        it('allows to add arbitrary read-only values.', function() {
          var o = {};

          function deleteValue() {
            delete o.value;
          }

          function changeValue() {
            o.value = 50;
          }

          S.the(o).has('value', 42);

          expect(o.value).toEqual(42);
          expect(deleteValue).toThrow();
          expect(changeValue).toThrow();
        });

        it('does not allow to add unnamed read-only values.', function() {
          var o = {};

          function declareUnnamed() {
            S.the(o).has(42);
          }

          expect(declareUnnamed).toThrow();
        });

      });

      describe('The class constructor', function() {

        it('allows classical inheritance.', function() {
          function Klass() {}
          function SubKlass() {}

          S.theClass(SubKlass).inheritsFrom(Klass);
          var o = new SubKlass();

          expect(o instanceof SubKlass).toBe(true);
          expect(o instanceof Klass).toBe(true);
          expect(o.constructor).toBe(SubKlass);
          expect(Object.getPrototypeOf(o)).toBe(SubKlass.prototype);
        });

        it('allows adding read-only functions to the prototype.', function() {
          function Klass() {}
          function f() { return this; }

          S.theClass(Klass).has(f);
          var o = new Klass();

          expect(o.f).toBe(f);
          expect(o.f()).toBe(o);
          expect(Klass.prototype.f).toBe(f);
        });

        it('allows adding named read-only functions to the prototype.',
                                                                  function() {
          function Klass() {}
          function f() { return this; }

          S.theClass(Klass).has('g', f);
          var o = new Klass();

          expect(o.g).toBe(f);
          expect(o.g()).toBe(o);
          expect(Klass.prototype.g).toBe(f);
        });

        it('allows adding named read-only values to the prototype.',
                                                                  function() {
          function Klass() {}

          S.theClass(Klass).has('value', 42);
          var o = new Klass();
          var p = new Klass();

          expect(o.value).toEqual(42);
          expect(p.value).toEqual(42);
        });

      });

    });
  });

}());
