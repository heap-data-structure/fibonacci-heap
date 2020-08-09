# Usage

> :warning: The code requires `regeneratorRuntime` to be defined, for instance by importing
> [regenerator-runtime/runtime](https://www.npmjs.com/package/regenerator-runtime).

First, require the polyfill at the entry point of your application
```js
require( 'regenerator-runtime/runtime' );
// or
import 'regenerator-runtime/runtime.js' ;
```

Then, import the library where needed
```js
const fibonacciheap = require( '@aureooms/js-fibonacci-heap' ) ;
// or
import * as fibonacciheap from '@aureooms/js-fibonacci-heap' ;
```
