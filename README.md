# blockr

Blockr is a (Typed)Array manipulation tool that works similar to `Array.map` and `Array.reduce`, but for several elements at once. Written for image processing purposes.

```bash
$ npm install blockr
$ npm test
```

### Usage

```javascript
var blockr = require('blockr');

data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

// you can use it to rearrange
data = blockr.map(data, (a, b, c) => [c, b, a]);
// [ 3, 2, 1, 6, 5, 4, 9, 8, 7 ]

// reduce with 3-tuple
data = blockr.reduce(data, (a, b, c) => (a + b + c));
// [ 6, 15, 24 ]

// expand each element into 3 elements
data = blockr.expand(data, (x) => [x, x + 1, x + 2]);
// [ 6, 7, 8, 15, 16, 17, 24, 25, 26 ]
```

You can for example use it to easily reduce an RGBA image into a double precision [grayscale](https://en.wikipedia.org/wiki/Grayscale) bitmap array (each pixel a value from `0` to `1`) and then expand it back into an RBGA array:

```javascript
var fs = require('fs'),
    png = require('pngjs').PNG,
    blockr = require('blockr');

var image = png.sync.read(fs.readFileSync('test.png')),
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

fs.writeFileSync('test.gray.png', png.sync.write({
  width: image.width,
  height: image.height,
  data: back
}));
```
