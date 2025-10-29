/**
 * ============================================
 * VARIABLES AND DATA TYPES IN JAVASCRIPT
 * ============================================
 */

// ==========================================
// 1. VARIABLE DECLARATIONS
// ==========================================

// VAR - Old way (function-scoped, can be redeclared, hoisted)
var oldWay = "I'm using var";
var oldWay = "I can be redeclared"; // This works but not recommended

// LET - Modern way (block-scoped, cannot be redeclared, can be reassigned)
let modernWay = "I'm using let";
modernWay = "I can be reassigned"; // This works
// let modernWay = "Error"; // This would throw an error

// CONST - For constants (block-scoped, cannot be reassigned or redeclared)
const CONSTANT_VALUE = "I cannot change";
// CONSTANT_VALUE = "Error"; // This would throw an error

// Note: CONST with objects/arrays - the reference is constant, not the content
const person = { name: "John" };
person.name = "Jane"; // This works! We're modifying content, not reassigning
console.log(person); // { name: "Jane" }

// ==========================================
// 2. PRIMITIVE DATA TYPES
// ==========================================

// STRING - Text data
let firstName = "John";
let lastName = 'Doe'; // Single or double quotes work
let fullName = `${firstName} ${lastName}`; // Template literals (ES6)
console.log(fullName); // John Doe

// NUMBER - All numbers (integers and floats)
let age = 25;
let price = 99.99;
let negative = -10;
let infinity = Infinity;
let notANumber = NaN; // Not a Number

// BOOLEAN - true or false
let isStudent = true;
let hasGraduated = false;

// UNDEFINED - Variable declared but not assigned
let undefinedVariable;
console.log(undefinedVariable); // undefined

// NULL - Intentional absence of value
let emptyValue = null;

// SYMBOL - Unique identifier (ES6)
let uniqueId = Symbol('id');
let anotherId = Symbol('id');
console.log(uniqueId === anotherId); // false (always unique)

// BIGINT - For very large integers (ES2020)
let bigNumber = 1234567890123456789012345678901234567890n;
let anotherBigInt = BigInt("9007199254740991");

// ==========================================
// 3. REFERENCE DATA TYPES
// ==========================================

// OBJECT - Collection of key-value pairs
let user = {
  name: "Alice",
  age: 30,
  isAdmin: true,
  address: {
    city: "New York",
    country: "USA"
  }
};
console.log(user.name); // Alice
console.log(user.address.city); // New York

// ARRAY - Ordered collection
let fruits = ["apple", "banana", "orange"];
let mixed = [1, "text", true, null, { key: "value" }];
console.log(fruits[0]); // apple
console.log(fruits.length); // 3

// FUNCTION - Reusable code block
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet("World")); // Hello, World!

// ==========================================
// 4. TYPE CHECKING
// ==========================================

// typeof operator
console.log(typeof "Hello"); // string
console.log(typeof 42); // number
console.log(typeof true); // boolean
console.log(typeof undefined); // undefined
console.log(typeof null); // object (this is a known JS quirk!)
console.log(typeof Symbol()); // symbol
console.log(typeof 123n); // bigint
console.log(typeof {}); // object
console.log(typeof []); // object (arrays are objects!)
console.log(typeof function(){}); // function

// Better array checking
console.log(Array.isArray([])); // true
console.log(Array.isArray({})); // false

// ==========================================
// 5. TYPE CONVERSION
// ==========================================

// STRING CONVERSION
let num = 123;
let str = String(num); // "123"
let str2 = num.toString(); // "123"
let str3 = "" + num; // "123" (implicit conversion)

// NUMBER CONVERSION
let text = "456";
let number1 = Number(text); // 456
let number2 = parseInt(text); // 456 (for integers)
let number3 = parseFloat("3.14"); // 3.14 (for decimals)
let number4 = +text; // 456 (unary plus operator)

console.log(Number("hello")); // NaN
console.log(Number(true)); // 1
console.log(Number(false)); // 0

// BOOLEAN CONVERSION
console.log(Boolean(1)); // true
console.log(Boolean(0)); // false
console.log(Boolean("")); // false
console.log(Boolean("text")); // true
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false

// ==========================================
// 6. TEMPLATE LITERALS (ES6)
// ==========================================

let product = "Laptop";
let cost = 999;

// Multi-line strings
let message = `
  Product: ${product}
  Price: $${cost}
  Total: $${cost * 1.1} (with tax)
`;
console.log(message);

// Expression evaluation
let a = 10, b = 20;
console.log(`Sum: ${a + b}`); // Sum: 30

// ==========================================
// 7. VARIABLE NAMING RULES
// ==========================================

// Valid names
let userName = "John"; // camelCase (recommended)
let user_name = "John"; // snake_case
let _private = "value"; // starting with underscore
let $jquery = "value"; // starting with dollar sign
let user2 = "value"; // with numbers (but not starting with number)

// Invalid names (will cause errors)
// let 2user = "value"; // cannot start with number
// let user-name = "value"; // hyphens not allowed
// let let = "value"; // reserved keywords not allowed

// ==========================================
// 8. SPECIAL NUMBER VALUES
// ==========================================

console.log(1 / 0); // Infinity
console.log(-1 / 0); // -Infinity
console.log("text" / 2); // NaN

// Checking for NaN
console.log(isNaN(NaN)); // true
console.log(isNaN("hello")); // true
console.log(Number.isNaN(NaN)); // true (more strict)

// Checking for finite numbers
console.log(isFinite(100)); // true
console.log(isFinite(Infinity)); // false

// ==========================================
// PRACTICE EXERCISES
// ==========================================

/*
1. Create variables for your name, age, and favorite hobby using appropriate variable declarations

2. Create an object representing a book with properties: title, author, pages, isRead

3. Convert the string "123" to a number and add 77 to it

4. Check if the following values are truthy or falsy:
   - 0
   - ""
   - "0"
   - []
   - {}
   - null

5. Create a template literal that displays a formatted address from separate variables

6. What's the difference between null and undefined?

7. Why does typeof null return "object"?

8. Create a const array and try to:
   a) Add an item to it
   b) Remove an item from it
   c) Reassign it to a new array
   Which operations work and why?
*/

// ==========================================
// ANSWERS TO COMMON QUESTIONS
// ==========================================

/*
Q: When should I use var, let, or const?
A: Always use const by default. Use let when you need to reassign. Never use var in modern JS.

Q: What's the difference between == and ===?
A: == allows type coercion, === checks both value and type. Always prefer ===.

Q: Can I change a const object's properties?
A: Yes! Const prevents reassignment, not mutation of object properties.

Q: What's the difference between null and undefined?
A: undefined means variable declared but not assigned. null is an intentional empty value.
*/