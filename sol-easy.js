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
