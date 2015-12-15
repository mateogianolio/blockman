(function () {
  'use strict';

  var fs = require('fs'),
      PNG = require('pngjs').PNG,
      blockr = require('../blockr');

  var image = PNG.sync.read(fs.readFileSync('./test/test.png')),
      imageData = new Float64Array(image.data);

  var grayscale = blockr.reduce(
    imageData,
    (r, g, b, a) =>
      0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255)
  );

  var back = new Uint8ClampedArray(
    blockr.expand(
      grayscale,
      x => [x * 255, x * 255, x * 255, 255]
    )
  );

  fs.writeFileSync('./test/test.gray.png', PNG.sync.write({
    width: image.width,
    height: image.height,
    data: back
  }));

  console.log();
  console.log('grayscale image saved to test/test.gray.png');
}());
