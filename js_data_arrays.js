/**
 * ============================================
 * ARRAYS IN JAVASCRIPT
 * ============================================
 */

// ==========================================
// 1. CREATING ARRAYS
// ==========================================

// Array literal (most common)
let fruits = ["apple", "banana", "orange"];
console.log(fruits); // ["apple", "banana", "orange"]

// Array constructor
let numbers = new Array(1, 2, 3, 4, 5);
console.log(numbers); // [1, 2, 3, 4, 5]

// Empty array with specific length
let emptyArray = new Array(5);
console.log(emptyArray); // [empty × 5]
console.log(emptyArray.length); // 5

// Mixed data types
let mixed = [1, "text", true, null, { name: "John" }, [1, 2, 3]];

// Array.of() - creates array from arguments
let arr1 = Array.of(1, 2, 3);
console.log(arr1); // [1, 2, 3]

// Array.from() - creates array from iterable or array-like object
let str = "hello";
let chars = Array.from(str);
console.log(chars); // ["h", "e", "l", "l", "o"]

// ==========================================
// 2. ACCESSING ELEMENTS
// ==========================================

let colors = ["red", "green", "blue", "yellow"];

// By index (0-based)
console.log(colors[0]); // red
console.log(colors[2]); // blue

// Last element
console.log(colors[colors.length - 1]); // yellow

// Negative indices don't work like Python
console.log(colors[-1]); // undefined

// Using at() method (ES2022) - supports negative indices
console.log(colors.at(0)); // red
console.log(colors.at(-1)); // yellow
console.log(colors.at(-2)); // blue

// ==========================================
// 3. MODIFYING ARRAYS
// ==========================================

let items = ["a", "b", "c"];

// Change element
items[1] = "B";
console.log(items); // ["a", "B", "c"]

// Add element at specific index
items[5] = "f";
console.log(items); // ["a", "B", "c", empty × 2, "f"]

// Delete element (creates hole)
delete items[1];
console.log(items); // ["a", empty, "c", empty × 2, "f"]

// ==========================================
// 4. ARRAY LENGTH
// ==========================================

let arr = [1, 2, 3, 4, 5];
console.log(arr.length); // 5

// Truncate array by setting length
arr.length = 3;
console.log(arr); // [1, 2, 3]

// Extend array by setting length
arr.length = 5;
console.log(arr); // [1, 2, 3, empty × 2]

// Clear array
arr.length = 0;
console.log(arr); // []

// ==========================================
// 5. ADDING ELEMENTS
// ==========================================

let nums = [1, 2, 3];

// push() - add to end (modifies original, returns new length)
nums.push(4);
console.log(nums); // [1, 2, 3, 4]

nums.push(5, 6, 7);
console.log(nums); // [1, 2, 3, 4, 5, 6, 7]

// unshift() - add to beginning (modifies original, returns new length)
nums.unshift(0);
console.log(nums); // [0, 1, 2, 3, 4, 5, 6, 7]

// ==========================================
// 6. REMOVING ELEMENTS
// ==========================================

let values = [1, 2, 3, 4, 5];

// pop() - remove from end (modifies original, returns removed element)
let last = values.pop();
console.log(last); // 5
console.log(values); // [1, 2, 3, 4]

// shift() - remove from beginning (modifies original, returns removed element)
let first = values.shift();
console.log(first); // 1
console.log(values); // [2, 3, 4]

// ==========================================
// 7. SPLICE() - ADD/REMOVE ELEMENTS
// ==========================================

let letters = ["a", "b", "c", "d", "e"];

// Remove elements: splice(start, deleteCount)
let removed = letters.splice(2, 2); // Remove 2 elements starting at index 2
console.log(removed); // ["c", "d"]
console.log(letters); // ["a", "b", "e"]

// Add elements: splice(start, 0, ...items)
letters.splice(2, 0, "C", "D");
console.log(letters); // ["a", "b", "C", "D", "e"]

// Replace elements: splice(start, deleteCount, ...items)
letters.splice(1, 2, "B");
console.log(letters); // ["a", "B", "D", "e"]

// Remove all elements after index
let arr2 = [1, 2, 3, 4, 5];
arr2.splice(2);
console.log(arr2); // [1, 2]

// ==========================================
// 8. SLICE() - EXTRACT PORTION
// ==========================================

let original = [1, 2, 3, 4, 5];

// slice(start, end) - doesn't modify original
let sliced = original.slice(1, 4);
console.log(sliced); // [2, 3, 4]
console.log(original); // [1, 2, 3, 4, 5] (unchanged)

// Negative indices
console.log(original.slice(-3)); // [3, 4, 5]
console.log(original.slice(1, -1)); // [2, 3, 4]

// Copy array
let copy = original.slice();
console.log(copy); // [1, 2, 3, 4, 5]

// ==========================================
// 9. CONCAT() - MERGE ARRAYS
// ==========================================

let arr3 = [1, 2];
let arr4 = [3, 4];
let arr5 = [5, 6];

let merged = arr3.concat(arr4, arr5);
console.log(merged); // [1, 2, 3, 4, 5, 6]

// Concat with values
let result = arr3.concat(arr4, 7, 8);
console.log(result); // [1, 2, 3, 4, 7, 8]

// Using spread operator (modern way)
let merged2 = [...arr3, ...arr4, ...arr5];
console.log(merged2); // [1, 2, 3, 4, 5, 6]

// ==========================================
// 10. SEARCHING ELEMENTS
// ==========================================

let data = [10, 20, 30, 40, 50, 30];

// indexOf() - first occurrence (returns -1 if not found)
console.log(data.indexOf(30)); // 2
console.log(data.indexOf(100)); // -1

// lastIndexOf() - last occurrence
console.log(data.lastIndexOf(30)); // 5

// includes() - check if element exists (ES2016)
console.log(data.includes(30)); // true
console.log(data.includes(100)); // false

// find() - first element that passes test
let found = data.find(num => num > 25);
console.log(found); // 30

// findIndex() - index of first element that passes test
let foundIndex = data.findIndex(num => num > 25);
console.log(foundIndex); // 2

// findLast() - last element that passes test (ES2023)
// let lastFound = data.findLast(num => num > 25);

// findLastIndex() - index of last element (ES2023)
// let lastFoundIndex = data.findLastIndex(num => num > 25);

// ==========================================
// 11. SORTING ARRAYS
// ==========================================

let unsorted = [3, 1, 4, 1, 5, 9, 2, 6];

// sort() - sorts in place (converts to strings by default!)
unsorted.sort();
console.log(unsorted); // [1, 1, 2, 3, 4, 5, 6, 9]

// Sort numbers properly
let numbers2 = [100, 20, 3, 1];
numbers2.sort((a, b) => a - b); // Ascending
console.log(numbers2); // [1, 3, 20, 100]

numbers2.sort((a, b) => b - a); // Descending
console.log(numbers2); // [100, 20, 3, 1]

// Sort strings
let words = ["banana", "apple", "cherry"];
words.sort();
console.log(words); // ["apple", "banana", "cherry"]

// Sort objects
let people = [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 },
  { name: "Bob", age: 35 }
];
people.sort((a, b) => a.age - b.age);
console.log(people); // Sorted by age

// reverse() - reverses array in place
let arr6 = [1, 2, 3, 4, 5];
arr6.reverse();
console.log(arr6); // [5, 4, 3, 2, 1]

// ==========================================
// 12. TRANSFORMING ARRAYS
// ==========================================

let nums2 = [1, 2, 3, 4, 5];

// map() - creates new array with transformed elements
let doubled = nums2.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// With index
let withIndex = nums2.map((num, index) => `${index}: ${num}`);
console.log(withIndex); // ["0: 1", "1: 2", "2: 3", "3: 4", "4: 5"]

// filter() - creates new array with elements that pass test
let evens = nums2.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

// reduce() - reduces array to single value
let sum = nums2.reduce((total, num) => total + num, 0);
console.log(sum); // 15

// reduce with objects
let max = nums2.reduce((max, num) => num > max ? num : max, nums2[0]);
console.log(max); // 5

// reduceRight() - reduce from right to left
let reversed = nums2.reduceRight((acc, num) => [...acc, num], []);
console.log(reversed); // [5, 4, 3, 2, 1]

// ==========================================
// 13. TESTING ARRAYS
// ==========================================

let testNums = [2, 4, 6, 8, 10];

// every() - checks if all elements pass test
let allEven = testNums.every(num => num % 2 === 0);
console.log(allEven); // true

// some() - checks if at least one element passes test
let hasLarge = testNums.some(num => num > 5);
console.log(hasLarge); // true

// ==========================================
// 14. ITERATING ARRAYS
// ==========================================

let iterArr = ["a", "b", "c"];

// forEach() - executes function for each element
iterArr.forEach((item, index) => {
  console.log(`${index}: ${item}`);
});

// for...of loop
for (let item of iterArr) {
  console.log(item);
}

// for loop
for (let i = 0; i < iterArr.length; i++) {
  console.log(iterArr[i]);
}

// ==========================================
// 15. FLATTENING ARRAYS
// ==========================================

let nested = [1, [2, 3], [4, [5, 6]]];

// flat() - flattens by one level (ES2019)
let flat1 = nested.flat();
console.log(flat1); // [1, 2, 3, 4, [5, 6]]

// flat(depth) - flatten multiple levels
let flat2 = nested.flat(2);
console.log(flat2); // [1, 2, 3, 4, 5, 6]

// flat(Infinity) - flatten all levels
let flatAll = nested.flat(Infinity);
console.log(flatAll); // [1, 2, 3, 4, 5, 6]

// flatMap() - map then flatten by one level
let nums3 = [1, 2, 3];
let flatMapped = nums3.flatMap(num => [num, num * 2]);
console.log(flatMapped); // [1, 2, 2, 4, 3, 6]

// ==========================================
// 16. JOINING ARRAYS
// ==========================================

let joinArr = ["Hello", "World", "!"];

// join() - creates string from array
let joined = joinArr.join(" ");
console.log(joined); // "Hello World !"

let csv = [1, 2, 3, 4, 5].join(",");
console.log(csv); // "1,2,3,4,5"

// toString() - converts to comma-separated string
let str2 = joinArr.toString();
console.log(str2); // "Hello,World,!"

// ==========================================
// 17. FILLING ARRAYS
// ==========================================

// fill() - fills array with static value
let fillArr = new Array(5).fill(0);
console.log(fillArr); // [0, 0, 0, 0, 0]

// fill(value, start, end)
let arr7 = [1, 2, 3, 4, 5];
arr7.fill(0, 2, 4);
console.log(arr7); // [1, 2, 0, 0, 5]

// ==========================================
// 18. COPYING ARRAYS
// ==========================================

let original2 = [1, 2, 3];

// Shallow copy methods
let copy1 = [...original2]; // Spread operator
let copy2 = original2.slice(); // slice()
let copy3 = Array.from(original2); // Array.from()
let copy4 = original2.concat(); // concat()

// Deep copy (for nested arrays/objects)
let deepArr = [1, [2, 3], { a: 4 }];
let deepCopy = JSON.parse(JSON.stringify(deepArr));

// ==========================================
// 19. CHECKING IF VALUE IS ARRAY
// ==========================================

console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray("text")); // false
console.log(Array.isArray({ 0: 1, length: 1 })); // false

// ==========================================
// 20. MULTI-DIMENSIONAL ARRAYS
// ==========================================

// 2D array (matrix)
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Access elements
console.log(matrix[0][0]); // 1
console.log(matrix[1][2]); // 6

// Iterate 2D array
for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    console.log(matrix[i][j]);
  }
}

// ==========================================
// 21. ARRAY DESTRUCTURING (ES6)
// ==========================================

let [first, second, third] = [1, 2, 3];
console.log(first, second, third); // 1 2 3

// Skip elements
let [a, , c] = [1, 2, 3];
console.log(a, c); // 1 3

// Rest pattern
let [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// Default values
let [x = 10, y = 20] = [5];
console.log(x, y); // 5 20

// Swapping variables
let var1 = 1, var2 = 2;
[var1, var2] = [var2, var1];
console.log(var1, var2); // 2 1

// ==========================================
// 22. ARRAY METHODS CHAINING
// ==========================================

let products = [
  { name: "Laptop", price: 1000, category: "Electronics" },
  { name: "Phone", price: 500, category: "Electronics" },
  { name: "Shirt", price: 50, category: "Clothing" },
  { name: "Shoes", price: 100, category: "Clothing" }
];

// Chain multiple methods
let expensiveElectronics = products
  .filter(p => p.category === "Electronics")
  .filter(p => p.price > 600)
  .map(p => p.name);

console.log(expensiveElectronics); // ["Laptop"]

// ==========================================
// 23. REMOVING DUPLICATES
// ==========================================

let duplicates = [1, 2, 2, 3, 4, 4, 5];

// Using Set
let unique1 = [...new Set(duplicates)];
console.log(unique1); // [1, 2, 3, 4, 5]

// Using filter
let unique2 = duplicates.filter((item, index) => 
  duplicates.indexOf(item) === index
);
console.log(unique2); // [1, 2, 3, 4, 5]

// ==========================================
// 24. GROUPING ARRAY ELEMENTS
// ==========================================

let students = [
  { name: "John", grade: "A" },
  { name: "Jane", grade: "B" },
  { name: "Bob", grade: "A" },
  { name: "Alice", grade: "B" }
];

// Group by grade
let grouped = students.reduce((acc, student) => {
  if (!acc[student.grade]) {
    acc[student.grade] = [];
  }
  acc[student.grade].push(student);
  return acc;
}, {});

console.log(grouped);
// { A: [{ name: "John", ... }, { name: "Bob", ... }], B: [...] }

// ==========================================
// 25. ARRAY PERFORMANCE TIPS
// ==========================================

// Bad - creating new array in loop
let bad = [];
for (let i = 0; i < 1000; i++) {
  bad = [...bad, i]; // Creates new array each time!
}

// Good - pushing to existing array
let good = [];
for (let i = 0; i < 1000; i++) {
  good.push(i); // Modifies existing array
}

// Cache array length
let largeArr = new Array(1000000).fill(0);
let len = largeArr.length; // Cache it
for (let i = 0; i < len; i++) {
  // Use cached length
}

// ==========================================
// 26. REAL-WORLD EXAMPLES
// ==========================================

// Example 1: Find average
function calculateAverage(numbers) {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}
console.log(calculateAverage([10, 20, 30, 40])); // 25

// Example 2: Chunk array
function chunkArray(array, size) {
  let result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
console.log(chunkArray([1, 2, 3, 4, 5, 6, 7], 3)); 
// [[1, 2, 3], [4, 5, 6], [7]]

// Example 3: Shuffle array
function shuffleArray(array) {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
console.log(shuffleArray([1, 2, 3, 4, 5]));

// Example 4: Intersection of two arrays
function intersection(arr1, arr2) {
  return arr1.filter(item => arr2.includes(item));
}
console.log(intersection([1, 2, 3, 4], [3, 4, 5, 6])); // [3, 4]

// Example 5: Difference between arrays
function difference(arr1, arr2) {
  return arr1.filter(item => !arr2.includes(item));
}
console.log(difference([1, 2, 3, 4], [3, 4, 5, 6])); // [1, 2]

// Example 6: Partition array
function partition(array, predicate) {
  return array.reduce(([pass, fail], elem) => {
    return predicate(elem) 
      ? [[...pass, elem], fail]
      : [pass, [...fail, elem]];
  }, [[], []]);
}
console.log(partition([1, 2, 3, 4, 5], x => x % 2 === 0));
// [[2, 4], [1, 3, 5]]

// Example 7: Range function
function range(start, end, step = 1) {
  let result = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
}
console.log(range(0, 10, 2)); // [0, 2, 4, 6, 8]

// Example 8: Frequency counter
function countFrequency(array) {
  return array.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}
console.log(countFrequency(["a", "b", "a", "c", "b", "a"]));
// { a: 3, b: 2, c: 1 }

// ==========================================
// PRACTICE EXERCISES
// ==========================================

/*
1. Create a function that removes all falsy values from an array

2. Write a function that returns the sum of all numbers in a nested array

3. Create a function that rotates an array by n positions

4. Write a function that finds the second largest number in an array

5. Create a function that merges two sorted arrays into one sorted array

6. Write a function that returns all unique combinations of array elements

7. Create a function that flattens a deeply nested array

8. Write a function that finds the most frequent element in an array

9. Create a function that checks if one array is a subset of another

10. Write a function that zips two arrays together
    Example: zip([1,2,3], ['a','b','c']) → [[1,'a'], [2,'b'], [3,'c']]

11. Create a function that implements Array.prototype.map() from scratch

12. Write a function that finds all indices where an element appears

13. Create a function that splits array into two based on a condition

14. Write a function that implements binary search on sorted array

15. Create a function that finds the longest increasing subsequence
*/

// ==========================================
// COMMON MISTAKES TO AVOID
// ==========================================

/*
1. Modifying array while iterating over it
2. Using sort() without compare function for numbers
3. Forgetting that splice() modifies original array
4. Confusing slice() and splice()
5. Not handling empty arrays in reduce()
6. Using for...in loop with arrays (use for...of instead)
7. Assuming push() returns the array (it returns length)
8. Creating unnecessary copies in loops
9. Not checking if value is array before using array methods
10. Forgetting arrays are reference types (mutations affect copies)
*/

// ==========================================
// BEST PRACTICES
// ==========================================

/*
1. Use const for arrays that won't be reassigned
2. Prefer array methods (map, filter, reduce) over loops
3. Use spread operator for shallow copies
4. Check array length before accessing elements
5. Use Array.isArray() to check if value is array
6. Use meaningful variable names in callbacks
7. Chain array methods for readable data transformations
8. Use slice() to avoid mutations when needed
9. Leverage destructuring for cleaner code
10. Consider performance for large arrays
11. Use Set for unique values
12. Document complex array operations
13. Handle edge cases (empty arrays, single elements)
14. Use early returns in callbacks when possible
15. Prefer immutable operations for predictable code
*/