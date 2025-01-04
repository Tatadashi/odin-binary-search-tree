class Node {
    constructor (data) {
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
    }
}

class Tree {
    constructor (elements) {
        this.elements = elements;
        this.root = this.buildTree(this.elements);
    }

    buildTree(array) {
        return array[0];
    }
}

const ta = new Tree([1, 2, 3]);
console.log(ta);