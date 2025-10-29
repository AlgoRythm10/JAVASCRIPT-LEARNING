/**
 * ============================================
 * LOOPS IN JAVASCRIPT
 * ============================================
 */

// ==========================================
// 1. FOR LOOP
// ==========================================

// Basic for loop
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// Counting backwards
for (let i = 5; i > 0; i--) {
  console.log(i); // 5, 4, 3, 2, 1
}

// Step by 2
for (let i = 0; i < 10; i += 2) {
  console.log(i); // 0, 2, 4, 6, 8
}

// Multiple variables
for (let i = 0, j = 10; i < 5; i++, j--) {
  console.log(`i: ${i}, j: ${j}`);
}

// Looping through array
let fruits = ["apple", "banana", "orange"];
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// ==========================================
// 2. WHILE LOOP
// ==========================================

// Basic while loop
let count = 0;
while (count < 5) {
  console.log(count); // 0, 1, 2, 3, 4
  count++;
}

// With condition check
let password = "";
while (password.length < 8) {
  password += "x";
}
console.log(password); // xxxxxxxx

// Be careful with infinite loops!
// while (true) { } // This runs forever!

// ==========================================
// 3. DO-WHILE LOOP
// ==========================================

// Executes at least once, even if condition is false
let num = 0;
do {
  console.log(num); // 0
  num++;
} while (num < 0); // Condition is false, but still ran once

// Useful for user input validation
let userInput;
do {
  // userInput = prompt("Enter a number greater than 10:");
  userInput = 15; // Simulating input
} while (userInput <= 10);

console.log("Valid input:", userInput);

// ==========================================
// 4. FOR...OF LOOP (ES6)
// ==========================================

// Best for iterating over iterable objects (arrays, strings, etc.)
let colors = ["red", "green", "blue"];

for (let color of colors) {
  console.log(color); // red, green, blue
}

// With strings
let text = "Hello";
for (let char of text) {
  console.log(char); // H, e, l, l, o
}

// With array destructuring
let users = [
  ["John", 25],
  ["Jane", 30],
  ["Bob", 35]
];

for (let [name, age] of users) {
  console.log(`${name} is ${age} years old`);
}

// Getting index with entries()
for (let [index, value] of colors.entries()) {
  console.log(`Index ${index}: ${value}`);
}

// ==========================================
// 5. FOR...IN LOOP
// ==========================================

// Best for iterating over object properties
let person = {
  name: "John",
  age: 30,
  city: "New York"
};

for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}

// Can also be used with arrays (but not recommended)
let numbers = [10, 20, 30];
for (let index in numbers) {
  console.log(index, numbers[index]); // index is string!
}

// Checking own properties (not inherited)
for (let key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(`${key}: ${person[key]}`);
  }
}

// ==========================================
// 6. BREAK STATEMENT
// ==========================================

// Exit loop early
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break; // Exit loop when i is 5
  }
  console.log(i); // 0, 1, 2, 3, 4
}

// Finding first matching element
let items = [1, 3, 5, 7, 8, 9];
for (let item of items) {
  if (item % 2 === 0) {
    console.log("First even number:", item); // 8
    break;
  }
}

// ==========================================
// 7. CONTINUE STATEMENT
// ==========================================

// Skip current iteration
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue; // Skip when i is 2
  }
  console.log(i); // 0, 1, 3, 4 (2 is skipped)
}

// Skip odd numbers
for (let i = 0; i < 10; i++) {
  if (i % 2 !== 0) {
    continue;
  }
  console.log(i); // 0, 2, 4, 6, 8
}

// ==========================================
// 8. NESTED LOOPS
// ==========================================

// Multiplication table
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(`${i} x ${j} = ${i * j}`);
  }
}

// 2D array traversal
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    console.log(matrix[i][j]);
  }
}

// Pattern printing
for (let i = 1; i <= 5; i++) {
  let pattern = "";
  for (let j = 1; j <= i; j++) {
    pattern += "* ";
  }
  console.log(pattern);
}
// Output:
// * 
// * * 
// * * * 
// * * * * 
// * * * * * 

// ==========================================
// 9. LABELED STATEMENTS
// ==========================================

// Break out of nested loops
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break outer; // Breaks out of both loops
    }
    console.log(`i: ${i}, j: ${j}`);
  }
}

// Continue outer loop
outerLoop: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) {
      continue outerLoop; // Continue outer loop
    }
    console.log(`i: ${i}, j: ${j}`);
  }
}

// ==========================================
// 10. ARRAY ITERATION METHODS
// ==========================================

// forEach - Executes function for each element
let names = ["Alice", "Bob", "Charlie"];

names.forEach(function(name, index) {
  console.log(`${index}: ${name}`);
});

// Arrow function version
names.forEach((name, index) => {
  console.log(`${index}: ${name}`);
});

// map - Creates new array with transformed elements
let nums = [1, 2, 3, 4, 5];
let doubled = nums.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter - Creates new array with elements that pass test
let evenNums = nums.filter(num => num % 2 === 0);
console.log(evenNums); // [2, 4]

// reduce - Reduces array to single value
let sum = nums.reduce((total, num) => total + num, 0);
console.log(sum); // 15

// find - Returns first element that matches
let firstEven = nums.find(num => num % 2 === 0);
console.log(firstEven); // 2

// findIndex - Returns index of first matching element
let firstEvenIndex = nums.findIndex(num => num % 2 === 0);
console.log(firstEvenIndex); // 1

// some - Checks if at least one element passes test
let hasEven = nums.some(num => num % 2 === 0);
console.log(hasEven); // true

// every - Checks if all elements pass test
let allPositive = nums.every(num => num > 0);
console.log(allPositive); // true

// ==========================================
// 11. LOOP PERFORMANCE TIPS
// ==========================================

// Cache array length (minor optimization)
let arr = [1, 2, 3, 4, 5];
let len = arr.length;
for (let i = 0; i < len; i++) {
  console.log(arr[i]);
}

// Reverse loop (sometimes faster)
for (let i = arr.length - 1; i >= 0; i--) {
  console.log(arr[i]);
}

// ==========================================
// 12. REAL-WORLD EXAMPLES
// ==========================================

// Example 1: Find sum of array
function sumArray(arr) {
  let total = 0;
  for (let num of arr) {
    total += num;
  }
  return total;
}
console.log(sumArray([1, 2, 3, 4, 5])); // 15

// Example 2: Find maximum value
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}
console.log(findMax([3, 7, 2, 9, 1])); // 9

// Example 3: Reverse a string
function reverseString(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}
console.log(reverseString("hello")); // olleh

// Example 4: Count occurrences
function countOccurrences(arr, target) {
  let count = 0;
  for (let item of arr) {
    if (item === target) {
      count++;
    }
  }
  return count;
}
console.log(countOccurrences([1, 2, 3, 2, 4, 2], 2)); // 3

// Example 5: Factorial
function factorial(n) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}
console.log(factorial(5)); // 120

// Example 6: Fibonacci sequence
function fibonacci(n) {
  let fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib;
}
console.log(fibonacci(10)); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// Example 7: Remove duplicates
function removeDuplicates(arr) {
  let unique = [];
  for (let item of arr) {
    if (!unique.includes(item)) {
      unique.push(item);
    }
  }
  return unique;
}
console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); // [1, 2, 3, 4, 5]

// Example 8: Flatten nested array
function flattenArray(arr) {
  let flat = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      for (let subItem of item) {
        flat.push(subItem);
      }
    } else {
      flat.push(item);
    }
  }
  return flat;
}
console.log(flattenArray([1, [2, 3], 4, [5, 6]])); // [1, 2, 3, 4, 5, 6]

// ==========================================
// 13. WHEN TO USE WHICH LOOP
// ==========================================

/*
FOR LOOP:
- When you know how many iterations you need
- When you need access to index
- Most versatile loop

WHILE LOOP:
- When you don't know how many iterations
- Condition-based looping
- User input validation

DO-WHILE LOOP:
- When loop must run at least once
- Menu systems
- Input validation

FOR...OF:
- Iterating over arrays, strings, sets, maps
- When you don't need index
- Clean and readable

FOR...IN:
- Iterating over object properties
- Avoid with arrays (use for...of instead)

ARRAY METHODS (forEach, map, filter, etc.):
- When working with arrays
- More functional programming style
- Often more readable than traditional loops
*/

// ==========================================
// PRACTICE EXERCISES
// ==========================================

/*
1. Write a loop to print numbers from 1 to 100

2. Create a function that prints the multiplication table for a given number

3. Write a function to check if a number is prime using a loop

4. Create a function that finds all even numbers in an array

5. Write a loop to calculate the sum of all odd numbers from 1 to 50

6. Create a function that reverses an array without using reverse()

7. Write a nested loop to create this pattern:
   1
   1 2
   1 2 3
   1 2 3 4
   1 2 3 4 5

8. Create a function that finds the second largest number in an array

9. Write a loop to count vowels in a string

10. Create a function that generates an array of n Fibonacci numbers

11. Write a function to check if a string is a palindrome using loops

12. Create a function that removes all falsy values from an array

13. Write nested loops to find all pairs in an array that sum to a target

14. Create a function that rotates an array by n positions

15. Write a loop to find the longest word in a sentence
*/

// ==========================================
// COMMON MISTAKES TO AVOID
// ==========================================

/*
1. Infinite loops - Always ensure loop condition will eventually be false
2. Off-by-one errors - Check loop boundaries carefully
3. Modifying array while iterating - Can cause unexpected behavior
4. Using for...in with arrays - Use for...of instead
5. Forgetting to increment counter in while loops
6. Not caching array.length in performance-critical loops
7. Using break/continue excessively - Can make code hard to read
8. Nested loops with high complexity - Consider alternative algorithms
*/

// ==========================================
// BEST PRACTICES
// ==========================================

/*
1. Choose the right loop for the task
2. Use meaningful variable names (not just i, j, k)
3. Keep loop bodies simple and short
4. Consider using array methods instead of traditional loops
5. Avoid deep nesting - extract to functions if needed
6. Always have a clear exit condition
7. Comment complex loop logic
8. Use const/let instead of var
9. Consider performance for large datasets
10. Test edge cases (empty arrays, single elements, etc.)
*/