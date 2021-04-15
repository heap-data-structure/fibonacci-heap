:shell: [@aureooms/js-fibonacci-heap](https://aureooms.github.io/js-fibonacci-heap)
==

Fibonacci heap data structure for JavaScript.
See [docs](https://aureooms.github.io/js-fibonacci-heap/index.html).
Parent is [@aureooms/js-heap](https://github.com/aureooms/js-heap).

> :warning: The code requires `regeneratorRuntime` to be defined, for instance by importing
> [regenerator-runtime/runtime](https://www.npmjs.com/package/regenerator-runtime).

```js
import {FibonacciHeap} from '@aureooms/js-fibonacci-heap';
import {increasing} from '@aureooms/js-compare';
let heap = new FibonacciHeap( increasing ) ;
```

[![License](https://img.shields.io/github/license/aureooms/js-fibonacci-heap.svg)](https://raw.githubusercontent.com/aureooms/js-fibonacci-heap/main/LICENSE)
[![Version](https://img.shields.io/npm/v/@aureooms/js-fibonacci-heap.svg)](https://www.npmjs.org/package/@aureooms/js-fibonacci-heap)
[![Tests](https://img.shields.io/github/workflow/status/aureooms/js-fibonacci-heap/ci:test?event=push&label=tests)](https://github.com/aureooms/js-fibonacci-heap/actions/workflows/ci:test.yml?query=branch:main)
[![Dependencies](https://img.shields.io/david/aureooms/js-fibonacci-heap.svg)](https://david-dm.org/aureooms/js-fibonacci-heap)
[![Dev dependencies](https://img.shields.io/david/dev/aureooms/js-fibonacci-heap.svg)](https://david-dm.org/aureooms/js-fibonacci-heap?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/aureooms/js-fibonacci-heap.svg)](https://github.com/aureooms/js-fibonacci-heap/issues)
[![Downloads](https://img.shields.io/npm/dm/@aureooms/js-fibonacci-heap.svg)](https://www.npmjs.org/package/@aureooms/js-fibonacci-heap)

[![Code issues](https://img.shields.io/codeclimate/issues/aureooms/js-fibonacci-heap.svg)](https://codeclimate.com/github/aureooms/js-fibonacci-heap/issues)
[![Code maintainability](https://img.shields.io/codeclimate/maintainability/aureooms/js-fibonacci-heap.svg)](https://codeclimate.com/github/aureooms/js-fibonacci-heap/trends/churn)
[![Code coverage (cov)](https://img.shields.io/codecov/c/gh/aureooms/js-fibonacci-heap/main.svg)](https://codecov.io/gh/aureooms/js-fibonacci-heap)
[![Code technical debt](https://img.shields.io/codeclimate/tech-debt/aureooms/js-fibonacci-heap.svg)](https://codeclimate.com/github/aureooms/js-fibonacci-heap/trends/technical_debt)
[![Documentation](https://aureooms.github.io/js-fibonacci-heap/badge.svg)](https://aureooms.github.io/js-fibonacci-heap/source.html)
[![Package size](https://img.shields.io/bundlephobia/minzip/@aureooms/js-fibonacci-heap)](https://bundlephobia.com/result?p=@aureooms/js-fibonacci-heap)


## :scroll: References

  - [Wikipedia Article on Fibonacci Heaps](https://en.wikipedia.org/wiki/Fibonacci_heap)
  - [Introduction to Algorithms Chapter 19](https://en.wikipedia.org/wiki/Introduction_to_Algorithms)
