import cut from './cut';

export default function* cascading_cut(y) {
	//console.debug('cascading_cut');
	while (true) {
		const z = y.parent;
		if (z === null) break;
		if (!y.mark) {
			y.mark = true;
			break;
		}

		cut(y, z);
		yield y;
		y = z;
	}
}
