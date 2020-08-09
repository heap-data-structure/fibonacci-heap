import {_remove as list_remove} from '@aureooms/js-cll';

export default function cut(x, y) {
	if (x === x.next) y.children = null;
	else {
		y.children = x.next;
		list_remove(x);
	}

	--y.degree;
	x.parent = null;
	x.mark = false;
}
