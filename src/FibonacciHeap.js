import Node from './Node';

import list_insert from './list_insert';
import list_remove from './list_remove';
import list_concatenate from './list_concatenate';
import list_reset_parent from './list_reset_parent';

import consolidate from './consolidate';
import cut from './cut';
import cascading_cut from './cascading_cut';

/**
 * See CLRS09 Chapter 19 on the Fibonacci Heap.
 */
export default class FibonacciHeap {
	/**
	 * Make-heap: creates a new empty heap.
	 *
	 * To make an empty Fibonacci heap, the MAKE-FIB-HEAP procedure
	 * allocates and returns the Fibonacci heap object H, where H.n = 0 and
	 * H.min = NIL ; there are no trees in H. Because t(H) = 0 and m(H) = 0,
	 * the potential of the empty Fibonacci heap is pot(H) = 0. The amortized
	 * cost of MAKE-FIB-HEAP is thus equal to its O(1) actual cost.
	 */
	constructor(compare) {
		this.compare = compare; // Comparison function
		/**
		 * We access a given Fibonacci heap H by a pointer H.min to the root of
		 * a tree containing the minimum key; we call this node the minimum
		 * node of the Fibonacci heap. If more than one root has a key with the
		 * minimum value, then any such root may serve as the minimum node.
		 * When a Fibonacci heap H is empty, H.min is NIL.
		 */
		this.min = null;
	}

	/**
	 * Find-min: simply return the top element of the heap.
	 */
	head() {
		if (this.min === null) return undefined;
		return this.min.value;
	}

	/**
	 * Minimum: return a pointer to the element whose key is minimum
	 *
	 * The minimum node of a Fibonacci heap H is given by the pointer H.min, so
	 * we can find the minimum node in O(1) actual time. Because the potential
	 * of H does not change, the amortized cost of this operation is equal to
	 * its O(1) actual cost.
	 */
	headreference() {
		return this.min;
	}

	/**
	 */
	pop() {
		const min = this.popreference();
		return min === null ? undefined : min.value;
	}

	/**
	 * FIB-HEAP-EXTRACT-MIN(H):
	 *
	 * Extracting the minimum node
	 *
	 * The process of extracting the minimum node is the most complicated of
	 * the operations presented in this section. It is also where the delayed
	 * work of consolidating trees in the root list finally occurs. The
	 * following pseudocode extracts the minimum node. The code assumes for
	 * convenience that when a node is removed from a linked list, pointers
	 * remaining in the list are updated, but pointers in the extracted node
	 * are left unchanged. It also calls the auxiliary procedure CONSOLIDATE,
	 * which we shall see shortly.
	 */
	popreference() {
		const z = this.min;
		if (z === null) return null;
		if (z.children !== null) {
			list_reset_parent(z.children);
			list_concatenate(z, z.children);
		}

		if (z === z.next) this.min = null;
		else {
			list_remove(z);
			this.min = consolidate(this.compare, z.next);
		}

		z.next = z; // TODO remove this
		z.prev = z;
		z.children = null;
		z.degree = 0;
		z.mark = false;
		return z;
	}

	/**
	 * Create a new node for the inserted element and put it into the heap.
	 */
	push(value) {
		const node = new Node(value);
		return this.pushreference(node);
	}

	/**
	 * Insert: insert new node.
	 * /!\ ref.next = ref.prev = ref which means all references that are
	 * external to the tree must reset .next and .prev and one must not call
	 * FibonacciHeap#pushreference with an internal reference from this tree or
	 * another, except the root of another tree.
	 *
	 * Change in potential is 1. Therefore amortized cost is O(1).
	 */
	pushreference(ref) {
		if (this.min === null) {
			// Create a root list for H containing just x (by precondition)
			this.min = ref;
		} else {
			// This.min != null != ref
			// Insert x into H's root list
			list_insert(this.min, ref);
			// Update minimum
			if (this.compare(ref.value, this.min.value) < 0) {
				this.min = ref;
			}
		}

		return ref;
	}

	/**
	 * Union: Uniting two Fibonacci heaps
	 *
	 * The following procedure unites Fibonacci heaps H_1 and H_2, destroying
	 * H_1 and H_2 in the process. It simply concatenates the root lists of H_1
	 * and H_2 and then determines the new minimum node. Afterward, the objects
	 * representing H_1 and H_2 will never be used again.
	 *
	 * /!\ Assumes the same comparison function is used in both trees.
	 *
	 * Change in potential is zero. Amortized cost is O(1), the actual cost.
	 */
	meld(other) {
		const ref = other.min;
		if (ref === null) return;
		if (this.min === null) this.min = ref;
		else {
			// This.min != null != ref
			// Concatenate the root list of H_2 with the root list of H
			list_concatenate(this.min, ref);
			// Update minimum
			if (this.compare(ref.value, this.min.value) < 0) {
				this.min = ref;
			}
		}
	}

	/**
	 * Synonym for FibonacciHeap#meld.
	 * TODO Remove this.
	 */
	merge(other) {
		this.meld(other);
	}

	/**
	 * @param {Node} ref Non-null internal node object.
	 * @param {Object} value The new value for ref.
	 */
	update(ref, value) {
		const d = this.compare(value, ref.value);

		if (d < 0) this.decreasekey(ref, value);
		else if (d > 0) this.increasekey(ref, value);
		else ref.value = value;
	}

	/**
	 * FIB-HEAP-DECREASE-kEY:
	 * @param {Node} ref Non-null internal node object.
	 * @param {Object} value The new value for ref.
	 */
	decreasekey(ref, value) {
		ref.value = value;
		if (ref !== this.min) {
			// This.min != null, ref != null
			const y = ref.parent;
			if (y !== null && this.compare(ref.value, y.value) < 0) {
				cut(ref, y);
				list_insert(this.min, ref);
				for (const x of cascading_cut(y)) list_insert(this.min, x);
			}

			if (this.compare(ref.value, this.min.value) < 0) {
				this.min = ref;
			}
		}
	}

	/**
	 * Increase-key: remove the item at the key to be increased, replace
	 * the key with a larger key, then push the result back into the heap.
	 *
	 * @param {Node} ref Non-null internal node object.
	 * @param {Object} value The new value for ref.
	 *
	 */
	increasekey(ref, value) {
		this.delete(ref);

		ref.value = value;

		this.pushreference(ref);
	}

	/**
	 * Delete
	 * ref must be internal
	 * ref.prev and ref.next get reset to null
	 */
	delete(ref) {
		if (ref !== this.min) {
			// This.min != null, ref != null
			const y = ref.parent;
			if (y !== null) {
				cut(ref, y);
				list_insert(this.min, ref);
				for (const x of cascading_cut(y)) list_insert(this.min, x);
			}

			this.min = ref;
		}

		this.popreference();
	}
}
