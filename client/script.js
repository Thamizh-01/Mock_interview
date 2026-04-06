// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', function() {
    console.log('MockPro loaded');
    
    // Check for saved user
    const savedUser = localStorage.getItem('mockpro_current_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        isLoggedIn = true;
        progress = currentUser.progress || { reviewed: 0, categories: [], simsCompleted: 0, totalTime: 0, activities: [] };
        if (progress.categories instanceof Array) {
            progress.categories = new Set(progress.categories);
        }
        updateAuthUI();
        loadDashboardData();
    }
    
    // Button click handlers - direct inline
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    
    if (loginBtn) {
        loginBtn.onclick = function() { openAuth('login'); };
    }
    if (signupBtn) {
        signupBtn.onclick = function() { openAuth('register'); };
    }
});

// ============ STATE ============
let currentCategory = null;
let currentQuestionIndex = 0;
let reviewedQuestions = new Set();
let progress = { reviewed: 0, categories: new Set(), simsCompleted: 0, totalTime: 0, activities: [] };
let simQuestions = [];
let simIndex = 0;
let timerInterval = null;
let seconds = 0;
let selectedFile = null;
let resumeAnalysis = null;
let isLoggedIn = false;
let currentUser = null;
let authMode = 'login';

// ============ AUTH FUNCTIONS ============
function openAuth(mode) {
    console.log('Opening auth:', mode);
    authMode = mode;
    const modal = document.getElementById('auth-modal');
    modal.classList.remove('hidden');
    updateAuthForm();
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.add('hidden');
    document.getElementById('auth-name').value = '';
    document.getElementById('auth-email').value = '';
    document.getElementById('auth-password').value = '';
}

function toggleAuthMode() {
    authMode = authMode === 'login' ? 'register' : 'login';
    updateAuthForm();
}

function updateAuthForm() {
    document.getElementById('auth-title').textContent = authMode === 'login' ? 'Login' : 'Create Account';
    document.getElementById('auth-submit').textContent = authMode === 'login' ? 'Sign In' : 'Create Account';
    document.getElementById('name-field').classList.toggle('hidden', authMode === 'login');
    
    const switchText = authMode === 'login' 
        ? 'Don\'t have an account? <a href="#" onclick="toggleAuthMode()">Sign up</a>'
        : 'Already have an account? <a href="#" onclick="toggleAuthMode()">Sign in</a>';
    document.querySelector('.auth-switch').innerHTML = switchText;
}

function submitAuth(e) {
    e.preventDefault();
    
    const name = document.getElementById('auth-name').value.trim();
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    
    if (!email || !password) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (authMode === 'register') {
        if (!name) {
            alert('Please enter your name');
            return;
        }
        
        // Check if user exists
        const users = JSON.parse(localStorage.getItem('mockpro_users') || '[]');
        if (users.find(u => u.email === email)) {
            alert('Email already registered. Please login.');
            openAuth('login');
            return;
        }
        
        // Create new user
        const newUser = {
            name: name,
            email: email,
            password: password,
            progress: { reviewed: 0, categories: [], simsCompleted: 0, totalTime: 0, activities: [] }
        };
        
        users.push(newUser);
        localStorage.setItem('mockpro_users', JSON.stringify(users));
        
        currentUser = { ...newUser };
        console.log('User registered:', currentUser.name);
        
    } else {
        // Login
        const users = JSON.parse(localStorage.getItem('mockpro_users') || '[]');
        currentUser = users.find(u => u.email === email && u.password === password);
        
        if (!currentUser) {
            alert('Invalid email or password');
            return;
        }
        console.log('User logged in:', currentUser.name);
    }
    
    isLoggedIn = true;
    progress = currentUser.progress || { reviewed: 0, categories: [], simsCompleted: 0, totalTime: 0, activities: [] };
    if (progress.categories instanceof Array) {
        progress.categories = new Set(progress.categories);
    }
    
    saveUser();
    updateAuthUI();
    closeAuthModal();
    showDashboard();
    alert('Welcome, ' + currentUser.name + '!');
}

function saveUser() {
    if (!currentUser) return;
    currentUser.progress = progress;
    localStorage.setItem('mockpro_current_user', JSON.stringify(currentUser));
    
    // Also update in users array
    const users = JSON.parse(localStorage.getItem('mockpro_users') || '[]');
    const idx = users.findIndex(u => u.email === currentUser.email);
    if (idx >= 0) users[idx] = currentUser;
    localStorage.setItem('mockpro_users', JSON.stringify(users));
}

function logoutUser() {
    isLoggedIn = false;
    currentUser = null;
    progress = { reviewed: 0, categories: new Set(), simsCompleted: 0, totalTime: 0, activities: [] };
    localStorage.removeItem('mockpro_current_user');
    updateAuthUI();
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('home').classList.remove('hidden');
}

function updateAuthUI() {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const userProfile = document.getElementById('user-profile');
    
    if (loginBtn) loginBtn.style.display = isLoggedIn ? 'none' : 'inline-block';
    if (signupBtn) signupBtn.style.display = isLoggedIn ? 'none' : 'inline-block';
    if (userProfile) {
        userProfile.classList.toggle('hidden', !isLoggedIn);
        if (currentUser) {
            document.getElementById('user-name').textContent = currentUser.name;
        }
    }
}

// ============ NAVIGATION ============
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function showDashboard() {
    document.getElementById('home').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    loadDashboardData();
    document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
}

function openDashboard(e) {
    e.preventDefault();
    if (!isLoggedIn) {
        openAuth('login');
        alert('Please login to view your dashboard');
        return;
    }
    showDashboard();
}

function openDashboardFromHome() {
    if (!isLoggedIn) {
        openAuth('login');
        alert('Please login to view your dashboard');
        return;
    }
    showDashboard();
}

function showDashboardTab(tabName) {
    document.querySelectorAll('.dashboard-tab').forEach(t => t.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabName + '-tab').classList.remove('hidden');
    document.querySelector('.tab-btn[onclick="showDashboardTab(\'' + tabName + '\')"]').classList.add('active');
}

// ============ QUESTIONS ============
const questions = {
    webdev: [
        { q: "What is the difference between HTML and HTML5?", a: "HTML5 introduces new semantic elements, improved form controls, audio/video support, canvas, local storage, and offline capabilities." },
        { q: "Explain the CSS Box Model", a: "The CSS Box Model consists of: Content, Padding, Border, and Margin. Width = content + padding + border + margin." },
        { q: "What is the difference between var, let, and const?", a: "var is function-scoped, let is block-scoped and reassignable, const is block-scoped and not reassignable." },
        { q: "What is the event loop in JavaScript?", a: "The event loop checks call stack and task queue. If stack is empty, it takes first task from queue." },
        { q: "Explain closures in JavaScript", a: "A closure is a function that has access to variables from its outer scope even after the outer function returns." },
        { q: "What is the DOM?", a: "Document Object Model is a programming interface for web documents - represents page so programs can change structure." },
        { q: "Explain CSS Flexbox", a: "Flexbox is a layout model for efficient arrangement. Key properties: justify-content, align-items, flex-direction." },
        { q: "What is responsive web design?", a: "Responsive design makes pages render well on all devices using fluid grids, flexible images, and media queries." },
        { q: "What is CORS?", a: "Cross-Origin Resource Sharing allows restricted resources to be requested from another domain." },
        { q: "What is React and why use it?", a: "React is a JavaScript library for UI. Uses virtual DOM for efficient updates and component-based architecture." },
        { q: "Explain REST vs GraphQL", a: "REST uses multiple endpoints with fixed data. GraphQL uses single endpoint with flexible queries." },
        { q: "What is AJAX?", a: "Asynchronous JavaScript allows web pages to be updated asynchronously without reloading the page." },
        { q: "Explain web storage (localStorage/sessionStorage)", a: "localStorage persists without expiration, sessionStorage lasts one session. Both store key-value pairs as strings." },
        { q: "What is the difference between null and undefined?", a: "undefined means variable declared but not assigned. null is an intentional absence of value." },
        { q: "Explain Promise in JavaScript", a: "Promise represents eventual completion or failure of async operation with .then(), .catch(), .finally()." }
    ],
    datascience: [
        { q: "What is the difference between supervised and unsupervised learning?", a: "Supervised uses labeled data to learn mapping. Unsupervised finds patterns in unlabeled data (clustering, dimensionality reduction)." },
        { q: "Explain Linear Regression", a: "Linear regression finds best-fit line to predict continuous targets by minimizing sum of squared errors." },
        { q: "What is overfitting and how to prevent it?", a: "Overfitting: model learns training data too well including noise. Prevention: cross-validation, regularization, early stopping." },
        { q: "What is the bias-variance tradeoff?", a: "Bias is error from wrong assumptions. Variance is error from data sensitivity. Balance minimizes total error." },
        { q: "Explain Random Forest", a: "Ensemble method using multiple decision trees on random data subsets. Final prediction is majority vote." },
        { q: "What is gradient descent?", a: "Optimization algorithm that iteratively moves toward minimum by taking steps proportional to negative gradient." },
        { q: "Explain precision, recall, and F1-score", a: "Precision: % of positive predictions correct. Recall: % of actual positives identified. F1: harmonic mean." },
        { q: "What is cross-validation?", a: "Technique to evaluate generalization by splitting data into k folds, training on k-1, testing on 1." },
        { q: "What is the confusion matrix?", a: "Table showing actual vs predicted: True Positives, True Negatives, False Positives, False Negatives." },
        { q: "Explain K-Means clustering", a: "Unsupervised algorithm partitioning data into k clusters by iteratively assigning to nearest centroid." },
        { q: "What is data normalization?", a: "Scaling features to common range (0-1). Important for algorithms sensitive to feature scales." },
        { q: "Explain the ROC-AUC curve", a: "ROC plots true positive rate vs false positive rate. AUC measures performance - 1.0 perfect, 0.5 random." },
        { q: "What is feature engineering?", a: "Creating features from domain knowledge to improve ML algorithm performance." },
        { q: "Explain bagging vs boosting", a: "Bagging: parallel training (Random Forest). Boosting: sequential training focusing on errors (XGBoost)." },
        { q: "What is the curse of dimensionality?", a: "As features increase, data becomes sparse and distances become less meaningful. Solution: dimensionality reduction." }
    ],
    devops: [
        { q: "What is CI/CD?", a: "Continuous Integration: merge code frequently with tests. Continuous Deployment: auto deploy after CI passes." },
        { q: "Explain Docker and containers", a: "Docker packages apps with dependencies into lightweight, isolated containers sharing host OS kernel." },
        { q: "What is Kubernetes?", a: "Open-source container orchestration for automating deployment, scaling, management of containerized apps." },
        { q: "What is Infrastructure as Code?", a: "Managing infrastructure through code (Terraform, CloudFormation) for version-controlled, reproducible environments." },
        { q: "Explain the difference between VMs and containers", a: "VMs include OS, heavier. Containers share kernel, lighter, faster start, more portable." },
        { q: "What is Docker Compose?", a: "Tool for defining multi-container apps using YAML. Single command to run complex applications." },
        { q: "What is a Docker image?", a: "Read-only template with instructions to create container. Created from Dockerfile." },
        { q: "Explain GitOps", a: "Using Git as single source of truth for infrastructure with pull request workflow." },
        { q: "What is monitoring and observability?", a: "Monitoring collects metrics. Observability understands behavior through logs, traces, metrics." },
        { q: "What is microservice architecture?", a: "Building apps as small, independent services communicating via APIs." },
        { q: "Explain load balancing", a: "Distributing traffic across servers to prevent overload. Types: round-robin, least connections." },
        { q: "What is container orchestration?", a: "Automating management: deployment, scaling, networking of containers. Kubernetes is popular." },
        { q: "What is a CI/CD pipeline?", a: "Automated process: build, test, package, deploy. Each stage validates code before production." },
        { q: "Explain blue-green deployment", a: "Two identical environments. Deploy to new, test, then switch traffic. Instant rollback possible." },
        { q: "What is Terraform?", a: "IaC tool defining cloud resources in config files with plan/apply execution." }
    ],
    mobile: [
        { q: "What is React Native vs Flutter?", a: "React Native: JavaScript, native components. Flutter: Dart, custom widgets. Different performance and ecosystem." },
        { q: "Explain Android Activity lifecycle", a: "onCreate → onStart → onResume → onPause → onStop → onDestroy. Optional onRestart when returning." },
        { q: "What is state management in React Native?", a: "Managing app state: useState (local), Context API (global), Redux (complex)." },
        { q: "What is Flutter widget tree?", a: "Hierarchical structure of all UI elements. Widgets are immutable descriptions composed into complex widgets." },
        { q: "Explain iOS ViewController lifecycle", a: "viewDidLoad → viewWillAppear → viewDidAppear → viewWillDisappear → viewDidDisappear." },
        { q: "Difference between iOS and Android development?", a: "iOS: Swift/Xcode. Android: Kotlin/Android Studio. Different guidelines and release processes." },
        { q: "What is REST API in mobile?", a: "Client-server communication over HTTP using GET, POST, PUT, DELETE returning JSON." },
        { q: "Explain push notifications", a: "Server-initiated messages to devices via APNs (iOS) or FCM (Android)." },
        { q: "What is local storage in mobile?", a: "On-device storage: SharedPreferences (key-value), SQLite (relational), files." },
        { q: "Hot reload vs cold restart?", a: "Hot reload: injects code without losing state. Cold restart: restarts app, loses state." },
        { q: "Explain background processing", a: "iOS: background fetch. Android: WorkManager, JobScheduler for tasks when app not in foreground." },
        { q: "What is navigation in React Native?", a: "React Navigation: Stack (hierarchical), Tab (bottom), Drawer (side) navigation." },
        { q: "What are platform channels?", a: "Calling native code from cross-platform code using MethodChannel." },
        { q: "App performance optimization", a: "Reduce render cycles, use FlatList, lazy load images, memoization, optimize bundle." },
        { q: "App security best practices", a: "HTTPS, validate inputs, secure storage, authentication, follow platform guidelines." }
    ],
    database: [
        { q: "SQL vs NoSQL difference?", a: "SQL: relational, fixed schema, ACID. NoSQL: non-relational, flexible schema, scalable." },
        { q: "Explain database normalization", a: "Organizing data to reduce redundancy: 1NF (atomic), 2NF (no partial deps), 3NF (no transitive deps)." },
        { q: "What are database indexes?", a: "Data structures speeding up retrieval. B-tree default. Trade: faster reads, slower writes." },
        { q: "What is ACID?", a: "Atomicity (all/nothing), Consistency (valid state), Isolation (independent transactions), Durability (persists)." },
        { q: "Explain SQL JOINs", a: "INNER: matching. LEFT: all left + matching. RIGHT: all right + matching. FULL: all rows." },
        { q: "What is database sharding?", a: "Horizontal partitioning across databases. Improves performance and scalability." },
        { q: "What is database replication?", a: "Copying data across servers for redundancy. Types: master-slave, multi-master." },
        { q: "Explain CAP theorem", a: "Distributed systems can guarantee only 2 of 3: Consistency, Availability, Partition tolerance." },
        { q: "What is a database transaction?", a: "Operations as single unit following ACID. COMMIT saves, ROLLBACK undoes." },
        { q: "What is ORM?", a: "Object-Relational Mapping: mapping tables to objects. Popular: Hibernate, Entity Framework, Sequelize." },
        { q: "Primary key vs foreign key", a: "Primary key: unique identifier, not null. Foreign key: references primary key in another table." },
        { q: "What is data warehousing?", a: "Large storage for historical data from multiple sources for analysis and BI." },
        { q: "What is MongoDB?", a: "Document-based NoSQL storing JSON-like documents. Use for flexible schema, rapid prototyping." },
        { q: "Explain query optimization", a: "Improve performance: analyze plan, create indexes, avoid SELECT *, optimize JOINs." },
        { q: "What are database views?", a: "Virtual tables based on query. Don't store data, present data differently." }
    ],
    systemdesign: [
        { q: "Design a URL shortener", a: "Hash function for short codes. Store mapping in database. Handle collisions, analytics, custom URLs." },
        { q: "Design a chat application", a: "WebSockets for real-time. Store messages with sender/receiver IDs. Handle delivery, read receipts." },
        { q: "Design a recommendation system", a: "Collaborative filtering (user similarity), content-based (item similarity), or hybrid." },
        { q: "Design a distributed cache", a: "Consistent hashing for distribution. Eviction policies, replication, cache invalidation." },
        { q: "Design a rate limiter", a: "Token bucket or sliding window. Store counters in Redis. Consider per-user and global limits." },
        { q: "Design a search autocomplete", a: "Trie for prefix matching. Store frequency counts. Cache popular queries." },
        { q: "Design a file storage system", a: "Chunk large files, store metadata separately. Delta sync, conflict resolution, encryption." },
        { q: "Design a notification system", a: "Message queue (Kafka) for scalability. Push via APNs/FCM. Handle batching, retry." },
        { q: "Design a news feed system", a: "Pull (compute on request) or push (fan-out). Cache popular content. Rank by relevance." },
        { q: "Design a payment system", a: "Security (PCI), idempotency, transaction integrity, multiple providers, failure handling." },
        { q: "Horizontal vs vertical scaling?", a: "Vertical: add resources to existing server. Horizontal: add more servers for scalability." },
        { q: "Load balancing algorithms", a: "Round Robin, Least Connections, IP Hash, Weighted. Choose based on traffic patterns." },
        { q: "What is a message queue?", a: "Async communication between services using brokers like RabbitMQ, Kafka, SQS." },
        { q: "Design a distributed ID generator", a: "UUID (unique but not sequential) or Snowflake (timestamp + machine + sequence)." },
        { q: "Explain CQRS pattern", a: "Command Query Responsibility Segregation separates read and write operations." }
    ],
    coding: [
        { q: "Explain Big O notation", a: "Complexity: O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n) linearithmic, O(n²) quadratic." },
        { q: "Array vs Linked List?", a: "Array: contiguous memory, O(1) random access. Linked list: scattered memory, O(n) access, dynamic size." },
        { q: "Explain binary search", a: "Divide sorted array in half each step. Compare with middle, search left or right. O(log n)." },
        { q: "What is dynamic programming?", a: "Optimization technique for overlapping subproblems. Store solutions to avoid recomputation." },
        { q: "Explain quicksort", a: "Select pivot, partition: smaller left, larger right. Recursively sort. Average O(n log n)." },
        { q: "What is a hash table?", a: "Data structure using hash function. O(1) average lookups. Handle collisions with chaining." },
        { q: "Explain BFS and DFS", a: "BFS: level by level using queue. Good for shortest path. DFS: deep first using stack. Good for paths." },
        { q: "What is a trie?", a: "Tree structure for prefix matching. Each node is a character. Used for autocomplete." },
        { q: "Two-pointer technique?", a: "Use two pointers efficiently. Patterns: opposite ends, same direction, sliding window." },
        { q: "Sliding window technique?", a: "Window sliding through data to find subarrays. Reduces nested loops. Common in subarray problems." },
        { q: "Explain recursion and base cases", a: "Function calling itself. Base case stops recursion. Prevent infinite loops." },
        { q: "Stack vs Queue?", a: "Stack: LIFO (Last In First Out). Queue: FIFO (First In First Out)." },
        { q: "Explain merge sort", a: "Divide in half recursively. Merge sorted halves. Always O(n log n), O(n) space." },
        { q: "What is a heap?", a: "Complete binary tree with heap property. Used for priority queues. O(log n) insert/extract." },
        { q: "Graph representations?", a: "Adjacency matrix: O(1) edge check, O(V²) space. Adjacency list: O(V+E) space." }
    ],
    behavioral: [
        { q: "Tell me about yourself.", a: "Start with current role, highlight relevant experience, end with career goals. Keep 1-2 minutes." },
        { q: "What is your greatest strength?", a: "Choose strength relevant to job. Provide specific example demonstrating it." },
        { q: "What is your greatest weakness?", a: "Be honest but strategic. Choose real weakness not critical to role. Explain improvement efforts." },
        { q: "Why do you want to work here?", a: "Research company. Connect your skills to their mission, values, opportunities." },
        { q: "Where do you see yourself in 5 years?", a: "Show ambition while realistic. Align with company growth and skill development." },
        { q: "Tell me about a time you failed.", a: "Use STAR. Explain situation, action, outcome, what you learned. Show accountability." },
        { q: "Describe a challenging project", a: "Focus on problem-solving approach and positive outcome. Highlight your contributions." },
        { q: "How do you handle stress?", a: "Give specific examples of strategies. Show resilience and ability to prioritize." },
        { q: "Tell me about a conflict with a coworker", a: "Focus on resolution. Show empathy and communication skills." },
        { q: "Why should we hire you?", a: "Summarize unique qualifications. Connect experience to job requirements." }
    ],
    leadership: [
        { q: "Tell me about leading a difficult project", a: "Describe challenge, leadership approach, how you motivated team, successful outcome." },
        { q: "How do you handle underperforming team members?", a: "Address promptly and privately. Set clear expectations, provide support, establish timeline." },
        { q: "Describe your feedback approach", a: "Be specific and timely. Focus on behaviors and impact. Create action plan and follow up." },
        { q: "How do you make decisions under pressure?", a: "Gather info quickly, identify constraints, evaluate options, stay calm." },
        { q: "How do you build trust with your team?", a: "Be transparent, keep commitments, acknowledge mistakes, show genuine interest in growth." }
    ],
    situational: [
        { q: "What would you do if you missed a deadline?", a: "Notify immediately with catch-up plan. Explain honestly without excuses." },
        { q: "How would you handle a difficult customer?", a: "Listen actively, empathize, take ownership, find solution satisfying them and company." },
        { q: "What if you disagreed with your manager?", a: "Schedule private meeting. Present viewpoint with data. Be open to their perspective." },
        { q: "How would you handle a difficult coworker?", a: "Focus on professional behavior. Try understanding their perspective. Set clear boundaries." },
        { q: "What would you do if you noticed unethical behavior?", a: "Report through appropriate channels. Document observations objectively." }
    ]
};

// ============ QUESTION FUNCTIONS ============
function loadCategory(category) {
    currentCategory = category;
    currentQuestionIndex = 0;
    document.getElementById('categories').classList.add('hidden');
    document.getElementById('question-area').classList.remove('hidden');
    
    const names = { webdev: 'Web Development', datascience: 'Data Science & ML', devops: 'DevOps & Cloud', mobile: 'Mobile Development', database: 'Database', systemdesign: 'System Design', coding: 'Coding & Algorithms', behavioral: 'Behavioral', leadership: 'Leadership', situational: 'Situational' };
    document.getElementById('category-title').textContent = names[category] || category;
    updateQuestion();
    progress.categories.add(category);
}

function updateQuestion() {
    const list = questions[currentCategory];
    document.getElementById('question-text').textContent = list[currentQuestionIndex].q;
    document.getElementById('question-counter').textContent = `Question ${currentQuestionIndex + 1} of ${list.length}`;
    document.getElementById('answer-text').classList.add('hidden');
    document.getElementById('show-answer-btn').textContent = 'Show Answer';
    document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;
    document.getElementById('next-btn').textContent = currentQuestionIndex === list.length - 1 ? 'Finish' : 'Next';
}

function toggleAnswer() {
    const box = document.getElementById('answer-text');
    const list = questions[currentCategory];
    
    if (box.classList.contains('hidden')) {
        box.querySelector('p').textContent = list[currentQuestionIndex].a;
        box.classList.remove('hidden');
        document.getElementById('show-answer-btn').textContent = 'Hide Answer';
    } else {
        box.classList.add('hidden');
        document.getElementById('show-answer-btn').textContent = 'Show Answer';
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        updateQuestion();
    }
}

function nextQuestion() {
    const list = questions[currentCategory];
    if (currentQuestionIndex < list.length - 1) {
        currentQuestionIndex++;
        updateQuestion();
    } else {
        backToCategories();
    }
}

function backToCategories() {
    document.getElementById('question-area').classList.add('hidden');
    document.getElementById('categories').classList.remove('hidden');
    currentCategory = null;
    saveUser();
}

function markAsReviewed() {
    const key = `${currentCategory}-${currentQuestionIndex}`;
    if (!reviewedQuestions.has(key)) {
        reviewedQuestions.add(key);
        progress.reviewed++;
        progress.activities.push({ type: 'question_reviewed', category: currentCategory, date: new Date().toISOString() });
        saveUser();
        updateDashboardStats();
        document.getElementById('mark-btn').textContent = '✓ Reviewed';
        setTimeout(() => document.getElementById('mark-btn').textContent = 'Mark as Reviewed', 2000);
    }
}

// ============ SIMULATOR ============
function startSimulator() {
    const checkboxes = document.querySelectorAll('.checkbox-group input:checked');
    const selected = Array.from(checkboxes).map(cb => cb.value);
    const numQuestions = parseInt(document.getElementById('num-questions').value) || 5;
    
    if (selected.length === 0) {
        alert('Please select at least one category');
        return;
    }
    
    simQuestions = [];
    for (let i = 0; i < numQuestions; i++) {
        const cat = selected[Math.floor(Math.random() * selected.length)];
        const catQuestions = questions[cat];
        simQuestions.push({ ...catQuestions[Math.floor(Math.random() * catQuestions.length)], category: cat });
    }
    
    simIndex = 0;
    seconds = 0;
    document.getElementById('simulator-active').classList.remove('hidden');
    displaySimQuestion();
    startTimer();
}

function displaySimQuestion() {
    if (simIndex >= simQuestions.length) {
        simComplete();
        return;
    }
    const names = { webdev: 'Web Dev', datascience: 'Data Science', devops: 'DevOps', mobile: 'Mobile', database: 'Database', systemdesign: 'System Design', coding: 'Coding', behavioral: 'Behavioral', leadership: 'Leadership', situational: 'Situational' };
    document.getElementById('sim-question-text').textContent = `(${names[simQuestions[simIndex].category]}) ${simQuestions[simIndex].q}`;
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        document.getElementById('timer-display').textContent = `${mins}:${secs}`;
    }, 1000);
}

function toggleTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        document.querySelector('.btn-timer').textContent = 'Resume';
    } else {
        startTimer();
        document.querySelector('.btn-timer').textContent = 'Pause';
    }
}

function revealSimAnswer() {
    alert(simQuestions[simIndex].a);
}

function simComplete() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById('simulator-active').classList.add('hidden');
    progress.simsCompleted++;
    progress.totalTime += Math.floor(seconds / 60);
    progress.activities.push({ type: 'interview_completed', categories: [...new Set(simQuestions.map(q => q.category))], date: new Date().toISOString() });
    simQuestions.forEach(q => progress.categories.add(q.category));
    saveUser();
    updateDashboardStats();
    alert('Interview complete! Time: ' + document.getElementById('timer-display').textContent);
    seconds = 0;
}

// ============ RESUME ============
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) { alert('File must be under 5MB'); return; }
        const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
        if (!['.pdf', '.doc', '.docx'].includes(ext)) { alert('Please upload PDF, DOC, or DOCX'); return; }
        selectedFile = file;
        document.getElementById('filename').textContent = file.name;
        document.getElementById('file-info').classList.remove('hidden');
        document.getElementById('analyze-btn').disabled = false;
        document.getElementById('upload-area').classList.add('hidden');
    }
}

function removeFile() {
    selectedFile = null;
    document.getElementById('resume-input').value = '';
    document.getElementById('file-info').classList.add('hidden');
    document.getElementById('analyze-btn').disabled = true;
    document.getElementById('upload-area').classList.remove('hidden');
}

function analyzeResume() {
    if (!selectedFile) return;
    const btn = document.getElementById('analyze-btn');
    btn.textContent = 'Analyzing...';
    btn.disabled = true;
    
    setTimeout(() => {
        resumeAnalysis = generateResumeAnalysis();
        displayAnalysisResults(resumeAnalysis);
        btn.textContent = 'Analyze Resume';
        btn.disabled = false;
        progress.activities.push({ type: 'resume_analyzed', date: new Date().toISOString() });
        saveUser();
    }, 1500);
}

function generateResumeAnalysis() {
    const score = Math.floor(Math.random() * 30) + 65;
    const atsScore = Math.floor(Math.random() * 25) + 65;
    const strengths = ['Clear contact info', 'Professional format', 'Relevant experience', 'Quantified achievements', 'Skills section'].sort(() => 0.5 - Math.random()).slice(0, 4);
    const improvements = ['Add summary', 'More metrics', 'Tailor keywords', 'Add certifications'].sort(() => 0.5 - Math.random()).slice(0, 3);
    const found = ['leadership', 'team', 'project', 'management'].filter(() => Math.random() > 0.3);
    const missing = ['leadership', 'team', 'project', 'management'].filter(k => !found.includes(k));
    
    return { score, strengths, improvements, atsScore, found, missing, summary: `Your resume scores ${score}%. The ${atsScore}% ATS compatibility is good. Focus on ${improvements[0].toLowerCase()} to improve.` };
}

function displayAnalysisResults(analysis) {
    document.getElementById('analysis-result').classList.remove('hidden');
    document.getElementById('overall-score').textContent = analysis.score;
    document.getElementById('strengths-list').innerHTML = analysis.strengths.map(s => `<li>${s}</li>`).join('');
    document.getElementById('improvements-list').innerHTML = analysis.improvements.map(i => `<li>${i}</li>`).join('');
    document.getElementById('ats-fill').style.width = `${analysis.atsScore}%`;
    document.getElementById('ats-percentage').textContent = `${analysis.atsScore}%`;
    document.getElementById('found-keywords').innerHTML = analysis.found.map(k => `<span class="keyword-tag found">${k}</span>`).join('');
    document.getElementById('missing-keywords').innerHTML = analysis.missing.map(k => `<span class="keyword-tag missing">${k}</span>`).join('');
    document.getElementById('summary-text').textContent = analysis.summary;
    document.getElementById('analysis-result').scrollIntoView({ behavior: 'smooth' });
}

function downloadReport() {
    if (!resumeAnalysis) return;
    const report = `RESUME ANALYSIS\n\nScore: ${resumeAnalysis.score}/100\nATS: ${resumeAnalysis.atsScore}%\n\nStrengths:\n${resumeAnalysis.strengths.map(s => '- ' + s).join('\n')}\n\nImprovements:\n${resumeAnalysis.improvements.map(i => '- ' + i).join('\n')}\n\n${resumeAnalysis.summary}`;
    const blob = new Blob([report], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Resume_Report.txt';
    a.click();
}

// ============ DASHBOARD ============
function loadDashboardData() {
    if (!isLoggedIn) return;
    updateDashboardStats();
    loadWeeklyData();
    loadMonthlyData();
    loadRecentActivity();
}

function updateDashboardStats() {
    document.getElementById('total-questions').textContent = progress.reviewed;
    document.getElementById('total-interviews').textContent = progress.simsCompleted;
    document.getElementById('total-time').textContent = formatTime(progress.totalTime);
    document.getElementById('total-categories').textContent = progress.categories.size;
}

function formatTime(mins) {
    if (mins < 60) return `${mins}m`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function loadWeeklyData() {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay() + 1);
    
    const activities = (progress.activities || []).filter(a => new Date(a.date) >= weekStart);
    const weekQ = activities.filter(a => a.type === 'question_reviewed').length;
    const weekI = activities.filter(a => a.type === 'interview_completed').length;
    
    document.getElementById('weekly-questions').textContent = weekQ;
    document.getElementById('weekly-interviews').textContent = weekI;
    
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dayData = days.map((d, i) => {
        const dayStart = new Date(weekStart);
        dayStart.setDate(weekStart.getDate() + i);
        return activities.filter(a => {
            const ad = new Date(a.date);
            return ad.getDay() === i + 1 && a.type === 'question_reviewed';
        }).length;
    });
    
    const max = Math.max(...dayData, 1);
    document.getElementById('daily-chart').innerHTML = days.map((d, i) => `
        <div class="chart-bar-container">
            <div class="chart-bar" style="height: ${(dayData[i] / max) * 100}%"><span class="bar-value">${dayData[i]}</span></div>
            <span class="bar-label">${d}</span>
        </div>
    `).join('');
    
    const cats = [...new Set(activities.map(a => a.category).filter(Boolean))];
    const catNames = { webdev: 'Web Dev', datascience: 'Data Science', devops: 'DevOps', mobile: 'Mobile', database: 'Database', systemdesign: 'System Design', coding: 'Coding' };
    document.getElementById('weekly-categories-list').innerHTML = cats.length ? cats.map(c => `<span class="category-tag">${catNames[c] || c}</span>`).join('') : '<p>No categories this week</p>';
}

function loadMonthlyData() {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    
    const activities = (progress.activities || []).filter(a => new Date(a.date) >= monthStart);
    const lastActivities = (progress.activities || []).filter(a => {
        const d = new Date(a.date);
        return d >= lastMonthStart && d < monthStart;
    });
    
    const monthQ = activities.filter(a => a.type === 'question_reviewed').length;
    const lastQ = lastActivities.filter(a => a.type === 'question_reviewed').length;
    const improvement = lastQ > 0 ? ((monthQ - lastQ) / lastQ * 100).toFixed(0) : 0;
    
    document.getElementById('monthly-questions').textContent = monthQ;
    document.getElementById('monthly-improvement').textContent = `${improvement}%`;
    
    const weeks = [0, 0, 0, 0];
    activities.forEach(a => {
        const d = new Date(a.date);
        const w = Math.min(Math.floor((d.getDate() - 1) / 7), 3);
        if (a.type === 'question_reviewed') weeks[w]++;
    });
    const maxW = Math.max(...weeks, 1);
    const weekLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    document.getElementById('monthly-comparison-chart').innerHTML = weekLabels.map((l, i) => `
        <div class="comparison-item">
            <span class="comparison-week">${l}</span>
            <div class="comparison-bar-bg"><div class="comparison-bar" style="width: ${(weeks[i] / maxW) * 100}%"></div></div>
            <span class="comparison-value">${weeks[i]}</span>
        </div>
    `).join('');
    
    const catCounts = {};
    activities.forEach(a => { if (a.category) catCounts[a.category] = (catCounts[a.category] || 0) + 1; });
    const sorted = Object.entries(catCounts).sort((a, b) => b[1] - a[1]);
    const catNames = { webdev: 'Web Dev', datascience: 'Data Science', devops: 'DevOps', mobile: 'Mobile', database: 'Database', systemdesign: 'System Design', coding: 'Coding' };
    const maxC = sorted[0]?.[1] || 1;
    document.getElementById('category-breakdown-list').innerHTML = sorted.length ? sorted.map(([c, n]) => `
        <div class="breakdown-item">
            <span class="breakdown-name">${catNames[c] || c}</span>
            <div class="breakdown-bar-bg"><div class="breakdown-bar" style="width: ${(n / maxC) * 100}%"></div></div>
            <span class="breakdown-count">${n}</span>
        </div>
    `).join('') : '<p>No data this month</p>';
}

function loadRecentActivity() {
    const activities = (progress.activities || []).slice(-5).reverse();
    const icons = { question_reviewed: '📝', interview_completed: '🎯', resume_analyzed: '📄' };
    const labels = { question_reviewed: 'Question reviewed', interview_completed: 'Interview completed', resume_analyzed: 'Resume analyzed' };
    
    document.getElementById('activity-list').innerHTML = activities.length ? activities.map(a => `
        <div class="activity-item">
            <span class="activity-icon">${icons[a.type] || '📌'}</span>
            <div class="activity-details">
                <span class="activity-type">${labels[a.type] || a.type}</span>
                <span class="activity-date">${new Date(a.date).toLocaleDateString()}</span>
            </div>
        </div>
    `).join('') : '<p class="no-data">No recent activity</p>';
}

// Save progress on page close
window.onbeforeunload = function() {
    saveUser();
};