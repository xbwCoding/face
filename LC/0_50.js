// 1. 两数之和
var twoSum = function (nums, target) {
    if(nums.length < 2) return -1
    let map = new Map()
    for (let i = 0; i < nums.length; i++) { 
        let diff = target - nums[i]
        if (map.has(diff)) {
            return [map.get(diff), i]
        } else { 
            map.set(nums[i], i)
        }
    }

    return -1
};


// 2. 两数相加
function ListNode(val, next) { 
    this.val = val
    this.next = next
}
var addTwoNumbers = function (l1, l2) {
    let dummy = new ListNode()
    let curr = dummy
    let sum = 0
    while (l1 || l2 || sum) { 
        if (l1) sum += l1.val, l1 = l1.next
        if (l2) sum += l2.val, l2 = l2.next
        curr.next = new ListNode(sum % 10)
        curr = curr.next
        sum = ~~(sum / 10)
    }

    return dummy.next
};


// 3. 无重复字符的最长子串
var lengthOfLongestSubstring = function (s) {
    if(s.length < 2) return s.length
    let set = new Set()
    let left = 0, right = 0, ans = 0
    while (right < s.length) { 
        while (set.has(s[right])) { 
            set.delete(s[left])
            left++
        }
        set.add(s[right])  // 思考:  和下一行  right++  可以换位置吗  
        right++
        ans = Math.max(ans, set.size)
    }

    return ans
};


// 5. 最长回文子串
var longestPalindrome = function(s) {
    if (s.length < 2) return s
    let maxLen = 1, start = 0

    for (let i = 0; i < s.length; i++) { 
        extendCenter(i, i + 1) // 偶数
        extendCenter(i - 1, i + 1) // 奇数
    }

    function extendCenter(left, right) { 
        while (left >= 0 && right <= s.length && s[left] == s[right]) { 
            if (right - left + 1 > maxLen) { 
                maxLen = right - left + 1
                start = left
            }
            left--
            right++
        }
    }

    return s.slice(start, start + maxLen)
};


// 6. Z 字形变换
var convert = function (s, numRows) {
    if (numRows < 2) return s

    let down = false
    let arr = Array(numRows).fill(""), ans = ''
    for (let i = 0, row = 0; i < s.length; i++) { 
        arr[row] += s[i]
        if (row == 0 || row == numRows - 1) down = !down
        row += down ? 1 : -1
    }

    for (let i = 0; i < arr.length; i++) { 
        ans += arr[i] 
    }

    return ans
};


// 7. 整数反转
var reverse = function (x) {
    let ans = 0
    while (x) { 
        ans = ans * 10 + x % 10
        x = ~~(x / 10)
    }

    return ans
};


// 8. 字符串转换整数 (atoi)
var myAtoi = function(s) {

};


// 9. 回文数
var isPalindrome = function (x) {
    if (x < 0) return false
    let num = x, ans = 0
    while (x) { 
        ans = ans * 10 + (x % 10)
        x = ~~(x / 10)
    }

    return num === ans
};


// 11. 盛最多水的容器
var maxArea = function (height) {
    if (height.length < 2) return 0
    let left = 0, right = height.length - 1
    let ans = 0
    while (left < right) { 
        let diff = right - left
        let area = Math.min(height[left], height[right]) * diff
        ans = Math.max(ans, area)
        if (height[left] < height[right]) {
            left++
        } else { 
            right--
        }
    }

    return ans
};


// 12. 整数转罗马数字
var intToRoman = function (num) {
    let ones = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]
    let tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"]
    let hundreds = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"]
    let thousand = ["", "M", "MM", "MMM"]

    return thousand[~~(num / 1000)] + hundreds[~~(num % 1000 / 100)] + tens[~~(num % 100 / 10)] + ones[~~(num % 10)]
};


// 13. 罗马数字转整数
var romanToInt = function (s) {
    let map = new Map()
    map.set("I", 1).set("V", 5).set("X", 10).set("L", 50).set("C", 100).set("D", 500).set("M", 1000)

    let flag = 1, ans = 0
    for (let i = 0; i < s.length; i++) { 
        if (map.get(s[i]) < map.get(s[i + 1]) || 0) {
            flag = -1
        } else { 
            flag = 1
        }
        ans = ans + map.get(s[i]) * flag
    }

    return ans
};

var romanToInt_02 = function(s) {
    let map = new Map()
    map.set("I", 1).set("V", 5).set("X", 10).set("L", 50).set("C", 100).set("D", 500).set("M", 1000)
    let ans = 0
    for(let i = 0; i < s.length; i++){
        let left = map.get(s[i])
        let right = map.get(s[i + 1]) || 0
        if(left < right){
            left = -left
        }
        ans = ans + left
    }
    return ans
};


// 14. 最长公共前缀
var longestCommonPrefix = function (strs) {
    if (strs.length < 2) return strs[0] || ""
    let ans = ''

    for (let i = 0; i < strs[0].length; i++) { 
        let char = strs[0][i]
        for (let j = 1; j < strs.length; j++) { 
            if (char != strs[j][i]) { 
                return ans
            }
            if (j == strs.length - 1) { 
                ans += char
            }
        }
    }

    return ans
};


var longestCommonPrefix_02 = function(strs) {
    for(let i = 0; i<strs[0].length; i++){
        let char = strs[0][i]
        for(let j = 1; j < strs.length; j++){
            if(i == strs[j].length || strs[j][i] !== char){
                return strs[0].substr(0, i)
            }
        }
    }
    return strs[0]  // 都完全匹配
};


// 15. 三数之和
var threeSum = function (nums) {
    if (nums.length < 3) return []
    nums.sort((a, b) => a - b)
    let ans = []

    for (let i = 0; i < nums.length; i++) { 
        if(i > 0 && nums[i] === nums[i - 1]) continue
        let left = i + 1
        let right = nums.length - 1
        while (left < right) { 
            let sum = nums[i] + nums[left] + nums[right]
            if (sum == 0) {
                ans.push([nums[i], nums[left], nums[right]])
                while (left < right && nums[left] == nums[left + 1]) left++
                while (left < right && nums[right] == nums[right - 1]) right--
                left++
                right--
            } else if (sum > 0) {
                right--
            } else { 
                left++
            }
        }
    }

    return ans
};


// 16. 最接近的三数之和
var threeSumClosest = function (nums, target) {
    nums.sort((a, b) => a - b)
    let ans = nums[0] + nums[1] + nums[2]

    for (let i = 0; i < nums.length; i++) { 
        let left = i + 1
        let right = nums.length - 1

        while (left < right) { 
            let sum = nums[i] + nums[left] + nums[right]
            if (sum == target) return target
            else if (Math.abs(sum - target) < Math.abs(ans - target)) ans = sum
            if (sum < target) left++
            else right--
        }
    }

    return ans
};


// 17. 电话号码的字母组合
var letterCombinations = function (digits) {
    let arr = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
    let ans = []
    if (!digits.length) { 
        return ans
    }

    function dfs(idx,combin) { 
        if (combin.length == digits.length) { 
            ans.push(combin)
            return
        }

        for (let i = 0; i < arr[digits[idx]].length; i++) { 
            let char = arr[digits[idx]][i]
            dfs(idx + 1,combin + char)
        }
    }

    dfs(0, '')

    return ans
};


// 18. 四数之和
var fourSum = function (nums, target) {
    

};


// 19. 删除链表的倒数第 N 个结点
var removeNthFromEnd = function(head, n) {

};


// 20. 有效的括号
var isValid = function(s) {

};


// 21. 合并两个有序链表
var mergeTwoLists = function(list1, list2) {

};


// 22. 括号生成
var generateParenthesis = function(n) {

};


// 24. 两两交换链表中的节点
var swapPairs = function(head) {

};


// 26. 删除有序数组中的重复项
var removeDuplicates = function(nums) {

};


// 27. 移除元素
var removeElement = function(nums, val) {

};


// 31. 下一个排列
var nextPermutation = function(nums) {

};


// 33. 搜索旋转排序数组
var search = function(nums, target) {

};


// 34. 在排序数组中查找元素的第一个和最后一个位置
var searchRange = function(nums, target) {

};


// 35. 搜索插入位置
var searchInsert = function(nums, target) {

};


// 36. 有效的数独
var isValidSudoku = function(board) {

};


// 38. 外观数列
var countAndSay = function(n) {

};



// 39. 组合总和
var combinationSum = function(candidates, target) {

};


// 40. 组合总和 II
var combinationSum2 = function(candidates, target) {

};


// 43. 字符串相乘
var multiply = function(num1, num2) {

};


// 45. 跳跃游戏 II
var jump = function(nums) {

};


// 46. 全排列
var permute = function(nums) {

};


// 47. 全排列 II
var permuteUnique = function(nums) {

};


// 48. 旋转图像
var rotate = function(matrix) {

};


// 49. 字母异位词分组
var groupAnagrams = function(strs) {

};