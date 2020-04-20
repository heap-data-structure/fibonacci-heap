import list_insert from './list_insert';

/**
 * FIB-HEAP-LINK
 *
 * Precondition: y is in the root list of some heap.
 */
export default function link(y, x) {
	// List_remove(y); // NOT NECESSARY SINCE y IS ALWAYS FROM ROOT LIST
	// make y a child of x
	if (x.children === null) {
		y.next = y;
		y.prev = y;
		x.children = y;
	} else {
		list_insert(x.children, y);
	}

	y.parent = x;
	++x.degree; // Increment x.degree
	y.mark = false; // Unmark y
}
