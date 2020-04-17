/**
 * Optimization of list_concatenate when x contains a single element.
 * Works even if x has dangling pointers x.next and x.prev.
 */
export default function list_insert(a, x) {
	// FROM a - b - c - d - a        x
	//   TO a - b - c - d - x - a
	const d = a.prev;
	x.next = a; // X -> a
	x.prev = d; // D <- x
	d.next = x; // D -> x
	a.prev = x; // X <- a
}
