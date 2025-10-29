/**
 * ============================================
 * FETCH API - MAKING HTTP REQUESTS
 * ============================================
 */

// ==========================================
// 1. BASIC FETCH (GET REQUEST)
// ==========================================

// Simple GET request
fetch('https://api.example.com/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// With async/await (cleaner)
async function getUsers() {
  try {
    const response = await fetch('https://api.example.com/users');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// ==========================================
// 2. RESPONSE OBJECT
// ==========================================

async function checkResponse() {
  const response = await fetch('https://api.example.com/data');
  
  console.log('Status:', response.status); // 200, 404, etc.
  console.log('Status Text:', response.statusText); // "OK", "Not Found"
  console.log('OK?:', response.ok); // true if status 200-299
  console.log('Headers:', response.headers);
  console.log('URL:', response.url);
  
  // Check if successful
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

// ==========================================
// 3. RESPONSE METHODS
// ==========================================

// response.json() - Parse JSON
const jsonData = await fetch(url).then(r => r.json());

// response.text() - Get as text
const textData = await fetch(url).then(r => r.text());

// response.blob() - Get as Blob (for files)
const imageBlob = await fetch(url).then(r => r.blob());

// response.arrayBuffer() - Get as ArrayBuffer
const buffer = await fetch(url).then(r => r.arrayBuffer());

// response.formData() - Get as FormData
const formData = await fetch(url).then(r => r.formData());

// ==========================================
// 4. POST REQUEST
// ==========================================

// Basic POST
async function createUser(userData) {
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  
  if (!response.ok) {
    throw new Error('Failed to create user');
  }
  
  return response.json();
}

// Usage
createUser({ name: 'John', email: 'john@example.com' });

// ==========================================
// 5. PUT REQUEST (UPDATE)
// ==========================================

async function updateUser(id, updates) {
  const response = await fetch(`https://api.example.com/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });
  
  return response.json();
}

// ==========================================
// 6. DELETE REQUEST
// ==========================================

async function deleteUser(id) {
  const response = await fetch(`https://api.example.com/users/${id}`, {
    method: 'DELETE'
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
  
  return response.status === 204 ? null : response.json();
}

// ==========================================
// 7. REQUEST HEADERS
// ==========================================

// Setting headers
async function fetchWithHeaders() {
  const response = await fetch('https://api.example.com/data', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_TOKEN',
      'Accept': 'application/json',
      'X-Custom-Header': 'custom-value'
    }
  });
  
  return response.json();
}

// Reading response headers
async function readHeaders() {
  const response = await fetch('https://api.example.com/data');
  
  // Get specific header
  const contentType = response.headers.get('Content-Type');
  
  // Iterate all headers
  for (const [key, value] of response.headers) {
    console.log(`${key}: ${value}`);
  }
}

// ==========================================
// 8. SENDING FORM DATA
// ==========================================

// Sending FormData
async function submitForm(form) {
  const formData = new FormData(form);
  
  const response = await fetch('https://api.example.com/submit', {
    method: 'POST',
    body: formData // Don't set Content-Type, browser sets it
  });
  
  return response.json();
}

// Creating FormData manually
async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('description', 'My file');
  
  const response = await fetch('https://api.example.com/upload', {
    method: 'POST',
    body: formData
  });
  
  return response.json();
}

// ==========================================
// 9. ABORT CONTROLLER (CANCEL REQUESTS)
// ==========================================

// Cancel fetch request
const controller = new AbortController();
const signal = controller.signal;

fetch('https://api.example.com/data', { signal })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Fetch aborted');
    }
  });

// Cancel after 5 seconds
setTimeout(() => controller.abort(), 5000);

// Real example: Cancel on unmount
async function fetchData() {
  const controller = new AbortController();
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    return await response.json();
  } catch (error) {
    if (error.name !== 'AbortError') {
      throw error;
    }
  }
  
  return controller; // Return to cancel later
}

// ==========================================
// 10. ERROR HANDLING
// ==========================================

async function robustFetch(url) {
  try {
    const response = await fetch(url);
    
    // Check HTTP status
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Try to parse JSON
    try {
      return await response.json();
    } catch (e) {
      throw new Error('Invalid JSON response');
    }
    
  } catch (error) {
    // Network error
    if (error.name === 'TypeError') {
      throw new Error('Network error - check connection');
    }
    
    // Abort error
    if (error.name === 'AbortError') {
      throw new Error('Request was cancelled');
    }
    
    throw error;
  }
}

// ==========================================
// 11. TIMEOUT IMPLEMENTATION
// ==========================================

async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return await response.json();
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}

// ==========================================
// 12. RETRY LOGIC
// ==========================================

async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      
      if (response.ok) {
        return await response.json();
      }
      
      // Don't retry client errors (4xx)
      if (response.status >= 400 && response.status < 500) {
        throw new Error(`Client error: ${response.status}`);
      }
      
    } catch (error) {
      if (i === retries - 1) throw error;
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => 
        setTimeout(resolve, 1000 * Math.pow(2, i))
      );
    }
  }
}

// ==========================================
// 13. CACHING RESPONSES
// ==========================================

class FetchCache {
  constructor(ttl = 60000) {
    this.cache = new Map();
    this.ttl = ttl;
  }
  
  async fetch(url, options = {}) {
    const key = url + JSON.stringify(options);
    const cached = this.cache.get(key);
    
    // Return cached if valid
    if (cached && Date.now() - cached.timestamp < this.ttl) {
      return cached.data;
    }
    
    // Fetch and cache
    const response = await fetch(url, options);
    const data = await response.json();
    
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  }
  
  clear() {
    this.cache.clear();
  }
}

const cache = new FetchCache();
const data = await cache.fetch('https://api.example.com/data');

// ==========================================
// 14. PARALLEL REQUESTS
// ==========================================

// Fetch multiple URLs in parallel
async function fetchMultiple(urls) {
  const promises = urls.map(url => fetch(url).then(r => r.json()));
  return await Promise.all(promises);
}

// Usage
const [users, posts, comments] = await fetchMultiple([
  'https://api.example.com/users',
  'https://api.example.com/posts',
  'https://api.example.com/comments'
]);

// ==========================================
// 15. REAL-WORLD EXAMPLES
// ==========================================

// Example 1: Complete API client
class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.token = null;
  }
  
  setToken(token) {
    this.token = token;
  }
  
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };
    
    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }
    
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Request failed');
    }
    
    return response.json();
  }
  
  get(endpoint) {
    return this.request(endpoint);
  }
  
  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
  
  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }
  
  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Usage
const api = new APIClient('https://api.example.com');
api.setToken('your-token');

const users = await api.get('/users');
const newUser = await api.post('/users', { name: 'John' });

// Example 2: Image upload with progress
async function uploadWithProgress(file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percent = (e.loaded / e.total) * 100;
        onProgress(percent);
      }
    });
    
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error('Upload failed'));
      }
    });
    
    xhr.addEventListener('error', () => reject(new Error('Upload failed')));
    
    const formData = new FormData();
    formData.append('file', file);
    
    xhr.open('POST', 'https://api.example.com/upload');
    xhr.send(formData);
  });
}

// Usage
uploadWithProgress(file, (percent) => {
  console.log(`Upload progress: ${percent}%`);
});

// ==========================================
// PRACTICE EXERCISES
// ==========================================

/*
1. Fetch data from a public API and display it

2. Create POST request to submit form data

3. Implement timeout for fetch requests

4. Build retry logic for failed requests

5. Create API client with authentication

6. Implement request cancellation

7. Build caching mechanism for API calls

8. Handle different response types (JSON, text, blob)

9. Create parallel request handler

10. Implement rate limiting for API calls

11. Build error handling for different HTTP status codes

12. Create file upload with progress tracking

13. Implement request/response interceptors

14. Build queue for sequential API calls

15. Create mock fetch for testing
*/

// ==========================================
// BEST PRACTICES
// ==========================================

/*
1. ✅ Always check response.ok
2. ✅ Handle errors properly
3. ✅ Use async/await for readability
4. ✅ Set appropriate headers
5. ✅ Implement timeout for requests
6. ✅ Cancel requests when component unmounts
7. ✅ Cache responses when appropriate
8. ✅ Use environment variables for API URLs
9. ✅ Implement retry logic for failures
10. ✅ Validate response data
11. ✅ Handle different status codes
12. ✅ Use CORS appropriately
13. ✅ Secure sensitive data (tokens)
14. ✅ Test error scenarios
15. ✅ Monitor API performance
*/