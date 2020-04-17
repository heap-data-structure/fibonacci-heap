import list_remove from './list_remove';

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
