class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {  
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */
  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */
 insertRecursively(val, current = this.root) {
    // If the tree is empty, insert at the root
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    if (val < current.val) {
      if (current.left === null) {
        current.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.left);
    } else {
      if (current.right === null) {
        current.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.right);
    }
  }
  

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */
  find(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) return current;
      current = val < current.val ? current.left : current.right;
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */
  findRecursively(val, current = this.root) { 
    if (!current) return undefined;
    if (val === current.val) return current;
    if (val < current.val) return this.findRecursively(val, current.left);
    return this.findRecursively(val, current.right);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */
  dfsPreOrder(current = this.root, result = []) {
    if (!current) return result;
    result.push(current.val);
    this.dfsPreOrder(current.left, result);
    this.dfsPreOrder(current.right, result);
    return result;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */
  dfsInOrder(current = this.root, result = []) {
    if (!current) return result;
    this.dfsInOrder(current.left, result);
    result.push(current.val);
    this.dfsInOrder(current.right, result);
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */
  dfsPostOrder(current = this.root, result = []) {
    if (!current) return result;
    this.dfsPostOrder(current.left, result);
    this.dfsPostOrder(current.right, result);
    result.push(current.val);
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */
  bfs() {
    const queue = [];
    const result = [];
    if (this.root) queue.push(this.root);
    while (queue.length) {
      const current = queue.shift();
      result.push(current.val);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    return result;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */
  remove(val, current = this.root, parent = null) {
    while (current) {
      if (val < current.val) {
        parent = current;
        current = current.left;
      } else if (val > current.val) {
        parent = current;
        current = current.right;
      } else {
        if (!current.left && !current.right) {
          if (parent) {
            if (parent.left === current) parent.left = null;
            else parent.right = null;
          } else {
            this.root = null;
          }
        } else if (!current.left || !current.right) {
          const child = current.left || current.right;
          if (parent) {
            if (parent.left === current) parent.left = child;
            else parent.right = child;
          } else {
            this.root = child;
          }
        } else {
          let successorParent = current;
          let successor = current.right;
          while (successor.left) {
            successorParent = successor;
            successor = successor.left;
          }
          current.val = successor.val;
          if (successorParent.left === successor) successorParent.left = successor.right;
          else successorParent.right = successor.right;
        }
        return current;
      }
    }
    return null;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */
  isBalanced() {
    const getHeight = (node) => {
      if (!node) return 0;
      const leftHeight = getHeight(node.left);
      const rightHeight = getHeight(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    };
    const check = (node) => {
      if (!node) return true;
      const leftHeight = getHeight(node.left);
      const rightHeight = getHeight(node.right);
      if (Math.abs(leftHeight - rightHeight) > 1) return false;
      return check(node.left) && check(node.right);
    };
    return check(this.root);
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */
  findSecondHighest(current = this.root) {
    if (!this.root || (!this.root.left && !this.root.right)) return;

    while (current) {
      if (current.left && !current.right) {
        return this.findSecondHighest(current.left);
      }
      if (current.right && !current.right.left && !current.right.right) {
        return current.val;
      }
      current = current.right;
    }
  }
}

module.exports = BinarySearchTree;
