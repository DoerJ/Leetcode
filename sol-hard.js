/**
Given an unsorted array of integers, find the length of the longest consecutive elements sequence.

Your algorithm should run in O(n) complexity.

Example:

Input: [100, 4, 200, 1, 3, 2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {

    if(nums.length === 0) return 0;

    // sort nums
    nums.sort(function(a, b) { return a - b; });
    console.log(nums);
    var consec = 1;
    var max = 1;
    var i;
    for(i = 1; i < nums.length; i++) {
        if(nums[i] !== nums[i - 1]) {
            if(nums[i] === nums[i - 1] + 1) consec += 1;
            else {
                max = Math.max(consec, max);
                consec = 1;
            }
        }
    }
    return Math.max(max, consec);
};
