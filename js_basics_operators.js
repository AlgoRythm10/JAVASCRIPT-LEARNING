/**
 * ============================================
 * OPERATORS IN JAVASCRIPT
 * ============================================
 */

// ==========================================
// 1. ARITHMETIC OPERATORS
// ==========================================

let a = 10;
let b = 3;

console.log(a + b); // 13 - Addition
console.log(a - b); // 7  - Subtraction
console.log(a * b); // 30 - Multiplication
console.log(a / b); // 3.333... - Division
console.log(a % b); // 1  - Modulus (remainder)
console.log(a ** b); // 1000 - Exponentiation (10^3)

// Increment and Decrement
let counter = 5;
console.log(counter++); // 5 (returns then increments)
console.log(counter); // 6
console.log(++counter); // 7 (increments then returns)
console.log(counter--); // 7 (returns then decrements)
console.log(--counter); // 5 (decrements then returns)

// ==========================================
// 2. ASSIGNMENT OPERATORS
// ==========================================

let x = 10;

x += 5;  // x = x + 5  → 15
x -= 3;  // x = x - 3  → 12
x *= 2;  // x = x * 2  → 24
x /= 4;  // x = x / 4  → 6
x %= 4;  // x = x % 4  → 2
x **= 3; // x = x ** 3 → 8

console.log(x); // 8

// ==========================================
// 3. COMPARISON OPERATORS
// ==========================================

// Equality operators
console.log(5 == "5");   // true  (loose equality - allows type coercion)
console.log(5 === "5");  // false (strict equality - checks type and value)
console.log(5 != "5");   // false (loose inequality)
console.log(5 !== "5");  // true  (strict inequality)

// Relational operators
console.log(10 > 5);   // true  - Greater than
console.log(10 < 5);   // false - Less than
console.log(10 >= 10); // true  - Greater than or equal
console.log(10 <= 5);  // false - Less than or equal

// String comparison (lexicographical)
console.log("apple" < "banana"); // true
console.log("Zoo" < "apple");    // true (uppercase comes before lowercase)

// ==========================================
// 4. LOGICAL OPERATORS
// ==========================================

let isAdult = true;
let hasLicense = false;

// AND (&&) - Returns true if both are true
console.log(isAdult && hasLicense); // false

// OR (||) - Returns true if at least one is true
console.log(isAdult || hasLicense); // true

// NOT (!) - Inverts boolean value
console.log(!isAdult); // false
console.log(!hasLicense); // true

// Short-circuit evaluation
let user = null;
let name = user && user.name; // user is falsy, so returns null
console.log(name); // null (doesn't try to access user.name)

let defaultName = "" || "Guest"; // "" is falsy, so returns "Guest"
console.log(defaultName); // Guest

// ==========================================
// 5. NULLISH COALESCING OPERATOR (??)
// ==========================================

// Returns right side only if left is null or undefined
let value1 = null ?? "default"; // "default"
let value2 = undefined ?? "default"; // "default"
let value3 = 0 ?? "default"; // 0 (0 is not null/undefined)
let value4 = "" ?? "default"; // "" (empty string is not null/undefined)

console.log(value1, value2, value3, value4);

// Difference from ||
console.log(0 || "default");  // "default" (0 is falsy)
console.log(0 ?? "default");  // 0 (0 is not null/undefined)

// ==========================================
// 6. TERNARY OPERATOR (CONDITIONAL)
// ==========================================

let age = 20;
let status = age >= 18 ? "Adult" : "Minor";
console.log(status); // Adult

// Nested ternary (use sparingly!)
let score = 85;
let grade = score >= 90 ? "A" : 
            score >= 80 ? "B" : 
            score >= 70 ? "C" : "F";
console.log(grade); // B

// ==========================================
// 7. TYPE OPERATORS
// ==========================================

// typeof - Returns type of operand
console.log(typeof 42);        // "number"
console.log(typeof "hello");   // "string"
console.log(typeof true);      // "boolean"
console.log(typeof {});        // "object"
console.log(typeof []);        // "object"
console.log(typeof null);      // "object" (quirk!)
console.log(typeof undefined); // "undefined"

// instanceof - Checks if object is instance of class
let arr = [1, 2, 3];
console.log(arr instanceof Array);  // true
console.log(arr instanceof Object); // true (arrays are objects)
console.log("text" instanceof String); // false (primitives)

// ==========================================
// 8. BITWISE OPERATORS
// ==========================================

// Work on binary representations
let num1 = 5;  // 0101 in binary
let num2 = 3;  // 0011 in binary

console.log(num1 & num2);  // 1  - AND (0001)
console.log(num1 | num2);  // 7  - OR  (0111)
console.log(num1 ^ num2);  // 6  - XOR (0110)
console.log(~num1);        // -6 - NOT
console.log(num1 << 1);    // 10 - Left shift (1010)
console.log(num1 >> 1);    // 2  - Right shift (0010)
console.log(-5 >>> 1);     // Large number - Unsigned right shift

// Practical use: Check if number is even/odd
console.log(10 & 1); // 0 - even
console.log(11 & 1); // 1 - odd

// ==========================================
// 9. STRING OPERATORS
// ==========================================

// Concatenation
let firstName = "John";
let lastName = "Doe";
let fullName = firstName + " " + lastName;
console.log(fullName); // John Doe

// With numbers
console.log("Score: " + 100); // "Score: 100"
console.log(100 + " points"); // "100 points"

// Be careful with order!
console.log(1 + 2 + "3"); // "33" (1+2=3, then "3"+"3")
console.log("1" + 2 + 3); // "123" (string + anything = string)

// ==========================================
// 10. COMMA OPERATOR
// ==========================================

// Evaluates multiple expressions, returns last one
let result = (1 + 2, 3 + 4, 5 + 6);
console.log(result); // 11

// Often used in for loops
for (let i = 0, j = 10; i < 5; i++, j--) {
  console.log(`i: ${i}, j: ${j}`);
}

// ==========================================
// 11. OPTIONAL CHAINING (?.)
// ==========================================

let userObj = {
  name: "Alice",
  address: {
    city: "NYC"
  }
};

// Safe property access
console.log(userObj?.address?.city); // "NYC"
console.log(userObj?.contact?.phone); // undefined (no error!)

// Without optional chaining (would throw error)
// console.log(userObj.contact.phone); // Error!

// Optional method calling
let obj = {
  greet: function() { return "Hello!"; }
};
console.log(obj.greet?.()); // "Hello!"
console.log(obj.farewell?.()); // undefined (no error)

// ==========================================
// 12. SPREAD OPERATOR (...)
// ==========================================

// Array spreading
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Object spreading
let person = { name: "John", age: 30 };
let employee = { ...person, role: "Developer" };
console.log(employee); // { name: "John", age: 30, role: "Developer" }

// Function arguments
function sum(a, b, c) {
  return a + b + c;
}
let numbers = [1, 2, 3];
console.log(sum(...numbers)); // 6

// ==========================================
// 13. REST OPERATOR (...)
// ==========================================

// Collecting remaining arguments
function multiply(multiplier, ...numbers) {
  return numbers.map(num => num * multiplier);
}
console.log(multiply(2, 1, 2, 3, 4)); // [2, 4, 6, 8]

// Array destructuring
let [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first);  // 1
console.log(second); // 2
console.log(rest);   // [3, 4, 5]

// ==========================================
// 14. DELETE OPERATOR
// ==========================================

let personObj = { name: "John", age: 30, city: "NYC" };
delete personObj.city;
console.log(personObj); // { name: "John", age: 30 }

// Delete array element (leaves hole)
let colors = ["red", "green", "blue"];
delete colors[1];
console.log(colors); // ["red", empty, "blue"]
console.log(colors.length); // 3 (length unchanged)

// ==========================================
// 15. IN OPERATOR
// ==========================================

let car = { brand: "Toyota", model: "Camry" };
console.log("brand" in car); // true
console.log("color" in car); // false

let fruits = ["apple", "banana"];
console.log(0 in fruits); // true (index exists)
console.log(2 in fruits); // false

// ==========================================
// OPERATOR PRECEDENCE
// ==========================================

/*
Highest to Lowest:
1. Grouping ()
2. Member access . []
3. new (with arguments)
4. Function call ()
5. Postfix ++, --
6. Prefix ++, --, !, ~, +, -, typeof, delete
7. Exponentiation **
8. *, /, %
9. +, -
10. <<, >>, >>>
11. <, <=, >, >=, in, instanceof
12. ==, !=, ===, !==
13. &
14. ^
15. |
16. &&
17. ||
18. ?? (nullish coalescing)
19. ? : (ternary)
20. Assignment =, +=, -=, etc.
21. Comma ,
*/

console.log(2 + 3 * 4);      // 14 (not 20)
console.log((2 + 3) * 4);    // 20
console.log(10 > 5 && 3 < 7); // true

// ==========================================
// PRACTICE EXERCISES
// ==========================================

/*
1. Write expressions using arithmetic operators to:
   - Calculate area of circle (πr²) where r = 5
   - Convert Celsius to Fahrenheit (F = C × 9/5 + 32)

2. What's the difference between == and ===? Give examples.

3. Use logical operators to check if a number is between 10 and 20 (inclusive)

4. Rewrite this if-else using ternary operator:
   if (score >= 50) {
     result = "Pass";
   } else {
     result = "Fail";
   }

5. What will these expressions return? Explain why:
   - 5 + "5"
   - "5" - 5
   - true + true
   - [] + []
   - {} + {}

6. Use optional chaining to safely access: user.profile.address.zipcode

7. Use spread operator to merge two arrays and add extra elements

8. What's the difference between || and ??

9. Calculate: 2 + 3 * 4 - 6 / 2
   Then use parentheses to get a different result

10. Use rest operator to create a function that accepts unlimited arguments
    and returns their sum
*/