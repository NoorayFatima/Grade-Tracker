# 🎓 Student Grade Tracker

A high-performance, in-browser student management system built with Vanilla JavaScript. This project focuses on heavy data manipulation and DOM synchronization.

## 🚀 Features
- **Live Dashboard:** Real-time updates of class averages and top performers.
- **Dynamic Filtering:** Toggle between All, Passing, and Failing students.
- **Smart Sorting:** Re-order students by performance without reloading.
- **Data Parsing:** Converts comma-separated user input into validated numerical arrays.

## 🛠️ Tech Stack
- HTML5 (Semantic Structure)
- CSS3 (Custom Properties & CSS Grid)
- JavaScript (ES6+ Functional Programming)

## 📖 Lessons Learned
This project served as a deep-dive into advanced JavaScript array methods and state management:

1. **The Power of `reduce`**: Learned that it isn't just for sums. It was used here for both mathematical aggregation (averages) and object comparison (finding the top scorer).
2. **Immutability with `sort`**: Discovered that `.sort()` mutates the original array, requiring the use of the Spread Operator `[...]` to keep the "source of truth" safe.
3. **Array Chaining**: Implemented complex pipelines using `.split().map().filter()` to sanitize user input strings into clean data.
4. **Declarative Rendering**: Shifted from manual DOM manipulation to a "Render Function" pattern, where the UI automatically reflects the current state of the data.
5. **Flattening Data**: Explored the `.flat()` method for potential use in multi-semester grade tracking.