/**
 * ============================================
 * FUNCTIONS IN JAVASCRIPT
 * ============================================
 */

// ==========================================
// 1. FUNCTION DECLARATION
// ==========================================

// Basic function
function greet() {
  console.log("Hello, World!");
}
greet(); // Call the function

// Function with parameters
function greetUser(name) {
  console.log(`Hello, ${name}!`);
}
greetUser("John"); // Hello, John!

// Function with return value
function add(a, b) {
  return a + b;
}
let result = add(5, 3);
console.log(result); // 8

// Multiple return statements
function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}
console.log(getGrade(85)); // B

// Function with multiple parameters
function introduce(name, age, city) {
  return `My name is ${name}, I'm ${age} years old, and I live in ${city}`;
}
console.log(introduce("Alice", 25, "NYC"));

// ==========================================
// 2. FUNCTION EXPRESSION
// ==========================================

// Anonymous function assigned to variable
const multiply = function(a, b) {
  return a * b;
};
console.log(multiply(4, 5)); // 20

// Named function expression (useful for debugging)
const factorial = function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);
};
console.log(factorial(5)); // 120

// ==========================================
// 3. ARROW FUNCTIONS (ES6)
// ==========================================

// Basic arrow function
const subtract = (a, b) => {
  return a - b;
};
console.log(subtract(10, 3)); // 7

// Concise syntax (implicit return)
const divide = (a, b) => a / b;
console.log(divide(20, 4)); // 5

// Single parameter (parentheses optional)
const square = x => x * x;
console.log(square(5)); // 25

// No parameters (parentheses required)
const sayHello = () => console.log("Hello!");
sayHello();

// Returning object literal (wrap in parentheses)
const createPerson = (name, age) => ({ name: name, age: age });
console.log(createPerson("Bob", 30)); // { name: "Bob", age: 30 }

// ==========================================
// 4. DEFAULT PARAMETERS (ES6)
// ==========================================

function greetWithDefault(name = "Guest") {
  return `Hello, ${name}!`;
}
console.log(greetWithDefault()); // Hello, Guest!
console.log(greetWithDefault("John")); // Hello, John!

// Multiple default parameters
function calculatePrice(price, tax = 0.1, discount = 0) {
  return price + (price * tax) - discount;
}
console.log(calculatePrice(100)); // 110
console.log(calculatePrice(100, 0.15)); // 115
console.log(calculatePrice(100, 0.15, 20)); // 95

// Default parameter can use previous parameters
function greetFull(firstName, lastName, fullName = `${firstName} ${lastName}`) {
  return `Hello, ${fullName}!`;
}
console.log(greetFull("John", "Doe")); // Hello, John Doe!

// ==========================================
// 5. REST PARAMETERS (ES6)
// ==========================================

// Collect all arguments into an array
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// Rest parameter with regular parameters
function introduce(firstName, lastName, ...hobbies) {
  console.log(`Name: ${firstName} ${lastName}`);
  console.log(`Hobbies: ${hobbies.join(", ")}`);
}
introduce("John", "Doe", "reading", "gaming", "coding");

// ==========================================
// 6. ARGUMENTS OBJECT (OLD WAY)
// ==========================================

function oldStyleSum() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}
console.log(oldStyleSum(1, 2, 3, 4)); // 10

// Note: arguments is not a real array
function showArguments() {
  console.log(Array.isArray(arguments)); // false
  console.log(Array.from(arguments)); // Convert to array
}
showArguments(1, 2, 3);

// ==========================================
// 7. IMMEDIATELY INVOKED FUNCTION EXPRESSION (IIFE)
// ==========================================

// Execute function immediately after definition
(function() {
  console.log("This runs immediately!");
})();

// IIFE with parameters
(function(name) {
  console.log(`Hello, ${name}!`);
})("World");

// IIFE with return value
let result2 = (function(a, b) {
  return a + b;
})(5, 10);
console.log(result2); // 15

// Arrow function IIFE
(() => {
  console.log("Arrow IIFE!");
})();

// ==========================================
// 8. CALLBACK FUNCTIONS
// ==========================================

// Function passed as argument
function processUser(name, callback) {
  console.log(`Processing ${name}...`);
  callback(name);
}

processUser("John", function(name) {
  console.log(`${name} processed successfully`);
});

// With arrow function
processUser("Jane", (name) => {
  console.log(`${name} is done!`);
});

// Real example: Array methods
let numbers = [1, 2, 3, 4, 5];
numbers.forEach(function(num) {
  console.log(num * 2);
});

// ==========================================
// 9. HIGHER-ORDER FUNCTIONS
// ==========================================

// Function that returns a function
function multiplyBy(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15

// Function that takes function as argument
function operate(a, b, operation) {
  return operation(a, b);
}

console.log(operate(5, 3, (x, y) => x + y)); // 8
console.log(operate(5, 3, (x, y) => x * y)); // 15

// ==========================================
// 10. CLOSURE
// ==========================================

// Inner function has access to outer function's variables
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// Private variables using closure
function createBankAccount(initialBalance) {
  let balance = initialBalance;
  
  return {
    deposit: function(amount) {
      balance += amount;
      return balance;
    },
    withdraw: function(amount) {
      if (amount <= balance) {
        balance -= amount;
        return balance;
      }
      return "Insufficient funds";
    },
    getBalance: function() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
console.log(account.deposit(50)); // 150
console.log(account.withdraw(30)); // 120
console.log(account.getBalance()); // 120

// ==========================================
// 11. RECURSION
// ==========================================

// Function that calls itself
function countdown(n) {
  if (n <= 0) {
    console.log("Done!");
    return;
  }
  console.log(n);
  countdown(n - 1);
}
countdown(5); // 5, 4, 3, 2, 1, Done!

// Factorial using recursion
function factorialRecursive(n) {
  if (n <= 1) return 1;
  return n * factorialRecursive(n - 1);
}
console.log(factorialRecursive(5)); // 120

// Fibonacci using recursion
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(7)); // 13

// Sum of array using recursion
function sumArray(arr) {
  if (arr.length === 0) return 0;
  return arr[0] + sumArray(arr.slice(1));
}
console.log(sumArray([1, 2, 3, 4, 5])); // 15

// ==========================================
// 12. FUNCTION SCOPE
// ==========================================

// Global scope
let globalVar = "I'm global";

function testScope() {
  // Function scope
  let localVar = "I'm local";
  console.log(globalVar); // Accessible
  console.log(localVar);  // Accessible
}

testScope();
console.log(globalVar); // Accessible
// console.log(localVar); // Error! Not accessible outside function

// Block scope with let/const
function blockScope() {
  if (true) {
    let blockVar = "I'm in a block";
    const blockConst = "Me too";
    var functionVar = "I'm function-scoped";
  }
  // console.log(blockVar); // Error!
  // console.log(blockConst); // Error!
  console.log(functionVar); // Works! var is function-scoped
}

// ==========================================
// 13. HOISTING
// ==========================================

// Function declarations are hoisted
sayHi(); // Works!
function sayHi() {
  console.log("Hi!");
}

// Function expressions are NOT hoisted
// sayBye(); // Error!
const sayBye = function() {
  console.log("Bye!");
};

// ==========================================
// 14. PURE FUNCTIONS
// ==========================================

// Pure function - same input always gives same output, no side effects
function addPure(a, b) {
  return a + b;
}

// Impure function - modifies external state
let total = 0;
function addImpure(a) {
  total += a; // Side effect!
  return total;
}

// Pure function with objects (doesn't mutate original)
function updatePersonPure(person, newAge) {
  return { ...person, age: newAge };
}

// Impure function (mutates original)
function updatePersonImpure(person, newAge) {
  person.age = newAge;
  return person;
}

// ==========================================
// 15. FUNCTION METHODS: call(), apply(), bind()
// ==========================================

const person = {
  firstName: "John",
  lastName: "Doe"
};

function greetPerson(greeting, punctuation) {
  return `${greeting} ${this.firstName} ${this.lastName}${punctuation}`;
}

// call() - calls function with specified 'this' and arguments
console.log(greetPerson.call(person, "Hello", "!")); // Hello John Doe!

// apply() - same as call but arguments as array
console.log(greetPerson.apply(person, ["Hi", "."])); // Hi John Doe.

// bind() - creates new function with specified 'this'
const greetJohn = greetPerson.bind(person);
console.log(greetJohn("Hey", "?")); // Hey John Doe?

// ==========================================
// 16. GENERATOR FUNCTIONS (ES6)
// ==========================================

// Function that can pause and resume
function* generateNumbers() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generateNumbers();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3

// Infinite generator
function* infiniteSequence() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const infinite = infiniteSequence();
console.log(infinite.next().value); // 0
console.log(infinite.next().value); // 1

// ==========================================
// 17. ASYNC FUNCTIONS (ES2017)
// ==========================================

// Function that returns a Promise
async function fetchData() {
  return "Data fetched!";
}

fetchData().then(data => console.log(data)); // Data fetched!

// With await
async function processData() {
  const data = await fetchData();
  console.log(data);
}

// ==========================================
// 18. FUNCTION CURRYING
// ==========================================

// Converting function with multiple arguments into sequence of functions
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

console.log(curriedAdd(1)(2)(3)); // 6

// Arrow function version
const curriedMultiply = a => b => c => a * b * c;
console.log(curriedMultiply(2)(3)(4)); // 24

// Practical curry
const multiply = a => b => a * b;
const double2 = multiply(2);
const triple2 = multiply(3);
console.log(double2(5)); // 10
console.log(triple2(5)); // 15

// ==========================================
// 19. MEMOIZATION
// ==========================================

// Cache results for expensive operations
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      console.log("From cache");
      return cache[key];
    }
    console.log("Computing...");
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const expensiveFunction = (n) => {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += i;
  }
  return sum;
};

const memoizedFunction = memoize(expensiveFunction);
console.log(memoizedFunction(1000000)); // Computing...
console.log(memoizedFunction(1000000)); // From cache

// ==========================================
// 20. REAL-WORLD EXAMPLES
// ==========================================

// Example 1: Debounce function (delays execution)
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Example 2: Throttle function (limits execution rate)
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Example 3: Compose functions
function compose(...functions) {
  return function(x) {
    return functions.reduceRight((acc, fn) => fn(acc), x);
  };
}

const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const composed = compose(multiplyByTwo, addOne);
console.log(composed(5)); // (5 + 1) * 2 = 12

// Example 4: Pipe functions (opposite of compose)
function pipe(...functions) {
  return function(x) {
    return functions.reduce((acc, fn) => fn(acc), x);
  };
}

const piped = pipe(addOne, multiplyByTwo);
console.log(piped(5)); // (5 + 1) * 2 = 12

// Example 5: Partial application
function partial(fn, ...presetArgs) {
  return function(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

const addThreeNumbers = (a, b, c) => a + b + c;
const addFiveTo = partial(addThreeNumbers, 5);
console.log(addFiveTo(3, 2)); // 5 + 3 + 2 = 10

// ==========================================
// PRACTICE EXERCISES
// ==========================================

/*
1. Write a function that checks if a number is even or odd

2. Create a function that finds the largest number in an array

3. Write a recursive function to calculate power (x^n)

4. Create a function that reverses a string

5. Write a higher-order function that filters an array based on a condition

6. Create a closure that maintains a private counter

7. Write a curried function for calculating volume (length * width * height)

8. Create a memoized function for calculating Fibonacci numbers

9. Write a function that takes an array of functions and executes them in sequence

10. Create a debounce function and explain when to use it

11. Write a function that converts an array of objects to a single object

12. Create a function composition utility that works with any number of functions

13. Write a function that returns a function that adds a specific number

14. Create a function that retries an async operation n times

15. Write a pure function that updates nested object properties immutably
*/

// ==========================================
// BEST PRACTICES
// ==========================================

/*
1. Use arrow functions for short, simple functions
2. Use function declarations for functions that need hoisting
3. Keep functions small and focused (single responsibility)
4. Use descriptive function names (verbs for actions)
5. Prefer pure functions over impure ones
6. Use default parameters instead of checking for undefined
7. Use rest parameters instead of arguments object
8. Avoid too many parameters (use object parameter instead)
9. Always return something (explicit return better than implicit)
10. Document complex functions with comments
11. Use async/await instead of promise chains
12. Avoid deeply nested functions
13. Use early returns to reduce nesting
14. Cache expensive function results (memoization)
15. Be careful with arrow functions and 'this' context
*/