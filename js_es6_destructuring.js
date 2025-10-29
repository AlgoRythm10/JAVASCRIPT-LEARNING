/**
 * ============================================
 * DESTRUCTURING IN JAVASCRIPT (ES6)
 * ============================================
 */

// ==========================================
// 1. ARRAY DESTRUCTURING
// ==========================================

// Basic array destructuring
const numbers = [1, 2, 3];
const [first, second, third] = numbers;
console.log(first, second, third); // 1 2 3

// Skip elements
const [a, , c] = [1, 2, 3];
console.log(a, c); // 1 3

// Rest pattern
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// Default values
const [x = 10, y = 20] = [5];
console.log(x, y); // 5 20

// Swapping variables
let var1 = 1, var2 = 2;
[var1, var2] = [var2, var1];
console.log(var1, var2); // 2 1

// Nested arrays
const nested = [1, [2, 3], 4];
const [one, [two, three], four] = nested;
console.log(one, two, three, four); // 1 2 3 4

// ==========================================
// 2. OBJECT DESTRUCTURING
// ==========================================

// Basic object destructuring
const user = { name: "John", age: 30, city: "NYC" };
const { name, age, city } = user;
console.log(name, age, city); // John 30 NYC

// Rename variables
const { name: userName, age: userAge } = user;
console.log(userName, userAge); // John 30

// Default values
const { name: n, country = "USA" } = user;
console.log(n, country); // John USA

// Nested objects
const person = {
  id: 1,
  info: {
    name: "Alice",
    address: {
      city: "Boston",
      zip: "02101"
    }
  }
};

const { info: { name: personName, address: { city: personCity } } } = person;
console.log(personName, personCity); // Alice Boston

// Rest in objects
const { name: n2, ...rest } = user;
console.log(n2); // John
console.log(rest); // { age: 30, city: "NYC" }

// ==========================================
// 3. FUNCTION PARAMETER DESTRUCTURING
// ==========================================

// Array destructuring in parameters
function printCoordinates([x, y]) {
  console.log(`X: ${x}, Y: ${y}`);
}
printCoordinates([10, 20]); // X: 10, Y: 20

// Object destructuring in parameters
function greetUser({ name, age }) {
  console.log(`Hello ${name}, you are ${age} years old`);
}
greetUser({ name: "John", age: 30 });

// With default values
function createUser({ name = "Guest", age = 0, role = "user" }) {
  return { name, age, role };
}
console.log(createUser({ name: "Alice" }));

// Nested destructuring in parameters
function processOrder({ customer: { name, email }, items }) {
  console.log(`Order for ${name} (${email})`);
  console.log(`Items: ${items.length}`);
}

processOrder({
  customer: { name: "John", email: "john@example.com" },
  items: [1, 2, 3]
});

// ==========================================
// 4. MIXED DESTRUCTURING
// ==========================================

// Array of objects
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 }
];

const [{ name: firstName }, { name: secondName }] = users;
console.log(firstName, secondName); // Alice Bob

// Object with array properties
const data = {
  title: "Data",
  values: [1, 2, 3]
};

const { title, values: [v1, v2, v3] } = data;
console.log(title, v1, v2, v3); // Data 1 2 3

// ==========================================
// 5. DESTRUCTURING IN LOOPS
// ==========================================

// Array of arrays
const coordinates = [[1, 2], [3, 4], [5, 6]];

for (const [x, y] of coordinates) {
  console.log(`X: ${x}, Y: ${y}`);
}

// Array of objects
const products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Phone", price: 500 }
];

for (const { name, price } of products) {
  console.log(`${name}: $${price}`);
}

// Object.entries with destructuring
const scores = { math: 90, english: 85, science: 92 };

for (const [subject, score] of Object.entries(scores)) {
  console.log(`${subject}: ${score}`);
}

// ==========================================
// 6. DESTRUCTURING WITH COMPUTED PROPERTIES
// ==========================================

const key = "name";
const obj = { name: "John", age: 30 };

const { [key]: value } = obj;
console.log(value); // John

// Dynamic property names
function getProperty(obj, prop) {
  const { [prop]: result } = obj;
  return result;
}
console.log(getProperty(obj, "age")); // 30

// ==========================================
// 7. PRACTICAL EXAMPLES
// ==========================================

// Example 1: API Response handling
const apiResponse = {
  status: 200,
  data: {
    user: {
      id: 1,
      name: "Alice",
      email: "alice@example.com"
    },
    posts: [1, 2, 3]
  }
};

const {
  status,
  data: {
    user: { name: apiName, email },
    posts
  }
} = apiResponse;

console.log(status, apiName, email, posts);

// Example 2: React-style props
function Component({ title, description, onSubmit }) {
  console.log(`Rendering: ${title}`);
  console.log(`Description: ${description}`);
  // onSubmit();
}

Component({
  title: "My Component",
  description: "A cool component",
  onSubmit: () => console.log("Submitted")
});

// Example 3: Configuration objects
function createServer({
  port = 3000,
  host = "localhost",
  ssl = false,
  ...options
}) {
  console.log(`Server running on ${host}:${port}`);
  console.log(`SSL: ${ssl}`);
  console.log("Other options:", options);
}

createServer({ port: 8080, ssl: true, maxConnections: 100 });

// Example 4: Returning multiple values
function getMinMax(arr) {
  return [Math.min(...arr), Math.max(...arr)];
}

const [min, max] = getMinMax([1, 5, 3, 9, 2]);
console.log(`Min: ${min}, Max: ${max}`);

// Example 5: Extracting from regex match
const url = "https://example.com:8080/path";
const [, protocol, domain, port, path] = 
  url.match(/(\w+):\/\/([^:]+):(\d+)(\/.*)/) || [];

console.log({ protocol, domain, port, path });

// ==========================================
// 8. DESTRUCTURING WITH ARRAYS METHODS
// ==========================================

// With map
const points = [[1, 2], [3, 4], [5, 6]];
const distances = points.map(([x, y]) => Math.sqrt(x * x + y * y));
console.log(distances);

// With filter
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 17 },
  { name: "Charlie", age: 30 }
];

const adults = people.filter(({ age }) => age >= 18);
console.log(adults);

// With reduce
const items = [
  { name: "Apple", price: 1 },
  { name: "Banana", price: 2 },
  { name: "Orange", price: 3 }
];

const total = items.reduce((sum, { price }) => sum + price, 0);
console.log(total); // 6

// ==========================================
// 9. DESTRUCTURING EDGE CASES
// ==========================================

// Undefined/null handling
const { missing = "default" } = {};
console.log(missing); // default

// Deep defaults
const config = { db: { host: "localhost" } };
const { 
  db: { 
    host = "127.0.0.1", 
    port = 5432 
  } = {} 
} = config;
console.log(host, port); // localhost 5432

// Destructuring with same names
const obj1 = { x: 1 };
const obj2 = { x: 2 };
const { x: x1 } = obj1;
const { x: x2 } = obj2;
console.log(x1, x2); // 1 2

// ==========================================
// 10. COMMON PATTERNS
// ==========================================

// Pattern 1: Options object
function ajax({
  url,
  method = "GET",
  headers = {},
  body = null,
  timeout = 5000
}) {
  console.log(`${method} ${url}`);
  // Make request...
}

ajax({ url: "/api/data", method: "POST" });

// Pattern 2: Module exports
const module = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b
};

const { add, multiply } = module;
console.log(add(2, 3)); // 5

// Pattern 3: State management (Redux-style)
function reducer(state = {}, { type, payload }) {
  switch (type) {
    case "ADD":
      return { ...state, value: state.value + payload };
    default:
      return state;
  }
}

// Pattern 4: Error handling
function parseJSON(json) {
  try {
    return { data: JSON.parse(json), error: null };
  } catch (error) {
    return { data: null, error };
  }
}

const { data, error } = parseJSON('{"name":"John"}');

// ==========================================
// PRACTICE EXERCISES
// ==========================================

/*
1. Destructure first and last elements from array [1,2,3,4,5]

2. Swap two variables using destructuring

3. Extract name and age from user object with defaults

4. Destructure nested object: {a: {b: {c: 1}}}

5. Create function that accepts object and destructures multiple properties

6. Use destructuring in for...of loop with array of objects

7. Extract values from function that returns array of 3 elements

8. Destructure with computed property names

9. Use rest operator to separate first element from rest

10. Destructure API response with nested data

11. Create function with destructured parameters and defaults

12. Extract specific properties from array of objects using map

13. Use destructuring in catch block for error handling

14. Destructure to rename properties from object

15. Combine array and object destructuring in single statement
*/

// ==========================================
// BEST PRACTICES
// ==========================================

/*
1. ✅ Use destructuring for cleaner code
2. ✅ Provide default values when appropriate
3. ✅ Use meaningful variable names
4. ✅ Destructure in function parameters
5. ✅ Keep destructuring simple (avoid too deep nesting)
6. ✅ Use rest operator for remaining properties
7. ✅ Rename variables when needed for clarity
8. ✅ Use destructuring in loops
9. ✅ Combine with other ES6 features
10. ✅ Document complex destructuring patterns
*/