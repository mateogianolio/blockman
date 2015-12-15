# blockr

Blockr is a block-based array manipulation tool that works similar to `Array.map` and `Array.reduce`, but for several elements at once. Written for image processing purposes.

```bash
$ npm install blockr
$ npm test
```

### API

#### `map = (data, f)`

Like `Array.map()`, but iterates over blocks of **`data`**. The block size is inferred from the arguments supplied to the mapping function.

```javascript
var data = [1, 2, 3, 4, 5, 6];

blockr.map(data, (x) => x + 2);
// [3, 4, 5, 6, 7, 8]

blockr.map(data, (x, y) => [y, x]);
// [2, 1, 4, 3, 6, 5]

blockr.map(data, (x, y, z) => [z, y, x]);
// [3, 2, 1, 6, 5, 4]
```

#### `expand = (data, f)`

Expand blocks of **`data`**. The block size is inferred from the arguments supplied to the expanding function.

```javascript
var data = [1, 2, 3, 4, 5, 6];

blockr.expand([0], (x) => [x - 1, x, x + 1]);
// [-1, 0, 1]

blockr.expand(data, (x, y) => [x, y, x + y]);
// [1, 2, 3, 3, 4, 7, 5, 6, 11]

blockr.expand(data, (x, y, z) => [x, y, z, x * y * z]);
// [1, 2, 3, 6, 4, 5, 6, 120]
```

#### `reduce = (data, f)`

Reduce blocks of **`data`**. The block size is inferred from the arguments supplied to the reduction function.

```javascript
var data = [1, 2, 3, 4, 5, 6];

blockr.reduce(data, (x, y) => x + y);
// [3, 7, 11]

blockr.reduce(data, (x, y, z) => x * y + z);
// [5, 26]
```

### Usage

You can for example use it to easily reduce an RGBA image into a double precision [grayscale](https://en.wikipedia.org/wiki/Grayscale) bitmap array (each pixel a value from `0` to `1`) and then expand it back into an RBGA array:

```javascript
var fs = require('fs'),
    PNG = require('pngjs').PNG,
    blockr = require('../blockr');

// 1. Read image into a node Buffer
var image = PNG.sync.read(fs.readFileSync('./test/test.png'));

// 2. Create a Float64Array view of the image data buffer
var f64 = new Float64Array(image.data);

// Reduce every 4 elements (R, G, B and alpha respectively).
// Resulting array will be 1/4 the size of the original.
var f64Gray = blockr.reduce(f64,
  (r, g, b, a) =>
    0.2126 * (r / 255) +
    0.7152 * (g / 255) +
    0.0722 * (b / 255)
);

// 4. Expand the image back to its original size
var u8Gray = new Uint8ClampedArray(
  blockr.expand(
    f64Gray,
    x => [x * 255, x * 255, x * 255, 255]
  )
);

image = {
  width: image.width,
  height: image.height,
  data: u8Gray
};

fs.writeFileSync('./test/test.gray.png', PNG.sync.write(image));
console.log('wrote to ./test/test.gray.png');
console.log('---');
```
