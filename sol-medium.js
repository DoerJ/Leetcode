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
