export default function list_concatenate(x, y) {
	// FROM x - b - c - d - x        y - f - g - h - y
	//   TO x - b - c - d - y - f - g - h - x
	const d = x.prev;
	const h = y.prev;
	d.next = y; // D -> y
	x.prev = h; // H <- x
	y.prev = d; // D <- y
	h.next = x; // H -> x
}
