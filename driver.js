import { Tree, prettyPrint } from "./main.js";

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomArray(maxNumOfElements = 15) {
  let array = [];
  for (let i = 0; i < maxNumOfElements; i++) {
    array.push(randomInt(100));
  }
  return array;
}

function printTraversals(tree) {
  const levelOrderArray = [];
  tree.levelOrder((node) => {
    levelOrderArray.push(node.data);
  });
  console.log(`Level Order: ${levelOrderArray}`);

  const preOrderArray = [];
  tree.preOrder((node) => {
    preOrderArray.push(node.data);
  });
  console.log(`PreOrder: ${preOrderArray}`);

  const postOrderArray = [];
  tree.postOrder((node) => {
    postOrderArray.push(node.data);
  });
  console.log(`PostOrder: ${postOrderArray}`);

  const inOrderArray = [];
  tree.inOrder((node) => {
    inOrderArray.push(node.data);
  });
  console.log(`InOrder: ${inOrderArray}`);
}

const tree = new Tree(randomArray());
prettyPrint(tree.root);
console.log(`Balanced: ${tree.isBalanced()}`);
printTraversals(tree);

tree.insertValue(tree.root, randomInt(100));
tree.insertValue(tree.root, randomInt(100));
tree.insertValue(tree.root, randomInt(100));
tree.insertValue(tree.root, randomInt(100));
tree.insertValue(tree.root, randomInt(100));
tree.insertValue(tree.root, randomInt(100));
tree.insertValue(tree.root, randomInt(100));
tree.insertValue(tree.root, randomInt(100));
tree.insertValue(tree.root, randomInt(100));
tree.insertValue(tree.root, randomInt(100));
console.log(`\nBalanced: ${tree.isBalanced()}`);
tree.rebalance();
printTraversals(tree);
console.log(`Balanced: ${tree.isBalanced()}`);
prettyPrint(tree.root);
