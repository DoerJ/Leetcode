# Tree

### Tree traversal
![alt text](https://www.geeksforgeeks.org/wp-content/uploads/2009/06/tree12.gif)
#### In-order traversal(left, root, right)
```javascript
var inorderTraversal = function(root) {
    var sol = new Array();
    if(root === null) return sol;
    var search = function(node) {
        if(node === null) return;
        if(node.left !== null) search(node.left);
        sol.push(node.val);
        if(node.right !== null) search(node.right);
    }
    search(root);
    return sol;
};
```
