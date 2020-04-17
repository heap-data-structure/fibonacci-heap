import list_remove from './list_remove';

export default function cut(x, y) {
	//console.debug('cut', x.value, 'from his parent', y.value);
	if (x === x.next) y.children = null;
	else {
		y.children = x.next;
		list_remove(x);
	}
	--y.degree;
	x.parent = null;
	x.mark = false;
}
