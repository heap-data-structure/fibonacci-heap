import list_insert from './list_insert';
import link from './link';

/**
 * CONSOLIDATE: Consolidate the root list of a heap.
 *
 * The next step, in which we reduce the number of trees in the Fibonacci heap,
 * is consolidating the root list of H, which the call CONSOLIDATE(H)
 * accomplishes. Consolidating the root list consists of repeatedly executing
 * the following steps until every root in the root list has a distinct degree
 * value:
 *
 *   1. Find two roots x and y in the root list with the same degree. Without
 *   loss of generality, let x.key <= y.key.
 *
 *   2. Link y to x: remove y from the root list, and make y a child of x by
 *   calling the FIB-HEAP-LINK procedure. This procedure increments the
 *   attribute x:degree and clears the mark on y.
 *
 * The procedure CONSOLIDATE uses an auxiliary array A[0..D(H.n)] to
 * keep track of roots according to their degrees. If A[i] = y, then y is
 * currently a root with y.degree = i. Of course, in order to allocate the
 * array we have to know how to calculate the upper bound D(H.n) on the maximum
 * degree, but we will see how to do so in Section 19.4.
 *
 * @param compare Comparison function.
 * @param l Root list.
 */
export default function consolidate(compare, l) {
	const A = [];

	let next = l;

	do {
		let x = next;
		next = x.next;
		let d = x.degree;

		let n = d - A.length;
		if (n >= 0) {
			while (n-- > 0) A.push(null);
			A.push(x);
		} else {
			while (A[d] !== null) {
				let y = A[d]; // Another node with the same degree as x
				if (compare(y.value, x.value) < 0) {
					// CANNOT EXCHANGE VALUES BECAUSE THAT WOULD INVALIDATE
					// EXISTING POINTERS
					y = x;
					x = A[d];
				}

				link(y, x);
				A[d] = null; // Put before link if using x.degree ?
				++d;
				if (d === A.length) {
					A.push(null);
					break;
				}
			}

			A[d] = x;
		}
	} while (next !== l);

	let min = null;

	for (const x of A) {
		if (x === null) continue;
		if (min === null) {
			// Create a root list for H containing just A[i]
			x.next = x;
			x.prev = x;
			min = x;
		} else {
			// Insert A[i] into H's root list
			list_insert(min, x);
			// Update minimum if necessary
			if (compare(x.value, min.value) < 0) min = x;
		}
	}

	return min;
}
