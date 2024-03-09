// eslint-disable-next-line ava/use-test
import ava from 'ava';

import * as spec from '@heap-data-structure/specification';

import {FibonacciHeap} from '#module';

const heaps = [['FibonacciHeap', (compare) => new FibonacciHeap(compare)]];

spec.test(ava, heaps, {references: true, length: false});
spec.test(ava, heaps, {references: true, length: false, lengths: [[123]]});
spec.test(ava, heaps, {references: true, length: false, lengths: [[1000]]});
spec.test(ava, heaps, {references: true, length: false, lengths: [[10_000]]});
spec.test(ava, heaps, {references: true, length: false, lengths: [[100_000]]});
