/**
 * ============================================
 * OBJECT-ORIENTED PROGRAMMING - CLASSES (ES6)
 * ============================================
 */

// ==========================================
// 1. BASIC CLASS SYNTAX
// ==========================================

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return `Hello, I'm ${this.name}`;
  }
  
  getAge() {
    return this.age;
  }
}

const person1 = new Person("John", 30);
console.log(person1.greet()); // Hello, I'm John
console.log(person1.getAge()); // 30

// ==========================================
// 2. CONSTRUCTOR
// ==========================================

class User {
  constructor(username, email) {
    // Initialize properties
    this.username = username;
    this.email = email;
    this.createdAt = new Date();
    
    // Validation
    if (!username) {
      throw new Error("Username is required");
    }
  }
}

const user = new User("john_doe", "john@example.com");
console.log(user);

// ==========================================
// 3. CLASS METHODS
// ==========================================

class Calculator {
  // Instance method
  add(a, b) {
    return a + b;
  }
  
  subtract(a, b) {
    return a - b;
  }
  
  // Method with multiple operations
  calculate(operation, a, b) {
    switch (operation) {
      case 'add': return this.add(a, b);
      case 'subtract': return this.subtract(a, b);
      default: throw new Error("Unknown operation");
    }
  }
}

const calc = new Calculator();
console.log(calc.add(5, 3)); // 8
console.log(calc.calculate('subtract', 10, 4)); // 6

// ==========================================
// 4. GETTERS AND SETTERS
// ==========================================

class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }
  
  // Getter
  get area() {
    return this._width * this._height;
  }
  
  get perimeter() {
    return 2 * (this._width + this._height);
  }
  
  // Setter with validation
  set width(value) {
    if (value <= 0) {
      throw new Error("Width must be positive");
    }
    this._width = value;
  }
  
  set height(value) {
    if (value <= 0) {
      throw new Error("Height must be positive");
    }
    this._height = value;
  }
}

const rect = new Rectangle(10, 5);
console.log(rect.area); // 50 (using getter)
rect.width = 20; // Using setter
console.log(rect.area); // 100

// ==========================================
// 5. STATIC METHODS
// ==========================================

class MathUtils {
  // Static method - called on class, not instance
  static add(a, b) {
    return a + b;
  }
  
  static max(...numbers) {
    return Math.max(...numbers);
  }
  
  static random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

// Call without creating instance
console.log(MathUtils.add(5, 3)); // 8
console.log(MathUtils.max(1, 5, 3, 9, 2)); // 9

// ==========================================
// 6. STATIC PROPERTIES
// ==========================================

class Config {
  static apiUrl = "https://api.example.com";
  static version = "1.0.0";
  static maxRetries = 3;
  
  static getConfig() {
    return {
      apiUrl: this.apiUrl,
      version: this.version,
      maxRetries: this.maxRetries
    };
  }
}

console.log(Config.apiUrl); // https://api.example.com
console.log(Config.getConfig());

// ==========================================
// 7. PRIVATE FIELDS (#)
// ==========================================

class BankAccount {
  // Private field
  #balance = 0;
  #accountNumber;
  
  constructor(accountNumber, initialBalance) {
    this.#accountNumber = accountNumber;
    this.#balance = initialBalance;
  }
  
  // Public method to access private field
  getBalance() {
    return this.#balance;
  }
  
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      return true;
    }
    return false;
  }
  
  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      return true;
    }
    return false;
  }
  
  // Private method
  #validateTransaction(amount) {
    return amount > 0 && amount <= this.#balance;
  }
}

const account = new Bank Account("123456", 1000);
console.log(account.getBalance()); // 1000
account.deposit(500);
console.log(account.getBalance()); // 1500
// console.log(account.#balance); // Error: Private field

// ==========================================
// 8. INHERITANCE
// ==========================================

class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return `${this.name} makes a sound`;
  }
  
  sleep() {
    return `${this.name} is sleeping`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }
  
  // Override parent method
  speak() {
    return `${this.name} barks`;
  }
  
  // New method
  fetch() {
    return `${this.name} fetches the ball`;
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
console.log(dog.speak()); // Buddy barks
console.log(dog.sleep()); // Buddy is sleeping (inherited)
console.log(dog.fetch()); // Buddy fetches the ball

// ==========================================
// 9. SUPER KEYWORD
// ==========================================

class Vehicle {
  constructor(brand, year) {
    this.brand = brand;
    this.year = year;
  }
  
  getInfo() {
    return `${this.brand} (${this.year})`;
  }
}

class Car extends Vehicle {
  constructor(brand, year, model) {
    super(brand, year); // Call parent constructor
    this.model = model;
  }
  
  getInfo() {
    // Call parent method
    return `${super.getInfo()} - ${this.model}`;
  }
}

const car = new Car("Toyota", 2022, "Camry");
console.log(car.getInfo()); // Toyota (2022) - Camry

// ==========================================
// 10. METHOD CHAINING
// ==========================================

class QueryBuilder {
  constructor() {
    this.query = '';
  }
  
  select(fields) {
    this.query += `SELECT ${fields} `;
    return this; // Return this for chaining
  }
  
  from(table) {
    this.query += `FROM ${table} `;
    return this;
  }
  
  where(condition) {
    this.query += `WHERE ${condition} `;
    return this;
  }
  
  build() {
    return this.query.trim();
  }
}

const query = new QueryBuilder()
  .select('*')
  .from('users')
  .where('age > 18')
  .build();

console.log(query); // SELECT * FROM users WHERE age > 18

// ==========================================
// 11. INSTANCEOF OPERATOR
// ==========================================

class Shape {}
class Circle extends Shape {}

const circle = new Circle();

console.log(circle instanceof Circle); // true
console.log(circle instanceof Shape); // true
console.log(circle instanceof Object); // true
console.log(circle instanceof Array); // false

// ==========================================
// 12. MIXINS
// ==========================================

// Mixin pattern
const CanEat = {
  eat(food) {
    return `${this.name} is eating ${food}`;
  }
};

const CanWalk = {
  walk() {
    return `${this.name} is walking`;
  }
};

class Human {
  constructor(name) {
    this.name = name;
  }
}

// Apply mixins
Object.assign(Human.prototype, CanEat, CanWalk);

const human = new Human("John");
console.log(human.eat("pizza")); // John is eating pizza
console.log(human.walk()); // John is walking

// ==========================================
// 13. ABSTRACT-LIKE PATTERNS
// ==========================================

class AbstractShape {
  constructor() {
    if (new.target === AbstractShape) {
      throw new Error("Cannot instantiate abstract class");
    }
  }
  
  // "Abstract" method
  area() {
    throw new Error("Method 'area()' must be implemented");
  }
}

class Square extends AbstractShape {
  constructor(side) {
    super();
    this.side = side;
  }
  
  area() {
    return this.side * this.side;
  }
}

const square = new Square(5);
console.log(square.area()); // 25

// ==========================================
// 14. REAL-WORLD EXAMPLES
// ==========================================

// Example 1: User Management System
class UserManager {
  #users = [];
  
  addUser(user) {
    this.#users.push(user);
  }
  
  getUser(id) {
    return this.#users.find(u => u.id === id);
  }
  
  getAllUsers() {
    return [...this.#users]; // Return copy
  }
  
  removeUser(id) {
    this.#users = this.#users.filter(u => u.id !== id);
  }
}

// Example 2: Todo List
class TodoList {
  #todos = [];
  #nextId = 1;
  
  add(text) {
    const todo = {
      id: this.#nextId++,
      text,
      completed: false,
      createdAt: new Date()
    };
    this.#todos.push(todo);
    return todo;
  }
  
  complete(id) {
    const todo = this.#todos.find(t => t.id === id);
    if (todo) todo.completed = true;
  }
  
  getAll() {
    return [...this.#todos];
  }
  
  getActive() {
    return this.#todos.filter(t => !t.completed);
  }
}

// Example 3: Shopping Cart
class ShoppingCart {
  #items = [];
  
  addItem(product, quantity = 1) {
    const existing = this.#items.find(i => i.product.id === product.id);
    
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.#items.push({ product, quantity });
    }
  }
  
  removeItem(productId) {
    this.#items = this.#items.filter(i => i.product.id !== productId);
  }
  
  get total() {
    return this.#items.reduce((sum, item) => 
      sum + (item.product.price * item.quantity), 0
    );
  }
  
  get itemCount() {
    return this.#items.reduce((sum, item) => sum + item.quantity, 0);
  }
}

// Example 4: Event Emitter
class EventEmitter {
  #events = {};
  
  on(event, callback) {
    if (!this.#events[event]) {
      this.#events[event] = [];
    }
    this.#events[event].push(callback);
  }
  
  emit(event, data) {
    if (this.#events[event]) {
      this.#events[event].forEach(callback => callback(data));
    }
  }
  
  off(event, callback) {
    if (this.#events[event]) {
      this.#events[event] = this.#events[event]
        .filter(cb => cb !== callback);
    }
  }
}

// ==========================================
// PRACTICE EXERCISES
// ==========================================

/*
1. Create a Book class with title, author, pages properties and read() method

2. Create Employee class that extends Person with salary property

3. Create a class with private field and getter/setter

4. Implement a Logger class with static method log()

5. Create a class with method chaining (builder pattern)

6. Implement a Stack class with push, pop, peek methods

7. Create Animal base class and Dog, Cat subclasses

8. Build a Counter class with increment, decrement, reset methods

9. Create a Product class with price validation in setter

10. Implement a simple Queue class

11. Create a class that demonstrates method overriding

12. Build a Point class with distance calculation method

13. Create a class hierarchy: Shape -> Rectangle -> Square

14. Implement a class with static factory method

15. Create a BankAccount class with transaction history
*/

// ==========================================
// BEST PRACTICES
// ==========================================

/*
1. ✅ Use classes for object blueprints
2. ✅ Use constructor for initialization
3. ✅ Use private fields (#) for encapsulation
4. ✅ Use getters/setters for controlled access
5. ✅ Use static methods for utility functions
6. ✅ Use super() in child class constructor
7. ✅ Return 'this' for method chaining
8. ✅ Validate in constructors and setters
9. ✅ Keep classes focused (single responsibility)
10. ✅ Use meaningful class and method names
11. ✅ Document public API
12. ✅ Prefer composition over inheritance
13. ✅ Use instanceof carefully
14. ✅ Consider immutability
15. ✅ Write tests for classes
*/