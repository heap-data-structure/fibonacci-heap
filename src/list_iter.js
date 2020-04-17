export default function* list_iter(children) {
	//console.debug('list_iter');
	let next = children;

	do {
		const x = next;
		next = x.next;
		yield x;
	} while (next !== children);
}
