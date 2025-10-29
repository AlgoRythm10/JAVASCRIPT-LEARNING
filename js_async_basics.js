/**
 * ============================================
 * ASYNCHRONOUS JAVASCRIPT - CALLBACKS
 * ============================================
 */

// ==========================================
// 1. UNDERSTANDING SYNCHRONOUS VS ASYNCHRONOUS
// ==========================================

// SYNCHRONOUS (Blocking) - executes line by line
console.log("First");
console.log("Second");
console.log("Third");
// Output: First, Second, Third

// ASYNCHRONOUS (Non-blocking) - doesn't wait
console.log("Start");
setTimeout(() => {
  console.log("Delayed");
}, 1000);
console.log("End");
// Output: Start, End, Delayed (after 1 second)

// ==========================================
// 2. WHAT ARE CALLBACKS?
// ==========================================

// Callback = Function passed as argument to another function
function processUser(name, callback) {
  console.log(`Processing ${name}...`);
  callback(name);
}

processUser("John", function(name) {
  console.log(`${name} has been processed`);
});

// ==========================================
// 3. SETTIMEOUT - DELAYED EXECUTION
// ==========================================

// Basic setTimeout
setTimeout(function() {
  console.log("Executed after 2 seconds");
}, 2000);

// With arrow function
setTimeout(() => {
  console.log("Arrow function callback");
}, 1000);

// With parameters
function greet(name, greeting) {
  console.log(`${greeting}, ${name}!`);
}
setTimeout(greet, 1000, "John", "Hello");

// Clearing timeout
let timeoutId = setTimeout(() => {
  console.log("This won't run");
}, 5000);
clearTimeout(timeoutId); // Cancel the timeout

// ==========================================
// 4. SETINTERVAL - REPEATED EXECUTION
// ==========================================

// Execute every second
let counter = 0;
let intervalId = setInterval(() => {
  counter++;
  console.log(`Count: ${counter}`);
  
  if (counter === 5) {
    clearInterval(intervalId); // Stop after 5
  }
}, 1000);

// Countdown timer example
function countdown(seconds) {
  let remaining = seconds;
  
  let id = setInterval(() => {
    console.log(remaining);
    remaining--;
    
    if (remaining < 0) {
      clearInterval(id);
      console.log("Done!");
    }
  }, 1000);
}

// countdown(5); // Uncomment to test

// ==========================================
// 5. CALLBACK PATTERNS
// ==========================================

// Error-first callback pattern (Node.js style)
function readFile(filename, callback) {
  // Simulate file reading
  setTimeout(() => {
    if (filename === "error.txt") {
      callback(new Error("File not found"), null);
    } else {
      callback(null, "File contents here");
    }
  }, 1000);
}

readFile("data.txt", function(err, data) {
  if (err) {
    console.error("Error:", err.message);
    return;
  }
  console.log("Data:", data);
});

// Success/failure callbacks
function fetchData(url, onSuccess, onError) {
  setTimeout(() => {
    if (url.includes("valid")) {
      onSuccess({ data: "Success!" });
    } else {
      onError("Invalid URL");
    }
  }, 1000);
}

fetchData(
  "valid-url.com",
  (data) => console.log("Success:", data),
  (error) => console.error("Error:", error)
);

// ==========================================
// 6. CALLBACK HELL (PYRAMID OF DOOM)
// ==========================================

// Example of deeply nested callbacks
function step1(callback) {
  setTimeout(() => {
    console.log("Step 1 complete");
    callback();
  }, 1000);
}

function step2(callback) {
  setTimeout(() => {
    console.log("Step 2 complete");
    callback();
  }, 1000);
}

function step3(callback) {
  setTimeout(() => {
    console.log("Step 3 complete");
    callback();
  }, 1000);
}

// Nested callbacks (hard to read and maintain)
step1(() => {
  step2(() => {
    step3(() => {
      console.log("All steps complete");
    });
  });
});

// ==========================================
// 7. HANDLING MULTIPLE ASYNC OPERATIONS
// ==========================================

// Parallel execution (all start at once)
function parallelExecution() {
  setTimeout(() => console.log("Task 1"), 2000);
  setTimeout(() => console.log("Task 2"), 1000);
  setTimeout(() => console.log("Task 3"), 1500);
}
// Output order: Task 2, Task 3, Task 1

// Sequential execution (one after another)
function sequentialExecution() {
  setTimeout(() => {
    console.log("Task 1");
    setTimeout(() => {
      console.log("Task 2");
      setTimeout(() => {
        console.log("Task 3");
      }, 1000);
    }, 1000);
  }, 1000);
}

// ==========================================
// 8. CALLBACK WITH ARRAY METHODS
// ==========================================

// forEach with callback
let numbers = [1, 2, 3, 4, 5];
numbers.forEach(function(num) {
  console.log(num * 2);
});

// map with callback
let doubled = numbers.map(num => num * 2);

// filter with callback
let evens = numbers.filter(num => num % 2 === 0);

// reduce with callback
let sum = numbers.reduce((total, num) => total + num, 0);

// ==========================================
// 9. EVENT LISTENERS (CALLBACKS)
// ==========================================

// Browser event listeners (conceptual - won't run in Node)
/*
document.getElementById("btn").addEventListener("click", function(event) {
  console.log("Button clicked!");
});

// Remove event listener
function handleClick() {
  console.log("Clicked");
}
element.addEventListener("click", handleClick);
element.removeEventListener("click", handleClick);
*/

// ==========================================
// 10. CUSTOM EVENT EMITTER PATTERN
// ==========================================

class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
  
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}

// Usage
let emitter = new EventEmitter();

emitter.on("userLogin", (username) => {
  console.log(`${username} logged in`);
});

emitter.on("userLogin", (username) => {
  console.log(`Welcome, ${username}!`);
});

emitter.emit("userLogin", "John");
// Output: John logged in
//         Welcome, John!

// ==========================================
// 11. AVOIDING CALLBACK HELL
// ==========================================

// Solution 1: Named functions
function processStep1(callback) {
  setTimeout(() => {
    console.log("Step 1");
    callback();
  }, 1000);
}

function processStep2(callback) {
  setTimeout(() => {
    console.log("Step 2");
    callback();
  }, 1000);
}

function processStep3() {
  setTimeout(() => {
    console.log("Step 3");
    console.log("Done");
  }, 1000);
}

// Much cleaner
processStep1(() => {
  processStep2(() => {
    processStep3();
  });
});

// Solution 2: Modularization
function createDelayedLogger(message, delay) {
  return function(callback) {
    setTimeout(() => {
      console.log(message);
      if (callback) callback();
    }, delay);
  };
}

let task1 = createDelayedLogger("Task 1", 1000);
let task2 = createDelayedLogger("Task 2", 1000);
let task3 = createDelayedLogger("Task 3", 1000);

// ==========================================
// 12. CALLBACK PATTERNS IN REAL APIS
// ==========================================

// File system (Node.js style)
function simulateFS() {
  const fs = {
    readFile(path, encoding, callback) {
      setTimeout(() => {
        if (path === "data.txt") {
          callback(null, "File content");
        } else {
          callback(new Error("File not found"));
        }
      }, 100);
    },
    
    writeFile(path, data, callback) {
      setTimeout(() => {
        callback(null);
        console.log("File written");
      }, 100);
    }
  };
  
  return fs;
}

let fs = simulateFS();

fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
  
  fs.writeFile("output.txt", data.toUpperCase(), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Success!");
  });
});

// ==========================================
// 13. THROTTLING AND DEBOUNCING
// ==========================================

// Throttle - limits function execution rate
function throttle(func, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

// Debounce - delays execution until after wait time
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Usage example
const expensiveOperation = () => console.log("Expensive operation");
const throttled = throttle(expensiveOperation, 1000);
const debounced = debounce(expensiveOperation, 1000);

// ==========================================
// 14. CALLBACK QUEUE AND EVENT LOOP
// ==========================================

console.log("1");

setTimeout(() => {
  console.log("2");
}, 0); // Even with 0 delay, it goes to queue

console.log("3");

// Output: 1, 3, 2
// Explanation: setTimeout callbacks go to callback queue,
// executed after current execution context finishes

// ==========================================
// 15. REAL-WORLD EXAMPLES
// ==========================================

// Example 1: Loading multiple resources
function loadResources(resources, onComplete) {
  let loaded = 0;
  let results = [];
  
  resources.forEach((resource, index) => {
    loadResource(resource, (data) => {
      results[index] = data;
      loaded++;
      
      if (loaded === resources.length) {
        onComplete(results);
      }
    });
  });
}

function loadResource(name, callback) {
  setTimeout(() => {
    callback(`Data from ${name}`);
  }, Math.random() * 1000);
}

// Example 2: Retry logic
function retryOperation(operation, maxRetries, callback) {
  let attempts = 0;
  
  function attempt() {
    attempts++;
    
    operation((err, result) => {
      if (err) {
        if (attempts < maxRetries) {
          console.log(`Retry ${attempts}/${maxRetries}`);
          setTimeout(attempt, 1000);
        } else {
          callback(new Error("Max retries reached"));
        }
      } else {
        callback(null, result);
      }
    });
  }
  
  attempt();
}

// Example 3: Rate limiter
function rateLimiter(maxCalls, interval) {
  let calls = [];
  
  return function(callback) {
    const now = Date.now();
    
    // Remove old calls
    calls = calls.filter(time => now - time < interval);
    
    if (calls.length < maxCalls) {
      calls.push(now);
      callback();
    } else {
      console.log("Rate limit exceeded");
    }
  };
}

const limiter = rateLimiter(3, 1000); // 3 calls per second

// Example 4: Queue processor
class AsyncQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }
  
  add(task) {
    this.queue.push(task);
    if (!this.processing) {
      this.process();
    }
  }
  
  process() {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }
    
    this.processing = true;
    const task = this.queue.shift();
    
    task(() => {
      this.process();
    });
  }
}

// Usage
const queue = new AsyncQueue();

queue.add((done) => {
  setTimeout(() => {
    console.log("Task 1");
    done();
  }, 1000);
});

queue.add((done) => {
  setTimeout(() => {
    console.log("Task 2");
    done();
  }, 500);
});

// ==========================================
// 16. ERROR HANDLING IN CALLBACKS
// ==========================================

// Always handle errors
function asyncOperation(callback) {
  setTimeout(() => {
    try {
      // Risky operation
      const result = JSON.parse("invalid json");
      callback(null, result);
    } catch (error) {
      callback(error, null);
    }
  }, 1000);
}

asyncOperation((err, data) => {
  if (err) {
    console.error("Error occurred:", err.message);
    return;
  }
  console.log("Data:", data);
});

// ==========================================
// PRACTICE EXERCISES
// ==========================================

/*
1. Create a function that executes an array of async tasks sequentially

2. Write a callback-based function that simulates an API call with random success/failure

3. Create a simple timer that counts up and can be paused/resumed using callbacks

4. Implement a function that loads data with a timeout (fails if takes too long)

5. Write a function that polls an API every X seconds until condition is met

6. Create a callback-based animation system that moves an element

7. Implement a queue system that processes tasks with a maximum concurrency

8. Write a function that batches API calls to avoid rate limiting

9. Create a callback-based cache with expiration

10. Implement a circuit breaker pattern using callbacks

11. Write a function that coordinates multiple parallel async operations

12. Create a callback-based state machine

13. Implement a simple pub/sub system using callbacks

14. Write a function that chains async operations with error recovery

15. Create a callback-based worker pool
*/

// ==========================================
// COMMON MISTAKES
// ==========================================

/*
1. Forgetting to call the callback
2. Calling callback multiple times
3. Not handling errors properly
4. Creating callback hell with deep nesting
5. Losing 'this' context in callbacks
6. Memory leaks with forgotten timers
7. Not clearing intervals/timeouts
8. Synchronous errors in async callbacks
9. Blocking event loop with heavy operations
10. Race conditions with shared state
*/

// ==========================================
// BEST PRACTICES
// ==========================================

/*
1. Always follow error-first callback convention
2. Keep callbacks small and focused
3. Use named functions instead of anonymous ones
4. Handle errors consistently
5. Avoid deep nesting (callback hell)
6. Clear timers when done
7. Document callback parameters
8. Consider promises/async-await for complex flows
9. Use try-catch for synchronous errors in callbacks
10. Be aware of closure scope in callbacks
11. Use arrow functions carefully (this binding)
12. Consider using utility libraries for complex async flows
13. Test async code thoroughly
14. Use debugger and console.log strategically
15. Profile performance of callback-heavy code
*/

// ==========================================
// WHY CALLBACKS ARE BEING REPLACED
// ==========================================

/*
Callbacks have issues:
1. Callback hell (pyramid of doom)
2. Difficult error handling
3. Hard to reason about flow
4. Inversion of control
5. Difficult to compose

Modern alternatives:
1. Promises (better chaining)
2. Async/Await (synchronous-looking code)
3. Observables (for streams)

However, callbacks are still used in:
- Event listeners
- Array methods (map, filter, etc.)
- Many Node.js APIs
- Legacy codebases
*/