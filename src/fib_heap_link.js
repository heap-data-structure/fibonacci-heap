import list_remove from './list_remove';
import list_insert from './list_insert';
import list_debug from './list_debug';

/**
 * FIB-HEAP-LINK
 *
 * Precondition: y is in the root list of some heap.
 */
export default function fib_heap_link(y, x) {
	//console.debug('fib_heap_link BEGIN', y.value, x.value);
	//list_debug(y.next, 'y siblings');
	//list_remove(y); // NOT NECESSARY SINCE y IS ALWAYS FROM ROOT LIST
	//list_debug(y.next, 'y siblings after');
	// make y a child of x
	if (x.children === null) {
		//console.debug('children of', x.value, 'before', []);
		y.next = y;
		y.prev = y;
		x.children = y;
	} else {
		//list_debug(x.children, 'children of', x.value, 'before');
		list_insert(x.children, y);
	}

	//list_debug(x.children, 'children of', x.value, 'after');

	y.parent = x;
	++x.degree; // Increment x.degree
	y.mark = false; // Unmark y
	//console.debug('fib_heap_link END');
}
