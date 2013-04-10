var X = 0, Y = 1;

function same(a, b, threshold) {
  'use strict'

  threshold = threshold || 0.001;
  return a < b ? (b - a < threshold) : (a - b < threshold);
}

function d(p1, p2) {
  'use strict'

  var dif = [
    p1[X] - p2[X],
    p1[Y] - p2[Y]
  ];
  return Math.sqrt(dif[X]*dif[X]+dif[Y]*dif[Y]);
}
