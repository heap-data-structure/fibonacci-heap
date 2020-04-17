/**
 * /!\ pointers in the extracted node are left unchanged
 * /!\ y will have dangling pointers after removal if not single element
 */
export default function list_remove(y) {
	//console.debug('list_remove');
	y.prev.next = y.next;
	y.next.prev = y.prev;
}
