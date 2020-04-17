export default function list_reset_parent(children) {
	let next = children;

	do {
		const x = next;
		next = x.next;
		x.parent = null;
	} while (next !== children);
}
