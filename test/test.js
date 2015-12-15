(function () {
  'use strict';

  var blockr = require('../blockr');
  var data = [
    1, 2, 3,
    4, 5, 6,
    7, 8, 9
  ];

  console.log('original:', data);

  data = blockr.map(
    data,
    (a, b, c) =>
      [c, b, a]
  );

  console.log('---');
  console.log('data = blockr.map(data, (a, b, c) => [c, b, a])');
  console.log('//', data);

  data = blockr.reduce(
    data,
    (a, b, c) =>
      a + b + c
  );

  console.log('---');
  console.log('data = blockr.reduce(data, (a, b, c) => (a + b + c))');
  console.log('//', data);
  console.log('---');

  data = blockr.expand(
    data,
    (x) =>
      [x, x + 1, x + 2]
  );

  console.log('data = blockr.expand(data, (x) => [x, x + 1, x + 2])');
  console.log('//', data);
  console.log('---');
}());
