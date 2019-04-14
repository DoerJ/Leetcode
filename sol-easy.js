/**
Given an array of integers, return indices of the two numbers such that they add up to a specific target.
 you may assume that each input would have exactly one solution, and you may not use the same element twice.
@param {number[]} nums
@param {number} target
@return {number[]}
*/
var twoSum = function(nums, target) {
  // create a Map
  var num_map = new Map();
  // store indices
  var indices = new Array();
  var i;
  var temp = nums.length - 1;
  for(i = 0; i < nums.length; i ++) {
    num_map.set(nums[i], i);
    var num_item = nums[i];
    var complement = target - num_item;
    if(num_map.has(complement) && (num_item !== complement)) {
      indices.push(num_map.get(complement));
      indices.push(i)
    }
    else if(num_item === complement) {
      if(i > temp) {
        indices.push(i);
        indices.push(temp)
      }
      temp = i;
    }
  }
  return indices;
};


/**
Given a 32-bit signed integer, reverse digits of an integer.
@param {number} x
@return {number}
*/
var reverse = function(x) {
  var remainder;
  var y = 0;
  var v;
  while(x !== 0) {
    remainder = x % 10;
    y = y * 10 + remainder;
    v = +(x / 10)
    x = v - v % 1
  }
  var power = Math.pow(2,31);
  if(y < -power || y > (power - 1)) {
    return 0;
  }
  return y;
};


/**
Determine whether an integer is a palindrome.
An integer is a palindrome when it reads the same backward as forward.
@param {number} x
@return {boolean}
*/
var isPalindrome = function(x) {
  // break down the problem to getting the reverse of the number
  var remainder;
  var temp = x;
  var y = 0;
  var flag = true;
  while(temp !== 0) {
    remainder = temp % 10;
    y = y * 10 + remainder;
    temp = Math.trunc(temp / 10);
  }
  // y: reverse of x
  if(x < 0 || x !== y) {
    flag = false;
    return flag;
  }
  else {
    return flag;
  }
};


/**
Given a string containing just the characters '(', ')', '{', '}', '[' and ']',
determine if the input string is valid.
An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
@param {string} s
@return {boolean}
*/
var mappings = new Map();
mappings.set('{','}');
mappings.set('[',']');
mappings.set('(',')');

var isValid = function(s) {
  return pushSymbols(s);
};

var pushSymbols = function(s) {
  var i;
  var closingBrackets = "";
  var openingBrackets = new Array();
  for(i = 0; i < s.length; i ++) {
    if(mappings.has(s.charAt(i))) {
      openingBrackets.push(s.charAt(i));
    }
    else {
      closingBrackets = s.charAt(i);
      // pop off opening bracket
      var openedBracket = openingBrackets.pop();
      if(closingBrackets !== mappings.get(openedBracket)) {
        return false;
      }
    }
  }
  if(openingBrackets.length === 0) {
    return true;
  }
  return false;
}


/**
Given a sorted array and a target value, return the index if the target is found.
If not, return the index where it would be if it were inserted in order.
You may assume no duplicates in the array.
@param {number[]} nums
@param {number} target
@return {number}
*/
var searchInsert = function(nums, target) {
  var i;
  var pos = nums.length;
  for(i = 0; i < pos; i++) {
    var compare = nums[i];
    if(compare === target || compare > target) {
      pos = i;
      break;
    }
  }
  return pos;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
Merge two sorted linked lists and return it as a new list.
The new list should be made by splicing together the nodes of the first two lists.
Example:
Input: 1->2->4, 1->3->4
Output: 1->1->2->3->4->4
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    var sol = new ListNode(0);
    var sol_pointer = sol;
    var pointer_l1 = l1;
    var pointer_l2 = l2;
    while(pointer_l1 !== null && pointer_l2 !== null) {
        node = new ListNode(0);
        if(pointer_l1.val > pointer_l2.val) {
            node.val = pointer_l2.val;
            pointer_l2 = pointer_l2.next;
        }
        else if(pointer_l1.val < pointer_l2.val) {
            node.val = pointer_l1.val;
            pointer_l1 = pointer_l1.next;
        }
        // val1 = val2
        else {
            node.val = pointer_l1.val;
            node1 = new ListNode(node.val)
            sol_pointer.next = node1;
            sol_pointer = sol_pointer.next;
            pointer_l1 = pointer_l1.next;
            pointer_l2 = pointer_l2.next;
        }
        sol_pointer.next = node;
        sol_pointer = sol_pointer.next;
    }
    if(pointer_l1 === null) {
        sol_pointer.next = pointer_l2;
    }
    else if(pointer_l2 === null) {
        sol_pointer.next = pointer_l1;
    }
    return sol.next;
};

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

/**
Given two binary strings, return their sum (also a binary string).
The input strings are both non-empty and contains only characters 1 or 0.

Example 1:
Input: a = "11", b = "1"
Output: "100"

Example 2:
Input: a = "1010", b = "1011"
Output: "10101"
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    var carry_bit = 0;
    var sol_array = new Array();
    var sol_str = '';

    // fill up binary with '0'
    switch(a.length < b.length) {
        case true:
            a = a.padStart(b.length, '0');
            break;
        case false:
            b = b.padStart(a.length, '0');
            break;
    }
    var i = a.length - 1;
    while(i >= 0) {
        if(carry_bit === 0) {
            if(a.charAt(i) === '1' && b.charAt(i) === '1') {
                carry_bit = 1;
                sol_array.push('0');
            }
            else if(a.charAt(i) == '0' && b.charAt(i) === '0') {
                sol_array.push('0');
            }
            else{
                sol_array.push('1');
            }
        }
        // carry bit 1
        else {
            if(a.charAt(i) === '1' && b.charAt(i) === '1') {
                sol_array.push('1');
            }
            else if(a.charAt(i) == '0' && b.charAt(i) === '0') {
                carry_bit = 0;
                sol_array.push('1');
            }
            else{
                sol_array.push('0');
            }
        }
        i--;
    }
    if(carry_bit == 1) {
        sol_array.push('1');
    }
    // convert arr to str
    var j = sol_array.length - 1;
    while(j >= 0) {
        sol_str = sol_str.concat(sol_array[j]);
        j--;
    }
    return sol_str;
};

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

/**
Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

push(x) -- Push element x onto stack.
pop() -- Removes the element on top of the stack.
top() -- Get the top element.
getMin() -- Retrieve the minimum element in the stack.
 * initialize your data structure here.
 */
var MinStack = function() {
    this.stack = [];
    this.min_stack = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stack.push(x);
    // get the min item in stack
    var min_item = this.getMin();
    if(min_item === undefined) this.min_stack.push(x);
    else this.min_stack.push(Math.min(x, min_item));
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.stack.pop();
    this.min_stack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.min_stack[this.min_stack.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

 /**
 Given an array of size n, find the majority element. The majority element is the element that appears more than ⌊ n/2 ⌋ times.
You may assume that the array is non-empty and the majority element always exist in the array.

Example 1:

Input: [3,2,3]
Output: 3
  * @param {number[]} nums
  * @return {number}
  */
 var majorityElement = function(nums) {
     // use hash map
     var map = new Map();
     var i;
     for(i = 0; i < nums.length; i++) {
         if(!map.has(nums[i])) map.set(nums[i], 1);
         else map.set(nums[i], map.get(nums[i]) + 1);
     }
     // get the key with the max value
     var max = 0;
     var max_key;
     map.forEach(function(val, key) {
         if(val > max) {
             max_key = key;
             max = val;
         };
     });
     return max_key;
 };

 /**
 Reverse a singly linked list.

Example:

Input: 1->2->3->4->5->NULL
Output: 5->4->3->2->1->NULL

 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    var prev_node = null;
    var curr_node = head;
    while(curr_node !== null) {
        var next_node = curr_node.next;
        curr_node.next = prev_node;
        prev_node = curr_node;
        curr_node = next_node;
    }
    return prev_node;
};

/**
Given a singly linked list, determine if it is a palindrome.

Example 1:

Input: 1->2
Output: false
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    // push val into a list
    var val_list = [];
    while(head !== null) {
        val_list.push(head.val);
        head = head.next;
    }

    // iterate and compare the value list
    var j;
    for(j = 0; j < (val_list.length)/2; j++) {
        if(val_list[j] !== val_list[val_list.length - 1 - j]) return false;
    }
    return true;
};

/**
Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Example:

Input: [0,1,0,3,12]
Output: [1,3,12,0,0]
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    // indicate the first pos of zero
    var pos = 0;
    var i;
    for(i = 0; i < nums.length; i++) {
        if(nums[i] !== 0) {
            nums[pos] = nums[i];
            pos++;
        }
    }
    var j;
    console.log(pos)
    for(j = pos; j < nums.length; j++) {
        nums[j] = 0;
    }
    return nums;
};

/**
Given an array of integers where 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.
Find all the elements of [1, n] inclusive that do not appear in this array.
Could you do it without extra space and in O(n) runtime? You may assume the returned list does not count as extra space.

Example:

Input:
[4,3,2,7,8,2,3,1]

Output:
[5,6]
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function(nums) {
    // sort the list
    nums.sort(function(a, b) { return a - b; });

    var i = 1;
    while(i <= nums.length) {
        // if ele at the right place or swap doesn't change
        if(nums[i - 1] === i || nums[i - 1] === nums[nums[i - 1] - 1]) i++;
        // if ele not at the right place
        else if(nums[i - 1] !== i) swap(nums, i - 1, nums[i - 1] - 1);
    }
    console.log(nums);

    var j = 1;
    var sols = [];
    while(j <= nums.length) {
        if(nums[j - 1] !== j) sols.push(j);
        j++;
    }
    return sols;
};

// the swap function
var swap = function(nums, i, j) {
    var temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}

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

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
Given a linked list, determine if it has a cycle in it.
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    // use hash map

    if(head === null || head.next === null) return false;

    var map = new Map();
    while(head !== null) {
        if(map.has(head)) return true;
        else map.set(head, 1);
        head = head.next;
    }
    return false;
};

/**
Given a non-empty array of integers, every element appears twice except for one. Find that single one.

Note:

Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

Example 1:

Input: [2,2,1]
Output: 1
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {

    nums.sort(function(a, b) { return a - b });
    if(nums[0] !== nums[1]) return nums[0];

    // the length must be >= 3
    var i;
    for(i = 1; i < nums.length - 1; i++) {
        if(nums[i] !== nums[i - 1] && nums[i] !== nums[i + 1]) return nums[i];
    }
    return nums[nums.length - 1];
};

/**
You're given strings J representing the types of stones that are jewels, and S representing the stones you have.
Each character in S is a type of stone you have.
You want to know how many of the stones you have are also jewels.
The letters in J are guaranteed distinct, and all characters in J and S are letters.
Letters are case sensitive, so "a" is considered a different type of stone from "A".

Example 1:

Input: J = "aA", S = "aAAbbbb"
Output: 3
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
var numJewelsInStones = function(J, S) {
    // use has set
    var set = new Set();
    var count = 0;
    var i;
    for(i = 0; i < J.length; i++) {
        set.add(J.charAt(i));
    }

    var j;
    for(j = 0; j < S.length; j++) {
        if(set.has(S.charAt(j))) count += 1;
    }

    return count;
};

/**
Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.

Note:

The number of elements initialized in nums1 and nums2 are m and n respectively.
You may assume that nums1 has enough space (size that is greater or equal to m + n) to hold additional elements from nums2.
Example:

Input:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

Output: [1,2,2,3,5,6]
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {

    var i;
    for(i = 0; i < n; i++) {
        nums1[m + i] = nums2[i];
    }
    nums1.sort(function(a, b) { return a - b; });
    return;
};

/**
Given a sorted linked list, delete all duplicates such that each element appear only once.

Example 1:

Input: 1->1->2
Output: 1->2
Example 2:

Input: 1->1->2->3->3
Output: 1->2->3

 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {

    // corner cases
    if(head === null || head.next === null) return head;
    var dummy = head;
    while(dummy.next !== null) {
        if(dummy.val === dummy.next.val) dummy.next = dummy.next.next;
        else dummy = dummy.next;
    }
    return head;
};
