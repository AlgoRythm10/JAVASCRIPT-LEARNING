/**
 * ============================================
 * TODO APP - COMPLETE MINI PROJECT
 * ============================================
 * 
 * Features:
 * - Add/Remove/Edit todos
 * - Mark as complete
 * - Filter (All/Active/Completed)
 * - Local storage persistence
 * - Search functionality
 * - Statistics
 */

class TodoApp {
  constructor() {
    this.todos = this.loadFromStorage();
    this.filter = 'all';
    this.nextId = this.getNextId();
    
    this.init();
  }
  
  init() {
    this.cacheDOM();
    this.bindEvents();
    this.render();
  }
  
  cacheDOM() {
    this.form = document.querySelector('#todo-form');
    this.input = document.querySelector('#todo-input');
    this.todoList = document.querySelector('#todo-list');
    this.filterBtns = document.querySelectorAll('.filter-btn');
    this.clearBtn = document.querySelector('#clear-completed');
    this.searchInput = document.querySelector('#search-input');
    this.stats = document.querySelector('#stats');
  }
  
  bindEvents() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTodo();
    });
    
    this.todoList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const id = parseInt(e.target.closest('.todo-item').dataset.id);
        this.deleteTodo(id);
      }
      
      if (e.target.classList.contains('edit-btn')) {
        const id = parseInt(e.target.closest('.todo-item').dataset.id);
        this.editTodo(id);
      }
    });
    
    this.todoList.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox') {
        const id = parseInt(e.target.closest('.todo-item').dataset.id);
        this.toggleTodo(id);
      }
    });
    
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.setFilter(btn.dataset.filter);
      });
    });
    
    this.clearBtn.addEventListener('click', () => {
      this.clearCompleted();
    });
    
    this.searchInput.addEventListener('input', (e) => {
      this.search(e.target.value);
    });
  }
  
  addTodo() {
    const text = this.input.value.trim();
    
    if (!text) return;
    
    const todo = {
      id: this.nextId++,
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    this.todos.push(todo);
    this.input.value = '';
    this.input.focus();
    
    this.saveToStorage();
    this.render();
  }
  
  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveToStorage();
    this.render();
  }
  
  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveToStorage();
      this.render();
    }
  }
  
  editTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (!todo) return;
    
    const newText = prompt('Edit todo:', todo.text);
    if (newText && newText.trim()) {
      todo.text = newText.trim();
      this.saveToStorage();
      this.render();
    }
  }
  
  setFilter(filter) {
    this.filter = filter;
    
    // Update active button
    this.filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    this.render();
  }
  
  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.saveToStorage();
    this.render();
  }
  
  search(query) {
    const items = document.querySelectorAll('.todo-item');
    const searchTerm = query.toLowerCase();
    
    items.forEach(item => {
      const text = item.querySelector('.todo-text').textContent.toLowerCase();
      const matches = text.includes(searchTerm);
      item.style.display = matches ? 'flex' : 'none';
    });
  }
  
  getFilteredTodos() {
    switch (this.filter) {
      case 'active':
        return this.todos.filter(todo => !todo.completed);
      case 'completed':
        return this.todos.filter(todo => todo.completed);
      default:
        return this.todos;
    }
  }
  
  render() {
    const todos = this.getFilteredTodos();
    
    if (todos.length === 0) {
      this.todoList.innerHTML = '<p class="empty-state">No todos yet!</p>';
    } else {
      this.todoList.innerHTML = todos.map(todo => this.createTodoHTML(todo)).join('');
    }
    
    this.renderStats();
  }
  
  createTodoHTML(todo) {
    return `
      <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
        <input type="checkbox" ${todo.completed ? 'checked' : ''}>
        <span class="todo-text">${this.escapeHTML(todo.text)}</span>
        <div class="todo-actions">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      </div>
    `;
  }
  
  renderStats() {
    const total = this.todos.length;
    const completed = this.todos.filter(t => t.completed).length;
    const active = total - completed;
    
    this.stats.textContent = `Total: ${total} | Active: ${active} | Completed: ${completed}`;
  }
  
  escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  saveToStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
    localStorage.setItem('nextId', this.nextId.toString());
  }
  
  loadFromStorage() {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  }
  
  getNextId() {
    const stored = localStorage.getItem('nextId');
    return stored ? parseInt(stored) : 1;
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TodoApp();
});

/* ==========================================
 * HTML STRUCTURE NEEDED:
 * ==========================================

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>My Todo App</h1>
    
    <form id="todo-form">
      <input 
        type="text" 
        id="todo-input" 
        placeholder="Add a new todo..." 
        autocomplete="off"
      >
      <button type="submit">Add</button>
    </form>
    
    <div class="controls">
      <input 
        type="text" 
        id="search-input" 
        placeholder="Search todos..."
      >
      
      <div class="filters">
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="active">Active</button>
        <button class="filter-btn" data-filter="completed">Completed</button>
      </div>
      
      <button id="clear-completed">Clear Completed</button>
    </div>
    
    <div id="todo-list"></div>
    
    <div id="stats"></div>
  </div>
  
  <script src="app.js"></script>
</body>
</html>

==========================================
 * CSS (styles.css):
 * ==========================================

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

#todo-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

#todo-input {
  flex: 1;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 16px;
}

#todo-input:focus {
  outline: none;
  border-color: #667eea;
}

#todo-form button {
  padding: 12px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

#todo-form button:hover {
  background: #5568d3;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

#search-input {
  flex: 1;
  padding: 10px;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  min-width: 200px;
}

.filters {
  display: flex;
  gap: 5px;
}

.filter-btn {
  padding: 10px 15px;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

#clear-completed {
  padding: 10px 15px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

#clear-completed:hover {
  background: #ff5252;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: all 0.3s;
}

.todo-item:hover {
  border-color: #667eea;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.todo-item.completed {
  opacity: 0.6;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
}

.todo-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-text {
  flex: 1;
  font-size: 16px;
  color: #333;
}

.todo-actions {
  display: flex;
  gap: 5px;
}

.edit-btn, .delete-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.edit-btn {
  background: #4CAF50;
  color: white;
}

.edit-btn:hover {
  background: #45a049;
}

.delete-btn {
  background: #f44336;
  color: white;
}

.delete-btn:hover {
  background: #da190b;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 18px;
}

#stats {
  text-align: center;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 5px;
  margin-top: 20px;
  color: #666;
  font-size: 14px;
}

@media (max-width: 600px) {
  .container {
    padding: 20px;
  }
  
  .controls {
    flex-direction: column;
  }
  
  .filters {
    width: 100%;
    justify-content: space-between;
  }
  
  .todo-item {
    flex-wrap: wrap;
  }
  
  .todo-actions {
    width: 100%;
    justify-content: flex-end;
  }
}

==========================================
 * ENHANCEMENTS YOU CAN ADD:
 * ==========================================

1. Due dates for todos
2. Priority levels (high, medium, low)
3. Categories/tags
4. Drag and drop reordering
5. Dark mode
6. Export/import todos
7. Keyboard shortcuts
8. Undo/redo functionality
9. Recurring tasks
10. Notifications/reminders
11. Multiple todo lists
12. Collaboration features
13. Animations
14. Accessibility improvements
15. PWA features (offline support)

*/