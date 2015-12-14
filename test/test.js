(function () {
  'use strict';

  var blockr = require('../blockr');
  var data = [
    1, 2, 3,
    4, 5, 6,
    7, 8, 9
  ];

  console.log('original:', data);

  data = blockr.map(data,
    (a, b, c) =>
      [c, b, a]
  );

  console.log('---');
  console.log('data = blockr.map(data, (a, b, c) => [c, b, a])');
  console.log('//', data);

  data = blockr.reduce(data,
    (a, b, c) =>
      a + b + c
  );

  console.log('---');
  console.log('data = blockr.reduce(data, (a, b, c) => (a + b + c))');
  console.log('//', data);
  console.log('---');

  data = blockr.expand(data,
    (x) =>
      [x, x + 1, x + 2]
  );
  console.log('data = blockr.expand(data, (x) => [x, x + 1, x + 2])');
  console.log('//', data);
  console.log('---');

  var fs = require('fs'),
      png = require('pngjs').PNG;

  var image = png.sync.read(fs.readFileSync('./test/test.png')),
      imageData = new Float64Array(image.data);

  var grayscale = blockr.reduce(
    imageData,
    (r, g, b, a) =>
      0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255)
  );

  var back = new Uint8ClampedArray(blockr.expand(
    grayscale,
    x => [x * 255, x * 255, x * 255, 255]
  ));

  fs.writeFileSync('./test/test.gray.png', png.sync.write({
    width: image.width,
    height: image.height,
    data: back
  }));

  console.log();
  console.log('grayscale image saved to test/test.gray.png');
}());
