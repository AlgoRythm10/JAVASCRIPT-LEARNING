/**
 * ============================================
 * DOM MANIPULATION - SELECTING ELEMENTS
 * ============================================
 */

// ==========================================
// 1. WHAT IS THE DOM?
// ==========================================

/*
DOM (Document Object Model) is a programming interface that
represents HTML/XML documents as a tree structure.

document
  └── html
      ├── head
      │   ├── title
      │   └── meta
      └── body
          ├── div
          │   ├── h1
          │   └── p
          └── script
*/

// ==========================================
// 2. GETELEMENTBYID
// ==========================================

// Selects element by ID (returns single element or null)
const headerEl = document.getElementById('header');
console.log(headerEl);// <div id="header">...</div>

// Returns null if not found
const missingEl = document.getElementById('nonexistent');
console.log(missingEl); // null

// ==========================================
// 3. GETELEMENTSBYCLASSNAME
// ==========================================

// Selects all elements with class (returns HTMLCollection)
const btns = document.getElementsByClassName('btn');
console.log(btns); // HTMLCollection [button.btn, button.btn, ...]

// HTMLCollection is live (updates automatically)
console.log(buttons.length); // 3
// If you add a button with class 'btn', buttons.length becomes 4

// Access by index
const firstBtn = btns[0];

// Convert to array
const btnArray = Array.from(btns);
const buttonArray2 = [...buttons];

// ==========================================
// 4. GETELEMENTSBYTAGNAME
// ==========================================

// Selects all elements by tag name
const paragraphs = document.getElementsByTagName('p');
const divs = document.getElementsByTagName('div');

const allElements = document.getElementsByTagName('*'); // All elements

// ==========================================
// 5. QUERYSELECTOR (MODERN WAY)
// ==========================================

// Selects FIRST matching element using CSS selector
const mainHeader = document.querySelector('#header');
const firstButton = document.querySelector('.btn');
const firstPara = document.querySelector('p');

// Complex selectors
const nestedEl = document.querySelector('.container .card h2');
const attributeSelector = document.querySelector('[data-id="123"]');
const pseudoSelector = document.querySelector('button:hover');

// Combining selectors
const specific = document.querySelector('div.active#main');

// Returns null if not found
const notFound = document.querySelector('.does-not-exist');

// ==========================================
// 6. QUERYSELECTORALL (MODERN WAY)
// ==========================================

// Selects ALL matching elements (returns NodeList)
const allBtns = document.querySelectorAll('.btn');
const allParagraphs = document.querySelectorAll('p');

// NodeList is static (doesn't update automatically)
console.log(allButtons.length); // 3
// Add a button with class 'btn', allButtons.length stays 3

// NodeList has forEach
allBtns.forEach(b => console.log(b.textContent));
// Convert to array
const buttonsArray = Array.from(allButtons);
const buttonsArray2 = [...allButtons];

// Complex selectors
const cards = document.querySelectorAll('.container .card');
const activeItems = document.querySelectorAll('.list-item.active');
const dataElements = document.querySelectorAll('[data-type="product"]');

// ==========================================
// 7. SELECTOR COMPARISON
// ==========================================

/*
getElementById:
- Fastest
- Returns single element
- Only works with IDs

getElementsByClassName / getElementsByTagName:
- Returns HTMLCollection (live)
- Faster than querySelectorAll
- Limited selector capabilities

querySelector:
- Returns first match
- Full CSS selector support
- Slower but more flexible
- Returns null if not found

querySelectorAll:
- Returns NodeList (static)
- Full CSS selector support
- Slower but most flexible
- Returns empty NodeList if nothing found
*/

// ==========================================
// 8. PARENT/CHILD/SIBLING SELECTION
// ==========================================

const myElement = document.querySelector('.my-element');

// Parent
if (myElement) {
  const parent = myElement.parentElement;
  const children = myElement.children;
  const nextSibling = myElement.nextElementSibling;
  const prevSibling = myElement.previousElementSibling;
}
const parentNode = element.parentNode; // Similar but includes non-element nodes

// Children

const childNodes = element.childNodes; // NodeList (includes text nodes)
const firstChild = element.firstElementChild;
const lastChild = element.lastElementChild;

// Closest (finds nearest ancestor matching selector)
const card = element.closest('.card');
const container = element.closest('.container');

// ==========================================
// 9. ATTRIBUTE SELECTORS
// ==========================================

// Has attribute
const hasDataId = document.querySelectorAll('[data-id]');

// Exact match
const exactMatch = document.querySelectorAll('[data-id="123"]');

// Contains word
const containsWord = document.querySelectorAll('[class~="active"]');

// Starts with
const startsWith = document.querySelectorAll('[href^="https"]');

// Ends with
const endsWith = document.querySelectorAll('[src$=".jpg"]');

// Contains substring
const contains = document.querySelectorAll('[href*="example"]');

// ==========================================
// 10. PSEUDO-CLASS SELECTORS
// ==========================================

// First/Last child
const firstListItem = document.querySelector('li:first-child');
const lastListItem = document.querySelector('li:last-child');

// Nth child
const thirdItem = document.querySelector('li:nth-child(3)');
const evenItems = document.querySelectorAll('li:nth-child(even)');
const oddItems = document.querySelectorAll('li:nth-child(odd)');

// Not selector
const notActive = document.querySelectorAll('.item:not(.active)');

// ==========================================
// 11. CHECKING ELEMENTS
// ==========================================

const elem = document.querySelector('.element');

// Check if element exists
if (elem) {
  console.log('Element exists');
}

// Check if element has class
if (elem.classList.contains('active')) {
  console.log('Element has active class');
}

// Check if element matches selector
if (elem.matches('.container .element')) {
  console.log('Element matches selector');
}

// Check if element contains another
const container = document.querySelector('.container');
const child = document.querySelector('.child');
if (container.contains(child)) {
  console.log('Container has child');
}

// ==========================================
// 12. SELECTING FROM SPECIFIC ELEMENT
// ==========================================

// Select within specific element
const container = document.querySelector('.container');
const buttons = container.querySelectorAll('.btn');
const header = container.querySelector('h1');

// Useful for scoped selection
function initializeCard(cardElement) {
  const title = cardElement.querySelector('.card-title');
  const body = cardElement.querySelector('.card-body');
  // ...
}

// ==========================================
// 13. PRACTICAL SELECTION PATTERNS
// ==========================================

// Pattern 1: Get all form inputs
const inputs = document.querySelectorAll('input, select, textarea');

// Pattern 2: Get all links in navigation
const navLinks = document.querySelectorAll('nav a');

// Pattern 3: Get all images with alt text
const accessibleImages = document.querySelectorAll('img[alt]');

// Pattern 4: Get all external links
const externalLinks = document.querySelectorAll('a[href^="http"]');

// Pattern 5: Get all empty elements
const emptyElements = document.querySelectorAll(':empty');

// Pattern 6: Get all disabled buttons
const disabledButtons = document.querySelectorAll('button:disabled');

// Pattern 7: Get all checked checkboxes
const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');

// ==========================================
// 14. PERFORMANCE TIPS
// ==========================================

// ❌ BAD: Multiple selections
function badSelection() {
  document.querySelector('.item').style.color = 'red';
  document.querySelector('.item').style.fontSize = '16px';
  document.querySelector('.item').style.padding = '10px';
}

// ✅ GOOD: Cache selection
function goodSelection() {
  const item = document.querySelector('.item');
  item.style.color = 'red';
  item.style.fontSize = '16px';
  item.style.padding = '10px';
}

// ❌ BAD: Selecting inside loop
function badLoop() {
  for (let i = 0; i < 100; i++) {
    const container = document.querySelector('.container');
    // ... use container
  }
}

// ✅ GOOD: Select once outside loop
function goodLoop() {
  const container = document.querySelector('.container');
  for (let i = 0; i < 100; i++) {
    // ... use container
  }
}

// Use specific selectors
const fast = document.getElementById('myId'); // Fastest
const medium = document.getElementsByClassName('myClass')[0]; // Fast
const slow = document.querySelector('#myId'); // Slower but flexible

// ==========================================
// 15. REAL-WORLD EXAMPLES
// ==========================================

// Example 1: Form validation
function validateForm() {
  const requiredFields = document.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!field.value) {
      field.classList.add('error');
      isValid = false;
    }
  });
  
  return isValid;
}

// Example 2: Toggle navigation
function setupNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Example 3: Image gallery
function initializeGallery() {
  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImage = document.querySelector('.main-image');
  
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      mainImage.src = thumb.dataset.full;
    });
  });
}

// Example 4: Filter list
function filterList(searchTerm) {
  const items = document.querySelectorAll('.list-item');
  
  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    const matches = text.includes(searchTerm.toLowerCase());
    item.style.display = matches ? 'block' : 'none';
  });
}

// Example 5: Count elements
function countElements() {
  return {
    totalElements: document.querySelectorAll('*').length,
    divs: document.querySelectorAll('div').length,
    images: document.querySelectorAll('img').length,
    links: document.querySelectorAll('a').length
  };
}

// ==========================================
// PRACTICE EXERCISES
// ==========================================

/*
1. Select element with ID "main-header"

2. Select all elements with class "card"

3. Select first paragraph inside a div with class "content"

4. Select all links that open in new tab (target="_blank")

5. Select all images without alt attribute

6. Select the parent of an element with class "active"

7. Select all siblings of an element

8. Select all form inputs that are not disabled

9. Select every third list item

10. Select all elements with data-type attribute

11. Find all elements containing specific text

12. Select all checked radio buttons in a form

13. Select all elements with inline styles

14. Find closest ancestor with specific class

15. Select all empty div elements

16. Get all table cells in second column

17. Select all links in navigation except home link

18. Find all elements matching multiple classes

19. Select all required form fields with errors

20. Get all elements visible in viewport
*/

// ==========================================
// COMMON MISTAKES
// ==========================================

/*
1. Forgetting querySelector returns null if not found
2. Confusing HTMLCollection and NodeList
3. Not caching selections (performance)
4. Using wrong selector method
5. Not checking if element exists before using
6. Selecting inside loops unnecessarily
7. Using generic selectors (performance)
8. Forgetting querySelectorAll returns NodeList (not array)
9. Not understanding live vs static collections
10. Over-complicated selectors
*/

// ==========================================
// BEST PRACTICES
// ==========================================

/*
1. ✅ Use querySelector/querySelectorAll for flexibility
2. ✅ Use getElementById for best performance with IDs
3. ✅ Cache DOM selections
4. ✅ Use specific selectors when possible
5. ✅ Check if elements exist before manipulating
6. ✅ Use const for DOM references
7. ✅ Prefer class/ID selectors over tag selectors
8. ✅ Use data attributes for JavaScript hooks
9. ✅ Keep selectors simple and maintainable
10. ✅ Document complex selectors
11. ✅ Use semantic HTML for easier selection
12. ✅ Avoid selecting in loops
13. ✅ Use event delegation when appropriate
14. ✅ Convert collections to arrays when needed
15. ✅ Test selector performance for critical paths
*/