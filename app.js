import { prettyPrint } from "./prettyPrint.js";

class Node {
  constructor(value = null, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  sortAndRemoveDuplicates(array) {
    const arr = [...new Set(array)].sort((a, b) => a - b);
    //console.log("array:", arr);
    return arr;
  }

  buildTree(arr) {
    let sorted = this.sortAndRemoveDuplicates(arr);
    let mid = Math.floor(sorted.length / 2);

    if (sorted.length === 0) return null;

    /*console.log(
      `Sorted array: ${sorted}\n Mid: ${sorted[mid]}\n Left: ${sorted.slice(
        0,
        mid
      )}\n Right: ${sorted.slice(mid + 1)}\n\n`
    );*/

    const root = new Node(
      sorted[mid],
      this.buildTree(sorted.slice(0, mid)),
      this.buildTree(sorted.slice(mid + 1))
    );

    return root;
  }

  insert(value, root = this.root) {
    if (root === null) {
      return new Node(value);
    }

    if (value > root.value) {
      root.right = this.insert(value, root.right);
    } else {
      root.left = this.insert(value, root.left);
    }
    return root;
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.insert(17);
tree.insert(18);
tree.insert(16);
prettyPrint(tree.root);
