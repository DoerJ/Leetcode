# leetcode-my-solutions
My solutions to easy &amp; medium challenges
## Algorithms and Examples

### Recursion
Recursion is a kind of program flow where the function call itself. Recursion is usually used as a techniques by backtracking search methodology(DFS), and computation for tree.

Example: Symmetric tree
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    if(root !== null) return isMirror(root.left, root.right);
    return true;
};

var isMirror = function(leftNode, rightNode) {
    // the boundaries
    if(leftNode === null && rightNode === null) return true;
    else if(leftNode === null || rightNode === null) return false;
    return (leftNode.val === rightNode.val) && isMirror(leftNode.left, rightNode.right)
    && isMirror(leftNode.right, rightNode.left);
}
```
Example 2: Find the maximum depth of tree
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    var max = 0;
    var getDepth = function(node, depth) {
        if(node !== null) {
            if(depth > max) max = depth;
            getDepth(node.left, depth + 1);
            getDepth(node.right, depth + 1);
        }
    }
    getDepth(root, 1);
    return max;
};

```

Example 3: Binary tree in-order traverse
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    // in-order: left, root, right
    var nodes = new Array();
    var inOrderTraverse = function(node) {
        if(node !== null) {
            inOrderTraverse(node.left);
            nodes.push(node.val);
            inOrderTraverse(node.right);
        }
    }
    if(root !== null) inOrderTraverse(root);
    return nodes;
};
```

### Backtracking Searching(DFS)
An algorithm that iterates through all the possible solution by incrementally building candidates to solutions. "Backtrack" refers to getting back to the steps before after reaching some levels of the search tree. Suitable for problems: permutations, subsets

Example 1: Permutation
```javascript
/**
Given a collection of distinct integers, return all possible permutations.
Example:
Input: [1,2,3]
Output:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    var sol = new Array();
    if(nums.length === 0) {
        return sol;
    }
    else {
        var i;
        for(i = 0; i < nums.length; i++) {
            var sub_sol = new Array();
            sub_sol.push(nums[i]);
            var remainings = nums.slice();
            remainings.splice(i, 1);
            backtrackingSearch(sub_sol, remainings, sol);
        }
    }
    return sol;
};

var backtrackingSearch = function(sub_sol, remainings, sol) {
    // base case(the bottom level of search tree)
    if(remainings.length === 0) {
        sol.push(sub_sol);
    }
    else {
        var j;
        for(j = 0; j < remainings.length; j++) {
            var sub_sols = sub_sol.slice();
            sub_sols.push(remainings[j]);
            var sub_remainings = remainings.slice();
            sub_remainings.splice(j, 1);
            backtrackingSearch(sub_sols, sub_remainings, sol);
        }
    }
}

```

Example 2: Find all the subsets
```javascript
/**
Given a set of distinct integers, nums, return all possible subsets (the power set).

Note: The solution set must not contain duplicate subsets.

Example:

Input: nums = [1,2,3]
Output:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]

 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    var sols = new Array();
    var sub_sols = new Array();
    var current_pos = 0;
    backtrackingSearch(sub_sols, sols, current_pos, nums);
    return sols;
};

var backtrackingSearch = function(sub_sols, sols, current_pos, nums) {
    sols.push(sub_sols);
    var i;
    // set the initial iterator as the current position to avoid the duplication
    for(i = current_pos; i < nums.length; i++) {
        backtrackingSearch(sub_sols.concat(nums[i]), sols, i + 1, nums);
    }
}
```

Example 3: Generate parenthesis
```javascript
/**
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

For example, given n = 3, a solution set is:

[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    var sols = new Array();
    if(n < 1) return sols;
    backtrackingSearch("", 0, 0, n, sols);
    return sols;
};

var backtrackingSearch = function(parenthesis, open, close, limit, sols) {
    // base case
    if(parenthesis.length === limit * 2) sols.push(parenthesis);
    else {
        if(open < limit) {
            backtrackingSearch(parenthesis.concat('('), open + 1, close, limit, sols);
        }
        if(close < open) {
            backtrackingSearch(parenthesis.concat(')'), open, close + 1, limit, sols);
        }
    }
}
```

### Binary Search(half-interval search)
The search algorithm that finds the position of a target value within a sorted array, normally using pointers lo, mid, hi. Suitable from problems that contain sorted array, and requires O(logn) time and space complexity.

Example: Range searching
```javascript
/**
Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.
Your algorithm's runtime complexity must be in the order of O(log n).
If the target is not found in the array, return [-1, -1].
Example 1:
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    // if empty list
    if(nums.length === 0) return[-1,-1];
    var lo = 0;
    var hi = nums.length - 1;
    var mid;
    while(lo !== hi) {
        mid = Math.round((lo + hi) / 2);
        if(hi - lo === 1) {
            switch(nums[lo] === target) {
                case true:
                    break;
                case false:
                    lo = hi;
                    break;
            }
            break;
        }
        if(nums[mid] >= target) {
            hi = mid;
        }
        else if(nums[mid] < target) {
            lo = mid;
        }
    }
    // lo = mid on leftmost of the target values
    var start = lo;
    var end = lo;
    var range = new Array();
    if(nums[start] === target) {
        while(nums[end + 1] === target && end < nums.length) {
            end++;
        }
        range = [start,end];
    }
    else {
        range = [-1,-1];
    }
    return range;
};

```

### Dynamic Programming
The algorithm breaks the complicated problem down into sub-problems, and solve each sub-problem recursively. The steps are:
1. Construct array to contain optimal solution for each sub-problem
2. Recursively define the value of an optimal solution for each sub-problem
3. Fill up the array
4. Construct the optimal solution from the filled array

Dynamic programming can be implemented by either the top-down approach, that is, **recursion**, or the bottom-up approach called **memorization**. Bottom-up approach is particularly used to avoid any use of recursion to save the memory space, since what recursion does is to keep building up the call stack which is very memory-consuming.

An typical example for dynamic programming would be solving Fibonacci numbers. If want to compute Fib(22), we break it down into computing the values of Fib(20) and Fib(21). Thus we can define the solution recursively as Fib(n) = Fib(n-2) + Fib(n-1).

Suitable for problems: string problems

Note: The following examples are all implemented in DP with memorization(bottom-up approach)

Example 1: The subarray with maximum sum
```javascript
/**
Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.
Example:
Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    if(nums.length === 1) {
        return nums[0]
    }
    var dp_array = new Array(nums.length);

    // initialize the array
    dp_array[0] = nums[0];
    var sol = nums[0];
    var i;
    for(i = 1; i < nums.length; i++) {
        dp_array[i] = Math.max(0, dp_array[i - 1]) + nums[i];
        sol = Math.max(dp_array[i], sol);
    }
    return sol;
};
```

Example 2: Staircase problem
```javascript
/**
You are climbing a stair case. It takes n steps to reach to the top.
Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
Note: Given n will be a positive integer.
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    var climb_steps = new Array();
    climb_steps.push(1);
    climb_steps.push(1);
    var i;
    for(i = 2; i < n + 1; i++) {
        climb_steps[i] = climb_steps[i - 1] + climb_steps[i - 2];
    }
    return climb_steps[n];
};
```

Example 3: Find the unique paths
```javascript
/**
A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).
The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).
How many possible unique paths are there?
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    // corner cases
    if(m === 1 && n === 1) return 1;
    else if(m < 1 || n < 1) return 0;
    else if(m === 1 || n === 1) return 1;
    var paths = new Array();

    // initialization
    var i;
    var j;
    for(i = 0; i < n + 1; i++) {
        var ini_arr = new Array();
        for(j = 0; j < m + 1; j++) {
            ini_arr.push(0);
        }
        paths.push(ini_arr);
    }
    // (1,2) --> 1
    paths[1][2] = 1;
    // (2,1) --> 1
    paths[2][1] = 1;
    // (2,2) --> 2
    paths[2][2] = 2;
    console.log(paths)

    var row;
    var col;
    for(row = 1; row <= n; row++) {
        for(col = 1; col <= m; col++) {
            if(row == 1 && col === 1) continue;
            else if(row === 1 && col === 2) continue;
            else if(col === 1 && row === 2) continue;
            else if(row === 2 && col === 2) continue;
            else paths[row][col] = paths[row - 1][col] + paths[row][col - 1];
        }
    }
    return paths[n][m];
};
```

### Sorting

#### Counting Sort
Counting sort is a sorting algorithm which stores the counts of each integer elements in the list, modify the count array, and finally place each element into correct index in the output sequence. The steps are:
1. Create a count array to store the count(frequency) of each unique element in the list
2. Modify the count array such that each element at each index stores the sum of the previous counts
3. Iterate through the input sequence and place each element into corresponding index in the output sequence

The key technique of this sorting algorithm is to use the input values to represent their indexes in the count array. Thus counting sort is only suitable for problem: sort the non-negative integers

Example: Sort colors
```javascript
/**
Given an array with n objects colored red, white or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white and blue.
Here, we will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.

Note: You are not suppose to use the library's sort function for this problem.

Example:

Input: [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    var counts = [];
    var count = 1
    // store the count for integers
    while(count <= 3) {
        counts.push(0);
        count++;
    }
    var j;
    for(j = 0; j < nums.length; j++) {
        counts[nums[j]]++;
    }
    // modify the count array
    for(j = 1; j <= 2; j++) {
        counts[j] += counts[j - 1];
    }
    var temp_nums = nums.slice();
    // place integers to output list
    for(j = 0; j < temp_nums.length; j++) {
        var pos = counts[temp_nums[j]] - 1;
        nums[pos] = temp_nums[j];
        counts[temp_nums[j]]--;
    }
    return;
};
```

#### Selection sort
Selection sort is a sorting algorithm which iteratively finds the minimum element of the sub-arrays(i.e., [nums[i + 1], ... , nums[nums.length - 1]]), and places that minimum element at index i. The algorithm sorts element **in-place**, thus efficient in term of space complexity. The time complexity is O(n^2) since two nested loops are used to iteratively find the minimum element, however, never makes more than O(n) swaps and saves many memory writes.

Example: The shortest unsorted sub-array
```javascript
/**
Given an integer array, you need to find one continuous subarray that if you only sort this subarray in ascending order,
then the whole array will be sorted in ascending order, too.
You need to find the shortest such subarray and output its length.

Example 1:
Input: [2, 6, 4, 8, 10, 9, 15]
Output: 5
Explanation: You need to sort [6, 4, 8, 10, 9] in ascending order to make the whole array sorted in ascending order.
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function(nums) {

    // the boundary of unsorted sub-array
    var left = nums.length;
    var right = 0;

    var i;
    var j;
    for(i = 0; i < nums.length - 1; i++) {
        for(j = i + 1; j < nums.length; j++) {
            if(nums[j] < nums[i]) {
                left = Math.min(left, i);
                right = Math.max(right, j);
            }
        }
    }
    console.log('right: ' + right + ' left: ' + left)
    return right - left < 0 ? 0 : right - left + 1;
};
```

#### Merge sort
Merge sort is a divide and conquer algorithm which recursively divides the unsorted array halves until all the sub-arrays are of size 1, then sort and merge each sub-array until the entire array is sorted. The following is the pseudo code of merge sort:
<pre>
MergeSort(arr[], l, r)
  if l < r
    - Find the middle point m of the array
    - Recursively MergeSort(arr[], l, m) the first half of the array
    - Recursively MergeSort(arr[], m + 1, r) the second half of the array
    - Merge(arr[], l, m, r)

Merge(arr[], l, m, r)
  Create the temp arrays L1 and L2 to store the item values in two halves
  Find the size of two halves n1 and n2 to be merged
  Create iterators i, j = 0, and k to track the index position of arr[] to fill in the item in-place
  while(i < n1 && j < n2)
    Compare L1[i] and L2[j], and place the smaller item into arr[k]
  Copy any remaining items in L1 or L2 into arr[k]
</pre>

The time complexity of merge sort is O(NlogN) since merge sort always divides array into halves and takes O(logN) times in total to divide into sub-arrays of size 1(think it as a binary tree). Each layer takes linear time to sort and merge, thus O(logN)O(N) = O(NlogN) in total on time complexity.  

## Tips

### Avoid inner function in JavaScript
An inner function is a function nested inside another function.
```javascript
function foo(a, b) {
    function bar() {
        return a + b;
    }

    return bar();
}

foo(1, 2);
```
In Javascript, functions are values. Whenever declare a function, JavaScript engine creates a function object which is a value, that can be assigned to any other variable or passed to a function as a returned value. When foo() is called, a function object bar() is created, and destroyed at the time foo() exits. If foo() gets called multiple times(says 100 times), then 100 function objects called bar() will be created and destroyed, which causes many unnecessary works for JavaScript engine, and also brings down the efficiency in terms of memory space and runtime.

To avoid it, it's better to place bar() outside foo().
```javascript
function foo(a, b) {
    return bar(a, b);
}

function bar(a, b) {
    return a + b;
}

foo(1, 2);
```
In this way, bar() function object will be created only once. When foo() gets called, bar() will also be called and passed to foo() as a returned value.

### Object spread operator
The object spread operator "..." is used for spreading out the properties of the an object to a new object. The following is an example of spread operator:
```javascript
var hello = ['hello']
var world = [...hello, 'world']

console.log(world) // the output: ['hello', 'world']
```

In the code segment above, '...' operator is passing the properties(values) of array "hello" into array "world", concatenating the values of the both arrays. The use of '...' operator is similar to f string in python.

### Sort tuples in JavaScript
To sort the list based on specific elements in each tuple within the list, we can use sort() and pass in the function as param to define the sorting rule.

Example:
```javascript
// sort the following list based on the second element of each tuple
var arr = [[3,2], [4,1], [2,9]]

// sort the tuples
arr.sort(function(a, b) { return a[1] - b[1] });

// output: [[4, 1], [3, 2], [2, 9]]
console.log(arr)
```
