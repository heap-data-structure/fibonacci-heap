# Theory

The Fibonacci heaps guarantees that decrease-key operations can be executed in
amortized constant time.

> The Fibonacci heap is of interest only if the user needs the decrease-key
> operation heavily. Use another data structure with better constants otherwise.

Recall that for any sequence of operations, the sum of the real costs of the
operations is upper bounded by the sum of the amortized costs of the
operations (as long as our potential stays non-negative).

## Idea

A Fibonacci heap is a collection of Fibonacci trees. The minimum key is held by
the root of one of these trees. We implement this collection of trees as a
circular list of pointers to root nodes called the *root list*. We access this
list via a pointer to the root holding the smallest key. Maintaining this
pointer allows easy access to the minimum key held in the heap.
Certain nodes of the Fibonacci trees will be marked for a purpose explained
later.

We amortize the cost of each operation on a heap `H` with `n` elements
using the following potential `P(H) = R(H) + 2 M(H)` where `R(H)` is the size
of the root list of `H` and `M(H)` is the number of marked nodes of `H`.

Let `D(H)` denote the maximum degree of a node in `H`, then the real cost,
potential change, and amortized cost of the heap operations are respectively:

  - MAKE-HEAP: `O(1)`, `0`, `O(1)`.
  - INSERT: `O(1)`, `1`, `O(1)`.
  - MELD: `O(1)`, `0`, `O(1)`
  - DECREASE-KEY: `O(c)`, `2-c`, `O(1)`
  - DELETE-MIN: `O(R(H) + D(H))`, `O(1)-R(H)` ,`O(D(H))`

Where `c` in DECREASE-KEY can be has large as the height of the tallest tree in
our collection.

To obtain a good bound on the amortized cost of the DELETE-MIN
operation we make sure each subtree of a node `x` has `size(x) >=
phi^degree(x)` (`phi` is the golden ratio `1.618...`) so that `D(H) = O(log
n)`.

### How to keep the degrees low

Whenever the decision is made to add a node to a parent as a child (link),
we guarantee that the child's degree is equal to the parent's degree.

If this child is the ith node to be added to the parent, its degree is
therefore i-1.

Whenever a child is removed from a parent (cut), one of two things happens:

  - if the parent is marked, we cut it.
  - if the parent is not marked, we mark it.

This guarantees that the degree of the ith child of a parent is at least i - 2.

It can then be proven that the size of any node x of degree k is
`size(x) >= F_{k+2} >= phi^k` where `F_i` is the ith Fibonacci number.

*Hint: `F_{k+2} = 1 + F_0 + F_1 + ... + F_k`.*

#### Problems

We may have to cut repeatedly if a chain of ancestors is marked when we cut a
node. We can amortize this cost because each cut ancestors can be unmarked.
Hence the number of marked nodes drops proportionally to the number of cut
nodes.

The number of root nodes may grow arbitrarily large through INSERT, MERGE, and
DECREASE-KEY operations. This will increase the real cost of the next
DELETE-MIN operation but also the potential of the heap.
The DELETE-MIN operation will therefore include a
restructuring procedure leveraging this high potential to amortize its high
cost.

## Heap Operations

This section details the implementation of standard heap operations in the
Fibonacci heap.

### MAKE-HEAP

Initialize an empty heap. Real cost is O(1) and initial potential is zero.
Amortized cost is therefore O(1).

### INSERT

Add new node as a root node. Update minimum with a single comparison.
The real cost of this operation is constant. The change of potential is one.
The amortized cost of this operation is therefore O(1).

### MELD

Concatenate heaps root lists in constant time. Update minimum with a single
comparison. The real cost of this operation is constant and the change of
potential is zero. Amortized cost is therefore O(1).

NB: Insert is meld where one of the heaps contains a single node.

### DECREASE-KEY

We can update our structure after decreasing the key of a node as follows:

  1. If the node is already the minimum, there is nothing to do.
  2. Otherwise, if the node is not a root node and has now a smaller key than
     its parent, cut it and add it to the root list.
  3. Finally, update the minimum of the root list if necessary.

Note that in 2. we have to recursively cut ancestor nodes until an unmarked
ancestor is reached to guarantee the small degree property of the nodes.
Fortunately, as already noted, we can amortize this cost because each cut
ancestors can be unmarked. Hence the number of marked nodes drops
proportionally to the number of cut nodes. The exact computation gives, for `c`
cut nodes, a real cost of `O(c)`, a change of potential of `2-c`, and an
amortized cost of `O(1)`.

### DELETE-MIN

Minimum node is a root node. We can add all children of the deleted node as
root nodes. This increases the number of root nodes by the degree of the
deleted node. Since the degree of a node is at most `D(H)`, the number of root nodes
increases by at most `D(H)`.

The minimum needs to be updated. This could be any of the root nodes after
deletion. Updating the minimum will therefore cost something proportional to
the number of root nodes after the addition of the children of the deleted
node, that is `R(H) + D(H)`.

To amortize this costly operation, we need to reduce the number of nodes in the
root list. We do so by making sure there is at most one node of each degree in
the root list. We call this procedure CONSOLIDATE. Once that procedure is
finished, there are at most `D(H) + 1` nodes left in the root list. The real
cost of the procedure is proportional to `R(H) + D(H)` (see [below](#CONSOLIDATE)),
the same as updating the minimum.

> There are at most `D(H) + 1` left in the root list after this procedure is
> run because the list contains at most one node of each degree:
> one node of degree `0`, one node of degree `1`, ..., and one node of degree
> `D(H)`.

To sum up, the real cost of DELETE-MIN is `O(R(H)+D(H))`, the change of
potential is at most `O(1) - R(H)`, and the amortized cost is therefore
`O(D(H))`.

#### CONSOLIDATE

This procedure evokes the construction of binomial trees: given a list of
trees, repeatedly merge trees whose roots have identical degree until no two
trees have identical degrees. For further reference let `N` be the size of the
list of trees to merge and let `N'` be the number of trees left after the
procedure.

Merging two trees corresponds to making one tree the child of the other. When a
tree is made the child of another it is removed from the merge list.

Hence a tree can be made the child of another at most once and, when this
happens, the size of the merge list shrinks by one. Therefore the total number
of merge operations is linear in `N-N'`.

Each tree can be processed in constant time and hence the total cost of
consolidate is proportional to `N`.
