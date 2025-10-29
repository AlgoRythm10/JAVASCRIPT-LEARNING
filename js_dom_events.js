/**
 * ============================================
 * DOM EVENTS IN JAVASCRIPT
 * ============================================
 */

// ==========================================
// 1. ADDEVENTLISTENER
// ==========================================

// Basic event listener
const button = document.querySelector('#myButton');
button.addEventListener('click', function() {
  console.log('Button clicked!');
});

// With arrow function
button.addEventListener('click', () => {
  console.log('Clicked with arrow function');
});

// With named function
function handleClick() {
  console.log('Named function handler');
}
button.addEventListener('click', handleClick);

// ==========================================
// 2. EVENT OBJECT
// ==========================================

button.addEventListener('click', function(event) {
  console.log('Event type:', event.type); // 'click'
  console.log('Target element:', event.target); // The clicked element
  console.log('Current target:', event.currentTarget); // Element with listener
  console.log('Timestamp:', event.timeStamp);
  console.log('Mouse X:', event.clientX);
  console.log('Mouse Y:', event.clientY);
});

// ==========================================
// 3. REMOVING EVENT LISTENERS
// ==========================================

// Must use same function reference
function myHandler() {
  console.log('Handler');
}

button.addEventListener('click', myHandler);
button.removeEventListener('click', myHandler); // Removes it

// Anonymous functions can't be removed
button.addEventListener('click', () => console.log('Hi')); 
// Can't remove this one!

// ==========================================
// 4. COMMON MOUSE EVENTS
// ==========================================

const element = document.querySelector('.element');

// Click events
element.addEventListener('click', () => {});
element.addEventListener('dblclick', () => {}); // Double click
element.addEventListener('contextmenu', () => {}); // Right click

// Mouse movement
element.addEventListener('mouseenter', () => {}); // Enter (no bubble)
element.addEventListener('mouseleave', () => {}); // Leave (no bubble)
element.addEventListener('mouseover', () => {}); // Over (bubbles)
element.addEventListener('mouseout', () => {}); // Out (bubbles)
element.addEventListener('mousemove', (e) => {
  console.log(`Mouse at: ${e.clientX}, ${e.clientY}`);
});

// Mouse buttons
element.addEventListener('mousedown', () => {}); // Button pressed
element.addEventListener('mouseup', () => {}); // Button released

// ==========================================
// 5. KEYBOARD EVENTS
// ==========================================

const input = document.querySelector('input');

// Key events
input.addEventListener('keydown', (e) => {
  console.log('Key pressed:', e.key);
  console.log('Key code:', e.code);
  console.log('Ctrl pressed:', e.ctrlKey);
  console.log('Shift pressed:', e.shiftKey);
  console.log('Alt pressed:', e.altKey);
});

input.addEventListener('keyup', (e) => {
  console.log('Key released:', e.key);
});

input.addEventListener('keypress', (e) => {
  // Deprecated but still used
  console.log('Key pressed (deprecated event)');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault(); // Prevent default save
    console.log('Custom save triggered');
  }
});

// ==========================================
// 6. FORM EVENTS
// ==========================================

const form = document.querySelector('form');
const inputField = document.querySelector('input');

// Form submission
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload
  console.log('Form submitted');
  // Handle form data
});

// Input events
inputField.addEventListener('input', (e) => {
  console.log('Current value:', e.target.value);
  // Fires on every change
});

inputField.addEventListener('change', (e) => {
  console.log('Value changed:', e.target.value);
  // Fires when input loses focus
});

inputField.addEventListener('focus', () => {
  console.log('Input focused');
});

inputField.addEventListener('blur', () => {
  console.log('Input lost focus');
});

// ==========================================
// 7. EVENT BUBBLING
// ==========================================

/*
Events bubble up from child to parent

<div class="parent">
  <div class="child">
    <button>Click</button>
  </div>
</div>

Click button → fires on button → child → parent
*/

document.querySelector('.parent').addEventListener('click', () => {
  console.log('Parent clicked');
});

document.querySelector('.child').addEventListener('click', () => {
  console.log('Child clicked');
});

document.querySelector('button').addEventListener('click', () => {
  console.log('Button clicked');
});
// Output: Button clicked, Child clicked, Parent clicked

// ==========================================
// 8. STOPPING EVENT PROPAGATION
// ==========================================

// Stop bubbling
element.addEventListener('click', (e) => {
  e.stopPropagation();
  console.log('Event won't bubble up');
});

// Stop immediate propagation (stops other listeners on same element)
element.addEventListener('click', (e) => {
  e.stopImmediatePropagation();
  console.log('No other listeners will fire');
});

element.addEventListener('click', () => {
  console.log('This won't execute');
});

// ==========================================
// 9. PREVENTING DEFAULT BEHAVIOR
// ==========================================

// Prevent link navigation
const link = document.querySelector('a');
link.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Link click prevented');
});

// Prevent form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // Custom handling
});

// Prevent context menu
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  console.log('Right-click disabled');
});

// ==========================================
// 10. EVENT DELEGATION
// ==========================================

// Instead of adding listeners to many elements
// Add one listener to parent

const list = document.querySelector('ul');

// Bad: Adding listener to each item
/*
document.querySelectorAll('li').forEach(item => {
  item.addEventListener('click', handleClick);
});
*/

// Good: Event delegation
list.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log('List item clicked:', e.target.textContent);
  }
});

// Works for dynamically added elements too!
const newItem = document.createElement('li');
newItem.textContent = 'New Item';
list.appendChild(newItem);
// Click on newItem still works!

// ==========================================
// 11. EVENT OPTIONS
// ==========================================

// Once - removes after first trigger
button.addEventListener('click', handleClick, { once: true });

// Passive - won't call preventDefault()
// Improves scroll performance
element.addEventListener('touchstart', handleTouch, { passive: true });

// Capture - fires during capture phase (before bubbling)
element.addEventListener('click', handleClick, { capture: true });

// Combined options
element.addEventListener('click', handleClick, {
  once: true,
  capture: false,
  passive: true
});

// ==========================================
// 12. CUSTOM EVENTS
// ==========================================

// Create custom event
const customEvent = new CustomEvent('userLogin', {
  detail: {
    username: 'john_doe',
    timestamp: Date.now()
  }
});

// Listen for custom event
document.addEventListener('userLogin', (e) => {
  console.log('User logged in:', e.detail.username);
});

// Dispatch custom event
document.dispatchEvent(customEvent);

// Another example
const  dataLoaded = new CustomEvent('dataLoaded', {
  bubbles: true,
  cancelable: true,
  detail: { data: [1, 2, 3] }
});

element.dispatchEvent(dataLoaded);

// ==========================================
// 13. DOCUMENT/WINDOW EVENTS
// ==========================================

// Page load events
window.addEventListener('load', () => {
  console.log('Page fully loaded (including images)');
});

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready (before images)');
});

// Before unload (leaving page)
window.addEventListener('beforeunload', (e) => {
  e.preventDefault();
  e.returnValue = ''; // Shows browser confirmation
});

// Resize
window.addEventListener('resize', () => {
  console.log('Window resized:', window.innerWidth, window.innerHeight);
});

// Scroll
window.addEventListener('scroll', () => {
  console.log('Scroll position:', window.scrollY);
});

// ==========================================
// 14. TOUCH EVENTS (MOBILE)
// ==========================================

element.addEventListener('touchstart', (e) => {
  console.log('Touch started');
  console.log('Touches:', e.touches.length);
});

element.addEventListener('touchmove', (e) => {
  e.preventDefault(); // Prevent scrolling
  const touch = e.touches[0];
  console.log('Touch moved to:', touch.clientX, touch.clientY);
});

element.addEventListener('touchend', () => {
  console.log('Touch ended');
});

// ==========================================
// 15. DRAG AND DROP EVENTS
// ==========================================

const draggable = document.querySelector('.draggable');
const dropzone = document.querySelector('.dropzone');

// Make element draggable
draggable.setAttribute('draggable', true);

draggable.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', e.target.id);
  console.log('Drag started');
});

dropzone.addEventListener('dragover', (e) => {
  e.preventDefault(); // Must prevent default to allow drop
});

dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const draggedElement = document.getElementById(id);
  dropzone.appendChild(draggedElement);
  console.log('Dropped');
});

// ==========================================
// 16. PRACTICAL EXAMPLES
// ==========================================

// Example 1: Form validation
const formElem = document.querySelector('form');
formElem.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = formElem.querySelector('[name="email"]').value;
  const password = formElem.querySelector('[name="password"]').value;
  
  if (!email || !password) {
    alert('All fields required');
    return;
  }
  
  if (password.length < 8) {
    alert('Password must be 8+ characters');
    return;
  }
  
  // Submit form
  console.log('Form valid, submitting...');
});

// Example 2: Debounced search
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

const searchInput = document.querySelector('#search');
const handleSearch = debounce((e) => {
  console.log('Searching for:', e.target.value);
  // API call here
}, 300);

searchInput.addEventListener('input', handleSearch);

// Example 3: Modal open/close
const openModalBtn = document.querySelector('#openModal');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.modal .close');

openModalBtn.addEventListener('click', () => {
  modal.classList.add('active');
});

closeModalBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

// Close on outside click
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    modal.classList.remove('active');
  }
});

// Example 4: Infinite scroll
let page = 1;
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    console.log('Loading page', ++page);
    // Load more content
  }
});

// Example 5: Live character count
const textarea = document.querySelector('textarea');
const counter = document.querySelector('.char-count');

textarea.addEventListener('input', (e) => {
  const length = e.target.value.length;
  const maxLength = e.target.getAttribute('maxlength');
  counter.textContent = `${length}/${maxLength}`;
});

// ==========================================
// PRACTICE EXERCISES
// ==========================================

/*
1. Add click event to button that logs message

2. Create form that validates email on submit

3. Implement keyboard shortcut (Ctrl+K)

4. Build dropdown menu with click events

5. Create image gallery with click navigation

6. Implement double-click to edit functionality

7. Build tabs component with click events

8. Create draggable element

9. Implement right-click context menu

10. Build autocomplete search with debouncing

11. Create modal that closes on Escape or outside click

12. Implement infinite scroll

13. Build accordion with event delegation

14. Create hover tooltip

15. Implement form with real-time validation
*/

// ==========================================
// BEST PRACTICES
// ==========================================

/*
1. ✅ Use addEventListener (not onclick)
2. ✅ Remove event listeners when not needed
3. ✅ Use event delegation for dynamic content
4. ✅ Call preventDefault() when needed
5. ✅ Use named functions for easier debugging
6. ✅ Debounce/throttle expensive handlers
7. ✅ Be careful with 'this' in arrow functions
8. ✅ Use passive listeners for scroll/touch
9. ✅ Handle both keyboard and mouse
10. ✅ Test across browsers
11. ✅ Use capture phase sparingly
12. ✅ Clean up listeners on unmount
13. ✅ Validate user input
14. ✅ Provide feedback for user actions
15. ✅ Consider accessibility (keyboard nav)
*/