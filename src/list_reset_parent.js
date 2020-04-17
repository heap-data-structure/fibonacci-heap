export default function list_reset_parent(children) {
	//console.debug('list_reset_parent');
	let next = children;

	do {
		const x = next;
		next = x.next;
		x.parent = null;
	} while (next !== children);

	//console.debug('DONE');
}
