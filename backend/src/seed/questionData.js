export const questionData = [
  // JavaScript - Easy
  { category: 'JavaScript', difficulty: 'Easy', question: 'What is the difference between let, const, and var in JavaScript?' },
  { category: 'JavaScript', difficulty: 'Easy', question: 'What are primitive data types in JavaScript?' },
  { category: 'JavaScript', difficulty: 'Easy', question: 'What is the purpose of the typeof operator?' },
  { category: 'JavaScript', difficulty: 'Easy', question: 'How do you check if a variable is an array?' },
  { category: 'JavaScript', difficulty: 'Easy', question: 'What is the difference between == and ===?' },
  { category: 'JavaScript', difficulty: 'Easy', question: 'What does the NaN value represent in JavaScript?' },

  // JavaScript - Medium
  { category: 'JavaScript', difficulty: 'Medium', question: 'Explain closures in JavaScript with an example use case.' },
  { category: 'JavaScript', difficulty: 'Medium', question: 'What is the event loop and how does it work?' },
  { category: 'JavaScript', difficulty: 'Medium', question: 'Explain the difference between map, filter, and reduce.' },
  { category: 'JavaScript', difficulty: 'Medium', question: 'What is hoisting in JavaScript?' },
  { category: 'JavaScript', difficulty: 'Medium', question: 'How does prototypal inheritance work in JavaScript?' },
  { category: 'JavaScript', difficulty: 'Medium', question: 'What is the difference between shallow copy and deep copy?' },

  // JavaScript - Hard
  { category: 'JavaScript', difficulty: 'Hard', question: 'Explain how Promises work and the difference between Promise.all and Promise.allSettled.' },
  { category: 'JavaScript', difficulty: 'Hard', question: 'What is a memory leak in JavaScript and how can you prevent it?' },
  { category: 'JavaScript', difficulty: 'Hard', question: 'Explain currying and when you would use it.' },
  { category: 'JavaScript', difficulty: 'Hard', question: 'How does the this keyword behave in different contexts?' },
  { category: 'JavaScript', difficulty: 'Hard', question: 'What are generators and async iterators in JavaScript?' },
  { category: 'JavaScript', difficulty: 'Hard', question: 'Explain debouncing and throttling with real-world examples.' },

  // React - Easy
  { category: 'React', difficulty: 'Easy', question: 'What is React and what problem does it solve?' },
  { category: 'React', difficulty: 'Easy', question: 'What is the difference between a component and an element?' },
  { category: 'React', difficulty: 'Easy', question: 'What are props in React?' },
  { category: 'React', difficulty: 'Easy', question: 'What is JSX?' },
  { category: 'React', difficulty: 'Easy', question: 'What is the purpose of the key prop in lists?' },
  { category: 'React', difficulty: 'Easy', question: 'What is the difference between state and props?' },

  // React - Medium
  { category: 'React', difficulty: 'Medium', question: 'Explain the React component lifecycle in class components.' },
  { category: 'React', difficulty: 'Medium', question: 'What are React Hooks and why were they introduced?' },
  { category: 'React', difficulty: 'Medium', question: 'Explain useEffect and its dependency array.' },
  { category: 'React', difficulty: 'Medium', question: 'What is lifting state up in React?' },
  { category: 'React', difficulty: 'Medium', question: 'How does React virtual DOM improve performance?' },
  { category: 'React', difficulty: 'Medium', question: 'What is controlled vs uncontrolled components?' },

  // React - Hard
  { category: 'React', difficulty: 'Hard', question: 'Explain React reconciliation and the diffing algorithm.' },
  { category: 'React', difficulty: 'Hard', question: 'How would you optimize a React app that re-renders too often?' },
  { category: 'React', difficulty: 'Hard', question: 'Explain useMemo, useCallback, and React.memo with examples.' },
  { category: 'React', difficulty: 'Hard', question: 'What are React Server Components and how do they differ from client components?' },
  { category: 'React', difficulty: 'Hard', question: 'How do you manage complex global state without overusing Context?' },
  { category: 'React', difficulty: 'Hard', question: 'Explain error boundaries and when to use them.' },

  // Node.js - Easy
  { category: 'Node.js', difficulty: 'Easy', question: 'What is Node.js and what is it commonly used for?' },
  { category: 'Node.js', difficulty: 'Easy', question: 'What is npm and what is package.json used for?' },
  { category: 'Node.js', difficulty: 'Easy', question: 'What is the difference between require and import in Node.js?' },
  { category: 'Node.js', difficulty: 'Easy', question: 'What is middleware in Express?' },
  { category: 'Node.js', difficulty: 'Easy', question: 'What does non-blocking I/O mean in Node.js?' },
  { category: 'Node.js', difficulty: 'Easy', question: 'What is the purpose of the process object in Node.js?' },

  // Node.js - Medium
  { category: 'Node.js', difficulty: 'Medium', question: 'Explain the Node.js event loop phases.' },
  { category: 'Node.js', difficulty: 'Medium', question: 'What is the difference between process.nextTick and setImmediate?' },
  { category: 'Node.js', difficulty: 'Medium', question: 'How do you handle errors in Express middleware?' },
  { category: 'Node.js', difficulty: 'Medium', question: 'What are streams in Node.js and when would you use them?' },
  { category: 'Node.js', difficulty: 'Medium', question: 'How does the cluster module help scale Node.js applications?' },
  { category: 'Node.js', difficulty: 'Medium', question: 'Explain environment variables and why dotenv is used.' },

  // Node.js - Hard
  { category: 'Node.js', difficulty: 'Hard', question: 'How would you design a scalable REST API with Express and MongoDB?' },
  { category: 'Node.js', difficulty: 'Hard', question: 'Explain backpressure in Node.js streams.' },
  { category: 'Node.js', difficulty: 'Hard', question: 'How do you prevent memory leaks in long-running Node.js servers?' },
  { category: 'Node.js', difficulty: 'Hard', question: 'What are worker threads and when should you use them over clustering?' },
  { category: 'Node.js', difficulty: 'Hard', question: 'How would you implement rate limiting in an Express API?' },
  { category: 'Node.js', difficulty: 'Hard', question: 'Explain JWT authentication flow in a Node.js backend.' },

  // DSA - Easy
  { category: 'DSA', difficulty: 'Easy', question: 'What is the difference between an array and a linked list?' },
  { category: 'DSA', difficulty: 'Easy', question: 'What is Big O notation?' },
  { category: 'DSA', difficulty: 'Easy', question: 'What is a stack and what are its common operations?' },
  { category: 'DSA', difficulty: 'Easy', question: 'What is a queue and where is it used?' },
  { category: 'DSA', difficulty: 'Easy', question: 'What is the time complexity of accessing an element in an array by index?' },
  { category: 'DSA', difficulty: 'Easy', question: 'What is the difference between linear search and binary search?' },

  // DSA - Medium
  { category: 'DSA', difficulty: 'Medium', question: 'Explain how a hash table works and its average time complexity.' },
  { category: 'DSA', difficulty: 'Medium', question: 'What is the difference between BFS and DFS?' },
  { category: 'DSA', difficulty: 'Medium', question: 'How does quicksort work and what is its average time complexity?' },
  { category: 'DSA', difficulty: 'Medium', question: 'What is dynamic programming and when would you use it?' },
  { category: 'DSA', difficulty: 'Medium', question: 'Explain two-pointer technique with an example problem.' },
  { category: 'DSA', difficulty: 'Medium', question: 'What is a binary search tree and what are its main operations?' },

  // DSA - Hard
  { category: 'DSA', difficulty: 'Hard', question: 'Design an algorithm to find the longest substring without repeating characters.' },
  { category: 'DSA', difficulty: 'Hard', question: 'Explain Dijkstra\'s algorithm and its time complexity.' },
  { category: 'DSA', difficulty: 'Hard', question: 'How would you detect a cycle in a linked list?' },
  { category: 'DSA', difficulty: 'Hard', question: 'What is the difference between greedy algorithms and dynamic programming?' },
  { category: 'DSA', difficulty: 'Hard', question: 'Explain trie data structure and a real-world use case.' },
  { category: 'DSA', difficulty: 'Hard', question: 'How do you solve the maximum subarray problem efficiently?' },
];
