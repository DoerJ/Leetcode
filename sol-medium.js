/**
Zig-Zag Conversion
The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this:
(you may want to display this pattern in a fixed font for better legibility)
P   A   H   N
A P L S I I G
Y   I   R
And then read line by line: "PAHNAPLSIIGYIR"
@param {string} s
@param {number} numRows
@return {string}
*/
var convert = function(s, numRows) {
  // a 2-dimensional array
  var conversion = "";
  var matrix = new Array();
  var marginCols = (numRows - 2 < 0) ? 0 : numRows - 2;
  var colFlag = true;
  var strLength = s.length;
  var i = 0;
  var posIndicator;
  while(i < strLength) {
    var colArray = new Array();
    if(colFlag) {
      var j = 0;
      posIndicator = marginCols;
      while(j < numRows) {
        if(i < strLength) {
          colArray.push(s.charAt(i));
          i++;
        }
        else {
          colArray.push(" ");
        }
        j++;
      }
      colFlag = (marginCols === 0) ? true : false;
    }
    else {
      var k = 0;
      while(k < numRows) {
        if(k === posIndicator) {
          colArray.push(s.charAt(i));
        }
        else {
          colArray.push(" ");
        }
        k++;
      }
      posIndicator--;
      colFlag = (posIndicator === 0) ? true : false;
      i++;
    }
    matrix.push(colArray);
  }
  // parse matrix
  var matrixLength = matrix.length;
  var p;
  var q;
  for(p = 0; p < numRows; p++) {
    for(q = 0; q < matrixLength; q++) {
      conversion += matrix[q][p];
    }
  }
  conversion = conversion.split(' ').join('');
  return conversion;
};


/**
Given a string, find the length of the longest substring without repeating characters.
@param {string} s
@return {number}
*/
var lengthOfLongestSubstring = function(s) {
  // sliding window
  var l = 0;
  var r = 1;
  var set = new Set();
  // initialization of set
  set.add(s.charAt(0));
  var length = s.length;
  var longestSub = 1;
  // if empty string
  if(s.length === 0) {
    return 0;
  }
  while(l < length && r < length) {
    if(!set.has(s.charAt(r))) {
      set.add(s.charAt(r));
      r++;
      longestSub = Math.max(set.size, longestSub);
    }
    else {
      set.delete(s.charAt(l));
      l++;
    }
  }
  return longestSub;
};


/**
Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai).
n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0).
Find two lines, which together with x-axis forms a container, such that the container contains the most water.
@param {number[]} height
@return {number}
*/
var maxArea = function(height) {

};


/**
Container With Most Water
Given n non-negative integers a1, a2, ..., an ,
where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0).
Find two lines, which together with x-axis forms a container, such that the container contains the most water.
@param {number[]} height
@return {number}
*/
var maxArea = function(height) {
  var left_pointer = 0;
  var right_pointer = height.length - 1;
  var i = height.length - 2;
  var maxArea = 0;
  while(i >= 0) {
    maxArea = Math.max(maxArea, (right_pointer - left_pointer) *
    Math.min(height[left_pointer], height[right_pointer]));
    if(height[left_pointer] <= height[right_pointer]) {
      left_pointer++;
    }
    else {
      right_pointer--;
    }
    i--;
  }
  return maxArea;
};

/**
Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0?
Find all unique triplets in the array which gives the sum of zero.
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    // sort the array for skipping the duplication
    nums.sort(function(a,b) { return a - b; });
    var left, medium, right;
    var sol = new Array();
    // let left pointer be the fixed pointer
    for(left = 0; left < nums.length - 2; left++) {
        medium = left + 1;
        right = nums.length - 1;
        // if item duplicated, skip the current iteration
        if(left > 0 && nums[left] === nums[left - 1]) continue;
        while(medium < right) {
            var sum = nums[left] + nums[medium] + nums[right];
            if(sum > 0) {
                right--;
            }
            else if(sum < 0) {
                medium++;
            }
            else if(sum === 0) {
                var sub_sol = new Array();
                sub_sol.push(nums[left]);
                sub_sol.push(nums[medium]);
                sub_sol.push(nums[right]);
                sol.push(sub_sol);
                while(nums[medium] === nums[medium + 1]) {
                    medium++;
                }
                while(nums[right] === nums[right - 1]) {
                    right--;
                }
                medium++;
                right--;
            }
        }
    }
    return sol;
};

/**
Given an array nums of n integers and an integer target, find three integers in nums such that the sum is closest to target.
Return the sum of the three integers. You may assume that each input would have exactly one solution.
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    // sort the array to skip the duplications
    nums.sort(function(a, b) { return a - b; });
    var left, medium, right, sum, abs, gap;
    for(left = 0; left < nums.length - 2; left++) {
        medium = left + 1;
        right = nums.length - 1;
        if(left > 0 && nums[left] === nums[left - 1]) continue;
        while(medium < right) {
            gap = nums[left] + nums[medium] + nums[right] - target;
            curr_abs = Math.abs(gap);
            if(sum === undefined || curr_abs < abs) {
                abs = curr_abs;
                sum = nums[left] + nums[medium] + nums[right];
            }
            if(gap === 0) {
                return sum;
            }
            else if(gap > 0) {
                right--;
            }
            else {
                medium++;
            }
        }
    }
    return sum;
};

/**
Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.
A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.
Input: "23"
Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
 * @param {string} digits
 * @return {string[]}
 */
// create map
var dial_map = new Map();
dial_map.set('2', ['a', 'b', 'c']);
dial_map.set('3', ['d', 'e', 'f']);
dial_map.set('4', ['g', 'h', 'i']);
dial_map.set('5', ['j', 'k', 'l']);
dial_map.set('6', ['m', 'n', 'o']);
dial_map.set('7', ['p', 'q', 'r', 's']);
dial_map.set('8', ['t', 'u', 'v']);
dial_map.set('9', ['w', 'x', 'y', 'z']);

var letterCombinations = function(digits) {
    var sol = new Array();
    // initialization for backtracking search
    if(digits.length === 0) {
        return sol;
    }
    else {
        backtrackingSearch("", digits, sol);
    }
    return sol;
};

var backtrackingSearch = function(combination, next, sol) {
    // leaf node
    if(next.length === 0) {
        sol.push(combination);
    }
    else {
        var next_digit = next.charAt(0);
        var i;
        var letters = dial_map.get(next_digit);
        for(i = 0; i < letters.length; i++) {
            backtrackingSearch(combination + letters[i], next.substring(1), sol);
        }
    }
}

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
Given a linked list, remove the n-th node from the end of list and return its head.
Example:
Given linked list: 1->2->3->4->5, and n = 2.
After removing the second node from the end, the linked list becomes 1->2->3->5.
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    var dummy = new ListNode(10);
    dummy.next = head;
    var fir_pointer = dummy;
    var sec_pointer = dummy;
    var i;
    for(i = 0; i < n; i++) {
        fir_pointer = fir_pointer.next;
    }
    while(fir_pointer.next !== null) {
        fir_pointer = fir_pointer.next;
        sec_pointer = sec_pointer.next;
    }
    sec_pointer.next = sec_pointer.next.next;
    return dummy.next;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
Given a linked list, swap every two adjacent nodes and return its head.
You may not modify the values in the list's nodes, only nodes itself may be changed.
Example:
Given 1->2->3->4, you should return the list as 2->1->4->3.
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    // if less than 2 nodes remaining
    if(head === null || head.next === null) {
        return head;
    }
    var fir_node = head;
    var sec_node = head.next;
    // swap the first two nodes
    fir_node.next = sec_node.next;
    sec_node.next = fir_node;
    head = sec_node;
    //recursion on the third node
    head.next.next = swapPairs(head.next.next);
    return head;
};

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

/**
Given a collection of numbers that might contain duplicates, return all possible unique permutations.
Example:
Input: [1,1,2]
Output:
[
  [1,1,2],
  [1,2,1],
  [2,1,1]
]
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    nums.sort();
    var sol = new Array();
    if(nums.length === 0) {
        return sol;
    }
    else {
        var i;
        for(i = 0; i < nums.length; i++) {
            if(i >= 1 && nums[i] === nums[i - 1]) continue;
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
    if(remainings.length === 0) {
        sol.push(sub_sol);
    }
    else {
        var j;
        for(j = 0; j < remainings.length; j++) {
            if(j >= 1 && remainings[j] === remainings[j - 1]) continue;
            var sub_sols = sub_sol.slice();
            sub_sols.push(remainings[j]);
            var sub_remainings = remainings.slice();
            sub_remainings.splice(j, 1);
            backtrackingSearch(sub_sols, sub_remainings, sol);
        }
    }
}

/**
Given two integers n and k, return all possible combinations of k numbers out of 1 ... n.
Example:
Input: n = 4, k = 2
Output:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    var sols = new Array();
    if(n < 1 || k < 1) return permutations;
    else {
        // initialization
        var i;
        var remainings = new Array();
        for(i = 1; i <= n; i++) {
            remainings.push(i);
        }
        var j;
        for(j = 0; j < remainings.length; j++) {
            var sub_sols = new Array();
            sub_sols.push(remainings[j]);
            // make shallow copy of remainings
            var temp_remainings = remainings.slice();
            temp_remainings.splice(0, j + 1);
            backtrackingSearch(sub_sols, sols, temp_remainings, k);
        }
        return sols;
    }
};

var backtrackingSearch = function(sub_sols, sols, temp_remainings, limit) {
    // base case
    if(sub_sols.length === limit) {
        sols.push(sub_sols);
    }
    else {
        var i;
        for(i = 0; i < temp_remainings.length; i++) {
            var temp_sols = sub_sols.slice();
            temp_sols.push(temp_remainings[i]);
            var sub_remainings = temp_remainings.slice();
            sub_remainings.splice(0, i + 1);
            backtrackingSearch(temp_sols, sols, sub_remainings, limit);
        }
    }
}

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

/**
Given a set of candidate numbers (candidates) (without duplicates) and a target number (target), find all unique combinations in candidates where the candidate numbers sums to target.
The same repeated number may be chosen from candidates unlimited number of times.

Note:

All numbers (including target) will be positive integers.
The solution set must not contain duplicate combinations.
Example 1:

Input: candidates = [2,3,6,7], target = 7,
A solution set is:
[
  [7],
  [2,2,3]
]
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    var sols = new Array();
    if(candidates.length === 0) return sols;
    var i;
    for(i = 0; i < candidates.length; i++) {
        var sum = candidates[i];
        var sub_sols = new Array();
        sub_sols.push(candidates[i])
        backtrackingSearch(sum, target, candidates, sub_sols, sols);
    }
    return sols;
};

var backtrackingSearch = function(sum, target, candidates, sub_sols, sols) {
    // base case
    if(sum === target) {
        // sort sub_sols
        sub_sols.sort(function(a, b) { return a - b; });
        // check if duplicated
        if(JSON.stringify(sols).indexOf(JSON.stringify(sub_sols)) === -1) {
            sols.push(sub_sols);
        }
    }
    else if(sum > target) return;
    // sum < target
    else {
        var complement = target - sum;
        var j;
        for(j = 0; j < candidates.length; j++) {
            if(candidates[j] <= complement) {
                var sub_sum = sum;
                sub_sum += candidates[j];
                var temp_sols = sub_sols.slice();
                temp_sols.push(candidates[j]);
                backtrackingSearch(sub_sum, target, candidates, temp_sols, sols);
            }
        }
    }
}

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
    for(i = current_pos; i < nums.length; i++) {
        backtrackingSearch(sub_sols.concat(nums[i]), sols, i + 1, nums);
    }
}

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

/**
Given a collection of candidate numbers (candidates) and a target number (target),
find all unique combinations in candidates where the candidate numbers sums to target.
Each number in candidates may only be used once in the combination.

Note:

All numbers (including target) will be positive integers.
The solution set must not contain duplicate combinations.
Example 1:

Input: candidates = [10,1,2,7,6,1,5], target = 8,
A solution set is:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    var sols = [];
    candidates.sort(function(a, b) { return a - b; })
    if(candidates.length === 0 || candidates[0] > target) return sols;
    var i;
    for(i = 0; i < candidates.length; i++) {
        var remainings = candidates.slice();
        remainings.splice(i, 1);
        backtrackingSearch([candidates[i]], sols, candidates[i], remainings, target);
    }
    return sols;
};

var backtrackingSearch = function(sub_sols, sols, sum, remainings, target) {
    if(sum === target) {
        // sort sub_sols
        sub_sols.sort(function(a, b) { return a - b; });
        if(JSON.stringify(sols).indexOf(JSON.stringify(sub_sols)) === -1) sols.push(sub_sols);
    }
    else if(sum > target) return;
    else {
        var j;
        for(j = 0; j < remainings.length; j++) {
            var sub_sum = sum;
            sub_sum += remainings[j];

            var temp_sols = sub_sols.slice();
            temp_sols.push(remainings[j]);

            var sub_remainings = remainings.slice();
            sub_remainings.splice(j, 1);
            backtrackingSearch(temp_sols, sols, sub_sum, sub_remainings, target);
        }
    }
}

/**
Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:
Integers in each row are sorted in ascending from left to right.
Integers in each column are sorted in ascending from top to bottom.

Example:

Consider the following matrix:

[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
Given target = 5, return true.

Given target = 20, return false.
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {

    // corner cases
    if(matrix.length === 0 || matrix[0].length === 0) return false;

    // start the search from upper-right corner
    return searchForTarget(matrix, 0, matrix[0].length - 1, target);
};

var searchForTarget = function(matrix, row, col, target) {
    if(row === matrix.length || col < 0) return false;
    else if(matrix[row][col] === target) return true;
    else if(matrix[row][col] < target) return searchForTarget(matrix, row + 1, col, target);
    else return searchForTarget(matrix, row, col - 1, target);
}
