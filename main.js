class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(elements) {
    if (!Array.isArray(elements)) {
      throw new Error("Tree needs array as parameter upon initialization");
    }
    this.elements = elements;
    this.root = this.buildTree(this.elements);
  }

  buildTree(array) {
    const sorted = mergeSort(array);
    const unique = [...new Set(sorted)];
    return recursiveBST(unique, 0, unique.length - 1);
  }
  //rebalance trees (esp if this.root is null), atm this.elements does not change
  insertValue(currentRoot, value) {
    if (currentRoot === null) {
      return new Node(value);
    }

    if (value < currentRoot.data) {
      currentRoot.left = this.insertValue(currentRoot.left, value);
    } else if (value > currentRoot.data) {
      currentRoot.right = this.insertValue(currentRoot.right, value);
    } else {
      return currentRoot;
    }
    return currentRoot;
  }
  removeValue(currentRoot, value) {
    if (currentRoot === null) {
      return currentRoot;
    }

    if (value < currentRoot.data) {
      currentRoot.left = this.removeValue(currentRoot.left, value);
    } else if (value > currentRoot.data) {
      currentRoot.right = this.removeValue(currentRoot.right, value);
    } else {
      if (currentRoot.left === null) {
        return currentRoot.right;
      } else if (currentRoot.right === null) {
        return currentRoot.left;
      } else {
        const smallestChild = findSmallestChild(currentRoot.right);
        currentRoot.data = smallestChild.data;
        currentRoot.right = this.removeValue(
          currentRoot.right,
          smallestChild.data
        );
        return currentRoot;
      }
    }
    return currentRoot;
  }
  find(value) {
    let currentRoot = this.root;
    while (currentRoot) {
      if (value < currentRoot.data) {
        currentRoot = currentRoot.left;
      } else if (value > currentRoot.data) {
        currentRoot = currentRoot.right;
      } else {
        return currentRoot;
      }
    }
    return this.root;
  }
  levelOrder(callback) {
    if (!callback) {
      throw new Error("Callback is required for levelOrder");
    }

    if (!this.root) {
      return console.log("Tree is Empty");
    }
    const queue = [];
    queue.push(this.root);
    while (queue.length != 0) {
      const currentNode = queue[0];
      callback(currentNode);
      if (currentNode.left) {
        queue.push(currentNode.left);
      }

      if (currentNode.right) {
        queue.push(currentNode.right);
      }
      queue.shift();
    }
  }
  levelOrderRecursive(queue, callback) {
    if (!callback) {
      throw new Error("Callback is required for levelOrder");
    }

    if (!this.root) {
      return console.log("Tree is Empty");
    }

    if (queue == this.root) {
      queue = [];
      queue.push(this.root);
      return this.levelOrderRecursive(queue, callback);
    } else if (queue.length == 0) {
      //base case here because initial queue will not be an array so .length not execute
      return;
    } else {
      const currentNode = queue[0];
      callback(currentNode);

      if (currentNode.left) {
        queue.push(currentNode.left);
      }

      if (currentNode.right) {
        queue.push(currentNode.right);
      }

      queue.shift();
      return this.levelOrderRecursive(queue, callback);
    }
  }
  inOrder(callback) {
    if (!callback) {
      throw new Error("Callback is required for inOrder");
    }

    if (!this.root) {
      return console.log("Tree is Empty");
    }

    let stack = [];
    let currentNode = this.root;
    while (currentNode || stack != 0) {
      while (currentNode) {
        stack.push(currentNode);
        currentNode = currentNode.left;
      }
      currentNode = stack.pop();
      callback(currentNode);
      currentNode = currentNode.right;
    }
  }
  preOrder(callback) {
    if (!callback) {
      throw new Error("Callback is required for preOrder");
    }

    if (!this.root) {
      return console.log("Tree is Empty");
    }
    let stack = [];
    let currentNode = this.root;
    while (currentNode || stack.length != 0) {
      while (currentNode) {
        stack.push(currentNode);
        callback(currentNode);
        currentNode = currentNode.left;
      }
      currentNode = stack.pop();
      currentNode = currentNode.right;
    }
  }
  postOrder(callback) {
    if (!callback) {
      throw new Error("Callback is required for postOrder");
    }

    if (!this.root) {
      return console.log("Tree is Empty");
    }
    postOrderRecursive(this.root);

    function postOrderRecursive(node) {
      if (!node) {
        return;
      }
      postOrderRecursive(node.left);
      postOrderRecursive(node.right);
      callback(node);
    }
  }
  height(node, currentHeight = 0) {
    if (!node) {
      return --currentHeight;
    }
    currentHeight++;
    return Math.max(
      this.height(node.left, currentHeight),
      this.height(node.right, currentHeight)
    );
  }
}

function findSmallestChild(root) {
  if (root.left) {
    return findSmallestChild(root.left);
  }
  return root;
}

function recursiveBST(arr, start, end) {
  if (start > end) {
    return null;
  }
  const mid = start + Math.floor((end - start) / 2);
  const root = new Node(arr[mid]);
  root.left = recursiveBST(arr, start, mid - 1);
  root.right = recursiveBST(arr, mid + 1, end);
  return root;
}

function mergeSort(arr) {
  if (arr.length == 1) {
    return arr;
  } else if (arr.length > 1) {
    const halfLength = Math.ceil(arr.length / 2);
    const arr1 = arr.slice(0, halfLength);
    const arr2 = arr.slice(halfLength);
    const sortedArr1 = mergeSort(arr1);
    const sortedArr2 = mergeSort(arr2);

    const newArr = [];
    let arr1Index = 0;
    let arr2Index = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr1Index == arr1.length) {
        newArr.push(sortedArr2[arr2Index++]);
      } else if (arr2Index == arr2.length) {
        newArr.push(sortedArr1[arr1Index++]);
      } else if (sortedArr1[arr1Index] <= sortedArr2[arr2Index]) {
        newArr.push(sortedArr1[arr1Index++]);
      } else {
        newArr.push(sortedArr2[arr2Index++]);
      }
    }
    return newArr;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const ta = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
ta.insertValue(ta.root, 2);

prettyPrint(ta.root);
console.log(ta.height(ta.root.left.left))
