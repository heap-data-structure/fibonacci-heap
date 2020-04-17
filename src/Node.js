export default class Node {
	constructor(value) {
		this.value = value; // Key
		/**
		 * As Figure 19.2(b) shows, each node x contains a pointer x.p to its
		 * parent and a pointer x.child to any one of its children. The
		 * children of x are linked together in a circular, doubly linked list,
		 * which we call the child list of x. Each child y in a child list has
		 * pointers y.left and y.right that point to y’s left and right
		 * siblings, respectively. If node y is an only child, then y.left =
		 * y.right = y. Siblings may appear in a child list in any order.
		 */
		this.parent = null;
		this.prev = this; // Pointer to previous (left) sibling
		this.next = this; // Pointer to next (right) sibling
		this.children = null; // Pointer to some child
		/**
		 * Each node has two other attributes. We store the number of children
		 * in the child list of node x in x.degree.
		 */
		this.degree = 0; // The number of children
		/**
		 * The boolean-valued attribute x.mark indicates whether
		 * node x has lost a child since the last time x was made the child of another node.
		 * Newly created nodes are unmarked, and a node x becomes unmarked whenever it
		 * is made the child of another node. Until we look at the DECREASE-KEY operation
		 * in Section 19.3, we will just set all mark attributes to FALSE .
		 */
		this.mark = false; // Newly created nodes are unmarked
	}
}
