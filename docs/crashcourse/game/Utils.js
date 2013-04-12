'use strict';

var X=0, Y=1;

function distance(a, b) {
  var diff = [
    b[X] - a[X],
    b[Y] - a[Y]
  ];
  return Math.sqrt(diff[X]*diff[X] + diff[Y]*diff[Y]);
}

function equal(a, b, threshold) {
  threshold = threshold || 0.000001; // default parameter
  return (b < a) ?                // test
         (a - b < threshold) :    // test is true
         (b - a < threshold);     // test is false
}
