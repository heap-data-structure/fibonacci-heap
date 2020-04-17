import list_iter from './list_iter';

export default function list_debug(children, ...args) {
	return;
	const values = children ? [...list_iter(children)].map(x => x.value) : [];
	//const json = JSON.stringify(values);
	//const out = json;
	console.debug(...args, ...values);
}
