/**
 * ============================================
 * TESTING BASICS IN JAVASCRIPT
 * ============================================
 */

// ==========================================
// 1. WHAT IS TESTING?
// ==========================================

/*
Testing ensures your code works as expected.

Types of tests:
- Unit tests: Test individual functions/components
- Integration tests: Test how parts work together
- E2E tests: Test entire user flows

Popular testing frameworks:
- Jest
- Mocha + Chai
- Jasmine
- Vitest
*/

// ==========================================
// 2. SIMPLE MANUAL TESTING
// ==========================================

// Function to test
function add(a, b) {
  return a + b;
}

// Manual tests
console.assert(add(2, 3) === 5, 'add(2, 3) should equal 5');
console.assert(add(-1, 1) === 0, 'add(-1, 1) should equal 0');
console.assert(add(0, 0) === 0, 'add(0, 0) should equal 0');

// ==========================================
// 3. SIMPLE TEST FRAMEWORK
// ==========================================

// Basic test runner
function test(description, callback) {
  try {
    callback();
    console.log(`✓ ${description}`);
  } catch (error) {
    console.error(`✗ ${description}`);
    console.error(error);
  }
}

// Assertion helper
function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`Expected ${expected} but got ${actual}`);
      }
    },
    toEqual(expected) {
      if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`);
      }
    },
    toBeTruthy() {
      if (!actual) {
        throw new Error(`Expected truthy but got ${actual}`);
      }
    },
    toBeFalsy() {
      if (actual) {
        throw new Error(`Expected falsy but got ${actual}`);
      }
    }
  };
}

// Using our simple framework
test('add() adds two numbers', () => {
  expect(add(2, 3)).toBe(5);
});

test('add() handles negative numbers', () => {
  expect(add(-1, 1)).toBe(0);
});

// ==========================================
// 4. JEST-STYLE SYNTAX (MOST POPULAR)
// ==========================================

/*
// Basic Jest test structure:

describe('Calculator', () => {
  test('adds numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });
  
  test('subtracts numbers correctly', () => {
    expect(subtract(5, 3)).toBe(2);
  });
});

// Matchers:
expect(value).toBe(expected)           // Strict equality ===
expect(value).toEqual(expected)        // Deep equality
expect(value).toBeTruthy()             // Truthy value
expect(value).toBeFalsy()              // Falsy value
expect(value).toBeNull()               // null
expect(value).toBeUndefined()          // undefined
expect(value).toBeDefined()            // not undefined
expect(value).toBeGreaterThan(3)       // > 3
expect(value).toBeLessThan(5)          // < 5
expect(value).toContain('text')        // Array/String contains
expect(fn).toThrow()                   // Function throws
expect(fn).toHaveBeenCalled()          // Mock was called
*/

// ==========================================
// 5. TESTING PURE FUNCTIONS
// ==========================================

// Pure function (easy to test)
function multiply(a, b) {
  return a * b;
}

test('multiply() multiplies two numbers', () => {
  expect(multiply(3, 4)).toBe(12);
  expect(multiply(-2, 5)).toBe(-10);
  expect(multiply(0, 100)).toBe(0);
});

// ==========================================
// 6. TESTING WITH EDGE CASES
// ==========================================

function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

test('divide() divides numbers', () => {
  expect(divide(10, 2)).toBe(5);
  expect(divide(9, 3)).toBe(3);
});

test('divide() throws error for division by zero', () => {
  expect(() => divide(5, 0)).toThrow();
});

// ==========================================
// 7. TESTING ARRAYS AND OBJECTS
// ==========================================

function getUser() {
  return {
    id: 1,
    name: 'John',
    email: 'john@example.com'
  };
}

test('getUser() returns correct user object', () => {
  const user = getUser();
  expect(user).toEqual({
    id: 1,
    name: 'John',
    email: 'john@example.com'
  });
});

function filterEvenNumbers(numbers) {
  return numbers.filter(n => n % 2 === 0);
}

test('filterEvenNumbers() returns only even numbers', () => {
  expect(filterEvenNumbers([1, 2, 3, 4, 5])).toEqual([2, 4]);
  expect(filterEvenNumbers([1, 3, 5])).toEqual([]);
  expect(filterEvenNumbers([])).toEqual([]);
});

// ==========================================
// 8. TESTING ASYNCHRONOUS CODE
// ==========================================

// With callbacks
function fetchData(callback) {
  setTimeout(() => {
    callback({ data: 'test' });
  }, 100);
}

/*
// Jest async test with callback
test('fetchData() calls callback with data', (done) => {
  fetchData((data) => {
    expect(data).toEqual({ data: 'test' });
    done(); // Tell Jest test is done
  });
});
*/

// With promises
function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: 'John' });
    }, 100);
  });
}

/*
// Jest promise test
test('fetchUser() returns user', () => {
  return fetchUser(1).then(user => {
    expect(user).toEqual({ id: 1, name: 'John' });
  });
});

// Or with async/await
test('fetchUser() returns user', async () => {
  const user = await fetchUser(1);
  expect(user).toEqual({ id: 1, name: 'John' });
});
*/

// ==========================================
// 9. SETUP AND TEARDOWN
// ==========================================

/*
// Jest lifecycle hooks

beforeAll(() => {
  // Runs once before all tests
  // Setup database connection, etc.
});

beforeEach(() => {
  // Runs before each test
  // Reset data, clear mocks, etc.
});

afterEach(() => {
  // Runs after each test
  // Clean up
});

afterAll(() => {
  // Runs once after all tests
  // Close connections, etc.
});

describe('Database operations', () => {
  let db;
  
  beforeAll(() => {
    db = connectToDatabase();
  });
  
  beforeEach(() => {
    db.clear();
  });
  
  afterAll(() => {
    db.disconnect();
  });
  
  test('insert user', async () => {
    await db.insert({ name: 'John' });
    const users = await db.getAll();
    expect(users.length).toBe(1);
  });
});
*/

// ==========================================
// 10. MOCKING
// ==========================================

/*
// Mocking functions
const mockFn = jest.fn();
mockFn('test');
expect(mockFn).toHaveBeenCalledWith('test');

// Mock return values
const mockGetUser = jest.fn(() => ({ id: 1, name: 'John' }));
const user = mockGetUser();
expect(user.name).toBe('John');

// Mock implementations
const mockFetch = jest.fn((url) => {
  if (url === '/users') {
    return Promise.resolve([{ id: 1 }]);
  }
  return Promise.reject(new Error('Not found'));
});

// Spy on methods
const spy = jest.spyOn(console, 'log');
console.log('test');
expect(spy).toHaveBeenCalledWith('test');
spy.mockRestore(); // Restore original
*/

// ==========================================
// 11. TEST-DRIVEN DEVELOPMENT (TDD)
// ==========================================

/*
TDD Process:
1. Write test (it fails - RED)
2. Write minimal code to pass (GREEN)
3. Refactor code (REFACTOR)
4. Repeat

Example:
*/

// Step 1: Write test first
test('sum() returns sum of array', () => {
  expect(sum([1, 2, 3])).toBe(6);
  expect(sum([])).toBe(0);
  expect(sum([5])).toBe(5);
});

// Step 2: Write implementation
function sum(numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

// Step 3: Test passes, refactor if needed

// ==========================================
// 12. TESTING CLASSES
// ==========================================

class Counter {
  constructor(initialValue = 0) {
    this.count = initialValue;
  }
  
  increment() {
    this.count++;
  }
  
  decrement() {
    this.count--;
  }
  
  reset() {
    this.count = 0;
  }
  
  getValue() {
    return this.count;
  }
}

/*
describe('Counter', () => {
  let counter;
  
  beforeEach(() => {
    counter = new Counter();
  });
  
  test('starts at 0', () => {
    expect(counter.getValue()).toBe(0);
  });
  
  test('increments correctly', () => {
    counter.increment();
    expect(counter.getValue()).toBe(1);
  });
  
  test('decrements correctly', () => {
    counter.increment();
    counter.increment();
    counter.decrement();
    expect(counter.getValue()).toBe(1);
  });
  
  test('resets to 0', () => {
    counter.increment();
    counter.reset();
    expect(counter.getValue()).toBe(0);
  });
  
  test('accepts initial value', () => {
    const counter2 = new Counter(10);
    expect(counter2.getValue()).toBe(10);
  });
});
*/

// ==========================================
// 13. TESTING ERROR HANDLING
// ==========================================

function validateEmail(email) {
  if (!email) {
    throw new Error('Email is required');
  }
  if (!email.includes('@')) {
    throw new Error('Invalid email format');
  }
  return true;
}

test('validateEmail() validates email', () => {
  expect(validateEmail('test@example.com')).toBe(true);
});

test('validateEmail() throws for missing email', () => {
  expect(() => validateEmail('')).toThrow('Email is required');
});

test('validateEmail() throws for invalid format', () => {
  expect(() => validateEmail('invalid')).toThrow('Invalid email format');
});

// ==========================================
// 14. COVERAGE
// ==========================================

/*
Code coverage measures how much code is tested:

- Statement coverage: % of statements executed
- Branch coverage: % of branches (if/else) executed
- Function coverage: % of functions called
- Line coverage: % of lines executed

Jest command: jest --coverage

Aim for:
- 80%+ coverage for critical code
- 100% for utilities
- Don't obsess over 100% everywhere
*/

// ==========================================
// 15. BEST PRACTICES
// ==========================================

/*
1. ✅ Test behavior, not implementation
2. ✅ Write descriptive test names
3. ✅ One assertion per test (ideally)
4. ✅ Use AAA pattern: Arrange, Act, Assert
5. ✅ Test edge cases and errors
6. ✅ Keep tests independent
7. ✅ Use setup/teardown appropriately
8. ✅ Mock external dependencies
9. ✅ Test async code properly
10. ✅ Don't test framework code
11. ✅ Write tests first (TDD)
12. ✅ Keep tests fast
13. ✅ Maintain test code quality
14. ✅ Use meaningful test data
15. ✅ Review test failures carefully
*/

// ==========================================
// 16. REAL-WORLD EXAMPLE
// ==========================================

class TodoList {
  constructor() {
    this.todos = [];
    this.nextId = 1;
  }
  
  add(text) {
    const todo = {
      id: this.nextId++,
      text,
      completed: false
    };
    this.todos.push(todo);
    return todo;
  }
  
  complete(id) {
    const todo = this.todos.find(t => t.id === id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    todo.completed = true;
  }
  
  getAll() {
    return [...this.todos];
  }
  
  getActive() {
    return this.todos.filter(t => !t.completed);
  }
}

/*
describe('TodoList', () => {
  let todoList;
  
  beforeEach(() => {
    todoList = new TodoList();
  });
  
  describe('add()', () => {
    test('adds todo with unique id', () => {
      const todo = todoList.add('Test todo');
      expect(todo).toEqual({
        id: 1,
        text: 'Test todo',
        completed: false
      });
    });
    
    test('increments id for each todo', () => {
      todoList.add('First');
      const second = todoList.add('Second');
      expect(second.id).toBe(2);
    });
  });
  
  describe('complete()', () => {
    test('marks todo as completed', () => {
      const todo = todoList.add('Test');
      todoList.complete(todo.id);
      expect(todoList.getAll()[0].completed).toBe(true);
    });
    
    test('throws error for invalid id', () => {
      expect(() => todoList.complete(999)).toThrow('Todo not found');
    });
  });
  
  describe('getActive()', () => {
    test('returns only incomplete todos', () => {
      todoList.add('First');
      const todo2 = todoList.add('Second');
      todoList.complete(todo2.id);
      
      const active = todoList.getActive();
      expect(active).toHaveLength(1);
      expect(active[0].text).toBe('First');
    });
    
    test('returns empty array when all completed', () => {
      const todo = todoList.add('Test');
      todoList.complete(todo.id);
      expect(todoList.getActive()).toEqual([]);
    });
  });
});
*/

// ==========================================
// PRACTICE EXERCISES
// ==========================================

/*
1. Write tests for a sum() function

2. Test a function that filters array by condition

3. Write tests for a string capitalize function

4. Test a function that validates passwords

5. Write tests for async function with promises

6. Test a class with multiple methods

7. Write tests with setup/teardown

8. Test error conditions thoroughly

9. Mock external API calls

10. Write integration test for multiple functions

11. Test edge cases (empty arrays, null, undefined)

12. Write tests for array manipulation functions

13. Test object manipulation functions

14. Create tests for form validation

15. Write comprehensive test suite for mini project
*/

// ==========================================
// GETTING STARTED WITH JEST
// ==========================================

/*
1. Install Jest:
   npm install --save-dev jest

2. Add to package.json:
   "scripts": {
     "test": "jest"
   }

3. Create test file (e.g., sum.test.js)

4. Run tests:
   npm test

5. Watch mode:
   npm test -- --watch

6. Coverage:
   npm test -- --coverage
*/