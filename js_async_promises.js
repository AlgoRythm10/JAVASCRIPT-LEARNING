/**
 * ============================================
 * ASYNCHRONOUS JAVASCRIPT - PROMISES
 * ============================================
 */

// ==========================================
// 1. WHAT IS A PROMISE?
// ==========================================

/*
A Promise is an object representing the eventual completion 
or failure of an asynchronous operation.

States:
- Pending: Initial state
- Fulfilled: Operation completed successfully
- Rejected: Operation failed
*/

// ==========================================
// 2. CREATING PROMISES
// ==========================================

// Basic Promise
let promise = new Promise((resolve, reject) => {
  // Async operation
  setTimeout(() => {
    resolve("Success!"); // Fulfill the promise
  }, 1000);
});

// Promise that rejects
let failedPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("Something went wrong!"));
  }, 1000);
});

// ==========================================
// 3. CONSUMING PROMISES - THEN/CATCH
// ==========================================

// Using .then()
promise.then((result) => {
  console.log(result); // "Success!"
});

// Chaining .then()
promise
  .then((result) => {
    console.log(result);
    return result + " More data";
  })
  .then((newResult) => {
    console.log(newResult); // "Success! More data"
  });

// Using .catch() for errors
failedPromise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error.message); // "Something went wrong!"
  });

// Using .finally() - always executes
promise
  .then((result) => console.log(result))
  .catch((error) => console.error(error))
  .finally(() => {
    console.log("Cleanup code - always runs");
  });

// ==========================================
// 4. PROMISE CHAINING
// ==========================================

function step1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Step 1 complete");
      resolve(1);
    }, 1000);
  });
}

function step2(value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Step 2 complete");
      resolve(value + 1);
    }, 1000);
  });
}

function step3(value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Step 3 complete");
      resolve(value + 1);
    }, 1000);
  });
}

// Clean chaining (no callback hell!)
step1()
  .then(result1 => step2(result1))
  .then(result2 => step3(result2))
  .then(result3 => {
    console.log("Final result:", result3); // 3
  })
  .catch(error => {
    console.error("Error:", error);
  });

// ==========================================
// 5. ERROR HANDLING IN PROMISES
// ==========================================

// Error propagates down the chain
new Promise((resolve, reject) => {
  reject(new Error("Initial error"));
})
  .then(() => console.log("This won't run"))
  .then(() => console.log("This won't run either"))
  .catch((error) => {
    console.error("Caught:", error.message);
  });

// Throwing errors in .then()
new Promise((resolve) => {
  resolve("Data");
})
  .then((data) => {
    throw new Error("Error in then");
  })
  .catch((error) => {
    console.error(error.message); // "Error in then"
  });

// Recovering from errors
new Promise((resolve, reject) => {
  reject(new Error("Failed"));
})
  .catch((error) => {
    console.error("Error:", error.message);
    return "Recovered!"; // Return value to continue chain
  })
  .then((result) => {
    console.log(result); // "Recovered!"
  });

// ==========================================
// 6. PROMISE.ALL() - PARALLEL EXECUTION
// ==========================================

// Wait for all promises to resolve
let promise1 = Promise.resolve(1);
let promise2 = Promise.resolve(2);
let promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log(results); // [1, 2, 3]
  });

// Real example - fetching multiple resources
function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: `User${id}` }), 1000);
  });
}

Promise.all([
  fetchUser(1),
  fetchUser(2),
  fetchUser(3)
])
  .then((users) => {
    console.log(users);
    // [{ id: 1, name: "User1" }, { id: 2, name: "User2" }, { id: 3, name: "User3" }]
  });

// If any promise rejects, Promise.all rejects
Promise.all([
  Promise.resolve(1),
  Promise.reject(new Error("Failed")),
  Promise.resolve(3)
])
  .then((results) => console.log(results))
  .catch((error) => console.error(error.message)); // "Failed"

// ==========================================
// 7. PROMISE.ALLSETTLED() - ALL RESULTS
// ==========================================

// Returns results of all promises (fulfilled or rejected)
Promise.allSettled([
  Promise.resolve(1),
  Promise.reject(new Error("Failed")),
  Promise.resolve(3)
])
  .then((results) => {
    console.log(results);
    /*
    [
      { status: "fulfilled", value: 1 },
      { status: "rejected", reason: Error: Failed },
      { status: "fulfilled", value: 3 }
    ]
    */
  });

// ==========================================
// 8. PROMISE.RACE() - FIRST TO SETTLE
// ==========================================

// Returns first promise to settle (resolve or reject)
Promise.race([
  new Promise((resolve) => setTimeout(() => resolve("Fast"), 100)),
  new Promise((resolve) => setTimeout(() => resolve("Slow"), 1000))
])
  .then((result) => {
    console.log(result); // "Fast"
  });

// Timeout implementation
function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Timeout")), ms);
  });
}

function fetchWithTimeout(url, ms) {
  return Promise.race([
    fetch(url),
    timeout(ms)
  ]);
}

// ==========================================
// 9. PROMISE.ANY() - FIRST FULFILLED
// ==========================================

// Returns first fulfilled promise, ignores rejections
Promise.any([
  Promise.reject(new Error("Error 1")),
  Promise.resolve("Success!"),
  Promise.reject(new Error("Error 2"))
])
  .then((result) => {
    console.log(result); // "Success!"
  });

// If all reject, returns AggregateError
Promise.any([
  Promise.reject(new Error("Error 1")),
  Promise.reject(new Error("Error 2"))
])
  .catch((error) => {
    console.error(error); // AggregateError
  });

// ==========================================
// 10. PROMISE.RESOLVE() & PROMISE.REJECT()
// ==========================================

// Create immediately resolved promise
let resolved = Promise.resolve("Immediate value");
resolved.then(console.log); // "Immediate value"

// Create immediately rejected promise
let rejected = Promise.reject(new Error("Immediate error"));
rejected.catch((err) => console.error(err.message));

// Convert value to promise
function doubleValue(x) {
  return Promise.resolve(x * 2);
}

doubleValue(5).then(console.log); // 10

// ==========================================
// 11. PROMISIFYING CALLBACKS
// ==========================================

// Convert callback-based function to promise
function callbackFunction(value, callback) {
  setTimeout(() => {
    if (value > 0) {
      callback(null, value * 2);
    } else {
      callback(new Error("Value must be positive"));
    }
  }, 1000);
}

// Promisified version
function promisifiedFunction(value) {
  return new Promise((resolve, reject) => {
    callbackFunction(value, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

promisifiedFunction(5)
  .then((result) => console.log(result)) // 10
  .catch((err) => console.error(err));

// Generic promisify utility
function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };
}

// Usage
const promisifiedCB = promisify(callbackFunction);
promisifiedCB(10).then(console.log); // 20

// ==========================================
// 12. SEQUENTIAL VS PARALLEL EXECUTION
// ==========================================

// Sequential (one after another)
async function sequential() {
  const result1 = await Promise.resolve(1);
  const result2 = await Promise.resolve(2);
  const result3 = await Promise.resolve(3);
  return [result1, result2, result3];
}

// Parallel (all at once)
async function parallel() {
  const results = await Promise.all([
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
  ]);
  return results;
}

// ==========================================
// 13. PROMISE PATTERNS
// ==========================================

// Pattern 1: Retry logic
function retry(fn, maxAttempts) {
  return new Promise((resolve, reject) => {
    function attempt(attemptsLeft) {
      fn()
        .then(resolve)
        .catch((error) => {
          if (attemptsLeft <= 1) {
            reject(error);
          } else {
            console.log(`Retrying... ${attemptsLeft - 1} attempts left`);
            setTimeout(() => attempt(attemptsLeft - 1), 1000);
          }
        });
    }
    attempt(maxAttempts);
  });
}

// Pattern 2: Delay/Sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

sleep(2000).then(() => console.log("Waited 2 seconds"));

// Pattern 3: Promise queue (sequential execution)
function promiseQueue(promises) {
  return promises.reduce((chain, promise) => {
    return chain.then(() => promise());
  }, Promise.resolve());
}

// Pattern 4: Batch processing
function batchProcess(items, batchSize, processor) {
  const batches = [];
  for (let i = 0; i < items.length; i += batchSize) {
    batches.push(items.slice(i, i + batchSize));
  }
  
  return batches.reduce((chain, batch) => {
    return chain.then(() => Promise.all(batch.map(processor)));
  }, Promise.resolve());
}

// Pattern 5: Timeout wrapper
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Timeout")), ms)
    )
  ]);
}

// ==========================================
// 14. REAL-WORLD EXAMPLES
// ==========================================

// Example 1: API call with retry
function fetchWithRetry(url, options = {}, retries = 3) {
  return fetch(url, options).catch((error) => {
    if (retries > 0) {
      console.log(`Retrying... ${retries} attempts left`);
      return sleep(1000).then(() => 
        fetchWithRetry(url, options, retries - 1)
      );
    }
    throw error;
  });
}

// Example 2: Loading multiple pages
function loadAllPages(baseUrl, totalPages) {
  const promises = [];
  for (let page = 1; page <= totalPages; page++) {
    promises.push(fetch(`${baseUrl}?page=${page}`));
  }
  return Promise.all(promises);
}

// Example 3: Waterfall execution
function waterfall(tasks) {
  return tasks.reduce((chain, task) => {
    return chain.then(task);
  }, Promise.resolve());
}

// Example 4: Parallel limit (controlled concurrency)
function parallelLimit(items, limit, processor) {
  const results = [];
  let index = 0;
  
  function runNext() {
    if (index >= items.length) return Promise.resolve();
    
    const currentIndex = index++;
    return processor(items[currentIndex])
      .then((result) => {
        results[currentIndex] = result;
        return runNext();
      });
  }
  
  const workers = Array(Math.min(limit, items.length))
    .fill(null)
    .map(() => runNext());
  
  return Promise.all(workers).then(() => results);
}

// Example 5: Cache with promises
class PromiseCache {
  constructor() {
    this.cache = new Map();
  }
  
  get(key, fetcher) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    
    const promise = fetcher()
      .then((value) => {
        this.cache.set(key, Promise.resolve(value));
        return value;
      })
      .catch((error) => {
        this.cache.delete(key);
        throw error;
      });
    
    this.cache.set(key, promise);
    return promise;
  }
}

// ==========================================
// 15. PROMISE ANTI-PATTERNS
// ==========================================

// ANTI-PATTERN 1: Nested promises (callback hell 2.0)
// Bad
doSomething().then((result) => {
  doSomethingElse(result).then((newResult) => {
    doThirdThing(newResult).then((finalResult) => {
      console.log(finalResult);
    });
  });
});

// Good
doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => console.log(finalResult));

// ANTI-PATTERN 2: Not returning promises
// Bad
doSomething().then(() => {
  doSomethingElse(); // Not returned!
});

// Good
doSomething().then(() => {
  return doSomethingElse();
});

// ANTI-PATTERN 3: Using .then() for everything
// Bad
getUser()
  .then((user) => {
    return getOrders(user.id);
  })
  .then((orders) => {
    return processOrders(orders);
  });

// Good (use async/await)
async function processUser() {
  const user = await getUser();
  const orders = await getOrders(user.id);
  return processOrders(orders);
}

// ANTI-PATTERN 4: Not catching errors
// Bad
doSomething().then((result) => {
  console.log(result);
}); // No .catch()!

// Good
doSomething()
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

// ==========================================
// PRACTICE EXERCISES
// ==========================================

/*
1. Create a promise that resolves after a random time (1-3 seconds)

2. Write a function that chains 3 promises sequentially

3. Create a function that runs multiple promises in parallel and returns results

4. Implement a promise-based delay/sleep function

5. Write a function that retries a promise up to N times

6. Create a promise timeout wrapper that rejects after X milliseconds

7. Implement Promise.map() that processes array with promises

8. Write a function that loads images and returns when all are loaded

9. Create a rate limiter using promises

10. Implement a promise-based queue with max concurrency

11. Write a function that polls an API until condition is met

12. Create a promise debounce function

13. Implement a circuit breaker pattern with promises

14. Write a function that batches API calls

15. Create a promise-based cache with TTL (time to live)

16. Implement Promise.series() for sequential execution

17. Write a function that handles partial failures gracefully

18. Create a promise pool for controlled parallel execution

19. Implement a promise-based state machine

20. Write a function that converts callback-based Node.js functions to promises
*/

// ==========================================
// DETAILED SOLUTIONS TO KEY EXERCISES
// ==========================================

// Solution 1: Random delay promise
function randomDelay(min, max) {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => {
    setTimeout(() => resolve(delay), delay);
  });
}

// Solution 2: Retry with exponential backoff
function retryWithBackoff(fn, maxRetries, baseDelay = 1000) {
  return new Promise((resolve, reject) => {
    function attempt(retriesLeft) {
      fn()
        .then(resolve)
        .catch((error) => {
          if (retriesLeft <= 0) {
            reject(error);
          } else {
            const delay = baseDelay * Math.pow(2, maxRetries - retriesLeft);
            console.log(`Retrying in ${delay}ms...`);
            setTimeout(() => attempt(retriesLeft - 1), delay);
          }
        });
    }
    attempt(maxRetries);
  });
}

// Solution 3: Promise.map with concurrency
function promiseMap(items, mapper, concurrency = Infinity) {
  return new Promise((resolve, reject) => {
    const results = new Array(items.length);
    let completed = 0;
    let started = 0;
    let running = 0;

    function startNext() {
      if (started >= items.length) return;
      if (running >= concurrency) return;

      const index = started++;
      running++;

      Promise.resolve(items[index])
        .then(mapper)
        .then((result) => {
          results[index] = result;
          completed++;
          running--;

          if (completed === items.length) {
            resolve(results);
          } else {
            startNext();
          }
        })
        .catch(reject);

      startNext();
    }

    startNext();
  });
}

// Solution 4: Promise poll
function poll(fn, condition, interval = 1000, timeout = 30000) {
  const endTime = Date.now() + timeout;

  return new Promise((resolve, reject) => {
    (function check() {
      fn()
        .then((result) => {
          if (condition(result)) {
            resolve(result);
          } else if (Date.now() > endTime) {
            reject(new Error("Polling timeout"));
          } else {
            setTimeout(check, interval);
          }
        })
        .catch(reject);
    })();
  });
}

// Solution 5: Promise debounce
function debouncePromise(fn, delay) {
  let timeoutId;
  let latestResolve;
  let latestReject;

  return function(...args) {
    return new Promise((resolve, reject) => {
      clearTimeout(timeoutId);
      latestResolve = resolve;
      latestReject = reject;

      timeoutId = setTimeout(() => {
        fn(...args)
          .then(latestResolve)
          .catch(latestReject);
      }, delay);
    });
  };
}

// Solution 6: Circuit breaker
class CircuitBreaker {
  constructor(fn, options = {}) {
    this.fn = fn;
    this.failureThreshold = options.failureThreshold || 5;
    this.timeout = options.timeout || 10000;
    this.resetTimeout = options.resetTimeout || 30000;
    
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.failureCount = 0;
    this.nextAttempt = Date.now();
  }

  async execute(...args) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.state = 'HALF_OPEN';
    }

    try {
      const result = await Promise.race([
        this.fn(...args),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), this.timeout)
        )
      ]);

      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failureCount++;
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.resetTimeout;
    }
  }
}

// Solution 7: Batch processor with promises
function batchProcessor(items, batchSize, processor, delayBetweenBatches = 0) {
  const batches = [];
  for (let i = 0; i < items.length; i += batchSize) {
    batches.push(items.slice(i, i + batchSize));
  }

  return batches.reduce((chain, batch, index) => {
    return chain.then((results) => {
      return Promise.all(batch.map(processor))
        .then((batchResults) => {
          const allResults = [...results, ...batchResults];
          
          // Add delay between batches (except after last batch)
          if (delayBetweenBatches && index < batches.length - 1) {
            return sleep(delayBetweenBatches).then(() => allResults);
          }
          
          return allResults;
        });
    });
  }, Promise.resolve([]));
}

// Solution 8: Promise cache with TTL
class PromiseCacheWithTTL {
  constructor(defaultTTL = 60000) {
    this.cache = new Map();
    this.defaultTTL = defaultTTL;
  }

  get(key, fetcher, ttl = this.defaultTTL) {
    const cached = this.cache.get(key);
    
    if (cached && Date.now() < cached.expiry) {
      return cached.promise;
    }

    const promise = fetcher()
      .then((value) => {
        this.cache.set(key, {
          promise: Promise.resolve(value),
          expiry: Date.now() + ttl
        });
        return value;
      })
      .catch((error) => {
        this.cache.delete(key);
        throw error;
      });

    this.cache.set(key, {
      promise,
      expiry: Date.now() + ttl
    });

    return promise;
  }

  clear() {
    this.cache.clear();
  }

  delete(key) {
    this.cache.delete(key);
  }
}

// ==========================================
// COMMON MISTAKES
// ==========================================

/*
1. Not returning promises in .then()
2. Creating nested promise chains (callback hell 2.0)
3. Not handling errors with .catch()
4. Forgetting that promises execute immediately when created
5. Using Promise constructor when not needed
6. Not understanding Promise.all() fails fast
7. Mixing callbacks and promises
8. Not using async/await when appropriate
9. Creating unnecessary promise wrappers
10. Forgetting promises are eager, not lazy
11. Race conditions with promise state
12. Memory leaks with unresolved promises
13. Not canceling promises when component unmounts
14. Improper error handling in promise chains
15. Using .then() instead of async/await for readability
*/

// ==========================================
// BEST PRACTICES
// ==========================================

/*
1. Always return promises from .then()
2. Use .catch() for error handling
3. Use .finally() for cleanup
4. Prefer async/await over .then() chains
5. Use Promise.all() for parallel operations
6. Use Promise.allSettled() when you need all results
7. Handle errors at appropriate levels
8. Keep promise chains flat
9. Use named functions for complex logic
10. Document promise-returning functions
11. Consider cancellation for long-running operations
12. Use timeout wrappers for unreliable operations
13. Implement retry logic for transient failures
14. Use promise utilities (map, series, etc.)
15. Test async code thoroughly
16. Use proper error types
17. Avoid anti-patterns
18. Consider memory implications
19. Profile promise-heavy code
20. Use TypeScript for better type safety
*/

// ==========================================
// PROMISE VS CALLBACK VS ASYNC/AWAIT
// ==========================================

/*
CALLBACKS:
Pros: Simple, widely supported, no dependencies
Cons: Callback hell, difficult error handling, hard to compose

PROMISES:
Pros: Better than callbacks, chainable, standardized, composable
Cons: Still can be verbose, not as readable as sync code

ASYNC/AWAIT:
Pros: Most readable, looks like sync code, easy error handling
Cons: Requires understanding of promises, can hide parallelism

Recommendation: Use async/await with promises for best experience
*/

// ==========================================
// DEBUGGING PROMISES
// ==========================================

// Use descriptive names
const fetchUserData = () => Promise.resolve({ name: "John" });
const processUserData = (user) => Promise.resolve(user.name.toUpperCase());

// Add logging
function logPromise(name, promise) {
  console.log(`${name}: started`);
  return promise
    .then((result) => {
      console.log(`${name}: resolved with`, result);
      return result;
    })
    .catch((error) => {
      console.error(`${name}: rejected with`, error);
      throw error;
    });
}

// Use Promise.prototype.catch for debugging
Promise.prototype.logError = function(context) {
  return this.catch((error) => {
    console.error(`Error in ${context}:`, error);
    throw error;
  });
};

// Unhandled rejection handler
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// ==========================================
// ADVANCED PROMISE PATTERNS
// ==========================================

// Pattern: Promise Memoization
function memoizePromise(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const promise = fn(...args)
      .catch((error) => {
        cache.delete(key); // Don't cache errors
        throw error;
      });
    
    cache.set(key, promise);
    return promise;
  };
}

// Pattern: Promise Deduplication
function deduplicatePromises(fn) {
  const pending = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (pending.has(key)) {
      return pending.get(key);
    }
    
    const promise = fn(...args)
      .finally(() => {
        pending.delete(key);
      });
    
    pending.set(key, promise);
    return promise;
  };
}

// Pattern: Promise Chain Builder
class PromiseChain {
  constructor(initialValue) {
    this.promise = Promise.resolve(initialValue);
  }
  
  then(fn) {
    this.promise = this.promise.then(fn);
    return this;
  }
  
  catch(fn) {
    this.promise = this.promise.catch(fn);
    return this;
  }
  
  execute() {
    return this.promise;
  }
}

// Usage
new PromiseChain(5)
  .then(x => x * 2)
  .then(x => x + 3)
  .then(x => console.log(x)) // 13
  .execute();

/*
==========================================
KEY TAKEAWAYS
==========================================

1. Promises represent eventual values
2. They solve callback hell problem
3. Always handle errors with .catch()
4. Chain promises for sequential operations
5. Use Promise.all() for parallel operations
6. Prefer async/await for readability
7. Understand promise states and timing
8. Use promise utilities for complex flows
9. Test async code thoroughly
10. Consider cancellation and timeouts
*/