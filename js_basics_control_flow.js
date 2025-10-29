/**
 * ============================================
 * CONTROL FLOW IN JAVASCRIPT
 * ============================================
 */

// ==========================================
// 1. IF STATEMENT
// ==========================================

let age = 20;

if (age >= 18) {
  console.log("You are an adult");
}

// Single line (no braces needed but not recommended)
if (age >= 18) console.log("Adult");

// ==========================================
// 2. IF-ELSE STATEMENT
// ==========================================

let temperature = 25;

if (temperature > 30) {
  console.log("It's hot outside");
} else {
  console.log("Weather is pleasant");
}

// ==========================================
// 3. IF-ELSE IF-ELSE CHAIN
// ==========================================

let score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else if (score >= 60) {
  console.log("Grade: D");
} else {
  console.log("Grade: F");
}

// ==========================================
// 4. NESTED IF STATEMENTS
// ==========================================

let isLoggedIn = true;
let isAdmin = false;

if (isLoggedIn) {
  console.log("User is logged in");
  
  if (isAdmin) {
    console.log("Access granted to admin panel");
  } else {
    console.log("Regular user access");
  }
} else {
  console.log("Please log in");
}

// ==========================================
// 5. SWITCH STATEMENT
// ==========================================

let day = 3;
let dayName;

switch (day) {
  case 1:
    dayName = "Monday";
    break;
  case 2:
    dayName = "Tuesday";
    break;
  case 3:
    dayName = "Wednesday";
    break;
  case 4:
    dayName = "Thursday";
    break;
  case 5:
    dayName = "Friday";
    break;
  case 6:
    dayName = "Saturday";
    break;
  case 7:
    dayName = "Sunday";
    break;
  default:
    dayName = "Invalid day";
}

console.log(dayName); // Wednesday

// ==========================================
// 6. SWITCH WITH FALL-THROUGH
// ==========================================

let month = "December";
let season;

switch (month) {
  case "December":
  case "January":
  case "February":
    season = "Winter";
    break;
  case "March":
  case "April":
  case "May":
    season = "Spring";
    break;
  case "June":
  case "July":
  case "August":
    season = "Summer";
    break;
  case "September":
  case "October":
  case "November":
    season = "Fall";
    break;
  default:
    season = "Unknown";
}

console.log(season); // Winter

// ==========================================
// 7. SWITCH WITH EXPRESSIONS
// ==========================================

let grade = 'B';

switch (grade) {
  case 'A':
    console.log("Excellent!");
    break;
  case 'B':
  case 'C':
    console.log("Good job!");
    break;
  case 'D':
    console.log("You passed");
    break;
  case 'F':
    console.log("Try again");
    break;
  default:
    console.log("Invalid grade");
}

// ==========================================
// 8. TERNARY OPERATOR (SHORT IF-ELSE)
// ==========================================

let userAge = 20;
let canVote = userAge >= 18 ? "Yes" : "No";
console.log(canVote); // Yes

// Multiple ternary (nested)
let num = 0;
let result = num > 0 ? "Positive" : num < 0 ? "Negative" : "Zero";
console.log(result); // Zero

// Ternary in expressions
let price = 100;
let discount = price > 50 ? price * 0.1 : 0;
console.log(discount); // 10

// ==========================================
// 9. LOGICAL OPERATORS FOR CONTROL FLOW
// ==========================================

// AND (&&) - Short-circuit evaluation
let user = { name: "John", isAdmin: true };
user.isAdmin && console.log("Admin access"); // Runs

// OR (||) - Default values
let username = "" || "Guest";
console.log(username); // Guest

let inputValue = null;
let value = inputValue || "Default Value";
console.log(value); // Default Value

// Combining logical operators
let isWeekend = true;
let hasWork = false;
isWeekend && !hasWork && console.log("Time to relax!");

// ==========================================
// 10. NULLISH COALESCING FOR CONTROL FLOW
// ==========================================

let count = 0;
let displayCount = count ?? 10; // 0 (not null/undefined)
console.log(displayCount); // 0

let items = null;
let itemCount = items ?? "No items";
console.log(itemCount); // No items

// Difference between || and ??
console.log(0 || "default");  // "default" (0 is falsy)
console.log(0 ?? "default");  // 0 (0 is not null/undefined)
console.log("" || "default"); // "default" (empty string is falsy)
console.log("" ?? "default"); // "" (empty string is not null/undefined)

// ==========================================
// 11. GUARD CLAUSES (EARLY RETURNS)
// ==========================================

function processUser(user) {
  // Guard clauses - check invalid conditions first
  if (!user) {
    console.log("No user provided");
    return;
  }
  
  if (!user.isActive) {
    console.log("User is inactive");
    return;
  }
  
  if (!user.hasPermission) {
    console.log("User lacks permission");
    return;
  }
  
  // Main logic here
  console.log("Processing user:", user.name);
}

processUser(null); // No user provided
processUser({ isActive: false }); // User is inactive
processUser({ isActive: true, hasPermission: true, name: "John" }); // Processing

// ==========================================
// 12. TRUTHY AND FALSY VALUES
// ==========================================

// Falsy values (only these 8):
// false, 0, -0, 0n, "", null, undefined, NaN

if (false) console.log("Won't print");
if (0) console.log("Won't print");
if ("") console.log("Won't print");
if (null) console.log("Won't print");
if (undefined) console.log("Won't print");
if (NaN) console.log("Won't print");

// Truthy values (everything else):
if (true) console.log("Truthy");
if (1) console.log("Truthy");
if ("0") console.log("Truthy"); // String "0" is truthy!
if ("false") console.log("Truthy"); // String "false" is truthy!
if ([]) console.log("Truthy"); // Empty array is truthy!
if ({}) console.log("Truthy"); // Empty object is truthy!

// ==========================================
// 13. OPTIONAL CHAINING IN CONDITIONS
// ==========================================

let userProfile = {
  name: "Alice",
  settings: {
    theme: "dark"
  }
};

// Safe property access in conditions
if (userProfile?.settings?.theme === "dark") {
  console.log("Dark mode enabled");
}

// Without optional chaining (would throw error if settings is undefined)
// if (userProfile.settings.notifications.email) { ... }

// With optional chaining (safe)
if (userProfile?.settings?.notifications?.email) {
  console.log("Email notifications enabled");
}

// ==========================================
// 14. COMPLEX CONDITIONS
// ==========================================

let person = { age: 25, hasLicense: true, hasInsurance: true };

// Multiple conditions with AND
if (person.age >= 18 && person.hasLicense && person.hasInsurance) {
  console.log("Can drive legally");
}

// Multiple conditions with OR
if (person.age < 18 || !person.hasLicense || !person.hasInsurance) {
  console.log("Cannot drive legally");
}

// Mixed logical operators
let time = 14; // 2 PM
let isWeekday = true;

if ((time >= 9 && time < 17) && isWeekday) {
  console.log("Business hours");
}

// ==========================================
// 15. SWITCH WITH TRUE (PATTERN MATCHING)
// ==========================================

let studentScore = 75;

switch (true) {
  case studentScore >= 90:
    console.log("Excellent");
    break;
  case studentScore >= 80:
    console.log("Very Good");
    break;
  case studentScore >= 70:
    console.log("Good");
    break;
  case studentScore >= 60:
    console.log("Pass");
    break;
  default:
    console.log("Fail");
}

// ==========================================
// 16. COMPARISON QUIRKS TO WATCH OUT FOR
// ==========================================

// String comparison
console.log("2" > "12"); // true (lexicographical comparison)
console.log("02" == 2); // true (type coercion)
console.log("02" === 2); // false (strict comparison)

// Null and undefined
console.log(null == undefined); // true
console.log(null === undefined); // false

// NaN comparisons
console.log(NaN == NaN); // false (NaN is not equal to anything, including itself)
console.log(NaN === NaN); // false
console.log(isNaN(NaN)); // true (correct way to check)

// Object comparison
console.log({} == {}); // false (different references)
console.log([] == []); // false (different references)

// ==========================================
// 17. CONDITIONAL (TERNARY) CHAINS
// ==========================================

let examScore = 88;
let letterGrade = examScore >= 90 ? 'A' :
                  examScore >= 80 ? 'B' :
                  examScore >= 70 ? 'C' :
                  examScore >= 60 ? 'D' : 'F';

console.log(letterGrade); // B

// ==========================================
// 18. REAL-WORLD EXAMPLES
// ==========================================

// Example 1: User Authentication
function authenticateUser(username, password) {
  if (!username || !password) {
    return "Username and password required";
  }
  
  if (username.length < 3) {
    return "Username too short";
  }
  
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  
  // Simulate authentication
  return "Login successful";
}

console.log(authenticateUser("john", "pass123456"));

// Example 2: Shopping Cart Discount
function calculateDiscount(total, membershipType) {
  let discount = 0;
  
  switch (membershipType) {
    case "gold":
      discount = total >= 100 ? 0.20 : 0.15;
      break;
    case "silver":
      discount = total >= 100 ? 0.15 : 0.10;
      break;
    case "bronze":
      discount = total >= 100 ? 0.10 : 0.05;
      break;
    default:
      discount = 0;
  }
  
  return total - (total * discount);
}

console.log(calculateDiscount(150, "gold")); // 120

// Example 3: Age Category
function getAgeCategory(age) {
  if (age < 0) return "Invalid age";
  if (age < 13) return "Child";
  if (age < 20) return "Teenager";
  if (age < 60) return "Adult";
  return "Senior";
}

console.log(getAgeCategory(25)); // Adult

// ==========================================
// PRACTICE EXERCISES
// ==========================================

/*
1. Write a function that checks if a number is positive, negative, or zero

2. Create a grade calculator that takes a score (0-100) and returns:
   - "A" for 90-100
   - "B" for 80-89
   - "C" for 70-79
   - "D" for 60-69
   - "F" for below 60

3. Write a function to check if a year is a leap year:
   - Divisible by 4 AND (not divisible by 100 OR divisible by 400)

4. Create a traffic light system:
   - Input: "red", "yellow", "green"
   - Output: "Stop", "Slow down", "Go"

5. Write a function that checks if a person can watch a movie:
   - Age >= 18 OR (Age >= 13 AND hasParentPermission)

6. Rewrite this nested if-else using a switch statement:
   if (color === "red") action = "stop";
   else if (color === "yellow") action = "wait";
   else if (color === "green") action = "go";

7. Write a function to determine shipping cost:
   - Free shipping if order > $100
   - $10 shipping if order > $50
   - $20 shipping otherwise

8. Create a login validation function checking:
   - Username is not empty
   - Password length >= 8
   - Password contains at least one number

9. Write a function that returns the maximum of three numbers
   without using Math.max()

10. Create a function to check if a string is a palindrome
    (reads same forwards and backwards)
*/

// ==========================================
// BEST PRACTICES
// ==========================================

/*
1. Use === instead of == for comparisons
2. Keep conditions simple and readable
3. Use guard clauses to reduce nesting
4. Prefer early returns over deep nesting
5. Use switch for multiple specific value checks
6. Use ternary for simple conditions only
7. Use meaningful variable names in conditions
8. Avoid comparing boolean values directly (if (isActive === true))
9. Use optional chaining for safe property access
10. Comment complex conditional logic
*/