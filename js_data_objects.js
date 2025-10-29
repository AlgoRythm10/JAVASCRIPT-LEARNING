/**
 * ============================================
 * OBJECTS IN JAVASCRIPT
 * ============================================
 */

// ==========================================
// 1. CREATING OBJECTS
// ==========================================

// Object literal (most common)
let person = {
  name: "John",
  age: 30,
  city: "New York"
};

// Empty object
let emptyObj = {};

// Object constructor
let obj = new Object();
obj.name = "Jane";

// Object.create()
let proto = { greet: function() { return "Hello"; } };
let child = Object.create(proto);

// ==========================================
// 2. ACCESSING PROPERTIES
// ==========================================

let user = {
  firstName: "John",
  lastName: "Doe",
  age: 25
};

// Dot notation
console.log(user.firstName); // John

// Bracket notation
console.log(user["lastName"]); // Doe

// Bracket notation with variables
let prop = "age";
console.log(user[prop]); // 25

// Accessing nested objects
let employee = {
  name: "Alice",
  address: {
    street: "123 Main St",
    city: "NYC",
    zip: "10001"
  }
};
console.log(employee.address.city); // NYC

// Optional chaining (?.)
let data = {};
console.log(data?.user?.name); // undefined (no error)

// ==========================================
// 3. ADDING/MODIFYING PROPERTIES
// ==========================================

let car = {
  brand: "Toyota"
};

// Add new property
car.model = "Camry";
car["year"] = 2020;

// Modify existing property
car.brand = "Honda";

console.log(car); // { brand: "Honda", model: "Camry", year: 2020 }

// ==========================================
// 4. DELETING PROPERTIES
// ==========================================

let product = {
  name: "Laptop",
  price: 1000,
  stock: 50
};

// Delete property
delete product.stock;
console.log(product); // { name: "Laptop", price: 1000 }

// Check if property exists after deletion
console.log("stock" in product); // false

// ==========================================
// 5. CHECKING PROPERTY EXISTENCE
// ==========================================

let obj1 = { name: "Test", value: undefined };

// in operator
console.log("name" in obj1); // true
console.log("toString" in obj1); // true (inherited)

// hasOwnProperty()
console.log(obj1.hasOwnProperty("name")); // true
console.log(obj1.hasOwnProperty("toString")); // false

// Direct check (doesn't distinguish undefined)
console.log(obj1.value !== undefined); // false (value is undefined)
console.log("value" in obj1); // true (better check)

// ==========================================
// 6. OBJECT METHODS
// ==========================================

let calculator = {
  value: 0,
  add: function(n) {
    this.value += n;
    return this;
  },
  subtract: function(n) {
    this.value -= n;
    return this;
  },
  getResult: function() {
    return this.value;
  }
};

// Method chaining
calculator.add(10).subtract(3).add(5);
console.log(calculator.getResult()); // 12

// Method shorthand (ES6)
let person2 = {
  name: "John",
  greet() {
    return `Hello, I'm ${this.name}`;
  }
};
console.log(person2.greet()); // Hello, I'm John

// ==========================================
// 7. THIS KEYWORD
// ==========================================

let obj2 = {
  name: "Object",
  regularFunction: function() {
    console.log(this.name); // "Object"
  },
  arrowFunction: () => {
    console.log(this.name); // undefined (arrow functions don't have own 'this')
  }
};

obj2.regularFunction();
obj2.arrowFunction();

// ==========================================
// 8. COMPUTED PROPERTY NAMES (ES6)
// ==========================================

let key = "dynamicKey";
let obj3 = {
  [key]: "value",
  ["computed" + "Key"]: "another value",
  [2 + 3]: "five"
};
console.log(obj3); // { dynamicKey: "value", computedKey: "another value", 5: "five" }

// ==========================================
// 9. PROPERTY SHORTHAND (ES6)
// ==========================================

let name = "Alice";
let age = 30;

// Old way
let person3 = { name: name, age: age };

// Shorthand
let person4 = { name, age };
console.log(person4); // { name: "Alice", age: 30 }

// ==========================================
// 10. OBJECT DESTRUCTURING (ES6)
// ==========================================

let user2 = {
  username: "john_doe",
  email: "john@example.com",
  age: 25
};

// Basic destructuring
let { username, email } = user2;
console.log(username, email); // john_doe john@example.com

// Rename variables
let { username: userName, age: userAge } = user2;
console.log(userName, userAge); // john_doe 25

// Default values
let { missing = "default" } = user2;
console.log(missing); // default

// Nested destructuring
let complex = {
  id: 1,
  info: {
    name: "Test",
    details: {
      type: "A"
    }
  }
};
let { info: { details: { type } } } = complex;
console.log(type); // A

// Rest in destructuring
let { username: uname, ...rest } = user2;
console.log(rest); // { email: "john@example.com", age: 25 }

// ==========================================
// 11. SPREADING OBJECTS (ES2018)
// ==========================================

let obj4 = { a: 1, b: 2 };
let obj5 = { c: 3, d: 4 };

// Merge objects
let merged = { ...obj4, ...obj5 };
console.log(merged); // { a: 1, b: 2, c: 3, d: 4 }

// Override properties
let overridden = { ...obj4, b: 20, e: 5 };
console.log(overridden); // { a: 1, b: 20, e: 5 }

// Shallow copy
let original = { x: 1, y: { z: 2 } };
let copy = { ...original };
copy.y.z = 99; // Modifies original too!
console.log(original.y.z); // 99

// ==========================================
// 12. OBJECT METHODS
// ==========================================

let sample = {
  name: "Test",
  value: 42,
  active: true
};

// Object.keys() - returns array of keys
console.log(Object.keys(sample)); // ["name", "value", "active"]

// Object.values() - returns array of values
console.log(Object.values(sample)); // ["Test", 42, true]

// Object.entries() - returns array of [key, value] pairs
console.log(Object.entries(sample));
// [["name", "Test"], ["value", 42], ["active", true]]

// Object.fromEntries() - creates object from entries
let entries = [["a", 1], ["b", 2]];
let fromEntries = Object.fromEntries(entries);
console.log(fromEntries); // { a: 1, b: 2 }

// Object.assign() - copy/merge objects
let target = { a: 1 };
let source = { b: 2, c: 3 };
Object.assign(target, source);
console.log(target); // { a: 1, b: 2, c: 3 }

// ==========================================
// 13. OBJECT FREEZING & SEALING
// ==========================================

// Object.freeze() - prevents any changes
let frozen = { name: "Frozen" };
Object.freeze(frozen);
frozen.name = "Changed"; // Silently fails (throws error in strict mode)
frozen.age = 25; // Can't add
delete frozen.name; // Can't delete
console.log(frozen); // { name: "Frozen" }

// Object.isFrozen()
console.log(Object.isFrozen(frozen)); // true

// Object.seal() - prevents add/delete but allows modification
let sealed = { name: "Sealed" };
Object.seal(sealed);
sealed.name = "Changed"; // Works
sealed.age = 25; // Doesn't work
console.log(sealed); // { name: "Changed" }

// Object.isSealed()
console.log(Object.isSealed(sealed)); // true

// Object.preventExtensions() - prevents adding new properties
let limited = { name: "Limited" };
Object.preventExtensions(limited);
limited.name = "Changed"; // Works
limited.age = 25; // Doesn't work
console.log(Object.isExtensible(limited)); // false

// ==========================================
// 14. PROPERTY DESCRIPTORS
// ==========================================

let descriptor = {
  value: "test",
  writable: true,      // Can be changed
  enumerable: true,    // Shows in loops
  configurable: true   // Can be deleted/reconfigured
};

let obj6 = {};
Object.defineProperty(obj6, "name", descriptor);

// Get property descriptor
let desc = Object.getOwnPropertyDescriptor(obj6, "name");
console.log(desc);

// Define multiple properties
Object.defineProperties(obj6, {
  age: {
    value: 30,
    writable: false  // Read-only
  },
  email: {
    value: "test@test.com",
    enumerable: false  // Won't show in for...in
  }
});

// ==========================================
// 15. GETTERS AND SETTERS
// ==========================================

let person5 = {
  firstName: "John",
  lastName: "Doe",
  
  // Getter
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  
  // Setter
  set fullName(value) {
    [this.firstName, this.lastName] = value.split(" ");
  }
};

console.log(person5.fullName); // John Doe (calls getter)
person5.fullName = "Jane Smith"; // Calls setter
console.log(person5.firstName); // Jane

// Using Object.defineProperty for getter/setter
let obj7 = { _age: 0 };
Object.defineProperty(obj7, "age", {
  get() { return this._age; },
  set(value) {
    if (value < 0) throw new Error("Age cannot be negative");
    this._age = value;
  }
});

// ==========================================
// 16. ITERATING OBJECTS
// ==========================================

let iterObj = { a: 1, b: 2, c: 3 };

// for...in loop
for (let key in iterObj) {
  console.log(`${key}: ${iterObj[key]}`);
}

// Object.keys() with forEach
Object.keys(iterObj).forEach(key => {
  console.log(`${key}: ${iterObj[key]}`);
});

// Object.entries() with for...of
for (let [key, value] of Object.entries(iterObj)) {
  console.log(`${key}: ${value}`);
}

// Object.values()
Object.values(iterObj).forEach(value => {
  console.log(value);
});

// ==========================================
// 17. OBJECT COMPARISON
// ==========================================

// Objects are compared by reference, not value
let obj8 = { a: 1 };
let obj9 = { a: 1 };
console.log(obj8 === obj9); // false (different references)

let obj10 = obj8;
console.log(obj8 === obj10); // true (same reference)

// Deep equality check (manual)
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  if (obj1 == null || obj2 == null) return false;
  if (typeof obj1 !== "object" || typeof obj2 !== "object") return false;
  
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  for (let key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }
  
  return true;
}

// ==========================================
// 18. CLONING OBJECTS
// ==========================================

let source2 = { a: 1, b: { c: 2 } };

// Shallow copy methods
let shallow1 = { ...source2 };
let shallow2 = Object.assign({}, source2);

// Deep copy methods
let deep1 = JSON.parse(JSON.stringify(source2)); // Simple but has limitations
let deep2 = structuredClone(source2); // Modern way (ES2022)

// ==========================================
// 19. OBJECT CHAINING
// ==========================================

let chain = {
  value: 0,
  add(n) {
    this.value += n;
    return this;  // Return this for chaining
  },
  multiply(n) {
    this.value *= n;
    return this;
  },
  get() {
    return this.value;
  }
};

let result = chain.add(5).multiply(2).add(10).get();
console.log(result); // 20

// ==========================================
// 20. REAL-WORLD EXAMPLES
// ==========================================

// Example 1: Configuration object
const config = {
  api: {
    baseURL: "https://api.example.com",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json"
    }
  },
  features: {
    darkMode: true,
    notifications: false
  }
};

// Example 2: Data transformation
function transformUser(user) {
  return {
    id: user.user_id,
    name: `${user.first_name} ${user.last_name}`,
    email: user.email_address,
    isActive: user.status === "active"
  };
}

// Example 3: Object pooling
class ObjectPool {
  constructor() {
    this.pool = [];
  }
  
  acquire() {
    return this.pool.pop() || this.create();
  }
  
  release(obj) {
    this.reset(obj);
    this.pool.push(obj);
  }
  
  create() {
    return { value: 0, active: false };
  }
  
  reset(obj) {
    obj.value = 0;
    obj.active = false;
  }
}

// Example 4: Grouping data
function groupBy(array, key) {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
}

let items = [
  { type: "fruit", name: "apple" },
  { type: "vegetable", name: "carrot" },
  { type: "fruit", name: "banana" }
];
console.log(groupBy(items, "type"));

// Example 5: Pick properties
function pick(obj, keys) {
  return keys.reduce((result, key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
    return result;
  }, {});
}

// Example 6: Omit properties
function omit(obj, keys) {
  return Object.keys(obj)
    .filter(key => !keys.includes(key))
    .reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {});
}

// ==========================================
// PRACTICE EXERCISES
// ==========================================

/*
1. Create a function that merges two objects deeply

2. Write a function that flattens a nested object
   Example: { a: { b: { c: 1 } } } → { "a.b.c": 1 }

3. Create a function that inverts object keys and values

4. Write a function that removes all properties with falsy values

5. Create a function that compares two objects for deep equality

6. Write a function that gets a nested property using dot notation string
   Example: get(obj, "user.address.city")

7. Create a function that sets a nested property using dot notation

8. Write a function that counts properties in a nested object

9. Create a function that converts object to query string

10. Write a function that groups array of objects by multiple keys

11. Create a function that validates object against a schema

12. Write a function that creates a proxy for property validation

13. Create a memoization function using objects as cache

14. Write a function that finds differences between two objects

15. Create a function that sorts object keys alphabetically
*/

// ==========================================
// BEST PRACTICES
// ==========================================

/*
1. Use const for objects that won't be reassigned
2. Prefer object literal syntax over new Object()
3. Use property shorthand when possible
4. Use computed property names for dynamic keys
5. Leverage destructuring for cleaner code
6. Use spread operator for shallow copies
7. Be aware of shallow vs deep copying
8. Use Object.keys/values/entries for iteration
9. Prefer dot notation unless keys are dynamic
10. Use optional chaining for safe property access
11. Document complex object structures
12. Keep objects flat when possible (avoid deep nesting)
13. Use getters/setters for computed properties
14. Freeze objects that shouldn't change
15. Use meaningful property names
*/