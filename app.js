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
  buildTree(arr) {
    let sorted = this.sortAndRemoveDuplicates(arr);
    let mid = Math.floor(sorted.length / 2);

    if (sorted.length === 0) return null;

    const root = new Node(
      sorted[mid],
      this.buildTree(sorted.slice(0, mid)),
      this.buildTree(sorted.slice(mid + 1))
    );

    return root;
  }

  sortAndRemoveDuplicates(array) {
    const arr = [...new Set(array)].sort((a, b) => a - b);
    return arr;
  }

  findMinimum(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
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

  remove(value, currentNode = this.root, previousNode = null) {
    if (currentNode == null) return currentNode;

    if (currentNode.value === value) {
      //case 1: delete a leaf
      if (currentNode.left == null && currentNode.right == null) {
        if (previousNode.right == currentNode) {
          previousNode.right = null;
        } else {
          previousNode.left = null;
        }
        //case 2: delete a node with single child in bst
      } else if (currentNode.left === null) {
        if (previousNode.right == currentNode) {
          previousNode.right = currentNode.right;
        } else {
          previousNode.left = currentNode.right;
        }
      } else if (currentNode.right === null) {
        if (previousNode.right == currentNode) {
          previousNode.right = currentNode.left;
        } else {
          previousNode.left = currentNode.left;
        }

        //case 3: delete a node with both childrens in bst
      } else {
        const succesor = this.findMinimum(currentNode.right);
        console.log("before", currentNode.value);
        currentNode.value = succesor.value;
        console.log("after", currentNode.value);
        this.remove(succesor.value, currentNode.right);
      }
      return currentNode;
    }

    if (currentNode.value > value) {
      previousNode = currentNode;
      currentNode = currentNode.left;
      this.remove(value, currentNode, previousNode);
    } else {
      previousNode = currentNode;
      currentNode = currentNode.right;
      this.remove(value, currentNode, previousNode);
    }
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.insert(17);
tree.insert(18);
tree.insert(16);
tree.insert(323);
tree.insert(330);
tree.insert(335);
tree.insert(326);
tree.insert(322);
prettyPrint(tree.root);
tree.remove(324);
prettyPrint(tree.root);
