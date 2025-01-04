class Node {
    constructor (data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor (elements) {
        this.elements = elements;
        this.root = this.buildTree(this.elements);
    }

    buildTree(array) {
        const sorted = mergeSort(array);
        return new Node(sorted[0]);
    }
}

function mergeSort(arr) {
  if (arr.length == 1) {
    return arr;
  } else {
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

const ta = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(ta.root);

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

prettyPrint(ta.root);