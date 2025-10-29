/**
 * ============================================
 * ASYNCHRONOUS JAVASCRIPT - ASYNC/AWAIT
 * ============================================
 */

// ==========================================
// 1. WHAT IS ASYNC/AWAIT?
// ==========================================

/*
Async/Await is syntactic sugar over Promises that makes
asynchronous code look and behave more like synchronous code.

- async: Declares an async function (returns a Promise)
- await: Pauses execution until Promise resolves
*/

// ==========================================
// 2. BASIC ASYNC FUNCTION
// ==========================================

// Async function always returns a Promise
async function greet() {
  return "Hello!";
}

greet().then(console.log); // "Hello!"

// Equivalent to:
function greetPromise() {
  return Promise.resolve("Hello!");
}

// ==========================================
// 3. USING AWAIT
// ==========================================

// Function that returns a promise
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Using await to pause execution
async function example() {
  console.log("Start");
  await delay(2000); // Waits 2 seconds
  console.log("End");
}

// example(); // Uncomment to test

// ==========================================
// 4. ASYNC/AWAIT VS PROMISES
// ==========================================

// With Promises
function fetchUserPromise(id) {
  return fetch(`/api/users/${id}`)
    .then(response => response.json())
    .then(user => {
      return fetch(`/api/posts/${user.id}`);
    })
    .then(response => response.json())
    .then(posts => {
      console.log(posts);
    })
    .catch(error => {
      console.error(error);
    });
}

// With Async/Await (much cleaner!)
async function fetchUserAsync(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    
    const postsResponse = await fetch(`/api/posts/${user.id}`);
    const posts = await postsResponse.json();
    
    console.log(posts);
  } catch (error) {
    console.error(error);
  }
}

// ==========================================
// 5. ERROR HANDLING WITH TRY/CATCH
// ==========================================

async function handleErrors() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    console.log("Cleanup - always runs");
  }
}

// Multiple try-catch blocks
async function multipleErrors() {
  try {
    const user = await getUser();
    console.log(user);
  } catch (error) {
    console.error("Failed to get user:", error);
    return; // Early exit
  }
  
  try {
    const posts = await getPosts();
    console.log(posts);
  } catch (error) {
    console.error("Failed to get posts:", error);
  }
}

// Catching specific errors
async function specificErrors() {
  try {
    const data = await riskyOperation();
  } catch (error) {
    if (error.name === "NetworkError") {
      console.error("Network issue");
    } else if (error.name === "ValidationError") {
      console.error("Invalid data");
    } else {
      throw error; // Re-throw unknown errors
    }
  }
}

// ==========================================
// 6. SEQUENTIAL VS PARALLEL EXECUTION
// ==========================================

// SEQUENTIAL (one after another) - SLOW
async function sequential() {
  const user = await getUser(); // Waits
  const posts = await getPosts(); // Then waits
  const comments = await getComments(); // Then waits
  return { user, posts, comments };
}

// PARALLEL (all at once) - FAST
async function parallel() {
  const [user, posts, comments] = await Promise.all([
    getUser(),
    getPosts(),
    getComments()
  ]);
  return { user, posts, comments };
}

// Mixed: Some sequential, some parallel
async function mixed() {
  // First get user (sequential)
  const user = await getUser();
  
  // Then get posts and comments in parallel
  const [posts, comments] = await Promise.all([
    getPosts(user.id),
    getComments(user.id)
  ]);
  
  return { user, posts, comments };
}

// ==========================================
// 7. AWAIT WITH PROMISE METHODS
// ==========================================

// Promise.all with await
async function waitForAll() {
  const results = await Promise.all([
    fetch('/api/user/1'),
    fetch('/api/user/2'),
    fetch('/api/user/3')
  ]);
  return results;
}

// Promise.race with await
async function raceCondition() {
  const result = await Promise.race([
    fetch('/api/fast'),
    fetch('/api/slow')
  ]);
  return result;
}

// Promise.allSettled with await
async function getAllSettled() {
  const results = await Promise.allSettled([
    fetch('/api/user/1'),
    fetch('/api/user/2'),
    fetch('/api/invalid') // This might fail
  ]);
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`Request ${index} succeeded:`, result.value);
    } else {
      console.log(`Request ${index} failed:`, result.reason);
    }
  });
}

// ==========================================
// 8. ASYNC FUNCTIONS IN DIFFERENT CONTEXTS
// ==========================================

// Async arrow function
const asyncArrow = async () => {
  return await delay(1000);
};

// Async method in object
const obj = {
  async fetchData() {
    return await fetch('/api/data');
  }
};

// Async method in class
class DataService {
  async getData() {
    const response = await fetch('/api/data');
    return response.json();
  }
  
  async saveData(data) {
    const response = await fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return response.json();
  }
}

// Async callback (be careful!)
const numbers = [1, 2, 3];

// This doesn't work as expected!
numbers.forEach(async (num) => {
  const result = await processNumber(num);
  console.log(result);
});

// Better: Use for...of
async function processAll() {
  for (const num of numbers) {
    const result = await processNumber(num);
    console.log(result);
  }
}

// Or use Promise.all for parallel
async function processAllParallel() {
  const promises = numbers.map(num => processNumber(num));
  const results = await Promise.all(promises);
  console.log(results);
}

// ==========================================
// 9. RETURNING VALUES FROM ASYNC FUNCTIONS
// ==========================================

// Return value is wrapped in Promise
async function getValue() {
  return 42;
}

getValue().then(value => console.log(value)); // 42

// Returning a promise
async function getValuePromise() {
  return Promise.resolve(100);
}

getValuePromise().then(value => console.log(value)); // 100

// Implicit return
const getData = async () => await fetch('/api/data');

// ==========================================
// 10. COMMON PATTERNS
// ==========================================

// Pattern 1: Retry with async/await
async function retry(fn, maxAttempts = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) throw error;
      console.log(`Attempt ${attempt} failed, retrying...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Usage
async function unreliableOperation() {
  const data = await retry(() => fetch('/api/data'));
  return data;
}

// Pattern 2: Timeout
async function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout')), ms)
  );
  return Promise.race([promise, timeout]);
}

// Usage
async function fetchWithTimeout() {
  try {
    const data = await withTimeout(fetch('/api/data'), 5000);
    return data;
  } catch (error) {
    console.error('Request timed out');
  }
}

// Pattern 3: Sequential processing
async function processSequentially(items, processor) {
  const results = [];
  for (const item of items) {
    const result = await processor(item);
    results.push(result);
  }
  return results;
}

// Pattern 4: Parallel with limit
async function processWithLimit(items, processor, limit) {
  const results = [];
  for (let i = 0; i < items.length; i += limit) {
    const batch = items.slice(i, i + limit);
    const batchResults = await Promise.all(
      batch.map(item => processor(item))
    );
    results.push(...batchResults);
  }
  return results;
}

// Pattern 5: Sleep/Delay
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function delayedExecution() {
  console.log('Start');
  await sleep(2000);
  console.log('After 2 seconds');
}

// ==========================================
// 11. ASYNC LOOPS
// ==========================================

// for loop
async function forLoop() {
  for (let i = 0; i < 3; i++) {
    await delay(1000);
    console.log(i);
  }
}

// for...of loop (sequential)
async function forOfLoop() {
  const ids = [1, 2, 3];
  for (const id of ids) {
    const user = await fetchUser(id);
    console.log(user);
  }
}

// while loop
async function whileLoop() {
  let count = 0;
  while (count < 3) {
    await delay(1000);
    console.log(count);
    count++;
  }
}

// Array.map (parallel)
async function mapParallel() {
  const ids = [1, 2, 3];
  const promises = ids.map(id => fetchUser(id));
  const users = await Promise.all(promises);
  return users;
}

// Array.reduce (sequential)
async function reduceSequential() {
  const ids = [1, 2, 3];
  const users = await ids.reduce(async (accPromise, id) => {
    const acc = await accPromise;
    const user = await fetchUser(id);
    return [...acc, user];
  }, Promise.resolve([]));
  return users;
}

// ==========================================
// 12. ERROR HANDLING STRATEGIES
// ==========================================

// Strategy 1: Try-catch for each operation
async function individualErrorHandling() {
  let user, posts, comments;
  
  try {
    user = await getUser();
  } catch (error) {
    console.error('User fetch failed:', error);
    user = null;
  }
  
  try {
    posts = await getPosts();
  } catch (error) {
    console.error('Posts fetch failed:', error);
    posts = [];
  }
  
  return { user, posts };
}

// Strategy 2: Single try-catch with cleanup
async function singleErrorHandling() {
  try {
    const user = await getUser();
    const posts = await getPosts();
    return { user, posts };
  } catch (error) {
    console.error('Operation failed:', error);
    return null;
  }
}

// Strategy 3: Error recovery
async function errorRecovery() {
  try {
    return await fetchFromPrimaryAPI();
  } catch (error) {
    console.warn('Primary API failed, trying backup');
    try {
      return await fetchFromBackupAPI();
    } catch (backupError) {
      console.error('Both APIs failed');
      throw new Error('All endpoints failed');
    }
  }
}

// Strategy 4: Custom error handling
class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
  }
}

async function handleAPIErrors() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new APIError('API request failed', response.status);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      if (error.statusCode === 404) {
        return null; // Handle not found
      } else if (error.statusCode === 500) {
        // Retry on server error
        await sleep(1000);
        return handleAPIErrors();
      }
    }
    throw error;
  }
}

// ==========================================
// 13. ASYNC FUNCTION COMPOSITION
// ==========================================

// Composing async functions
async function getFullUserData(userId) {
  const user = await getUser(userId);
  const posts = await getUserPosts(user.id);
  const comments = await getUserComments(user.id);
  
  return {
    ...user,
    posts,
    comments
  };
}

// Chaining async operations
async function chainOperations(data) {
  const validated = await validateData(data);
  const processed = await processData(validated);
  const saved = await saveData(processed);
  return saved;
}

// Wrapper for async operations
function asyncWrapper(fn) {
  return async function(...args) {
    try {
      console.log(`Starting ${fn.name}`);
      const result = await fn(...args);
      console.log(`Completed ${fn.name}`);
      return result;
    } catch (error) {
      console.error(`Error in ${fn.name}:`, error);
      throw error;
    }
  };
}

// ==========================================
// 14. REAL-WORLD EXAMPLES
// ==========================================

// Example 1: Fetch and process data
async function fetchAndProcessUsers() {
  try {
    const response = await fetch('/api/users');
    const users = await response.json();
    
    const processedUsers = await Promise.all(
      users.map(async (user) => {
        const details = await fetch(`/api/users/${user.id}/details`);
        return {
          ...user,
          details: await details.json()
        };
      })
    );
    
    return processedUsers;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
}

// Example 2: Form submission
async function submitForm(formData) {
  try {
    // Validate
    await validateFormData(formData);
    
    // Upload files
    const fileUrls = await uploadFiles(formData.files);
    
    // Submit form
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, fileUrls })
    });
    
    if (!response.ok) {
      throw new Error('Submission failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Form submission error:', error);
    throw error;
  }
}

// Example 3: Batch API calls
async function batchFetch(ids, batchSize = 10) {
  const results = [];
  
  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(id => fetch(`/api/items/${id}`))
    );
    results.push(...batchResults);
    
    // Rate limiting delay
    if (i + batchSize < ids.length) {
      await sleep(1000);
    }
  }
  
  return results;
}

// Example 4: Polling
async function pollForCompletion(taskId, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(`/api/tasks/${taskId}`);
    const task = await response.json();
    
    if (task.status === 'completed') {
      return task.result;
    }
    
    if (task.status === 'failed') {
      throw new Error('Task failed');
    }
    
    // Wait before next poll
    await sleep(2000);
  }
  
  throw new Error('Polling timeout');
}

// Example 5: Waterfall operations
async function waterfall(initialData) {
  let result = initialData;
  
  result = await step1(result);
  result = await step2(result);
  result = await step3(result);
  
  return result;
}

// Example 6: Data pipeline
async function dataPipeline(data) {
  return data
    |> await fetch
    |> await transform
    |> await validate
    |> await save;
}

// More practical pipeline
async function processPipeline(data) {
  const fetched = await fetchData(data);
  const transformed = await transformData(fetched);
  const validated = await validateData(transformed);
  const saved = await saveData(validated);
  return saved;
}

// ==========================================
// 15. ASYNC/AWAIT BEST PRACTICES
// ==========================================

// ✅ DO: Use async/await for sequential operations
async function goodSequential() {
  const user = await getUser();
  const profile = await getProfile(user.id);
  return { user, profile };
}

// ❌ DON'T: Await unnecessarily in parallel operations
async function badParallel() {
  const user = await getUser();
  const posts = await getPosts(); // Doesn't depend on user!
  return { user, posts };
}

// ✅ DO: Execute independent operations in parallel
async function goodParallel() {
  const [user, posts] = await Promise.all([
    getUser(),
    getPosts()
  ]);
  return { user, posts };
}

// ✅ DO: Handle errors appropriately
async function goodErrorHandling() {
  try {
    const data = await fetchData();
    return processData(data);
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-throw or handle
  }
}

// ❌ DON'T: Forget to await
async function badForgotAwait() {
  const data = fetchData(); // Missing await!
  console.log(data); // Logs Promise, not data
}

// ✅ DO: Return early to avoid nesting
async function goodEarlyReturn(id) {
  const user = await getUser(id);
  if (!user) return null;
  
  const posts = await getPosts(user.id);
  return { user, posts };
}

// ❌ DON'T: Nest unnecessarily
async function badNesting(id) {
  const user = await getUser(id);
  if (user) {
    const posts = await getPosts(user.id);
    if (posts) {
      return { user, posts };
    }
  }
}

// ==========================================
// 16. ADVANCED PATTERNS
// ==========================================

// Pattern: Async IIFE (Immediately Invoked Function Expression)
(async () => {
  const data = await fetchData();
  console.log(data);
})();

// Pattern: Async factory function
function createAsyncHandler(apiUrl) {
  return async function(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    return response.json();
  };
}

const getUser = createAsyncHandler('/api/users');
const getPost = createAsyncHandler('/api/posts');

// Pattern: Async memoization
function asyncMemoize(fn) {
  const cache = new Map();
  
  return async function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = await fn(...args);
    cache.set(key, result);
    return result;
  };
}

const memoizedFetch = asyncMemoize(fetch);

// Pattern: Async queue
class AsyncQueue {
  constructor() {
    this.queue = [];
    this.running = false;
  }
  
  async add(asyncFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ asyncFn, resolve, reject });
      if (!this.running) {
        this.process();
      }
    });
  }
  
  async process() {
    if (this.queue.length === 0) {
      this.running = false;
      return;
    }
    
    this.running = true;
    const { asyncFn, resolve, reject } = this.queue.shift();
    
    try {
      const result = await asyncFn();
      resolve(result);
    } catch (error) {
      reject(error);
    }
    
    await this.process();
  }
}

// Usage
const queue = new AsyncQueue();
queue.add(() => fetchData(1));
queue.add(() => fetchData(2));

// Pattern: Async lock/mutex
class AsyncLock {
  constructor() {
    this.locked = false;
    this.waiting = [];
  }
  
  async acquire() {
    if (!this.locked) {
      this.locked = true;
      return;
    }
    
    await new Promise(resolve => this.waiting.push(resolve));
  }
  
  release() {
    if (this.waiting.length > 0) {
      const resolve = this.waiting.shift();
      resolve();
    } else {
      this.locked = false;
    }
  }
  
  async run(fn) {
    await this.acquire();
    try {
      return await fn();
    } finally {
      this.release();
    }
  }
}

// Usage
const lock = new AsyncLock();
await lock.run(async () => {
  // Critical section - only one at a time
  await updateSharedResource();
});

// ==========================================
// 17. ASYNC/AWAIT WITH GENERATORS
// ==========================================

// Async generator function
async function* asyncGenerator() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  yield await Promise.resolve(3);
}

// Consuming async generator
async function consumeAsyncGenerator() {
  for await (const value of asyncGenerator()) {
    console.log(value);
  }
}

// Practical example: Paginated API
async function* fetchPages(baseUrl) {
  let page = 1;
  let hasMore = true;
  
  while (hasMore) {
    const response = await fetch(`${baseUrl}?page=${page}`);
    const data = await response.json();
    
    yield data.items;
    
    hasMore = data.hasMore;
    page++;
  }
}

// Usage
async function getAllItems() {
  const items = [];
  for await (const page of fetchPages('/api/items')) {
    items.push(...page);
  }
  return items;
}

// ==========================================
// 18. DEBUGGING ASYNC/AWAIT
// ==========================================

// Add logging
async function debuggableFunction() {
  console.log('Starting operation');
  
  try {
    const result = await riskyOperation();
    console.log('Operation succeeded:', result);
    return result;
  } catch (error) {
    console.error('Operation failed:', error);
    throw error;
  }
}

// Use async stack traces
async function asyncStackTrace() {
  try {
    await operation1();
  } catch (error) {
    console.error('Stack trace:', error.stack);
  }
}

// Timing async operations
async function timedOperation() {
  const start = Date.now();
  
  try {
    const result = await slowOperation();
    const duration = Date.now() - start;
    console.log(`Operation took ${duration}ms`);
    return result;
  } catch (error) {
    const duration = Date.now() - start;
    console.error(`Operation failed after ${duration}ms`);
    throw error;
  }
}

// ==========================================
// 19. COMMON MISTAKES AND SOLUTIONS
// ==========================================

// Mistake 1: Forgetting to await
async function mistake1() {
  const data = fetchData(); // ❌ Missing await
  console.log(data); // Logs Promise
}

async function solution1() {
  const data = await fetchData(); // ✅ Correct
  console.log(data);
}

// Mistake 2: Using await in loops unnecessarily
async function mistake2(ids) {
  const results = [];
  for (const id of ids) {
    results.push(await fetchData(id)); // ❌ Sequential
  }
  return results;
}

async function solution2(ids) {
  const promises = ids.map(id => fetchData(id));
  return await Promise.all(promises); // ✅ Parallel
}

// Mistake 3: Not handling errors
async function mistake3() {
  const data = await fetchData(); // ❌ No error handling
  return data;
}

async function solution3() {
  try {
    const data = await fetchData(); // ✅ With error handling
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Mistake 4: Mixing promises and async/await
async function mistake4() {
  return fetchData()
    .then(data => processData(data)) // ❌ Mixed style
    .then(result => result);
}

async function solution4() {
  const data = await fetchData(); // ✅ Consistent style
  const result = await processData(data);
  return result;
}

// Mistake 5: Creating async functions unnecessarily
async function mistake5() {
  return 42; // ❌ No await needed
}

function solution5() {
  return 42; // ✅ Regular function is fine
}

// ==========================================
// 20. PERFORMANCE CONSIDERATIONS
// ==========================================

// ❌ BAD: Sequential when parallel would work
async function slowVersion(ids) {
  const results = [];
  for (const id of ids) {
    const data = await fetch(`/api/${id}`);
    results.push(data);
  }
  return results; // Takes: n * requestTime
}

// ✅ GOOD: Parallel execution
async function fastVersion(ids) {
  const promises = ids.map(id => fetch(`/api/${id}`));
  return await Promise.all(promises); // Takes: 1 * requestTime
}

// ❌ BAD: Awaiting in array methods
async function slowMap(items) {
  return items.map(async item => {
    return await process(item); // Doesn't wait!
  });
}

// ✅ GOOD: Proper async array mapping
async function fastMap(items) {
  const promises = items.map(item => process(item));
  return await Promise.all(promises);
}

// ==========================================
// PRACTICE EXERCISES
// ==========================================

/*
1. Convert a promise-based function to async/await

2. Write an async function that fetches data with retry logic

3. Create an async function that executes tasks in parallel with a concurrency limit

4. Implement async/await version of Promise.race()

5. Write an async function that polls an API until a condition is met

6. Create an async function with proper error handling for multiple operations

7. Implement an async queue that processes tasks sequentially

8. Write an async function that implements timeout functionality

9. Create an async function that fetches paginated data

10. Implement async/await version of debounce

11. Write an async function that handles file uploads with progress tracking

12. Create an async function that coordinates multiple API calls with dependencies

13. Implement an async cache with TTL

14. Write an async function that implements circuit breaker pattern

15. Create an async function that batches requests to avoid rate limiting

16. Implement async/await version of waterfall execution

17. Write an async function that handles partial failures gracefully

18. Create an async pipeline for data processing

19. Implement async event emitter

20. Write comprehensive tests for async functions
*/

// ==========================================
// BEST PRACTICES SUMMARY
// ==========================================

/*
1. ✅ Use async/await for cleaner async code
2. ✅ Always handle errors with try/catch
3. ✅ Execute independent operations in parallel
4. ✅ Avoid awaiting in loops unnecessarily
5. ✅ Return early to avoid nesting
6. ✅ Use Promise.all() for parallel operations
7. ✅ Use descriptive function names
8. ✅ Add proper error messages
9. ✅ Consider timeout for long operations
10. ✅ Use async/await consistently
11. ✅ Profile async code performance
12. ✅ Test async code thoroughly
13. ✅ Document async functions
14. ✅ Use TypeScript for better type safety
15. ✅ Be mindful of error propagation
16. ✅ Clean up resources in finally blocks
17. ✅ Use async generators for streams
18. ✅ Implement proper cancellation
19. ✅ Monitor async operation performance
20. ✅ Keep async functions focused and small
*/

// ==========================================
// KEY TAKEAWAYS
// ==========================================

/*
1. Async/await makes async code look synchronous
2. Always use try/catch for error handling
3. Be aware of sequential vs parallel execution
4. Async functions always return Promises
5. Await can only be used inside async functions
6. Use Promise.all() for parallel operations
7. Avoid common pitfalls (forgetting await, wrong loops)
8. Consider performance implications
9. Test async code thoroughly
10. Use modern async patterns for cleaner code

Async/await is the preferred way to handle asynchronous
operations in modern JavaScript!
*/