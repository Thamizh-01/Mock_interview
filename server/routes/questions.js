const express = require('express');
const router = express.Router();

const questions = {
  // Web Development
  webdev: [
    { id: 'wd1', q: "What is the difference between HTML and HTML5?", a: "HTML5 introduces new semantic elements (header, nav, footer, article), improved form controls, audio/video support, canvas for graphics, local storage, and offline capabilities. It also includes better API support and mobile-friendly features." },
    { id: 'wd2', q: "Explain the CSS Box Model", a: "The CSS Box Model consists of: Content (actual content), Padding (space between content and border), Border (border around padding), and Margin (space outside border). Width = content + padding + border + margin." },
    { id: 'wd3', q: "What is the difference between var, let, and const?", a: "var is function-scoped and can be redeclared. let is block-scoped and can be reassigned. const is block-scoped and cannot be reassigned (for objects, the reference is constant, not the contents)." },
    { id: 'wd4', q: "What is the event loop in JavaScript?", a: "The event loop continuously checks the call stack and task queue. If the call stack is empty, it takes the first task from the queue and pushes it to the call stack, enabling asynchronous operations in JavaScript." },
    { id: 'wd5', q: "Explain closures in JavaScript", a: "A closure is a function that has access to variables from its outer (enclosing) scope even after the outer function has returned. It allows data encapsulation and creates private variables." },
    { id: 'wd6', q: "What is the difference between == and ===?", a: "== compares values after type coercion (loose equality). === compares values without type coercion (strict equality). Always prefer === for predictable comparisons." },
    { id: 'wd7', q: "What is the DOM?", a: "Document Object Model is a programming interface for web documents. It represents the page so programs can change document structure, style, and content. The DOM treats an XML/HTML document as a tree of nodes." },
    { id: 'wd8', q: "Explain CSS Flexbox", a: "Flexbox is a layout model that provides efficient way to arrange items within a container. Key properties: justify-content (horizontal), align-items (vertical), flex-direction (row/column), flex-wrap (wrapping)." },
    { id: 'wd9', q: "What is responsive web design?", a: "Responsive design makes web pages render well on all devices using fluid grids, flexible images, and media queries to adapt layout based on screen size, orientation, and resolution." },
    { id: 'wd10', q: "Explain the concept of CRUD", a: "Create (POST - create new data), Read (GET - retrieve data), Update (PUT/PATCH - modify existing data), Delete (DELETE - remove data). These are four basic operations in REST APIs." },
    { id: 'wd11', q: "What is AJAX?", a: "Asynchronous JavaScript and XML allows web pages to be updated asynchronously by exchanging data with a web server behind the scenes, without reloading the entire page." },
    { id: 'wd12', q: "What is CORS?", a: "Cross-Origin Resource Sharing is a mechanism that allows restricted resources on a web page to be requested from another domain. The server must include appropriate CORS headers." },
    { id: 'wd13', q: "Explain Webpack", a: "Webpack is a static module bundler that creates a dependency graph, bundles modules into one or more bundles, and manages assets like CSS, images, and fonts for web applications." },
    { id: 'wd14', q: "What is React and why use it?", a: "React is a JavaScript library for building user interfaces. It uses a virtual DOM for efficient updates, component-based architecture for reusability, and unidirectional data flow for predictable state management." },
    { id: 'wd15', q: "What is the difference between useEffect and useLayoutEffect?", a: "useEffect runs asynchronously after rendering. useLayoutEffect runs synchronously after DOM mutations but before browser paint - use for measurements and DOM manipulations." },
    { id: 'wd16', q: "Explain the virtual DOM", a: "Virtual DOM is a lightweight copy of the actual DOM. React uses it to minimize real DOM operations by calculating differences and updating only changed elements, improving performance." },
    { id: 'wd17', q: "What is WebSocket and how does it differ from HTTP?", a: "WebSocket provides bidirectional, full-duplex communication over a single TCP connection. Unlike HTTP's request-response model, WebSocket allows server to push data to client." },
    { id: 'wd18', q: "Explain CSS Grid and when to use it", a: "CSS Grid is a 2D layout system for rows and columns. Use when you need to create complex layouts with both dimensions, like dashboards or magazine layouts." },
    { id: 'wd19', q: "What is Progressive Web App (PWA)?", a: "PWA is a web app that uses modern web capabilities to deliver app-like experiences. Features: offline support, push notifications, home screen installation, fast loading." },
    { id: 'wd20', q: "Explain hoisting in JavaScript", a: "Hoisting moves variable and function declarations to the top of their scope. var is hoisted and initialized as undefined, let/const are hoisted but not initialized (temporal dead zone)." },
    { id: 'wd21', q: "What is the spread operator and its uses?", a: "Spread operator (...) expands iterables into individual elements. Uses: copy arrays, concatenate arrays, spread object properties, function arguments." },
    { id: 'wd22', q: "Explain async/await in JavaScript", a: "async/await provides syntactic sugar over promises. async marks function as asynchronous, await pauses execution until promise resolves. Makes async code look synchronous." },
    { id: 'wd23', q: "What is GraphQL and its advantages over REST?", a: "GraphQL is a query language for APIs. Advantages: fetch exact data needed (no overfetching/underfetching), single endpoint, strong typing, faster on mobile." },
    { id: 'wd24', q: "Explain web accessibility (a11y)", a: "Web accessibility ensures websites are usable by everyone, including people with disabilities. Includes: semantic HTML, ARIA labels, keyboard navigation, color contrast, screen reader support." },
    { id: 'wd25', q: "What are web components?", a: "Web components are reusable custom elements with encapsulated functionality. Built using Custom Elements, Shadow DOM, HTML Templates. Framework-agnostic, reusable across projects." },
    { id: 'wd26', q: "Explain the concept of state management", a: "State management tracks and manages application data that changes over time. Tools like Redux, MobX, or Context API help manage complex state across components." },
    { id: 'wd27', q: "What is server-side rendering (SSR)?", a: "SSR renders pages on the server before sending to client. Improves initial load time, SEO, and works for users with disabled JavaScript. Examples: Next.js, Nuxt.js." },
    { id: 'wd28', q: "Explain static site generation (SSG)", a: "SSG builds pages at build time, serving pre-rendered HTML. Best for content that doesn't change often. Benefits: fast loading, good SEO, cheaper hosting. Examples: Gatsby, Hugo." },
    { id: 'wd29', q: "What is the difference between cookie, localStorage, and sessionStorage?", a: "Cookies: small, sent with requests, 4KB limit. localStorage: persistent, 5MB, only client. sessionStorage: session-based, cleared on tab close. All are origin-specific." },
    { id: 'wd30', q: "Explain JavaScript prototype chain", a: "Each object has a prototype chain. When accessing property, JavaScript walks chain until found. Allows inheritance via Object.create() or constructor.prototype." }
  ],

  // Data Science & Machine Learning
  datascience: [
    { id: 'ds1', q: "What is the difference between supervised and unsupervised learning?", a: "Supervised learning uses labeled data (input-output pairs) to learn a mapping. Unsupervised learning finds patterns in unlabeled data (clustering, dimensionality reduction)." },
    { id: 'ds2', q: "Explain Linear Regression", a: "Linear regression is a supervised learning algorithm that finds the best-fit line (or hyperplane) to predict continuous target variables. It minimizes the sum of squared errors between predictions and actual values." },
    { id: 'ds3', q: "What is overfitting and how to prevent it?", a: "Overfitting occurs when a model learns training data too well including noise. Prevention: cross-validation, regularization (L1/L2), dropout, early stopping, reducing model complexity, using more data." },
    { id: 'ds4', q: "What is the bias-variance tradeoff?", a: "Bias is error from wrong assumptions. Variance is error from sensitivity to data fluctuations. High bias underfits, high variance overfits. Goal: find balance that minimizes total error." },
    { id: 'ds5', q: "Explain the Random Forest algorithm", a: "Random Forest is an ensemble method using multiple decision trees. Each tree is trained on random subsets of data and features. Final prediction is majority vote (classification) or average (regression)." },
    { id: 'ds6', q: "What is gradient descent?", a: "An optimization algorithm that iteratively moves toward the minimum of a function by taking steps proportional to the negative of the gradient. Used to find optimal parameters in machine learning." },
    { id: 'ds7', q: "What is data normalization and why is it important?", a: "Normalization scales features to a common range (0-1 or -1 to 1). Important for algorithms sensitive to feature scales (SVM, KNN, neural networks) to ensure fair contribution from all features." },
    { id: 'ds8', q: "Explain precision, recall, and F1-score", a: "Precision: % of positive predictions that are correct. Recall: % of actual positives correctly identified. F1: harmonic mean of precision and recall. Used for imbalanced datasets." },
    { id: 'ds9', q: "What is the ROC-AUC curve?", a: "ROC (Receiver Operating Characteristic) plots true positive rate vs false positive rate at different thresholds. AUC (Area Under Curve) measures classifier performance - 1.0 is perfect, 0.5 is random." },
    { id: 'ds10', q: "What is cross-validation?", a: "A technique to evaluate model generalization by splitting data into k folds, training on k-1 folds and testing on the remaining fold. Each fold serves as test set once. Common: k-fold (k=5 or 10)." },
    { id: 'ds11', q: "Explain the difference between bagging and boosting", a: "Bagging (Bootstrap Aggregating) trains multiple models in parallel on different data subsets and combines predictions (Random Forest). Boosting trains models sequentially, focusing on errors (XGBoost, AdaBoost)." },
    { id: 'ds12', q: "What is feature engineering?", a: "The process of using domain knowledge to create features that make machine learning algorithms work better. Includes: creating new features, transforming existing ones, selecting important features." },
    { id: 'ds13', q: "What is the confusion matrix?", a: "A table showing actual vs predicted classifications. Contains: True Positives, True Negatives, False Positives, False Negatives. Used to calculate various metrics like accuracy, precision, recall." },
    { id: 'ds14', q: "Explain K-Means clustering", a: "An unsupervised algorithm that partitions data into k clusters. Iteratively: assign points to nearest centroid, update centroids. Stops when cluster assignments no longer change." },
    { id: 'ds15', q: "What is the curse of dimensionality?", a: "As the number of features increases, the data becomes sparse and distances between points become less meaningful. This degrades performance of distance-based algorithms. Solution: dimensionality reduction." },
    { id: 'ds16', q: "Explain decision trees and how they make decisions", a: "Decision trees split data based on feature values to maximize information gain (entropy) or minimize impurity (Gini). Each split creates branches, continues until leaf nodes." },
    { id: 'ds17', q: "What is XGBoost and why is it popular?", a: "XGBoost is a gradient boosting framework. Popular for: speed, regularization to prevent overfitting, handling missing values, built-in cross-validation, parallel computation." },
    { id: 'ds18', q: "Explain the Naive Bayes classifier", a: "Naive Bayes applies Bayes theorem with the 'naive' assumption of feature independence. Fast, works well with high-dimensional data, good for text classification. Types: Gaussian, Multinomial, Bernoulli." },
    { id: 'ds19', q: "What is support vector machine (SVM)?", a: "SVM finds the optimal hyperplane that maximizes margin between classes. Kernels transform data to higher dimensions for linear separation. Effective for high-dimensional data." },
    { id: 'ds20', q: "Explain logistic regression", a: "Logistic regression predicts binary outcomes using logistic function. Output is probability between 0 and 1. Uses log-odds for linear relationship with features." },
    { id: 'ds21', q: "What is principal component analysis (PCA)?", a: "PCA reduces dimensionality by finding orthogonal axes (principal components) that maximize variance. First component captures most variance, subsequent components capture remaining variance." },
    { id: 'ds22', q: "Explain the backpropagation algorithm", a: "Backpropagation computes gradients of loss function with respect to weights by chain rule. Forward pass computes output, backward pass propagates error and updates weights." },
    { id: 'ds23', q: "What is transfer learning?", a: "Transfer learning applies knowledge from one task to related tasks. Use pre-trained models (like BERT, ResNet) and fine-tune for your specific problem. Reduces data needs." },
    { id: 'ds24', q: "Explain word embeddings (Word2Vec, GloVe)", a: "Word embeddings represent words as dense vectors capturing semantic meaning. Words with similar meanings have similar vectors. Trained by predicting context or co-occurrence." },
    { id: 'ds25', q: "What is a convolutional neural network (CNN)?", a: "CNN uses convolutional layers to automatically learn spatial hierarchies. Convolutional filters detect features like edges, textures. Popular for image classification, object detection." },
    { id: 'ds26', q: "Explain recurrent neural networks (RNN)", a: "RNNs process sequential data by maintaining hidden state. Each step uses previous hidden state and current input. Good for text, time series. Problems: vanishing gradients (LSTM, GRU)." },
    { id: 'ds27', q: "What is the attention mechanism?", a: "Attention allows models to focus on relevant parts of input when generating output. Computes attention weights for each input element. Foundation of transformers, improves sequence-to-sequence tasks." },
    { id: 'ds28', q: "Explain autoencoders", a: "Autoencoders learn compressed representations (encoding) by training network to reconstruct input. Used for dimensionality reduction, anomaly detection, generative models (variational autoencoders)." },
    { id: 'ds29', q: "What is model ensembling?", a: "Ensembling combines multiple models to improve performance. Methods: voting (classification), averaging (regression), stacking (use predictions as features for meta-model)." },
    { id: 'ds30', q: "Explain data leakage and how to prevent it", a: "Data leakage occurs when test data influences training. Prevention: keep test data separate, proper cross-validation, feature engineering after split, careful preprocessing." }
  ],

  // DevOps & Cloud
  devops: [
    { id: 'do1', q: "What is CI/CD?", a: "Continuous Integration: frequently merge code changes to main branch with automated tests. Continuous Deployment: automatically deploy code changes to production after CI passes." },
    { id: 'do2', q: "Explain Docker and containers", a: "Docker packages applications with their dependencies into containers - lightweight, isolated environments. Containers share OS kernel, making them more efficient than virtual machines." },
    { id: 'do3', q: "What is Kubernetes?", a: "An open-source container orchestration platform that automates deployment, scaling, and management of containerized applications. Handles load balancing, auto-scaling, and self-healing." },
    { id: 'do4', q: "What is Infrastructure as Code (IaC)?", a: "Managing infrastructure through code rather than manual processes. Tools like Terraform, CloudFormation define infrastructure in files, enabling version control and reproducible environments." },
    { id: 'do5', q: "Explain the difference between VMs and containers", a: "VMs include OS and are heavier. Containers share host OS kernel, are lighter, start faster, and are more portable. VMs provide stronger isolation." },
    { id: 'do6', q: "What is Docker Compose?", a: "A tool for defining multi-container Docker applications. Uses YAML file to configure services, networks, and volumes. Enables running complex apps with single command." },
    { id: 'do7', q: "What is a Docker image and container?", a: "Image is a read-only template with instructions to create a container. Container is a running instance of an image. Images are created from Dockerfiles." },
    { id: 'do8', q: "Explain GitOps", a: "A methodology using Git as single source of truth for infrastructure and application code. Changes to infrastructure are made via pull requests, providing audit trail and version control." },
    { id: 'do9', q: "What is monitoring and observability?", a: "Monitoring collects metrics to know system state. Observability understands system behavior through logs, traces, and metrics. Essential for debugging and performance optimization." },
    { id: 'do10', q: "What is a microservice architecture?", a: "An approach where applications are built as small, independent services that communicate via APIs. Each service can be developed, deployed, and scaled independently." },
    { id: 'do11', q: "Explain load balancing", a: "Distributing network traffic across multiple servers to ensure no single server is overwhelmed. Improves availability, reliability, and response times. Types: round-robin, least connections, IP hash." },
    { id: 'do12', q: "What is container orchestration?", a: "Automating management of containerized applications: deployment, scaling, networking, load balancing. Kubernetes is the most popular solution." },
    { id: 'do13', q: "What is a CI/CD pipeline?", a: "A sequence of automated processes that code goes through: build, test, package, deploy. Each stage validates the code, catching issues early before production deployment." },
    { id: 'do14', q: "Explain the concept of blue-green deployment", a: "Running two identical production environments - blue (current) and green (new). Deploy to green, test, then switch traffic. Enables instant rollback if issues arise." },
    { id: 'do15', q: "What is Terraform?", a: "An Infrastructure as Code tool that defines cloud and on-prem resources in configuration files. Uses providers for different platforms, state for tracking changes, plan/apply for execution." },
    { id: 'do16', q: "Explain the concept of canary deployment", a: "Deploy new version to small subset of users first. Monitor metrics, gradually increase traffic. If issues arise, rollback quickly limiting impact." },
    { id: 'do17', q: "What is a service mesh?", a: "Service mesh manages service-to-service communication. Provides: load balancing, service discovery, encryption (mTLS), observability. Examples: Istio, Linkerd, Consul Connect." },
    { id: 'do18', q: "Explain Prometheus and Grafana", a: "Prometheus collects metrics via pull model, stores time-series data. Grafana visualizes metrics with dashboards. Popular combination for monitoring." },
    { id: 'do19', q: "What is Helm in Kubernetes?", a: "Helm is a package manager for Kubernetes. Uses charts (packages) to define, share, install applications. Manages complexity, enables versioning, rollback." },
    { id: 'do20', q: "Explain the concept of configmaps and secrets", a: "ConfigMaps store configuration data, Secrets store sensitive data. Both decouple configuration from applications. Used for environment variables, config files." },
    { id: 'do21', q: "What is a Kubernetes ConfigMap and Secret?", a: "ConfigMap stores non-sensitive configuration. Secret stores sensitive data (base64 encoded). Both inject configuration into pods as environment variables or files." },
    { id: 'do22', q: "Explain Kubernetes probes", a: "Liveness probe: detects stuck containers, restarts them. Readiness probe: checks if pod can receive traffic. Startup probe: gives time to start. All improve reliability." },
    { id: 'do23', q: "What is the ELK stack?", a: "Elasticsearch (storage/search), Logstash (processing), Kibana (visualization). Open-source logging stack for centralized log management." },
    { id: 'do24', q: "Explain log aggregation", a: "Centralized log collection from all services. Benefits: search across services, debugging, audit trail, compliance. Tools: ELK, Loki, Splunk." },
    { id: 'do25', q: "What are Kubernetes custom resources (CRD)?", a: "CRDs extend Kubernetes API with custom objects. Operators use CRDs to manage complex applications. Examples: Prometheus Operator, Cert Manager." },
    { id: 'do26', q: "Explain horizontal pod autoscaling", a: "Kubernetes HPA scales pods based on metrics (CPU, memory, custom). Min/max replicas, scales up/down maintaining target metric levels." },
    { id: 'do27', q: "What is a sidecar pattern?", a: "Sidecar containers run alongside main container in same pod. Common for: logging, monitoring, proxies (Envoy). Separates concerns, reusable across applications." },
    { id: 'do28', q: "Explain StatefulSets in Kubernetes", a: "StatefulSets manage stateful applications. Provides: stable network IDs, persistent storage, ordered deployment/scaling. For databases, message queues." },
    { id: 'do29', q: "What is etcd in Kubernetes?", a: "etcd is distributed key-value store. Stores all Kubernetes cluster data: pods, services, configurations. Highly available, consistent." },
    { id: 'do30', q: "Explain service discovery", a: "Services discover each other automatically. Kubernetes provides DNS-based service discovery. Services registered with DNS names. Enables dynamic scaling." }
  ],

  // Mobile Development
  mobile: [
    { id: 'mb1', q: "What is the difference between React Native and Flutter?", a: "React Native uses JavaScript/TypeScript and renders native components. Flutter uses Dart and renders its own widgets. Flutter offers more UI control, React Native has larger ecosystem." },
    { id: 'mb2', q: "Explain the Android Activity lifecycle", a: "onCreate → onStart → onResume → running → onPause → onStop → onDestroy. Activities can also go to onRestart when returning from stopped state." },
    { id: 'mb3', q: "What is state management in React Native?", a: "Managing application state across components. Options: local useState, Context API for global state, Redux for complex state, Zustand/MobX as alternatives." },
    { id: 'mb4', q: "What is Flutter widget tree?", a: "A hierarchical structure of all UI elements in Flutter. Widgets are immutable descriptions of UI. Complex widgets are composed from simpler ones, enabling reusable components." },
    { id: 'mb5', q: "Explain iOS ViewController lifecycle", a: "viewDidLoad → viewWillAppear → viewDidAppear → viewWillDisappear → viewDidDisappear → viewDidUnload. Controls view loading, appearance, and cleanup." },
    { id: 'mb6', q: "What are the differences between iOS and Android development?", a: "iOS uses Swift/Objective-C with Xcode. Android uses Kotlin/Java with Android Studio. Different design guidelines, testing approaches, and release processes." },
    { id: 'mb7', q: "What is a REST API in mobile development?", a: "Architecture for client-server communication over HTTP. Uses methods: GET (fetch), POST (create), PUT (update), DELETE (remove). Returns JSON/XML for data exchange." },
    { id: 'mb8', q: "Explain push notifications", a: "Server-initiated messages delivered to devices. Requires device token registration, push service integration (APNs for iOS, FCM for Android), and handling in the app." },
    { id: 'mb9', q: "What is local storage in mobile apps?", a: "Storing data on device: SharedPreferences (key-value), SQLite (relational), or file storage. For larger data, consider secure storage for sensitive information." },
    { id: 'mb10', q: "What is the difference between hot reload and cold restart?", a: "Hot reload injects code changes without losing app state. Cold restart restarts the app completely, losing state. Hot reload is faster for UI development." },
    { id: 'mb11', q: "Explain background processing in mobile", a: "iOS uses background fetch, remote notifications. Android uses WorkManager, JobScheduler. Allows tasks when app is not in foreground - syncing, notifications, etc." },
    { id: 'mb12', q: "What is navigation in React Native?", a: "React Navigation is common: Stack (hierarchical), Tab (bottom navigation), Drawer (side menu). Uses navigate(), goBack() functions with screen components." },
    { id: 'mb13', q: "What are platform channels?", a: "Allow calling native code from cross-platform code. Flutter uses MethodChannel, iOS/Android implement platform-specific code for features unavailable in Dart." },
    { id: 'mb14', q: "Explain app performance optimization", a: "Optimize: reduce render cycles, use FlatList for long lists, lazy loading images, memoization, avoid inline styles, optimize bundle size." },
    { id: 'mb15', q: "What is app security best practices?", a: "Use HTTPS, validate inputs, secure local storage, implement authentication (OAuth), obfuscate code, regular security audits, follow platform guidelines." },
    { id: 'mb16', q: "Explain the difference between native and cross-platform development", a: "Native: platform-specific languages (Swift/Kotlin) for best performance. Cross-platform: shared codebase, quicker development, may have performance trade-offs. Choose based on requirements." },
    { id: 'mb17', q: "What is deep linking in mobile apps?", a: "Deep links open specific app content via URL. Types: URI schemes (custom://), App Links (verified ownership), Universal Links (iOS). Enables: sharing, marketing campaigns, password reset." },
    { id: 'mb18', q: "Explain biometric authentication in mobile", a: "Fingerprint (Touch ID) and facial recognition (Face ID) for secure authentication. Uses platform APIs (LocalAuthentication on iOS, BiometricPrompt on Android)." },
    { id: 'mb19', q: "What is app caching and why is it important?", a: "Caching stores data locally for fast access. Reduces network calls, works offline, improves UX. Types: memory, disk, network caching. Implement with appropriate eviction policies." },
    { id: 'mb20', q: "Explain memory management in mobile", a: "iOS: Auto Reference Counting. Android: garbage collection. Both need careful memory handling: release resources, avoid memory leaks, monitor memory usage." },
    { id: 'mb21', q: "What is GraphQL and its use in mobile?", a: "GraphQL lets mobile apps request exactly needed data. Single endpoint, flexible queries. Reduces over-fetching, important for mobile with limited bandwidth." },
    { id: 'mb22', q: "Explain REST vs GraphQL for mobile", a: "REST: multiple endpoints, fixed response. GraphQL: single endpoint, client specifies needed fields. GraphQL better for mobile: less data transfer, fewer requests." },
    { id: 'mb23', q: "What is offline-first mobile architecture?", a: "Design assuming limited connectivity. Local-first data storage, sync when online. Provides: immediate responsiveness, reliability, better user experience on mobile." },
    { id: 'mb24', q: "Explain testing in mobile development", a: "Types: Unit (functions), Integration (components), UI (E2E with Appium/Espresso). iOS: XCTest. Android: JUnit, Espresso. Automate with CI/CD." },
    { id: 'mb25', q: "What is Firebase and its mobile services?", a: "Google's mobile platform. Services: Auth, Firestore (database), Functions, Analytics, Crashlytics, Cloud Messaging. All work cross-platform." },
    { id: 'mb26', q: "Explain app bundle and APK", a: "Android App Bundle: publish format, optimized per device. APK: installable package. Bundle generates optimized APKs on Play Store. Both contain app code, resources, manifest." },
    { id: 'mb27', q: "What is TestFlight for iOS?", a: "Apple's beta testing platform. External testers (up to 10,000), internal testers (up to 100). Collect feedback, crash reports. Required for App Store distribution." },
    { id: 'mb28', q: "Explain app review guidelines", a: "Apple and Google review all apps. Guidelines cover: functionality, design, content, monetization. Rejections common. Must address guidelines before resubmission." },
    { id: 'mb29', q: "What is app store optimization (ASO)?", a: "Optimizing app presence in store. Keywords in title/description, screenshots, ratings. Improves visibility, downloads. Important for organic growth." },
    { id: 'mb30', q: "Explain mobile analytics", a: "Track user behavior: sessions, screens, events, crashes. Tools: Firebase Analytics, Mixpanel, Amplitude. Use data to improve user experience, retention." }
  ],

  // Database
  database: [
    { id: 'db1', q: "What is the difference between SQL and NoSQL?", a: "SQL: relational, structured data, fixed schema, ACID compliant, use JOINs. NoSQL: non-relational, flexible schema, scalable, eventual consistency. Choose based on data needs." },
    { id: 'db2', q: "Explain database normalization", a: "Organizing data to reduce redundancy: 1NF (atomic values), 2NF (no partial dependencies), 3NF (no transitive dependencies). Higher forms reduce anomalies." },
    { id: 'db3', q: "What are indexes in databases?", a: "Data structures that speed up data retrieval. Types: B-tree (default), Hash, GIN. Trade-off: faster reads, slower writes, more storage. Use for frequently queried columns." },
    { id: 'db4', q: "What is ACID in databases?", a: "Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent transactions independent), Durability (committed data persists). Ensures reliable transactions." },
    { id: 'db5', q: "Explain JOINs in SQL", a: "INNER: matching rows from both. LEFT: all from left + matching from right. RIGHT: all from right + matching from left. FULL: all rows from both. CROSS: Cartesian product." },
    { id: 'db6', q: "What is database sharding?", a: "Horizontal partitioning splits data across multiple databases/tables. Improves performance and scalability. Common strategies: by range, by hash, by directory." },
    { id: 'db7', q: "What is database replication?", a: "Copying data across multiple servers for redundancy and performance. Types: master-slave (read scaling), multi-master (write scaling), synchronous vs asynchronous." },
    { id: 'db8', q: "Explain CAP theorem", a: "Distributed databases can guarantee only 2 of 3: Consistency (all nodes see same data), Availability (every request gets response), Partition tolerance (system works despite network failures)." },
    { id: 'db9', q: "What is a transaction in databases?", a: "A sequence of operations treated as single unit. Must follow ACID properties. Use COMMIT to save, ROLLBACK to undo. Example: transferring money between accounts." },
    { id: 'db10', q: "What is Object-Relational Mapping (ORM)?", a: "Technique mapping database tables to programming objects. Provides abstraction: instead of SQL, use language methods. Popular: Hibernate (Java), Entity Framework (.NET), Sequelize (Node)." },
    { id: 'db11', q: "Explain primary key vs foreign key", a: "Primary key: unique identifier for each row, one per table, not null. Foreign key: column referencing primary key in another table, establishes relationships between tables." },
    { id: 'db12', q: "What is data warehousing?", a: "Large storage for historical data from multiple sources. Optimized for analysis, reporting, business intelligence. Uses ETL (Extract, Transform, Load) for data integration." },
    { id: 'db13', q: "What is MongoDB and when to use it?", a: "Document-based NoSQL database storing JSON-like documents. Use for: flexible schema, rapid prototyping, hierarchical data, real-time apps, large data volumes." },
    { id: 'db14', q: "Explain query optimization", a: "Improve query performance: analyze execution plan, create proper indexes, avoid SELECT *, use parameterized queries, optimize JOINs, denormalize when appropriate." },
    { id: 'db15', q: "What are database views?", a: "Virtual tables based on query results. Don't store data, just present data differently. Use for: simplify complex queries, restrict access to specific columns/rows, encapsulate logic." },
    { id: 'db16', q: "Explain database stored procedures", a: "Precompiled SQL code stored in database. Execute with single call. Benefits: reduced network traffic, improved performance, code reuse. Trade-offs: vendor-specific, harder version control." },
    { id: 'db17', q: "What are database triggers?", a: "Automatic actions when events occur (INSERT, UPDATE, DELETE). Used for: audit trails, cascading changes, enforcing business rules. Can impact performance, use carefully." },
    { id: 'db18', q: "Explain database partitioning", a: "Splitting large tables into smaller pieces (partitions). Types: horizontal (rows), vertical (columns). Improves query performance, simplifies data management." },
    { id: 'db19', q: "What is eventual consistency?", a: "Consistency model where updates propagate gradually. All replicas eventually reflect same data. Provides high availability and partition tolerance. Used in NoSQL databases." },
    { id: 'db20', q: "Explain strong consistency", a: "Consistency model where all reads return most recent write. All replicas have identical data. Used when transactions require exact values. Trade-offs: may have higher latency." },
    { id: 'db21', q: "What is Redis and when to use it?", a: "In-memory data store. Use for: caching, session management, real-time features, leaderboards. Supports: strings, lists, sets, sorted sets, pub/sub. Very fast, data lost on restart." },
    { id: 'db22', q: "Explain database clustering", a: "Multiple database servers working together. Provides: high availability, failover, read scaling. Types: shared-nothing, shared-disk. Implement with replication and load balancing." },
    { id: 'db23', q: "What is PostgreSQL and its key features?", a: "Open-source RDBMS. Features: ACID compliance, complex queries, foreign keys, views, triggers, stored procedures. Extensible: custom types, functions. Strong JSON support. More feature-rich than MySQL." },
    { id: 'db24', q: "Explain MySQL and its use cases", a: "Open-source RDBMS, popular for web applications. Part of LAMP stack. Features: ACID (InnoDB), replication, partitioning. Simpler than PostgreSQL. Powers WordPress, Facebook, YouTube." },
    { id: 'db25', q: "What are database cursors?", a: "Database cursors iterate through query results row by row. Types: forward-only, scrollable. Use for: processing large result sets, row-level operations. Consider set-based operations first (more efficient)." },
    { id: 'db26', q: "Explain database deadlock", a: "Two+ transactions waiting for each other to release locks. Prevention: consistent lock ordering, lock timeout, deadlock detection. Resolution: one transaction rolls back." },
    { id: 'db27', q: "What is database locking?", a: "Mechanism preventing concurrent transactions from conflicting. Types: shared (read), exclusive (write). Granularity: row, page, table. Proper locking ensures data consistency." },
    { id: 'db28', q: "Explain database materialized views", a: "Physical table storing query results. Refreshed on schedule or demand. Improves query performance for complex aggregations. Trade-offs: storage, refresh overhead." },
    { id: 'db29', q: "What is database connection pooling?", a: "Maintaining pool of database connections. Reuses connections instead of creating new ones. Improves performance, reduces overhead. Configure pool size based on load." },
    { id: 'db30', q: "Explain SQL injection and prevention", a: "Attack inserting malicious SQL via user input. Prevention: parameterized queries, input validation, least privilege users, ORM frameworks. Critical for security." }
  ],

  // System Design
  systemdesign: [
    { id: 'sd1', q: "Design a URL shortener like bit.ly", a: "Use hash function (base62) for short codes. Store (short_code → original_url) in database. Handle: collision resolution, analytics tracking, custom URLs, expiration. Scale with caching and sharding." },
    { id: 'sd2', q: "Design a chat application like WhatsApp", a: "Use WebSockets for real-time. Store messages in database with sender/receiver IDs. Handle: message delivery, read receipts, media storage, encryption, online status, group chats." },
    { id: 'sd3', q: "Design a recommendation system", a: "Approaches: collaborative filtering (user similarity), content-based (item similarity), hybrid. Use vector databases for embeddings. Handle cold start with popular items and surveys." },
    { id: 'sd4', q: "Design a distributed cache", a: "Use consistent hashing for distribution. Implement: eviction policies (LRU, LFU), replication for fault tolerance, cache invalidation (TTL, write-through), monitoring and auto-scaling." },
    { id: 'sd5', q: "Design a rate limiter", a: "Implement token bucket or sliding window. Store counters in Redis. Consider: per-user limits, global limits, different limits for endpoints. Handle burst traffic gracefully." },
    { id: 'sd6', q: "Design a search autocomplete system", a: "Use Trie for prefix matching. Store frequency counts, update periodically. Cache popular queries. Consider: personalization, typo tolerance, ranking by popularity/trending." },
    { id: 'sd7', q: "Design a file storage system like Dropbox", a: "Chunk large files, store metadata separately. Use delta sync for updates. Handle: conflict resolution, encryption, versioning, access control, CDN for downloads." },
    { id: 'sd8', q: "Design a notification system", a: "Use message queue (Kafka) for scalability. Push via APNs/FCM. Store notification history. Handle: batching, retry on failure, user preferences, scheduling." },
    { id: 'sd9', q: "Design a news feed system", a: "Choice: pull model (on request, compute intensive) or push model (fan-out, real-time). Use caching for popular content. Rank by relevance, recency, engagement." },
    { id: 'sd10', q: "Design a payment system", a: "Focus on: security (PCI compliance), idempotency (prevent double charges), transaction integrity, integration with multiple providers, handling failures with rollback." },
    { id: 'sd11', q: "What is horizontal vs vertical scaling?", a: "Vertical: add more resources (CPU, RAM) to existing server. Horizontal: add more servers. Vertical has limits, horizontal provides more scalability but adds complexity." },
    { id: 'sd12', q: "Explain load balancing algorithms", a: "Round Robin (each in turn), Least Connections (fewest active), IP Hash (consistent routing), Weighted (capacity-based). Choose based on traffic patterns and server capacity." },
    { id: 'sd13', q: "What is a message queue?", a: "Async communication between services. Producers publish messages, consumers subscribe. Benefits: decoupling, reliability, load leveling. Examples: RabbitMQ, Kafka, SQS." },
    { id: 'sd14', q: "Design a distributed ID generator", a: "Options: UUID (unique but not sequential), Snowflake (timestamp + machine + sequence), database sequences. Consider: uniqueness, performance, ordering needs." },
    { id: 'sd15', q: "Explain the CQRS pattern", a: "Command Query Responsibility Segregation separates read and write operations. Commands handle state changes, queries handle reads. Improves performance, scalability, and complexity management." }
  ],

  // Coding & Algorithms
  coding: [
    { id: 'c1', q: "Explain Big O notation", a: "Describes algorithm complexity: O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n) linearithmic, O(n²) quadratic. Focus on worst-case, ignore constants." },
    { id: 'c2', q: "What is the difference between array and linked list?", a: "Array: contiguous memory, O(1) random access, fixed size. Linked list: scattered memory, O(n) access, dynamic size, pointer overhead. Choose based on access vs modification patterns." },
    { id: 'c3', q: "Explain binary search", a: "Divide sorted array in half each step. Compare target with middle, search left or right. Time: O(log n). Implementation: iterative or recursive with two pointers." },
    { id: 'c4', q: "What is dynamic programming?", a: "Optimization technique solving overlapping subproblems. Store solutions to avoid recomputation. Approaches: top-down (memoization) or bottom-up (tabulation). Example: Fibonacci, knapsack." },
    { id: 'c5', q: "Explain quicksort", a: "Select pivot, partition: smaller left, larger right. Recursively sort partitions. Average O(n log n), worst O(n²) with bad pivot. In-place, cache-efficient." },
    { id: 'c6', q: "What is a hash table?", a: "Data structure using hash function to map keys to array indices. O(1) average lookups. Handle collisions with chaining or open addressing. Used for sets, maps, caching." },
    { id: 'c7', q: "Explain BFS and DFS", a: "BFS (Breadth-First): explore level by level using queue. Good for shortest path, level-order. DFS (Depth-First): explore deep first using stack/recursion. Good for path finding, cycles." },
    { id: 'c8', q: "What is a trie?", a: "Tree structure for efficient prefix matching. Each node is a character, paths form words. Used for autocomplete, spell checking. Time: O(m) where m is word length." },
    { id: 'c9', q: "Explain the two-pointer technique", a: "Use two pointers to solve problems efficiently. Common patterns: opposite ends (sorted array), same direction (linked list cycle), sliding window." },
    { id: 'c10', q: "What is the sliding window technique?", a: "Use a window that slides through data to find subarrays satisfying conditions. Reduces nested loops. Types: fixed size, variable size. Common in subarray problems." },
    { id: 'c11', q: "Explain recursion and base cases", a: "Function calling itself to solve smaller instances. Base case stops recursion (prevents infinite loop). Must move toward base case. Use stack, consider stack overflow for deep recursion." },
    { id: 'c12', q: "What is the difference between stack and queue?", a: "Stack: LIFO (Last In First Out) - like a stack of plates. Queue: FIFO (First In First Out) - like a line. Both are linear with O(1) insert/delete at ends." },
    { id: 'c13', q: "Explain the merge sort algorithm", a: "Divide array in half recursively. Merge sorted halves by comparing elements. Always O(n log n) time, O(n) space. Stable sort, good for linked lists." },
    { id: 'c14', q: "What is a heap data structure?", a: "Complete binary tree with heap property: max-heap (parent ≥ children) or min-heap. Used for priority queues, finding kth largest/smallest. Operations: insert, extract min/max in O(log n)." },
    { id: 'c15', q: "Explain graph representations", a: "Adjacency matrix: O(1) edge check, O(V²) space. Adjacency list: O(V+E) space, O(V) edge check. Choose based on graph density and operations needed." },
    { id: 'c16', q: "Explain tree traversal algorithms", a: "Pre-order: root-left-right. In-order: left-root-right. Post-order: left-right-root. Level-order: BFS. Used for: search, insert, delete operations in trees." },
    { id: 'c17', q: "What is binary search tree (BST)?", a: "Binary tree with ordering: left < root < right. Enables O(log n) search, insert, delete (balanced). Problems: can degrade to O(n) if unbalanced. Solution: AVL, Red-Black trees." },
    { id: 'c18', q: "Explain the longest common subsequence (LCS)", a: "Finds longest subsequence common to both strings. DP approach: build table, trace back. Used for diff tools, DNA analysis. Time: O(mn), Space: O(mn)." },
    { id: 'c19', q: "What is the traveling salesman problem?", a: "Find shortest route visiting all cities. NP-hard. Approaches: brute force O(n!), dynamic programming O(n²2^n), approximation algorithms. Classic optimization problem." },
    { id: 'c20', q: "Explain coin change problem", a: "Find minimum coins for amount, or count ways. DP: dp[i] = min coins for amount i. Variant: unbounded knapsack. Classic DP problem." },
    { id: 'c21', q: "What is the 0/1 knapsack problem?", a: "Select items with weight <= capacity, maximize value. Each item used once. DP: dp[i][w] = max value using first i items. Time: O(nW), Space: O(nW)." },
    { id: 'c22', q: "Explain the subset sum problem", a: "Find subset with sum equal to target. DP approach: dp[i] stores achievable sums. NP-complete. Applications: partition, partition equal subset sum." },
    { id: 'c23', q: "What is topological sorting?", a: "Linear ordering of vertices respecting edges. Used for: task scheduling, build systems. Algorithm: Kahn's (BFS), DFS-based. Graph must be DAG (Directed Acyclic Graph)." },
    { id: 'c24', q: "Explain Dijkstra's algorithm", a: "Find shortest paths from source to all vertices. Greedy: always pick nearest unvisited. Works with non-negative edges. Time: O(V²) or O(E log V) with heap." },
    { id: 'c25', q: "What is Bellman-Ford algorithm?", a: "Find shortest paths, handles negative weights. Iterate V-1 times, relax all edges. Detect negative cycles. Time: O(VE), Space: O(V)." },
    { id: 'c26', q: "Explain Floyd-Warshall algorithm", a: "All-pairs shortest paths. DP: dp[k][i][j] = shortest path using first k vertices. Time: O(V³), Space: O(V²). Good for dense graphs." },
    { id: 'c27', q: "What is union-find (disjoint set)?", a: "Data structure tracking disjoint sets. Operations: union, find. Path compression, union by rank. Used in: Kruskal's MST, detecting cycles." },
    { id: 'c28', q: "Explain Kruskal's algorithm", a: "Minimum spanning tree. Sort edges, add smallest that doesn't form cycle (union-find). Greedy, always produces optimal MST. Time: O(E log E)." },
    { id: 'c29', q: "What is Prim's algorithm?", a: "Minimum spanning tree. Start from vertex, add smallest edge connecting to tree. Greedy, works with dense graphs. Time: O(V²) or O(E log V)." },
    { id: 'c30', q: "Explain counting sort and radix sort", a: "Counting: O(n + k), stable, for bounded integers. Radix: sort by digit position, counting sort per digit. O(d(n + k)). Linear time, stable." }
  ],

  // Behavioral
  behavioral: [
    { id: 'b1', q: "Tell me about yourself.", a: "Start with current role, highlight relevant experience, end with career goals. Keep 1-2 minutes. Focus on experiences relevant to the job. End with why this role interests you." },
    { id: 'b2', q: "What is your greatest strength?", a: "Choose strength relevant to the job. Provide specific example demonstrating it. Explain how you developed it and how it helps in your work." },
    { id: 'b3', q: "What is your greatest weakness?", a: "Be honest but strategic. Choose real weakness that won't critically impact the role. Explain how you're working to improve it. Show self-awareness and growth mindset." },
    { id: 'b4', q: "Why do you want to work here?", a: "Research the company. Connect your skills and goals to their mission, values, and opportunities. Show genuine interest and knowledge about what makes them unique." },
    { id: 'b5', q: "Where do you see yourself in 5 years?", a: "Show ambition while being realistic. Align with company growth. Express desire to develop skills, take on responsibilities, and contribute to team success." },
    { id: 'b6', q: "Tell me about a time you failed.", a: "Use STAR method. Explain situation, your action, the outcome, and what you learned. Show accountability and how you've applied the lesson since." },
    { id: 'b7', q: "Describe a challenging project you worked on.", a: "Focus on your problem-solving approach and the positive outcome. Highlight your specific contributions, challenges faced, and how you overcame them." },
    { id: 'b8', q: "How do you handle stress and pressure?", a: "Give specific examples of strategies that worked. Show resilience, composure, and ability to prioritize under pressure. Focus on positive outcomes." },
    { id: 'b9', q: "Tell me about a conflict with a coworker and how you resolved it.", a: "Focus on resolution rather than the conflict. Show empathy, communication skills, and ability to find common ground. Emphasize professional approach." },
    { id: 'b10', q: "Why should we hire you?", a: "Summarize unique qualifications. Connect experience to job requirements. Show enthusiasm and how you align with company values and culture." }
  ],

  // Leadership
  leadership: [
    { id: 'l1', q: "Tell me about a time you led a team through a difficult project.", a: "Describe the challenge, your leadership approach, how you motivated the team, and the successful outcome. Focus on decision-making, communication, and people skills." },
    { id: 'l2', q: "How do you handle underperforming team members?", a: "Address issues promptly and privately. Set clear expectations, provide support, and establish improvement timeline. Document and follow through consistently." },
    { id: 'l3', q: "Describe your approach to giving feedback.", a: "Be specific and timely. Focus on behaviors and impact, not personality. Use examples. Create action plan. Follow up to ensure improvement." },
    { id: 'l4', q: "How do you make important decisions under pressure?", a: "Gather relevant information quickly, identify key constraints, evaluate options, make decision while staying calm. Communicate rationale clearly." },
    { id: 'l5', q: "How do you build trust with your team?", a: "Be transparent, keep commitments, acknowledge mistakes, show genuine interest in team members' growth, lead by example, and recognize achievements." }
  ],

  // Situational
  situational: [
    { id: 's1', q: "What would you do if you missed a deadline?", a: "Notify stakeholders immediately with a clear catch-up plan. Explain honestly without making excuses. Show ownership and what you'll do differently." },
    { id: 's2', q: "How would you handle a difficult customer?", a: "Listen actively, empathize, take ownership of the issue, and find a solution that satisfies them while being fair to the company." },
    { id: 's3', q: "What would you do if you disagreed with your manager?", a: "Schedule private meeting to discuss concerns professionally. Present your viewpoint with data. Be open to their perspective while being assertive." },
    { id: 's4', q: "How would you handle working with a difficult coworker?", a: "Focus on professional behavior. Try to understand their perspective. Set clear boundaries. Escalate if necessary while maintaining respect." },
    { id: 's5', q: "What would you do if you noticed unethical behavior?", a: "Report through appropriate channels (HR, ethics). Document observations objectively. Not take matters into your own hands. Protect yourself." }
  ],

  // Company Domains (Real World)
  companydomains: [
    { id: 'cd1', domain: 'google.com', company: 'Google', industry: 'Tech/Search/Cloud' },
    { id: 'cd2', domain: 'microsoft.com', company: 'Microsoft', industry: 'Tech/Software/Cloud' },
    { id: 'cd3', domain: 'amazon.com', company: 'Amazon', industry: 'E-commerce/Cloud/AI' },
    { id: 'cd4', domain: 'meta.com', company: 'Meta (Facebook)', industry: 'Social Media/VR' },
    { id: 'cd5', domain: 'apple.com', company: 'Apple', industry: 'Tech/Hardware/Software' },
    { id: 'cd6', domain: 'netflix.com', company: 'Netflix', industry: 'Streaming/Media' },
    { id: 'cd7', domain: 'tesla.com', company: 'Tesla', industry: 'EV/Energy/Auto' },
    { id: 'cd8', domain: 'adobe.com', company: 'Adobe', industry: 'Software/Creative' },
    { id: 'cd9', domain: 'salesforce.com', company: 'Salesforce', industry: 'CRM/Cloud' },
    { id: 'cd10', domain: 'oracle.com', company: 'Oracle', industry: 'Database/Cloud' },
    { id: 'cd11', domain: 'ibm.com', company: 'IBM', industry: 'Tech/Consulting/Cloud' },
    { id: 'cd12', domain: 'intel.com', company: 'Intel', industry: 'Semiconductors' },
    { id: 'cd13', domain: 'nvidia.com', company: 'NVIDIA', industry: 'Semiconductors/AI/Gaming' },
    { id: 'cd14', domain: 'cisco.com', company: 'Cisco', industry: 'Networking/Telecom' },
    { id: 'cd15', domain: 'paypal.com', company: 'PayPal', industry: 'Fintech/Payments' },
    { id: 'cd16', domain: 'shopify.com', company: 'Shopify', industry: 'E-commerce/SaaS' },
    { id: 'cd17', domain: 'spotify.com', company: 'Spotify', industry: 'Music/Streaming' },
    { id: 'cd18', domain: 'twitter.com', company: 'Twitter (X)', industry: 'Social Media' },
    { id: 'cd19', domain: 'linkedin.com', company: 'LinkedIn', industry: 'Social Media/Recruiting' },
    { id: 'cd20', domain: 'github.com', company: 'GitHub', industry: 'Dev Tools/Cloud' },
    { id: 'cd21', domain: 'gitlab.com', company: 'GitLab', industry: 'Dev Tools/DevOps' },
    { id: 'cd22', domain: 'atlassian.com', company: 'Atlassian', industry: 'Software/Collaboration' },
    { id: 'cd23', domain: 'slack.com', company: 'Slack', industry: 'Communication/SaaS' },
    { id: 'cd24', domain: 'zoom.us', company: 'Zoom', industry: 'Video Communication' },
    { id: 'cd25', domain: 'airbnb.com', company: 'Airbnb', industry: 'Travel/Marketplace' },
    { id: 'cd26', domain: 'uber.com', company: 'Uber', industry: 'Transportation/Tech' },
    { id: 'cd27', domain: 'lyft.com', company: 'Lyft', industry: 'Transportation' },
    { id: 'cd28', domain: 'doordash.com', company: 'DoorDash', industry: 'Food Delivery' },
    { id: 'cd29', domain: 'instacart.com', company: 'Instacart', industry: 'Grocery Delivery' },
    { id: 'cd30', domain: 'stripe.com', company: 'Stripe', industry: 'Fintech/Payments' },
    { id: 'cd31', domain: 'coinbase.com', company: 'Coinbase', industry: 'Cryptocurrency' },
    { id: 'cd32', domain: 'dropbox.com', company: 'Dropbox', industry: 'Cloud Storage' },
    { id: 'cd33', domain: 'box.com', company: 'Box', industry: 'Cloud Storage/Enterprise' },
    { id: 'cd34', domain: 'twilio.com', company: 'Twilio', industry: 'Cloud Communications' },
    { id: 'cd35', domain: 'datadog.com', company: 'Datadog', industry: 'Monitoring/Security' },
    { id: 'cd36', domain: 'snowflake.com', company: 'Snowflake', industry: 'Data Cloud' },
    { id: 'cd37', domain: 'cloudflare.com', company: 'Cloudflare', industry: 'Security/Performance' },
    { id: 'cd38', domain: 'akamai.com', company: 'Akamai', industry: 'CDN/Security' },
    { id: 'cd39', domain: 'yahoo.com', company: 'Yahoo', industry: 'Media/Search' },
    { id: 'cd40', domain: 'baidu.com', company: 'Baidu', industry: 'Search/AI (China)' },
    { id: 'cd41', domain: 'alibaba.com', company: 'Alibaba', industry: 'E-commerce/Cloud (China)' },
    { id: 'cd42', domain: 'tencent.com', company: 'Tencent', industry: 'Tech/Gaming (China)' },
    { id: 'cd43', domain: 'bytedance.com', company: 'ByteDance', industry: 'Social Media/AI' },
    { id: 'cd44', domain: 'bloomberg.com', company: 'Bloomberg', industry: 'Finance/Media' },
    { id: 'cd45', domain: 'goldmansachs.com', company: 'Goldman Sachs', industry: 'Finance/Banking' },
    { id: 'cd46', domain: '摩根大通.com', company: 'JPMorgan Chase', industry: 'Finance/Banking' },
    { id: 'cd47', domain: 'visa.com', company: 'Visa', industry: 'Fintech/Payments' },
    { id: 'cd48', domain: 'mastercard.com', company: 'Mastercard', industry: 'Fintech/Payments' },
    { id: 'cd49', domain: 'americanexpress.com', company: 'American Express', industry: 'Finance/Credit' },
    { id: 'cd50', domain: 'capitalone.com', company: 'Capital One', industry: 'Finance/Banking' },
    { id: 'cd51', domain: 'chase.com', company: 'Chase', industry: 'Finance/Banking' },
    { id: 'cd52', domain: 'wellsfargo.com', company: 'Wells Fargo', industry: 'Finance/Banking' },
    { id: 'cd53', domain: 'disney.com', company: 'Disney', industry: 'Entertainment/Media' },
    { id: 'cd54', domain: 'waltdisneycompany.com', company: 'Walt Disney Co', industry: 'Entertainment/Media' },
    { id: 'cd55', domain: 'warnerbros.com', company: 'Warner Bros', industry: 'Entertainment/Media' },
    { id: 'cd56', domain: 'universalstudios.com', company: 'Universal Studios', industry: 'Entertainment/Media' },
    { id: 'cd57', domain: 'paramount.com', company: 'Paramount', industry: 'Entertainment/Media' },
    { id: 'cd58', domain: 'hulu.com', company: 'Hulu', industry: 'Streaming' },
    { id: 'cd59', domain: 'disneyplus.com', company: 'Disney+', industry: 'Streaming' },
    { id: 'cd60', domain: 'hbomax.com', company: 'HBO Max', industry: 'Streaming' },
    { id: 'cd61', domain: 'primevideo.com', company: 'Prime Video', industry: 'Streaming' },
    { id: 'cd62', domain: 'youtube.com', company: 'YouTube', industry: 'Video/Streaming' },
    { id: 'cd63', domain: 'twitch.tv', company: 'Twitch', industry: 'Gaming/Streaming' },
    { id: 'cd64', domain: 'discord.com', company: 'Discord', industry: 'Communication/Gaming' },
    { id: 'cd65', domain: 'reddit.com', company: 'Reddit', industry: 'Social Media/Community' },
    { id: 'cd66', domain: 'tiktok.com', company: 'TikTok', industry: 'Social Media/Video' },
    { id: 'cd67', domain: 'snapchat.com', company: 'Snapchat', industry: 'Social Media' },
    { id: 'cd68', domain: 'instagram.com', company: 'Instagram', industry: 'Social Media' },
    { id: 'cd69', domain: 'pinterest.com', company: 'Pinterest', industry: 'Social Media/Discovery' },
    { id: 'cd70', domain: 'whatsapp.com', company: 'WhatsApp', industry: 'Communication/Messaging' },
    { id: 'cd71', domain: 'telegram.org', company: 'Telegram', industry: 'Communication/Messaging' },
    { id: 'cd72', domain: 'weixin.qq.com', company: 'WeChat', industry: 'Communication/Super App (China)' },
    { id: 'cd73', domain: 'line.me', company: 'LINE', industry: 'Communication (Japan)' },
    { id: 'cd74', domain: 'slack.com', company: 'Slack', industry: 'Communication/Enterprise' },
    { id: 'cd75', domain: 'notion.so', company: 'Notion', industry: 'Productivity/SaaS' },
    { id: 'cd76', domain: 'figma.com', company: 'Figma', industry: 'Design/Tools' },
    { id: 'cd77', domain: 'canva.com', company: 'Canva', industry: 'Design/SaaS' },
    { id: 'cd78', domain: 'adobe.com', company: 'Adobe', industry: 'Software/Creative' },
    { id: 'cd79', domain: 'autodesk.com', company: 'Autodesk', industry: 'Software/Engineering' },
    { id: 'cd80', domain: 'unity.com', company: 'Unity', industry: 'Game Engine/Development' },
    { id: 'cd81', domain: 'unrealengine.com', company: 'Unreal Engine', industry: 'Game Engine/Development' },
    { id: 'cd82', domain: 'epicgames.com', company: 'Epic Games', industry: 'Gaming' },
    { id: 'cd83', domain: 'blizzard.com', company: 'Blizzard Entertainment', industry: 'Gaming' },
    { id: 'cd84', domain: 'riotgames.com', company: 'Riot Games', industry: 'Gaming' },
    { id: 'cd85', domain: 'ea.com', company: 'Electronic Arts (EA)', industry: 'Gaming' },
    { id: 'cd86', domain: 'activision.com', company: 'Activision', industry: 'Gaming' },
    { id: 'cd87', domain: 'take2games.com', company: 'Take-Two Interactive', industry: 'Gaming' },
    { id: 'cd88', domain: 'playstation.com', company: 'PlayStation', industry: 'Gaming/Hardware' },
    { id: 'cd89', domain: 'xbox.com', company: 'Xbox', industry: 'Gaming/Hardware' },
    { id: 'cd90', domain: 'nintendo.com', company: 'Nintendo', industry: 'Gaming/Hardware' },
    { id: 'cd91', domain: 'steamPowered.com', company: 'Steam', industry: 'Gaming/Platform' },
    { id: 'cd92', domain: 'epicgames.com', company: 'Epic Games Store', industry: 'Gaming/Platform' },
    { id: 'cd93', domain: 'ubisoft.com', company: 'Ubisoft', industry: 'Gaming' },
    { id: 'cd94', domain: ' Bungie.net', company: 'Bungie', industry: 'Gaming' },
    { id: 'cd95', domain: 'valvesoftware.com', company: 'Valve', industry: 'Gaming/Software' },
    { id: 'cd96', domain: 'sony.com', company: 'Sony', industry: 'Tech/Entertainment' },
    { id: 'cd97', domain: 'samsung.com', company: 'Samsung', industry: 'Tech/Hardware' },
    { id: 'cd98', domain: 'lg.com', company: 'LG', industry: 'Tech/Electronics' },
    { id: 'cd99', domain: 'sony.com', company: 'Sony', industry: 'Tech/Electronics' },
    { id: 'cd100', domain: 'panasonic.com', company: 'Panasonic', industry: 'Tech/Electronics' },
    { id: 'cd101', domain: 'siemens.com', company: 'Siemens', industry: 'Industrial/Engineering' },
    { id: 'cd102', domain: 'ge.com', company: 'General Electric', industry: 'Industrial/Manufacturing' },
    { id: 'cd103', domain: 'boeing.com', company: 'Boeing', industry: 'Aerospace/Defense' },
    { id: 'cd104', domain: 'airbus.com', company: 'Airbus', industry: 'Aerospace' },
    { id: 'cd105', domain: 'lockheedmartin.com', company: 'Lockheed Martin', industry: 'Defense/Aerospace' },
    { id: 'cd106', domain: 'raytheon.com', company: 'Raytheon', industry: 'Defense' },
    { id: 'cd107', domain: 'northropgrumman.com', company: 'Northrop Grumman', industry: 'Defense' },
    { id: 'cd108', domain: 'honeywell.com', company: 'Honeywell', industry: 'Industrial/Automation' },
    { id: 'cd109', domain: '3m.com', company: '3M', industry: 'Manufacturing/Diversified' },
    { id: 'cd110', domain: 'caterpillar.com', company: 'Caterpillar', industry: 'Industrial/Construction' },
    { id: 'cd111', domain: 'johndeere.com', company: 'John Deere', industry: 'Agriculture/Industrial' },
    { id: 'cd112', domain: 'pfizer.com', company: 'Pfizer', industry: 'Pharmaceutical' },
    { id: 'cd113', domain: 'johnson & johnson.com', company: 'Johnson & Johnson', industry: 'Pharmaceutical/Healthcare' },
    { id: 'cd114', domain: 'merck.com', company: 'Merck', industry: 'Pharmaceutical' },
    { id: 'cd115', domain: 'novartis.com', company: 'Novartis', industry: 'Pharmaceutical' },
    { id: 'cd116', domain: 'roche.com', company: 'Roche', industry: 'Pharmaceutical' },
    { id: 'cd117', domain: 'gilead.com', company: 'Gilead Sciences', industry: 'Pharmaceutical' },
    { id: 'cd118', domain: 'regeneron.com', company: 'Regeneron', industry: 'Biotechnology' },
    { id: 'cd119', domain: 'moderna.com', company: 'Moderna', industry: 'Biotechnology' },
    { id: 'cd120', domain: 'amgen.com', company: 'Amgen', industry: 'Biotechnology' },
    { id: 'cd121', domain: 'unitedhealth.com', company: 'UnitedHealth Group', industry: 'Healthcare/Insurance' },
    { id: 'cd122', domain: 'cvshealth.com', company: 'CVS Health', industry: 'Healthcare/Retail' },
    { id: 'cd123', domain: 'humana.com', company: 'Humana', industry: 'Healthcare/Insurance' },
    { id: 'cd124', domain: 'anthem.com', company: 'Anthem', industry: 'Healthcare/Insurance' },
    { id: 'cd125', domain: 'hcahealthcare.com', company: 'HCA Healthcare', industry: 'Healthcare/Hospitals' },
    { id: 'cd126', domain: 'kroger.com', company: 'Kroger', industry: 'Retail/Grocery' },
    { id: 'cd127', domain: 'walmart.com', company: 'Walmart', industry: 'Retail' },
    { id: 'cd128', domain: 'target.com', company: 'Target', industry: 'Retail' },
    { id: 'cd129', domain: 'costco.com', company: 'Costco', industry: 'Retail/Wholesale' },
    { id: 'cd130', domain: 'home depot.com', company: 'Home Depot', industry: 'Retail/Home Improvement' },
    { id: 'cd131', domain: 'lowes.com', company: "Lowe's", industry: 'Retail/Home Improvement' },
    { id: 'cd132', domain: 'bestbuy.com', company: 'Best Buy', industry: 'Retail/Electronics' },
    { id: 'cd133', domain: 'macys.com', company: "Macy's", industry: 'Retail/Department Store' },
    { id: 'cd134', domain: 'nordstrom.com', company: 'Nordstrom', industry: 'Retail/Department Store' },
    { id: 'cd135', domain: 'nike.com', company: 'Nike', industry: 'Apparel/Sports' },
    { id: 'cd136', domain: 'adidas.com', company: 'Adidas', industry: 'Apparel/Sports' },
    { id: 'cd137', domain: 'puma.com', company: 'Puma', industry: 'Apparel/Sports' },
    { id: 'cd138', domain: 'underarmour.com', company: 'Under Armour', industry: 'Apparel/Sports' },
    { id: 'cd139', domain: 'lululemon.com', company: 'Lululemon', industry: 'Apparel/Athletic' },
    { id: 'cd140', domain: 'zara.com', company: 'Zara', industry: 'Apparel/Retail' },
    { id: 'cd141', domain: 'hm.com', company: 'H&M', industry: 'Apparel/Retail' },
    { id: 'cd142', domain: 'uniqlo.com', company: 'Uniqlo', industry: 'Apparel/Retail' },
    { id: 'cd143', domain: 'cocacola.com', company: 'Coca-Cola', industry: 'Beverage' },
    { id: 'cd144', domain: 'pepsi.com', company: 'PepCo', industry: 'Beverage' },
    { id: 'cd145', domain: 'starbucks.com', company: 'Starbucks', industry: 'Food/Beverage/Restaurant' },
    { id: 'cd146', domain: 'mcdonalds.com', company: "McDonald's", industry: 'Restaurant/Fast Food' },
    { id: 'cd147', domain: 'subway.com', company: 'Subway', industry: 'Restaurant/Fast Food' },
    { id: 'cd148', domain: 'chipotle.com', company: 'Chipotle', industry: 'Restaurant/Fast Casual' },
    { id: 'cd149', domain: 'dominos.com', company: "Domino's Pizza", industry: 'Restaurant/Fast Food' },
    { id: 'cd150', domain: 'yum.com', company: 'Yum! Brands', industry: 'Restaurant (KFC, Pizza Hut, Taco Bell)' },
    // Additional Tech Companies
    { id: 'cd151', domain: 'uber.com', company: 'Uber', industry: 'Transportation/Tech' },
    { id: 'cd152', domain: 'lyft.com', company: 'Lyft', industry: 'Transportation' },
    { id: 'cd153', domain: 'airbnb.com', company: 'Airbnb', industry: 'Travel/Marketplace' },
    { id: 'cd154', domain: 'booking.com', company: 'Booking.com', industry: 'Travel/OTA' },
    { id: 'cd155', domain: 'expedia.com', company: 'Expedia', industry: 'Travel/OTA' },
    { id: 'cd156', domain: 'tripadvisor.com', company: 'TripAdvisor', industry: 'Travel/Reviews' },
    { id: 'cd157', domain: 'yelp.com', company: 'Yelp', industry: 'Reviews/Local' },
    { id: 'cd158', domain: 'zillow.com', company: 'Zillow', industry: 'Real Estate/Tech' },
    { id: 'cd159', domain: 'realtor.com', company: 'Realtor.com', industry: 'Real Estate' },
    { id: 'cd160', domain: 'redfin.com', company: 'Redfin', industry: 'Real Estate/Tech' },
    { id: 'cd161', domain: 'wayfair.com', company: 'Wayfair', industry: 'E-commerce/Home' },
    { id: 'cd162', domain: 'overstock.com', company: 'Overstock', industry: 'E-commerce' },
    { id: 'cd163', domain: 'ebay.com', company: 'eBay', industry: 'E-commerce/Marketplace' },
    { id: 'cd164', domain: 'etsy.com', company: 'Etsy', industry: 'E-commerce/Handmade' },
    { id: 'cd165', domain: 'wish.com', company: 'Wish', industry: 'E-commerce' },
    { id: 'cd166', domain: 'shein.com', company: 'Shein', industry: 'E-commerce/Fashion' },
    { id: 'cd167', domain: 'poshmark.com', company: 'Poshmark', industry: 'E-commerce/Resale' },
    { id: 'cd168', domain: 'mercadolibre.com', company: 'MercadoLibre', industry: 'E-commerce/LATAM' },
    { id: 'cd169', domain: 'flipkart.com', company: 'Flipkart', industry: 'E-commerce/India' },
    { id: 'cd170', domain: 'snapdeal.com', company: 'Snapdeal', industry: 'E-commerce/India' },
    { id: 'cd171', domain: 'rakuten.com', company: 'Rakuten', industry: 'E-commerce/Japan' },
    { id: 'cd172', domain: 'zalando.com', company: 'Zalando', industry: 'E-commerce/Fashion/EU' },
    { id: 'cd173', domain: 'asos.com', company: 'ASOS', industry: 'E-commerce/Fashion' },
    { id: 'cd174', domain: 'farfetch.com', company: 'Farfetch', industry: 'E-commerce/Luxury' },
    { id: 'cd175', domain: 'depop.com', company: 'Depop', industry: 'E-commerce/Resale' },
    // Fintech & Crypto
    { id: 'cd176', domain: 'binance.com', company: 'Binance', industry: 'Cryptocurrency Exchange' },
    { id: 'cd177', domain: 'kraken.com', company: 'Kraken', industry: 'Cryptocurrency Exchange' },
    { id: 'cd178', domain: 'crypto.com', company: 'Crypto.com', industry: 'Cryptocurrency/Fintech' },
    { id: 'cd179', domain: 'blockfi.com', company: 'BlockFi', industry: 'Cryptocurrency/Finance' },
    { id: 'cd180', domain: 'robinhood.com', company: 'Robinhood', industry: 'Fintech/Trading' },
    { id: 'cd181', domain: 'chime.com', company: 'Chime', industry: 'Fintech/Neobank' },
    { id: 'cd182', domain: 'sofi.com', company: 'SoFi', industry: 'Fintech' },
    { id: 'cd183', domain: 'affirm.com', company: 'Affirm', industry: 'Fintech/BNPL' },
    { id: 'cd184', domain: 'klarna.com', company: 'Klarna', industry: 'Fintech/BNPL' },
    { id: 'cd185', domain: 'payoneer.com', company: 'Payoneer', industry: 'Fintech/Payments' },
    { id: 'cd186', domain: 'wise.com', company: 'Wise', industry: 'Fintech/Remittance' },
    { id: 'cd187', domain: 'revolut.com', company: 'Revolut', industry: 'Fintech/Neobank' },
    { id: 'cd188', domain: 'n26.com', company: 'N26', industry: 'Fintech/Neobank' },
    // Cloud & DevOps
    { id: 'cd189', domain: 'digitalocean.com', company: 'DigitalOcean', industry: 'Cloud/IaaS' },
    { id: 'cd190', domain: 'linode.com', company: 'Linode', industry: 'Cloud/IaaS' },
    { id: 'cd191', domain: 'heroku.com', company: 'Heroku', industry: 'Cloud/PaaS' },
    { id: 'cd192', domain: 'vercel.com', company: 'Vercel', industry: 'Cloud/Deployment' },
    { id: 'cd193', domain: 'netlify.com', company: 'Netlify', industry: 'Cloud/Deployment' },
    { id: 'cd194', domain: 'cloudflare.com', company: 'Cloudflare', industry: 'Security/Performance' },
    { id: 'cd195', domain: 'fastly.com', company: 'Fastly', industry: 'CDN/Edge Computing' },
    { id: 'cd196', domain: 'mongodb.com', company: 'MongoDB', industry: 'Database/NoSQL' },
    { id: 'cd197', domain: 'redis.io', company: 'Redis', industry: 'Database/In-Memory' },
    { id: 'cd198', domain: 'postgresql.org', company: 'PostgreSQL', industry: 'Database/SQL' },
    { id: 'cd199', domain: 'mysql.com', company: 'MySQL', industry: 'Database/SQL' },
    { id: 'cd200', domain: 'grafana.com', company: 'Grafana', industry: 'Monitoring/Observability' },
    // AI & ML
    { id: 'cd201', domain: 'openai.com', company: 'OpenAI', industry: 'AI/Research' },
    { id: 'cd202', domain: 'anthropic.com', company: 'Anthropic', industry: 'AI/Research' },
    { id: 'cd203', domain: 'huggingface.co', company: 'Hugging Face', industry: 'AI/ML Platform' },
    { id: 'cd204', domain: 'deepmind.com', company: 'DeepMind', industry: 'AI/Research' },
    { id: 'cd205', domain: 'scale.com', company: 'Scale AI', industry: 'AI/Data' },
    { id: 'cd206', domain: 'databricks.com', company: 'Databricks', industry: 'AI/Data Platform' },
    { id: 'cd207', domain: 'paperspace.com', company: 'Paperspace', industry: 'AI/Cloud GPU' },
    { id: 'cd208', domain: 'wandb.ai', company: 'Weights & Biases', industry: 'AI/MLOps' },
    // Streaming & Media
    { id: 'cd209', domain: 'spotify.com', company: 'Spotify', industry: 'Music/Streaming' },
    { id: 'cd210', domain: 'apple.com/music', company: 'Apple Music', industry: 'Music/Streaming' },
    { id: 'cd211', domain: 'soundcloud.com', company: 'SoundCloud', industry: 'Music/Streaming' },
    { id: 'cd212', domain: 'pandora.com', company: 'Pandora', industry: 'Music/Streaming' },
    { id: 'cd213', domain: 'deezer.com', company: 'Deezer', industry: 'Music/Streaming' },
    { id: 'cd214', domain: 'vimeo.com', company: 'Vimeo', industry: 'Video/Streaming' },
    { id: 'cd215', domain: 'dailymotion.com', company: 'Dailymotion', industry: 'Video/Streaming' },
    // Social & Communication
    { id: 'cd216', domain: 'tiktok.com', company: 'TikTok', industry: 'Social Media/Video' },
    { id: 'cd217', domain: 'threads.net', company: 'Threads', industry: 'Social Media' },
    { id: 'cd218', domain: 'mastodon.social', company: 'Mastodon', industry: 'Social Media/Federated' },
    { id: 'cd219', domain: 'medium.com', company: 'Medium', industry: 'Content/Publishing' },
    { id: 'cd220', domain: 'substack.com', company: 'Substack', industry: 'Content/Newsletter' },
    { id: 'cd221', domain: 'quora.com', company: 'Quora', industry: 'Q&A/Social' },
    { id: 'cd222', domain: 'stackexchange.com', company: 'Stack Exchange', industry: 'Q&A/Developer' },
    // Productivity & Tools
    { id: 'cd223', domain: 'trello.com', company: 'Trello', industry: 'Productivity/Project' },
    { id: 'cd224', domain: 'asana.com', company: 'Asana', industry: 'Productivity/Project' },
    { id: 'cd225', domain: 'monday.com', company: 'Monday.com', industry: 'Productivity/Project' },
    { id: 'cd226', domain: 'airtable.com', company: 'Airtable', industry: 'Productivity/No-Code' },
    { id: 'cd227', domain: 'notion.so', company: 'Notion', industry: 'Productivity/Workspace' },
    { id: 'cd228', domain: 'slack.com', company: 'Slack', industry: 'Communication/Collaboration' },
    { id: 'cd229', domain: 'teams.microsoft.com', company: 'Microsoft Teams', industry: 'Communication' },
    { id: 'cd230', domain: 'zoom.us', company: 'Zoom', industry: 'Video Communication' },
    { id: 'cd231', domain: 'webex.com', company: 'Webex', industry: 'Video Communication' },
    // Design & Creative
    { id: 'cd232', domain: 'figma.com', company: 'Figma', industry: 'Design/UI Tool' },
    { id: 'cd233', domain: 'sketch.com', company: 'Sketch', industry: 'Design/UI Tool' },
    { id: 'cd234', domain: 'adobe.com', company: 'Adobe', industry: 'Software/Creative' },
    { id: 'cd235', domain: 'canva.com', company: 'Canva', industry: 'Design/SaaS' },
    { id: 'cd236', domain: 'invisionapp.com', company: 'InVision', industry: 'Design/Prototype' },
    { id: 'cd237', domain: 'framer.com', company: 'Framer', industry: 'Design/Prototype' },
    // HR & Recruiting
    { id: 'cd238', domain: 'linkedin.com', company: 'LinkedIn', industry: 'Recruiting/Social' },
    { id: 'cd239', domain: 'indeed.com', company: 'Indeed', industry: 'Job Board' },
    { id: 'cd240', domain: 'glassdoor.com', company: 'Glassdoor', industry: 'Job Reviews' },
    { id: 'cd241', domain: 'lever.co', company: 'Lever', industry: 'HR/Recruiting' },
    { id: 'cd242', domain: 'greenhouse.io', company: 'Greenhouse', industry: 'HR/Recruiting' },
    { id: 'cd243', domain: 'workday.com', company: 'Workday', industry: 'HR/Enterprise' },
    { id: 'cd244', domain: 'bamboohr.com', company: 'BambooHR', industry: 'HR/SaaS' },
    { id: 'cd245', domain: 'gusto.com', company: 'Gusto', industry: 'HR/Payroll' },
    // Cybersecurity
    { id: 'cd246', domain: 'crowdstrike.com', company: 'CrowdStrike', industry: 'Cybersecurity' },
    { id: 'cd247', domain: 'paloaltonetworks.com', company: 'Palo Alto Networks', industry: 'Cybersecurity' },
    { id: 'cd248', domain: 'fortinet.com', company: 'Fortinet', industry: 'Cybersecurity' },
    { id: 'cd249', domain: 'checkpoint.com', company: 'Check Point', industry: 'Cybersecurity' },
    { id: 'cd250', domain: 'sentinelone.com', company: 'SentinelOne', industry: 'Cybersecurity' },
    { id: 'cd251', domain: 'trendmicro.com', company: 'Trend Micro', industry: 'Cybersecurity' },
    { id: 'cd252', domain: 'snyk.io', company: 'Snyk', industry: 'DevSecOps' },
    { id: 'cd253', domain: 'hashicorp.com', company: 'HashiCorp', industry: 'DevOps/Tools' },
    { id: 'cd254', domain: 'datadog.com', company: 'Datadog', industry: 'Monitoring/Security' }
  ],

  // Cognitive Abilities
  cognitive: [
    { id: 'cg1', q: "How do you approach solving a complex problem with limited information?" },
    { id: 'cg2', q: "Describe a time when you had to learn a new skill quickly. How did you do it?" },
    { id: 'cg3', q: "How do you prioritize multiple tasks when everything seems urgent?" },
    { id: 'cg4', q: "What strategies do you use to stay focused during long tasks?" },
    { id: 'cg5', q: "How do you handle information overload?" },
    { id: 'cg6', q: "Describe your thought process when making important decisions." },
    { id: 'cg7', q: "How do you break down a large project into manageable parts?" },
    { id: 'cg8', q: "What memory techniques do you find most effective?" },
    { id: 'cg9', q: "How do you evaluate the credibility of information sources?" },
    { id: 'cg10', q: "Describe a situation where you had to think creatively to solve a problem." },
    { id: 'cg11', q: "How do you adapt your thinking when faced with unexpected challenges?" },
    { id: 'cg12', q: "What mental exercises do you do to keep your mind sharp?" },
    { id: 'cg13', q: "How do you analyze data to make informed decisions?" },
    { id: 'cg14', q: "Describe your approach to strategic planning." },
    { id: 'cg15', q: "How do you identify patterns in complex information?" },
    { id: 'cg16', q: "What techniques do you use to improve concentration?" },
    { id: 'cg17', q: "How do you balance analytical thinking with intuition?" },
    { id: 'cg18', q: "Describe a time when logical reasoning led you to the wrong conclusion." },
    { id: 'cg19', q: "How do you develop mental models for understanding new concepts?" },
    { id: 'cg20', q: "What role does curiosity play in your learning process?" },
    { id: 'cg21', q: "How do you handle ambiguity in decision-making?" },
    { id: 'cg22', q: "Describe your method for evaluating pros and cons." },
    { id: 'cg23', q: "How do you maintain mental clarity under pressure?" },
    { id: 'cg24', q: "What strategies help you with long-term planning?" },
    { id: 'cg25', q: "How do you verify your assumptions before acting on them?" },
    { id: 'cg26', q: "Describe how you would approach learning a completely new subject." },
    { id: 'cg27', q: "What mental habits do you avoid because they lead to poor decisions?" },
    { id: 'cg28', q: "How do you recognize and correct your own cognitive biases?" },
    { id: 'cg29', q: "What tools or frameworks do you use for systematic problem-solving?" },
    { id: 'cg30', q: "How do you measure your own cognitive performance?" }
  ],

  // Emotional Intelligence
  emotional: [
    { id: 'em1', q: "How do you recognize when you're feeling stressed?" },
    { id: 'em2', q: "What techniques do you use to manage your emotions?" },
    { id: 'em3', q: "How do you handle criticism without becoming defensive?" },
    { id: 'em4', q: "Describe a time when you successfully regulated your emotions in a difficult situation." },
    { id: 'em5', q: "How do you show empathy towards others?" },
    { id: 'em6', q: "What do you do when you feel overwhelmed by emotions?" },
    { id: 'em7', q: "How do you understand your own emotional triggers?" },
    { id: 'em8', q: "Describe how you maintain emotional balance during challenging times." },
    { id: 'em9', q: "How do you express difficult emotions constructively?" },
    { id: 'em10', q: "What practices help you develop greater self-awareness?" },
    { id: 'em11', q: "How do you handle disappointment or failure?" },
    { id: 'em12', q: "Describe your approach to building emotional resilience." },
    { id: 'em13', q: "How do you recognize emotions in others?" },
    { id: 'em14', q: "What boundaries do you set to protect your emotional well-being?" },
    { id: 'em15', q: "How do you stay optimistic during tough circumstances?" },
    { id: 'em16', q: "Describe a time when emotional intelligence helped you succeed." },
    { id: 'em17', q: "How do you process and move on from negative experiences?" },
    { id: 'em18', q: "What role does emotional intelligence play in your relationships?" },
    { id: 'em19', q: "How do you handle emotional situations at work?" },
    { id: 'em20', q: "What habits do you practice to maintain emotional health?" },
    { id: 'em21', q: "How do you motivate yourself when feeling down?" },
    { id: 'em22', q: "Describe your approach to giving emotional support to others." },
    { id: 'em23', q: "How do you balance empathy with maintaining professional boundaries?" },
    { id: 'em24', q: "What strategies help you avoid emotional burnout?" },
    { id: 'em25', q: "How do you acknowledge and accept your emotional limitations?" },
    { id: 'em26', q: "Describe how your emotional awareness has evolved over time." },
    { id: 'em27', q: "What do you do when someone's emotions affect you negatively?" },
    { id: 'em28', q: "How do you celebrate successes without becoming arrogant?" },
    { id: 'em29', q: "What practices help you maintain emotional consistency?" },
    { id: 'em30', q: "How do you develop emotional intelligence in others?" }
  ],

  // Social Skills
  social: [
    { id: 'sc1', q: "How do you initiate conversations with new people?" },
    { id: 'sc2', q: "What techniques do you use to active listening?" },
    { id: 'sc3', q: "How do you maintain long-distance friendships?" },
    { id: 'sc4', q: "Describe your approach to networking." },
    { id: 'sc5', q: "How do you handle conflicts in relationships?" },
    { id: 'sc6', q: "What do you do when you feel socially awkward?" },
    { id: 'sc7', q: "How do you build trust with new acquaintances?" },
    { id: 'sc8', q: "Describe a time when your communication skills helped resolve a misunderstanding." },
    { id: 'sc9', q: "How do you adapt your communication style for different audiences?" },
    { id: 'sc10', q: "What boundaries do you set in professional relationships?" },
    { id: 'sc11', q: "How do you handle being the center of attention?" },
    { id: 'sc12', q: "What do you do when you disagree with someone respectfully?" },
    { id: 'sc13', q: "How do you read non-verbal cues in conversations?" },
    { id: 'sc14', q: "Describe your approach to giving constructive feedback." },
    { id: 'sc15', q: "How do you maintain authenticity while being socially appropriate?" },
    { id: 'sc16', q: "What strategies help you remember names and personal details?" },
    { id: 'sc17', q: "How do you navigate group dynamics?" },
    { id: 'sc18', q: "Describe how you would approach someone you admire for mentorship." },
    { id: 'sc19', q: "How do you handle social situations that make you uncomfortable?" },
    { id: 'sc20', q: "What do you do when you realize you've offended someone?" },
    { id: 'sc21', q: "How do you balance being helpful without being overbearing?" },
    { id: 'sc22', q: "Describe your approach to building a professional reputation." },
    { id: 'sc23', q: "How do you gracefully exit a conversation?" },
    { id: 'sc24', q: "What social skills do you want to improve?" },
    { id: 'sc25', q: "How do you show appreciation to people in your life?" },
    { id: 'sc26', q: "Describe how you handle awkward silences in conversations." },
    { id: 'sc27', q: "How do you balance talking and listening in social settings?" },
    { id: 'sc28', q: "What do you do when someone asks for help you're not comfortable giving?" },
    { id: 'sc29', q: "How do you maintain connections with people you don't see often?" },
    { id: 'sc30', q: "Describe a situation where your social skills made a positive difference." }
  ],

  // Physical Health
  physical: [
    { id: 'ph1', q: "What does your typical daily exercise routine look like?" },
    { id: 'ph2', q: "How do you ensure you're getting enough sleep?" },
    { id: 'ph3', q: "Describe your approach to maintaining a healthy diet." },
    { id: 'ph4', q: "What habits do you practice to prevent illness?" },
    { id: 'ph5', q: "How do you stay motivated to exercise regularly?" },
    { id: 'ph6', q: "What do you do when you feel physically exhausted?" },
    { id: 'ph7', q: "Describe your approach to managing chronic pain or discomfort." },
    { id: 'ph8', q: "How do you incorporate physical activity into a busy schedule?" },
    { id: 'ph9', q: "What role does physical health play in your daily life?" },
    { id: 'ph10', q: "How do you monitor your physical health indicators?" },
    { id: 'ph11', q: "What preventive health measures do you take?" },
    { id: 'ph12', q: "Describe your hydration habits throughout the day." },
    { id: 'ph13', q: "How do you handle physical discomfort at work?" },
    { id: 'ph14', q: "What recovery practices do you after intense physical activity?" },
    { id: 'ph15', q: "How do you balance work and physical wellness?" },
    { id: 'ph16', q: "What physical health goals are you currently working on?" },
    { id: 'ph17', q: "Describe how you manage stress through physical means." },
    { id: 'ph18', q: "What habits have you developed to improve posture?" },
    { id: 'ph19', q: "How do you ensure you're taking enough breaks during work?" },
    { id: 'ph20', q: "What do you do to maintain energy levels throughout the day?" },
    { id: 'ph21', q: "How do you adapt your health routines while traveling?" },
    { id: 'ph22', q: "Describe your approach to seasonal health maintenance." },
    { id: 'ph23', q: "What physical activities do you enjoy for mental well-being?" },
    { id: 'ph24', q: "How do you hold yourself accountable for physical health?" },
    { id: 'ph25', q: "What health supplements or vitamins do you take?" },
    { id: 'ph26', q: "Describe your approach to ergonomics in your workspace." },
    { id: 'ph27', q: "How do you measure your physical fitness progress?" },
    { id: 'ph28', q: "What health issues are you currently addressing?" },
    { id: 'ph29', q: "How do you balance rest and activity for optimal health?" },
    { id: 'ph30', q: "What physical health resources or professionals do you consult?" }
  ],

  // Financial Literacy
  financial: [
    { id: 'fi1', q: "How do you track your monthly expenses?" },
    { id: 'fi2', q: "What is your approach to creating and following a budget?" },
    { id: 'fi3', q: "Describe your current savings strategy." },
    { id: 'fi4', q: "How do you prioritize paying off debt versus saving?" },
    { id: 'fi5', q: "What investment vehicles are you currently using?" },
    { id: 'fi6', q: "How do you plan for retirement?" },
    { id: 'fi7', q: "What steps are you taking to build an emergency fund?" },
    { id: 'fi8', q: "Describe your approach to managing risk in investments." },
    { id: 'fi9', q: "How do you evaluate financial decisions before committing?" },
    { id: 'fi10', q: "What financial goals do you have for the next 5 years?" },
    { id: 'fi11', q: "How do you handle unexpected financial emergencies?" },
    { id: 'fi12', q: "What strategies do you use to reduce unnecessary expenses?" },
    { id: 'fi13', q: "Describe your understanding of compound interest." },
    { id: 'fi14', q: "How do you diversify your income sources?" },
    { id: 'fi15', q: "What tax optimization strategies do you use?" },
    { id: 'fi16', q: "How do you decide between renting and buying property?" },
    { id: 'fi17', q: "What insurance coverages do you consider essential?" },
    { id: 'fi18', q: "Describe your approach to financial planning for major purchases." },
    { id: 'fi19', q: "How do you balance enjoying life now versus saving for the future?" },
    { id: 'fi20', q: "What financial mistakes have you learned from?" },
    { id: 'fi21', q: "How do you stay informed about financial markets?" },
    { id: 'fi22', q: "What role does financial literacy play in your career choices?" },
    { id: 'fi23', q: "Describe how you teach or plan to teach financial skills to others." },
    { id: 'fi24', q: "How do you protect yourself from financial scams?" },
    { id: 'fi25', q: "What financial habits would you like to improve?" },
    { id: 'fi26', q: "How do you calculate the true cost of major purchases?" },
    { id: 'fi27', q: "What is your approach to charitable giving and financial generosity?" },
    { id: 'fi28', q: "How do you plan for healthcare costs in retirement?" },
    { id: 'fi29', q: "Describe your strategy for building long-term wealth." },
    { id: 'fi30', q: "What financial tools or apps do you find most useful?" }
  ],

  // Software Engineering Interview Questions
  softwareeng: [
    { id: 'se1', q: "What is the difference between a class and an object in OOP?", a: "A class is a blueprint/template that defines properties and methods. An object is an instance of a class with actual values." },
    { id: 'se2', q: "Explain recursion and provide an example.", a: "Recursion is when a function calls itself. Example: Factorial calculation - n! = n * (n-1)!" },
    { id: 'se3', q: "How does garbage collection work in Java?", a: "GC automatically reclaims memory by identifying objects no longer referenced, using algorithms like mark-and-sweep, generational collection." },
    { id: 'se4', q: "What are key differences between SQL and NoSQL databases?", a: "SQL: relational, structured schema, ACID compliant. NoSQL: non-relational, flexible schema, scalable, eventual consistency." },
    { id: 'se5', q: "Describe time complexity of QuickSort and MergeSort.", a: "QuickSort: O(n log n) average, O(n²) worst. MergeSort: O(n log n) always." },
    { id: 'se6', q: "What is polymorphism in OOP?", a: "Ability to take multiple forms. Types: compile-time (overloading) and runtime (overriding/inheritance)." },
    { id: 'se7', q: "Explain MVC architectural pattern.", a: "Model (data/business logic), View (UI), Controller (handles user input, connects Model and View)." },
    { id: 'se8', q: "How do you handle exceptions?", a: "Use try-catch-finally blocks. Catch specific exceptions, handle gracefully, log errors, optionally rethrow." },
    { id: 'se9', q: "What is unit testing and how do you implement it?", a: "Testing individual units of code. Use frameworks like JUnit, Jest. Write tests before code (TDD), aim for high coverage." },
    { id: 'se10', q: "Differences between stack and heap memory.", a: "Stack: fast, LIFO, fixed size, stores primitives/references. Heap: dynamic, slower, stores objects, managed by GC." },
    { id: 'se11', q: "What is a RESTful API?", a: "Representational State Transfer. Uses HTTP methods (GET, POST, PUT, DELETE), stateless, returns JSON/XML. SOAP uses XML over HTTP." },
    { id: 'se12', q: "Explain inheritance in OOP with example.", a: "Child class inherits properties/methods from parent. Example: Dog extends Animal (inherits name, eat(), adds bark())." },
    { id: 'se13', q: "How do you optimize database queries?", a: "Use indexes, avoid SELECT *, optimize JOINs, use query execution plans, implement caching, denormalize when appropriate." },
    { id: 'se14', q: "What are design patterns? Name common ones.", a: "Reusable solutions to common problems. Examples: Singleton, Factory, Observer, Strategy, Adapter, MVC." },
    { id: 'se15', q: "Describe version control using Git.", a: "Track changes, branch for features, merge via pull requests, resolve conflicts, use commits, tags, stashing." },
    { id: 'se16', q: "Difference between synchronous and asynchronous programming?", a: "Sync: tasks run sequentially, blocking. Async: tasks run non-blocking, using callbacks/promises/async-await." },
    { id: 'se17', q: "How do you ensure thread safety?", a: "Use locks/mutexes, synchronized blocks, atomic variables, thread-safe collections, avoid shared mutable state." },
    { id: 'se18', q: "Explain SOLID principles.", a: "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion." },
    { id: 'se19', q: "What is microservices architecture?", a: "Small, independent services communicating via APIs. Benefits: scalability, flexibility, independent deployment, fault isolation." },
    { id: 'se20', q: "How do you debug complex issues?", a: "Reproduce issue, isolate variables, use debuggers, check logs, binary search, test hypotheses, pair programming." },
    { id: 'se21', q: "Differences between compiled and interpreted languages?", a: "Compiled: translate to machine code before execution (C++, Go). Interpreted: execute line by line (Python, JavaScript)." },
    { id: 'se22', q: "How would you implement a hash table?", a: "Use hash function to map keys to array indices. Handle collisions with chaining (linked lists) or open addressing." },
    { id: 'se23', q: "What is CI/CD?", a: "CI: frequently merge code with automated tests. CD: automatically deploy to production after CI passes." },
    { id: 'se24', q: "Explain encapsulation in OOP.", a: "Bundling data with methods, restricting direct access to object state via access modifiers (private, protected)." },
    { id: 'se25', q: "How do you handle memory leaks?", a: "Use profilers, check for unclosed resources, avoid circular references, nullify references, use weak references." },
    { id: 'se26', q: "What is an API gateway?", a: "Single entry point for API requests, handles routing, authentication, rate limiting, logging, protocol translation." },
    { id: 'se27', q: "Describe Big O notation.", a: "Describes algorithm complexity: O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n) linearithmic, O(n²) quadratic." },
    { id: 'se28', q: "How do you secure against SQL injection?", a: "Use parameterized queries/prepared statements, input validation, least privilege DB users, ORM frameworks." },
    { id: 'se29', q: "What are lambda expressions?", a: "Anonymous functions for concise code. Used in functional programming, callbacks, stream operations, functional interfaces." },
    { id: 'se30', q: "Differences between Agile and Waterfall?", a: "Waterfall: sequential, fixed requirements. Agile: iterative, flexible, continuous feedback, sprint-based." },
    { id: 'se31', q: "How do you approach code refactoring?", a: "Write tests first, make small changes, ensure tests pass, improve readability/structure, avoid feature changes." },
    { id: 'se32', q: "What is dependency injection?", a: "Design pattern where dependencies are provided externally. Types: constructor, setter, interface injection. Improves testability." }
  ],

  // Data Science Interview Questions
  datascienceint: [
    { id: 'dsi1', q: "Difference between supervised and unsupervised learning?", a: "Supervised: labeled data (X,y) for training. Unsupervised: unlabeled data, finds patterns (clustering, dimensionality reduction)." },
    { id: 'dsi2', q: "Explain bias-variance tradeoff.", a: "High bias: underfitting (too simple). High variance: overfitting (too complex). Optimal model balances both for minimal total error." },
    { id: 'dsi3', q: "How do you handle missing data?", a: "Methods: delete rows/columns, mean/median imputation, KNN imputation, model-based imputation. Choose based on missing pattern." },
    { id: 'dsi4', q: "Describe CRISP-DM process.", a: "Cross-Industry Standard Process for Data Mining: Business Understanding, Data Understanding, Data Preparation, Modeling, Evaluation, Deployment." },
    { id: 'dsi5', q: "What is overfitting and how to prevent?", a: "Model learns noise. Prevention: cross-validation, regularization, dropout, early stopping, simplify model, more data." },
    { id: 'dsi6', q: "Explain cross-validation.", a: "Split data into k folds. Train on k-1 folds, test on 1 fold. Repeat k times. Use average performance to evaluate." },
    { id: 'dsi7', q: "Differences between regression and classification?", a: "Regression: continuous output. Classification: discrete categorical output (binary or multi-class)." },
    { id: 'dsi8', q: "How to evaluate classification model?", a: "Accuracy, Precision, Recall, F1-Score, ROC-AUC, Confusion Matrix. Choose based on class balance." },
    { id: 'dsi9', q: "Describe PCA.", a: "Principal Component Analysis reduces dimensionality by finding orthogonal axes (principal components) maximizing variance." },
    { id: 'dsi10', q: "What is A/B testing?", a: "Statistical test comparing two versions. Randomly assign users, measure metric differences, determine statistical significance." },
    { id: 'dsi11', q: "Explain k-means clustering.", a: "Unsupervised algorithm partitioning data into k clusters. Iteratively: assign points to nearest centroid, update centroids." },
    { id: 'dsi12', q: "How to deal with imbalanced datasets?", a: "Oversampling (SMOTE), undersampling, class weights, use appropriate metrics (F1, AUC), ensemble methods." },
    { id: 'dsi13', q: "Role of feature engineering?", a: "Creating new features from raw data to improve model performance. Includes transformation, combination, selection of features." },
    { id: 'dsi14', q: "Describe gradient descent.", a: "Optimization algorithm updating parameters in opposite direction of gradient to minimize loss function. Types: batch, stochastic, mini-batch." },
    { id: 'dsi15', q: "What are neural networks?", a: "Inspired by brain neurons. Layers of nodes with weights. Forward pass computes output, backpropagation updates weights via gradient descent." },
    { id: 'dsi16', q: "How to interpret linear regression results?", a: "Coefficients show feature impact, p-values indicate significance, R² shows variance explained, residual analysis for assumptions." },
    { id: 'dsi17', q: "What is regularization? Types?", a: "Technique preventing overfitting by adding penalty. Types: L1 (Lasso), L2 (Ridge), ElasticNet (both)." },
    { id: 'dsi18', q: "Explain ensemble methods like Random Forest.", a: "Ensemble of decision trees. Each trained on random data/feature subsets. Final prediction: majority vote (classification) or average (regression)." },
    { id: 'dsi19', q: "How to visualize high-dimensional data?", a: "PCA, t-SNE, UMAP, parallel coordinates, radar charts, dimensionality reduction techniques." },
    { id: 'dsi20', q: "Difference between parametric and non-parametric models?", a: "Parametric: fixed form, learned parameters (linear regression). Non-parametric: flexible, adapts to data (decision trees, KNN)." },
    { id: 'dsi21', q: "How to build a recommendation system?", a: "Approaches: collaborative filtering (user-item similarity), content-based (item features), hybrid. Use matrix factorization, embeddings." },
    { id: 'dsi22', q: "What are time series techniques?", a: "ARIMA, SARIMA, exponential smoothing, Prophet, LSTM. Handle seasonality, trends, stationarity." },
    { id: 'dsi23', q: "How to handle outliers?", a: "Identify via box plots, z-scores. Handle: remove, cap, transform, use robust models, treat as separate category." },
    { id: 'dsi24', q: "Explain ROC curve and AUC.", a: "ROC plots TPR vs FPR at various thresholds. AUC measures area under curve - 1.0 perfect, 0.5 random. Indicates classifier performance." },
    { id: 'dsi25', q: "What is deep learning?", a: "Neural networks with many layers. Learns hierarchical features automatically. Differs from ML by automatic feature extraction." },
    { id: 'dsi26', q: "How to select features?", a: "Methods: correlation, chi-squared, mutual information, recursive feature elimination, L1 regularization, tree-based importance." },
    { id: 'dsi27', q: "Describe ETL process.", a: "Extract data from sources, Transform (clean, aggregate, convert), Load into destination (data warehouse)." },
    { id: 'dsi28', q: "What is curse of dimensionality?", a: "As dimensions increase, data becomes sparse, distances become less meaningful. Solution: dimensionality reduction." },
    { id: 'dsi29', q: "How to evaluate clustering performance?", a: "Supervised: use labels (accuracy, NMI). Unsupervised: silhouette score, elbow method, Davies-Bouldin index." },
    { id: 'dsi30', q: "Explain Bayesian inference.", a: "Uses Bayes theorem to update probabilities with evidence. Prior beliefs + data → posterior distribution. Useful for uncertainty quantification." },
    { id: 'dsi31', q: "What are decision trees?", a: "Tree structure making decisions by splitting on feature values. Split criteria: Gini impurity, entropy (information gain)." },
    { id: 'dsi32', q: "How to deploy ML model to production?", a: "Export model (pickle/ONNX), create API (Flask/FastAPI), containerize (Docker), deploy (cloud/k8s), monitor performance." }
  ],

  // Product Management Interview Questions
  productmgmt: [
    { id: 'pm1', q: "What is product lifecycle?", a: "Stages: Introduction (launch), Growth (scale), Maturity (saturate), Decline (phase out). Manage each differently." },
    { id: 'pm2', q: "Difference between product manager and project manager?", a: "PM focuses on what to build (vision, strategy). Project manager focuses on how/when to build (execution, timeline)." },
    { id: 'pm3', q: "How do you prioritize features?", a: "Use frameworks: MoSCoW, RICE, Kano. Consider: impact, effort, user value, business goals, technical constraints." },
    { id: 'pm4', q: "Describe Kano model.", a: "Model classifying features: Basic (must-have), Performance (more is better), Delighters (unexpected). Focus on delighters for differentiation." },
    { id: 'pm5', q: "What metrics for product success?", a: "DAU/MAU, retention, engagement, NPS, conversion rate, user satisfaction, revenue, feature adoption, time to value." },
    { id: 'pm6', q: "How do you conduct user research?", a: "Methods: interviews, surveys, focus groups, usability testing, analytics. Approach: define objectives, recruit users, analyze, iterate." },
    { id: 'pm7', q: "Explain A/B testing for products.", a: "Test two versions randomly. Measure key metrics. Calculate statistical significance. Roll out winner." },
    { id: 'pm8', q: "What is MVP?", a: "Minimum Viable Product - version with enough features for early adopters to provide feedback. Validates assumptions with minimal effort." },
    { id: 'pm9', q: "How to handle competing stakeholder priorities?", a: "Align to company goals, communicate trade-offs, use data, facilitate discussions, negotiate, document decisions." },
    { id: 'pm10', q: "Describe product roadmap.", a: "High-level plan showing vision, goals, timeline. Includes features, milestones, priorities. Balances short-term and long-term." },
    { id: 'pm11', q: "What is customer segmentation?", a: "Dividing customers into groups based on characteristics (demographics, behavior, needs). Enables targeted product decisions." },
    { id: 'pm12', q: "How to validate product idea?", a: "User interviews, surveys, landing pages, prototypes, concierge MVP, smoke tests. Measure interest and willingness to pay." },
    { id: 'pm13', q: "Explain product-market fit.", a: "State where product satisfies strong market demand. Indicators: growth, retention, NPS, organic growth, word-of-mouth." },
    { id: 'pm14', q: "Role of data in product decisions?", a: "Inform decisions, measure success, identify opportunities, validate hypotheses. Use analytics, experiments, user behavior data." },
    { id: 'pm15', q: "How to manage cross-functional teams?", a: "Align on goals, communicate clearly, facilitate collaboration, remove blockers, respect expertise, maintain transparency." },
    { id: 'pm16', q: "Differences between B2B and B2C products?", a: "B2B: longer sales cycle, multiple stakeholders, enterprise features, revenue. B2C: faster adoption, consumer behavior, mass marketing." },
    { id: 'pm17', q: "How to handle product failures?", a: "Analyze root cause, gather learnings, communicate transparently, pivot or iterate, focus on user needs, don't repeat mistakes." },
    { id: 'pm18', q: "What is Jobs To Be Done framework?", a: "Focus on why customers hire products. Understand jobs they want to get done, not just product features." },
    { id: 'pm19', q: "How to calculate CLV?", a: "Customer Lifetime Value = (Avg Order Value × Purchase Frequency) × Customer Lifespan. Or use predictive models." },
    { id: 'pm20', q: "Explain lean startup methodology.", a: "Build-Measure-Learn cycle. Create MVP, measure via metrics, learn from data, iterate based on findings." },
    { id: 'pm21', q: "How to gather competitor data?", a: "Use market research, analyze their products, review public data, conduct user interviews, monitor social media, use tools like SimilarWeb." },
    { id: 'pm22', q: "What is go-to-market strategy?", a: "Plan for launching product: target customers, pricing, channels, messaging, timeline, metrics. Ensures successful market entry." },
    { id: 'pm23', q: "How to balance short-term wins with long-term vision?", a: "Have clear roadmap, allocate resources between quick wins and strategic bets, communicate both to stakeholders." },
    { id: 'pm24', q: "Describe user personas.", a: "Fictional characters representing user types. Include demographics, goals, behaviors, pain points. Guide product decisions." },
    { id: 'pm25', q: "How to measure user engagement?", a: "Metrics: session duration, feature usage, return rate, DAU/MAU ratio, user actions per session, content consumption." },
    { id: 'pm26', q: "What is product vision statement?", a: "Inspiring statement describing long-term goal. Answers: what world we want to create, for whom, why it matters." },
    { id: 'pm27', q: "How to negotiate with engineering on timelines?", a: "Understand technical complexity, be flexible, prioritize features, provide context, involve them in planning, respect constraints." },
    { id: 'pm28', q: "Explain pricing strategies.", a: "Options: cost-plus, value-based, competitive, tiered, subscription, freemium. Align with user willingness and business goals." },
    { id: 'pm29', q: "How to handle scope creep?", a: "Define clear scope, prioritize ruthlessly, say no, have change control process, communicate impact, focus on MVP." },
    { id: 'pm30', q: "Role of design thinking in product management?", a: "Human-centered approach: Empathize, Define, Ideate, Prototype, Test. Ensures solutions match user needs." },
    { id: 'pm31', q: "How to track and report KPIs?", a: "Define dashboards, automate data collection, regular reviews, communicate progress, link to business goals." },
    { id: 'pm32', q: "How to launch a new feature?", a: "Plan: timeline, resources, messaging. Execute: coordinate teams, monitor metrics. Evaluate: measure adoption, gather feedback." }
  ],

  // DevOps Interview Questions
  devopsint: [
    { id: 'do1', q: "What is DevOps and why is it important?", a: "Culture combining development and operations. Improves: faster delivery, quality, collaboration, automation, continuous improvement." },
    { id: 'do2', q: "Difference between CI and CD?", a: "CI: frequently merge code changes with automated tests. CD: automatically deploy all changes to production after CI passes." },
    { id: 'do3', q: "How to set up CI/CD pipeline?", a: "Use tools (Jenkins, GitLab CI, GitHub Actions). Steps: commit code, run tests, build, deploy to staging, run more tests, deploy to prod." },
    { id: 'do4', q: "What is Infrastructure as Code? Tools?", a: "Managing infrastructure through code. Tools: Terraform, CloudFormation, Ansible, Pulumi. Enables version control, reproducibility." },
    { id: 'do5', q: "How to monitor application performance?", a: "Use tools: Prometheus (metrics), Grafana (visualization), ELK stack (logs), APM tools (New Relic, Datadog), custom dashboards." },
    { id: 'do6', q: "Describe containerization and benefits.", a: "Packaging app with dependencies. Benefits: consistency across environments, isolation, efficiency, portability, microservices support." },
    { id: 'do7', q: "What is Docker and how to use it?", a: "Platform for containerization. Commands: docker build, run, ps, logs, exec. Write Dockerfile for image definition." },
    { id: 'do8', q: "Explain Kubernetes and core components.", a: "Container orchestration. Components: Pods (smallest unit), Services (networking), Deployments (declarative updates), Ingress (HTTP routing)." },
    { id: 'do9', q: "How to handle configuration management?", a: "Use tools: Ansible, Puppet, Chef. Store configs in version control, use secrets management, maintain environment parity." },
    { id: 'do10', q: "Difference between monolithic and microservices?", a: "Monolithic: single codebase, all together. Microservices: small independent services, separate deployments, API communication." },
    { id: 'do11', q: "How to ensure security in DevOps?", a: "Shift-left security, secrets management, container scanning, SAST/DAST, vulnerability scanning, RBAC, network policies, regular audits." },
    { id: 'do12', q: "Describe blue-green deployment.", a: "Two identical environments: blue (current), green (new). Deploy to green, test, switch traffic. Instant rollback if issues." },
    { id: 'do13', q: "Benefits of version control in DevOps?", a: "Track changes, rollback capability, branch management, code review, collaboration, audit trail, CI/CD integration." },
    { id: 'do14', q: "How to troubleshoot failed deployment?", a: "Check logs, review deployment history, verify configuration, check resource limits, use health endpoints, rollback if needed." },
    { id: 'do15', q: "Role of automation in DevOps.", a: "Reduces manual work, ensures consistency, speeds up processes, enables scaling, improves reliability, frees time for innovation." },
    { id: 'do16', q: "What is serverless computing?", a: "Run code without managing servers. Examples: AWS Lambda, Azure Functions. Pay only for compute time. Good for event-driven workloads." },
    { id: 'do17', q: "How to manage logs in distributed system?", a: "Use centralized logging (ELK, Loki), structured logging, log aggregation, correlation IDs, implement log levels, retention policies." },
    { id: 'do18', q: "How to scale applications horizontally?", a: "Add more instances. Use load balancers, auto-scaling groups, stateless design, session management externally, database scaling." },
    { id: 'do19', q: "What is chaos engineering?", a: "Deliberately inject failures to test system resilience. Tools: Chaos Monkey, Gremlin. Identifies weaknesses before real incidents." },
    { id: 'do20', q: "How to implement backup and disaster recovery?", a: "Regular automated backups, test restores, multi-region replication, documented DR plan, RTO/RPO definitions, periodic drills." },
    { id: 'do21', q: "Differences between public, private, hybrid clouds?", a: "Public: third-party cloud. Private: organization's own cloud. Hybrid: mix of both with data/app portability between them." },
    { id: 'do22', q: "What is Terraform and how does it work?", a: "IaC tool. Write configuration files (.tf). Providers interact with APIs. State tracks resources. Plan/apply for execution." },
    { id: 'do23', q: "How to optimize cloud costs?", a: "Right-sizing resources, use reserved instances, auto-scaling, terminate idle resources, tag for tracking, monitor with cost dashboards." },
    { id: 'do24', q: "Importance of collaboration in DevOps.", a: "Breaks silos between dev and ops, shared responsibility, faster feedback, better solutions, continuous improvement culture." },
    { id: 'do25', q: "How to handle rollbacks?", a: "Implement blue-green, canary releases. Use versioned deployments, keep previous versions available, automated rollback triggers." },
    { id: 'do26', q: "Key principles of SRE.", a: "SLOs (Service Level Objectives), error budgets, SLIs (Indicators), post-mortems, automation, reliability vs feature velocity." },
    { id: 'do27', q: "How to automate testing in CI pipeline?", a: "Unit tests, integration tests, UI tests. Use test frameworks. Run in parallel. Generate reports. Gate deployments on pass." },
    { id: 'do28', q: "Explain immutable infrastructure.", a: "Never modify running infrastructure. Changes create new images/servers. Easier reproducibility, rollback, testing, consistency." },
    { id: 'do29', q: "Difference between proactive and reactive monitoring?", a: "Proactive: anticipate issues, prevent before occur (capacity planning, canary). Reactive: respond to alerts after failure." },
    { id: 'do30', q: "How to ensure compliance in DevOps?", a: "Policy as code, audit trails, security scanning, access controls, documentation, regular compliance checks, training." },
    { id: 'do31', q: "Use of orchestration tools in container management.", a: "Tools: Kubernetes, Docker Swarm. Automate: deployment, scaling, networking, load balancing, service discovery." },
    { id: 'do32', q: "How to measure DevOps success?", a: "Metrics: deployment frequency, lead time, MTTR (recovery), change failure rate, availability, DORA metrics." }
  ],

  // Full Stack Development
  fullstack: [
    { id: 'fs1', q: "Explain the MERN stack and its components", a: "MongoDB (database), Express.js (backend framework), React (frontend library), Node.js (runtime). Full JavaScript stack for building web applications." },
    { id: 'fs2', q: "What is the difference between monolithic and microservices architecture?", a: "Monolithic: all components in one app, simpler to develop but hard to scale. Microservices: small independent services, each running in its own process, easier to scale and maintain but complex to manage." },
    { id: 'fs3', q: "Explain REST vs GraphQL APIs", a: "REST: multiple endpoints, fixed response structure. GraphQL: single endpoint, client requests exactly needed data, reduces over-fetching, better for mobile." },
    { id: 'fs4', q: "How do you handle authentication in a full stack app?", a: "JWT (JSON Web Tokens) for stateless auth, OAuth for third-party login, sessions with cookies, implement token refresh logic, store tokens securely." },
    { id: 'fs5', q: "What is CI/CD pipeline in full stack development?", a: "Continuous Integration: automatically run tests on code changes. Continuous Deployment: automatically deploy to staging/production. Tools: GitHub Actions, Jenkins, GitLab CI." },
    { id: 'fs6', q: "Explain database transactions and rollback", a: "Transaction: group of operations treated as single unit. ACID properties ensure atomicity. Rollback: undo all operations if any fails. Use database transactions for data integrity." },
    { id: 'fs7', q: "How do you optimize database queries?", a: "Use indexes, avoid SELECT *, optimize JOINs, use query execution plans, implement caching, consider denormalization, paginate large results." },
    { id: 'fs8', q: "What is WebSocket and when to use it?", a: "WebSocket provides bidirectional communication over single TCP connection. Use for: real-time chat, live notifications, collaborative editing, gaming." },
    { id: 'fs9', q: "Explain CORS and how to handle it", a: "Cross-Origin Resource Sharing restricts requests from different origins. Handle by: server setting appropriate headers, using CORS middleware, specifying allowed origins." },
    { id: 'fs10', q: "How do you implement file upload functionality?", a: "Use multer (Node.js) or similar middleware, store files locally or cloud (S3), validate file types/size, generate unique filenames, return file URL." },
    { id: 'fs11', q: "What is server-side rendering vs client-side rendering?", a: "SSR: server renders pages, better SEO, faster initial load (Next.js, Nuxt). CSR: browser renders, better UX after load, client handles routing (React, Vue SPA)." },
    { id: 'fs12', q: "Explain API versioning strategies", a: "URL versioning (/v1/users), header versioning, query param versioning. Choose based on: team size, API stability, documentation needs." },
    { id: 'fs13', q: "How do you handle errors in a full stack app?", a: "Use try-catch blocks, implement error middleware, return consistent error responses, log errors for debugging, show user-friendly messages." },
    { id: 'fs14', q: "What is Redis and its use cases?", a: "In-memory data store. Use for: caching (reduce DB load), session storage, real-time features, pub/sub messaging, rate limiting." },
    { id: 'fs15', q: "Explain the concept of state management", a: "State management tracks application data. Options: local state (useState), context API (global state), Redux/Zustand (complex state), Apollo cache (server state)." },
    { id: 'fs16', q: "How do you implement search functionality?", a: "Database LIKE queries, Elasticsearch for full-text search, implement pagination, add filters, consider search ranking, optimize for performance." },
    { id: 'fs17', q: "What is Webpack and its role in build process?", a: "Module bundler: bundles JavaScript/CSS/images, creates dependency graph, enables code splitting, tree shaking for production optimization." },
    { id: 'fs18', q: "Explain environment variables and configuration", a: "Store sensitive data (API keys, DB credentials) separately from code. Use .env files, environment-specific configs, never commit secrets to version control." },
    { id: 'fs19', q: "How do you implement pagination?", a: "Offset-based: ?page=1&limit=10. Cursor-based: use last seen ID for better performance on large datasets. Choose based on data nature." },
    { id: 'fs20', q: "What is the difference between SQL and NoSQL databases?", a: "SQL: structured data, fixed schema, ACID compliant, use JOINs (MySQL, PostgreSQL). NoSQL: flexible schema, scalable, eventual consistency (MongoDB, Cassandra)." },
    { id: 'fs21', q: "How do you secure a web application?", a: "HTTPS everywhere, validate/sanitize inputs, use parameterized queries (prevent SQL injection), implement rate limiting, secure headers, authenticate users properly." },
    { id: 'fs22', q: "Explain lazy loading and code splitting", a: "Lazy loading: load resources on demand. Code splitting: break bundle into chunks, load only needed code. Improve initial load time and performance." },
    { id: 'fs23', q: "What is Docker and why use it in full stack?", a: "Containerization: package app with dependencies. Benefits: consistent environments, isolation, easy deployment, scalability, microservices support." },
    { id: 'fs24', q: "How do you implement caching strategies?", a: "Cache at multiple levels: browser, CDN, API response, database queries. Use Redis, implement cache invalidation, set TTL, consider write-through vs write-back." },
    { id: 'fs25', q: "Explain the concept of load balancing", a: "Distribute traffic across multiple servers. Algorithms: round robin, least connections, IP hash. Improves: availability, reliability, response time." },
    { id: 'fs26', q: "What is JWT and how does it work?", a: "JSON Web Token: compact, URL-safe token for secure info transfer. Contains: header, payload, signature. Use for stateless authentication, store in localStorage or cookies." },
    { id: 'fs27', q: "How do you handle form validation?", a: "Client-side: HTML5 validation, JavaScript libraries (Yup, Zod). Server-side: validate again, never trust client input, return clear error messages." },
    { id: 'fs28', q: "Explain microservices communication patterns", a: "Synchronous: REST, GraphQL. Asynchronous: message queues (RabbitMQ, Kafka), event-driven architecture. Choose based on coupling needs." },
    { id: 'fs29', q: "What is CDN and its benefits?", a: "Content Delivery Network: servers globally distributed. Benefits: faster content delivery, reduced server load, better UX, DDoS protection, cost savings." },
    { id: 'fs30', q: "How do you implement real-time features?", a: "WebSockets for bidirectional communication, Server-Sent Events for server-to-client, polling as fallback. Use Socket.io, Pusher, or Firebase for easier implementation." }
  ],

  // Frontend Development
  frontend: [
    { id: 'fe1', q: "What is the virtual DOM in React?", a: "Virtual DOM is a lightweight JavaScript representation of the real DOM. React uses it to minimize actual DOM operations by calculating differences (reconciliation) and updating only changed elements." },
    { id: 'fe2', q: "Explain React Hooks and their rules", a: "Hooks let use state/logic in functional components. Rules: only call at top level (not in loops/conditions), only call from React functions. Common: useState, useEffect, useContext, useRef." },
    { id: 'fe3', q: "What is the difference between useEffect and useLayoutEffect?", a: "useEffect runs asynchronously after render. useLayoutEffect runs synchronously after DOM mutations but before browser paint. Use for DOM measurements and manipulations." },
    { id: 'fe4', q: "Explain CSS-in-JS solutions", a: "Libraries: Styled Components, Emotion, styled-jsx. Benefits: scoped styles, dynamic props, better CSS management, theming support. Trade-offs: bundle size, learning curve." },
    { id: 'fe5', q: "What is responsive web design?", a: "Create layouts that adapt to all devices. Use: fluid grids (%), flexible images, media queries (@media), breakpoints. Tools: CSS Flexbox, Grid, Tailwind responsive classes." },
    { id: 'fe6', q: "Explain the box model in CSS", a: "Content (actual content), Padding (inside border), Border (around padding), Margin (outside border). Use box-sizing: border-box to include padding/border in width." },
    { id: 'fe7', q: "What is the difference between Flexbox and CSS Grid?", a: "Flexbox: one-dimensional (row OR column). Best for: navigation, toolbars, card layouts. Grid: two-dimensional (rows AND columns). Best for: page layouts, dashboards." },
    { id: 'fe8', q: "How do you optimize React performance?", a: "Use React.memo, useMemo, useCallback, implement virtualization for lists, code splitting with lazy(), avoid unnecessary re-renders, optimize bundle size." },
    { id: 'fe9', q: "Explain the component lifecycle in React", a: "Class: constructor, render, componentDidMount/Update/Unmount. Functional: useEffect with dependencies. Mount: run once. Update: run on changes. Unmount: cleanup." },
    { id: 'fe10', q: "What is JSX and how does it work?", a: "JavaScript XML: syntax extension for React. Allows writing HTML-like code in JS. Gets transpiled to JavaScript function calls (React.createElement) that create DOM elements." },
    { id: 'fe11', q: "Explain state management in React", a: "Local state: useState. Global state: Context API, Redux, Zustand, Recoil. Server state: React Query, SWR. Choose based on complexity and needs." },
    { id: 'fe12', q: "What is TypeScript and why use it with React?", a: "TypeScript adds static typing. Benefits: catch errors early, better autocomplete, self-documentation, easier refactoring. Use with React for more maintainable code." },
    { id: 'fe13', q: "How do you handle forms in React?", a: "Controlled components: state holds form values. Libraries: React Hook Form (performance), Formik (flexibility). Validate with Yup or Zod schemas." },
    { id: 'fe14', q: "Explain CSS specificity", a: "Specificity determines which styles apply. Order: inline > ID > class/attribute/pseudo-class > element. Use specific selectors sparingly, prefer classes over IDs." },
    { id: 'fe15', q: "What are React props and how do they work?", a: "Props: data passed from parent to child components. Read-only (immutable). Pass with attributes, access in child as parameters. Use for component reusability." },
    { id: 'fe16', q: "Explain the concept of lifting state up", a: "When multiple components need same state, move it to nearest common ancestor. State lives in parent, functions passed as props. Enables data flow between siblings." },
    { id: 'fe17', q: "What is Redux and how does it work?", a: "Redux: predictable state container. Core: store (single source of truth), actions (plain objects), reducers (pure functions). Dispatch actions to update state." },
    { id: 'fe18', q: "Explain CSS animations vs JavaScript animations", a: "CSS: simple, performant, GPU-accelerated, good for simple transitions. JavaScript (GSAP, Framer Motion): complex sequences, scroll-triggered, more control." },
    { id: 'fe19', q: "What is the difference between SSR and CSR?", a: "SSR (Next.js): server renders HTML, better SEO, faster initial load. CSR (React SPA): browser renders, better UX after load, requires hydration." },
    { id: 'fe20', q: "How do you implement accessibility (a11y) in React?", a: "Use semantic HTML, ARIA labels where needed, keyboard navigation, focus management, color contrast, screen reader testing. Tools: eslint-plugin-jsx-a11y." },
    { id: 'fe21', q: "Explain CSS custom properties (variables)", a: "Define with --variable-name: value. Use with var(--variable-name). Benefits: theming, consistency, easy maintenance. Can override in specific contexts." },
    { id: 'fe22', q: "What is Next.js and its key features?", a: "React framework for production. Features: SSR, SSG, API routes, file-based routing, automatic code splitting, Image optimization, TypeScript support." },
    { id: 'fe23', q: "How do you manage CSS in large projects?", a: "CSS modules, styled-components, Tailwind CSS, BEM methodology. Use preprocessors (Sass). Establish design system with tokens, components, documentation." },
    { id: 'fe24', q: "Explain lazy loading in React", a: "Use React.lazy() and Suspense. Load components only when needed. Improves initial bundle size, faster first contentful paint. Use for routes and heavy components." },
    { id: 'fe25', q: "What are React Portals and when to use them?", a: "Portals render children outside parent DOM hierarchy. Use for: modals, tooltips, overlays. Created with ReactDOM.createPortal(child, container)." },
    { id: 'fe26', q: "Explain context API in React", a: "Context: pass data through component tree without props. Create with React.createContext. Use useContext hook. Best for: theme, language, user auth state." },
    { id: 'fe27', q: "What is the difference between class and functional components?", a: "Class: uses this.state, lifecycle methods, this.props. Functional: uses hooks (useState, useEffect), simpler, more readable. Functional is now preferred." },
    { id: 'fe28', q: "How do you handle routing in React?", a: "React Router (most popular): BrowserRouter, Routes, Route, useNavigate, useParams. Other options: Next.js (file-based), Reach Router (accessible)." },
    { id: 'fe29', q: "Explain the concept of memoization in React", a: "Memoization: cache function results to avoid recomputation. useMemo: memoize values. useCallback: memoize functions. React.memo: memoize components." },
    { id: 'fe30', q: "What is Vite and why is it popular?", a: "Build tool: faster than Webpack. Uses native ES modules, hot module replacement. Quick server start, optimized production builds. Works with React, Vue, Svelte." }
  ],

  // Backend Development
  backend: [
    { id: 'be1', q: "Explain the MVC architecture", a: "Model: data and business logic. View: UI/rendering. Controller: handles requests, orchestrates Model and View. Separation of concerns, maintainable code." },
    { id: 'be2', q: "What is REST API and its constraints", a: "REST: architectural style. Constraints: client-server, stateless, cacheable, uniform interface, layered system. Use HTTP methods properly: GET, POST, PUT, DELETE." },
    { id: 'be3', q: "Explain authentication vs authorization", a: "Authentication: verify WHO user is (login, JWT, sessions). Authorization: verify WHAT user can do (roles, permissions, access control lists). Both important for security." },
    { id: 'be4', q: "What is a microservice architecture?", a: "Approach: split app into small, independent services. Each service: own database, deploy independently, communicate via APIs. Benefits: scalability, flexibility, fault isolation." },
    { id: 'be5', q: "Explain database indexing", a: "Index: data structure for quick lookups. Types: B-tree (default), hash, full-text. Trade-off: faster reads, slower writes. Use on frequently queried columns." },
    { id: 'be6', q: "What is the difference between SQL and NoSQL?", a: "SQL: relational, structured data, ACID, use JOINs. NoSQL: non-relational, flexible schema, scalable, eventual consistency. Choose based on data structure needs." },
    { id: 'be7', q: "Explain API rate limiting", a: "Control requests per user/time. Methods: token bucket, sliding window. Implement with Redis. Prevent abuse, protect resources, ensure fair usage." },
    { id: 'be8', q: "What is caching and how does it work?", a: "Cache: temporary storage for fast access. Strategies: cache-aside, write-through, write-back. Use Redis/Memcached. Reduces DB load, improves response time." },
    { id: 'be9', q: "Explain message queues in backend", a: "Async communication between services. Producers publish, consumers subscribe. Benefits: decoupling, reliability, load leveling. Tools: RabbitMQ, Kafka, SQS." },
    { id: 'be10', q: "What is database normalization?", a: "Organize data to reduce redundancy. Levels: 1NF (atomic values), 2NF (no partial dependencies), 3NF (no transitive dependencies). Higher forms = less anomalies." },
    { id: 'be11', q: "Explain the concept of sharding", a: "Horizontal partitioning: split data across databases. Strategies: range-based, hash-based, directory-based. Improves scalability, performance on large datasets." },
    { id: 'be12', q: "What is the difference between synchronous and asynchronous programming?", a: "Synchronous: tasks run one at a time, blocking. Asynchronous: multiple tasks can run concurrently, non-blocking. Use async/await, callbacks, promises in Node.js." },
    { id: 'be13', q: "Explain SQL injection and prevention", a: "Attack: malicious SQL via user input. Prevention: parameterized queries, input validation, ORM frameworks, least privilege for DB users. Critical for security." },
    { id: 'be14', q: "What is Redis and its use cases?", a: "In-memory data store. Use for: caching, session storage, real-time features, pub/sub, rate limiting. Very fast, data lost on restart (unless persisted)." },
    { id: 'be15', q: "Explain the CAP theorem", a: "Distributed systems can guarantee only 2 of 3: Consistency (all nodes see same data), Availability (every request gets response), Partition tolerance. Trade-offs needed." },
    { id: 'be16', q: "What is load balancing?", a: "Distribute traffic across servers. Algorithms: round robin, least connections, IP hash. Improves: availability, reliability, performance. Tools: Nginx, HAProxy, cloud LB." },
    { id: 'be17', q: "Explain JWT tokens", a: "JSON Web Token: compact, URL-safe token. Contains header, payload, signature. Use for stateless authentication. Store in httpOnly cookies or Authorization header." },
    { id: 'be18', q: "What is the difference between PUT and PATCH?", a: "PUT: replace entire resource. PATCH: partial update. PUT is idempotent, PATCH may not be. Choose based on update requirements." },
    { id: 'be19', q: "Explain database transactions", a: "Transaction: group of operations as single unit. Must follow ACID: Atomicity (all or nothing), Consistency, Isolation, Durability. Use COMMIT/ROLLBACK." },
    { id: 'be20', q: "What is GraphQL and its advantages?", a: "Query language for APIs. Advantages: exact data needed (no over/under-fetching), single endpoint, strong typing, great for mobile. Trade-offs: complexity, caching." },
    { id: 'be21', q: "Explain error handling in backend", a: "Use try-catch blocks, implement error middleware, log errors, return consistent error format, handle different error types appropriately. Never expose internal errors." },
    { id: 'be22', q: "What is Docker and why use it?", a: "Containerization platform. Package app with dependencies. Benefits: consistent environments, isolation, easy deployment, scalability, microservices support." },
    { id: 'be23', q: "Explain API versioning strategies", a: "URL path (/v1/), query parameter, header. Each has pros/cons. Choose based on: team size, backward compatibility needs, documentation." },
    { id: 'be24', q: "What is the difference between web server and application server?", a: "Web server: handles HTTP requests, serves static content (Nginx, Apache). Application server: runs applications, dynamic content, business logic (Tomcat, Node.js)." },
    { id: 'be25', q: "Explain event-driven architecture", a: "Services communicate via events. Event producers emit, consumers react. Benefits: loose coupling, scalability, responsiveness. Tools: Kafka, RabbitMQ, AWS EventBridge." },
    { id: 'be26', q: "What is OAuth 2.0?", a: "Authorization framework. Grant types: Authorization Code (most secure), Client Credentials, Refresh Token. Enables third-party access without sharing passwords." },
    { id: 'be27', q: "Explain database connection pooling", a: "Maintain pool of connections. Reuse instead of creating new. Benefits: reduced overhead, better performance. Configure pool size based on load." },
    { id: 'be28', q: "What is a singleton pattern in backend?", a: "Class instantiated once, shared across app. Use for: database connection, logger, config. Ensures single instance, global access point." },
    { id: 'be29', q: "Explain the concept of horizontal vs vertical scaling", a: "Vertical: add resources to existing server (CPU, RAM). Horizontal: add more servers. Vertical has limits, horizontal provides more scalability but adds complexity." },
    { id: 'be30', q: "What is WebSocket and when to use it?", a: "Bidirectional communication over single TCP connection. Use for: real-time chat, live updates, gaming, collaborative editing. Different from HTTP request-response." }
  ],

  // Blockchain Development
  blockchain: [
    { id: 'bc1', q: "What is blockchain and how does it work?", a: "Distributed ledger: blocks of transactions, cryptographically linked, stored across network. Each block contains: data, hash (digital fingerprint), previous block's hash." },
    { id: 'bc2', q: "Explain the difference between public and private blockchains", a: "Public: anyone can join, participate in consensus (Bitcoin, Ethereum). Private: permissioned, controlled access, faster transactions. Enterprise solutions use private." },
    { id: 'bc3', q: "What is a smart contract?", a: "Self-executing code on blockchain. Automatically enforces rules when conditions met. Immutable once deployed. Use cases: DeFi, NFTs, supply chain, voting systems." },
    { id: 'bc4', q: "Explain consensus mechanisms", a: "How network agrees on state. Types: PoW (Proof of Work - mining), PoS (Proof of Stake - validators), DPoS (delegated). Each has trade-offs: security, speed, energy." },
    { id: 'bc5', q: "What is Ethereum and how does it differ from Bitcoin?", a: "Ethereum: programmable blockchain, smart contracts, Turing-complete. Bitcoin: digital currency, store of value. Ethereum: more use cases, larger ecosystem, ETH token." },
    { id: 'bc6', q: "Explain gas in Ethereum", a: "Gas: unit of computation for operations. Price: ETH paid per gas unit. Limits: max gas for transaction. Prevents infinite loops, spam, ensures resource allocation." },
    { id: 'bc7', q: "What is a DAO?", a: "Decentralized Autonomous Organization: blockchain-based organization, rules encoded in smart contracts, decision-making by token holders, no central authority." },
    { id: 'bc8', q: "Explain NFTs (Non-Fungible Tokens)", a: "Unique digital assets on blockchain. Each token has unique ID, metadata. Use cases: digital art, collectibles, gaming items, certificates. ERC-721 standard." },
    { id: 'bc9', q: "What is DeFi (Decentralized Finance)?", a: "Financial services on blockchain: lending, borrowing, trading, without intermediaries. Protocols: Uniswap, Aave, Compound. Benefits: open access, transparency." },
    { id: 'bc10', q: "Explain layer 2 scaling solutions", a: "Build on top of main blockchain to improve scalability. Types: Rollups (optimistic, zk), sidechains. Benefits: faster, cheaper, maintains security. Examples: Polygon, Arbitrum." },
    { id: 'bc11', q: "What is a smart contract wallet?", a: "Wallet controlled by smart contract, not private key. Features: social recovery, multi-sig, spending limits. Examples: Gnosis Safe, Argent. More flexibility than EOAs." },
    { id: 'bc12', q: "Explain the difference between EVM and non-EVM blockchains", a: "EVM: Ethereum Virtual Machine compatible (Solana, Polygon, Avalanche). Non-EVM: different execution (Cosmos, Algorand). EVM easier for developers, larger ecosystem." },
    { id: 'bc13', q: "What is a token standard?", a: "Technical specification for tokens on blockchain. ERC-20: fungible tokens (coins). ERC-721: NFTs. ERC-1155: multi-token standard. Ensures compatibility." },
    { id: 'bc14', q: "Explain how to secure smart contracts", a: "Audit code, use battle-tested libraries, implement access control, handle reentrancy, check integer overflow, test extensively, bug bounties." },
    { id: 'bc15', q: "What is a flash loan?", a: "Uncollateralized loan in single transaction. Must be repaid within same block. Use for: arbitrage, liquidations. Risk: if not repaid, entire transaction reverts." },
    { id: 'bc16', q: "Explain oracles in blockchain", a: "External data feeds to smart contracts. Problem: blockchains can't access off-chain data. Solutions: Chainlink, Band Protocol. Use cases: price feeds, weather data." },
    { id: 'bc17', q: "What is Web3?", a: "Decentralized web built on blockchain. Web2: centralized platforms. Web3: ownership (tokens), decentralized protocols, user control, wallets instead of accounts." },
    { id: 'bc18', q: "Explain MEV (Maximal Extractable Value)", a: "Value extracted by validators from transaction ordering. Strategies: front-running, back-running, sandwich attacks. Solutions: Flashbots,公平排序." },
    { id: 'bc19', q: "What is a sidechain?", a: "Separate blockchain connected to main chain. Enables asset transfer between chains. Offers scalability, custom features. Examples: Polygon PoS, Ronin." },
    { id: 'bc20', q: "Explain the concept of staking", a: "Lock crypto to support network. PoS: validators stake ETH to propose blocks. Rewards: earn ETH for participating. Slashing: lose stake for malicious behavior." },
    { id: 'bc21', q: "What is a bridge in blockchain?", a: "Protocol connecting different blockchains. Enables cross-chain transfers. Types: centralized, trustless, optimistic. Challenges: security, liquidity." },
    { id: 'bc22', q: "Explain tokenomics", a: "Token economics: supply, distribution, incentives, utility. Design: token supply, allocation, vesting, rewards. Critical for project success and sustainability." },
    { id: 'bc23', q: "What is a privacy coin?", a: "Cryptocurrency with privacy features. Techniques: ring signatures (Monero), zkSNARKs (Zcash). Debate: regulatory concerns vs financial privacy." },
    { id: 'bc24', q: "Explain zero-knowledge proofs", a: "Cryptographic proof proving statement true without revealing info. zkSNARKs, zkSTARKs. Use cases: privacy, scaling, identity verification." },
    { id: 'bc25', q: "What is a token sale/ICO?", a: "Initial Coin Offering: sell tokens to raise funds. Types: IDO (DEX), IEO (exchange), ICO (direct). Risks: regulation, scams, volatility." },
    { id: 'bc26', q: "Explain blockchain governance", a: "How decisions made: on-chain (voting with tokens), off-chain (forums, proposals). Different models: DAO, foundation, hybrid. Critical for protocol changes." },
    { id: 'bc27', q: "What is a multsig wallet?", a: "Wallet requiring multiple signatures for transactions. M-of-N: N keys, need M to sign. Use cases: teams, family, security. Examples: Gnosis Safe." },
    { id: 'bc28', q: "Explain IPFS and its relation to blockchain", a: "InterPlanetary File System: distributed storage. Content-addressed (hash). Often used with blockchain for decentralized storage. Benefits: censorship resistance." },
    { id: 'bc29', q: "What is a DAG (Directed Acyclic Graph)?", a: "Data structure used in some blockchains (IOTA, Hedera). Different from chain of blocks. More scalable, no mining. Tangle technology." },
    { id: 'bc30', q: "Explain the concept of yield farming", a: "DeFi strategy: move tokens between protocols to maximize returns. Provide liquidity, stake tokens, compound rewards. High risk: impermanent loss, smart contract risk." }
  ],

  // UI/UX Design
  uiux: [
    { id: 'ux1', q: "What is the difference between UI and UX design?", a: "UI (User Interface): visual elements, colors, typography, buttons, layout. UX (User Experience): overall experience, usability, flow, satisfaction. Both important, different skills." },
    { id: 'ux2', q: "Explain the design thinking process", a: "5 phases: Empathize (understand users), Define (identify problem), Ideate (brainstorm solutions), Prototype (build mockups), Test (validate with users)." },
    { id: 'ux3', q: "What is a user persona and how do you create one?", a: "Fictional representation of target user. Create from: user research, interviews, data. Include: demographics, goals, frustrations, behaviors. Guides design decisions." },
    { id: 'ux4', q: "Explain wireframing and its purpose", a: "Basic visual guide showing layout/structure. Low-fidelity: boxes, lines. Benefits: early feedback, iterate quickly, communicate ideas, focus on function before beauty." },
    { id: 'ux5', q: "What is a design system?", a: "Collection of reusable components, guidelines, standards. Includes: colors, typography, components, documentation. Ensures consistency, speeds up design/development." },
    { id: 'ux6', q: "Explain the principle of visual hierarchy", a: "Arrange elements to show importance. Use: size, color, contrast, spacing, typography. Guide user's eye, make information scannable. Critical for user flow." },
    { id: 'ux7', q: "What is affordance in design?", a: "Visual clue suggesting how to interact. Buttons look clickable, sliders look draggable. Make interactive elements obvious. Improves discoverability, reduces learning curve." },
    { id: 'ux8', q: "Explain Fitts's Law in UI design", a: "Time to move to target depends on distance/size. UI implications: make interactive elements large enough, place important actions in corners, minimize travel distance." },
    { id: 'ux9', q: "What is the F-pattern reading pattern?", a: "Users scan in F-shape: top left to right, then down left, then across. Place key info in top area, use headlines, keep important content above fold." },
    { id: 'ux10', q: "Explain color theory in UI design", a: "Color wheel: primary, secondary, complementary. Psychology: colors evoke emotions. Use 60-30-10 rule. Ensure contrast for accessibility. Test with color blind users." },
    { id: 'ux11', q: "What is a usability heuristic?", a: "Usability principle for evaluating interfaces. Nielsen's 10: system status, match real world, user control, consistency, error prevention, recognition, flexibility, help, feedback, recovery." },
    { id: 'ux12', q: "Explain information architecture", a: "Structure and organization of content. Includes: navigation, categories, labels, search. Methods: card sorting, tree testing. Ensure users find information easily." },
    { id: 'ux13', q: "What is a user flow?", a: "Path user takes to complete task. Visualize: steps, decisions, screens. Identify: touchpoints, pain points. Optimize for simplicity and clarity." },
    { id: 'ux14', q: "Explain the concept of progressive disclosure", a: "Show only essential info initially, reveal details on demand. Benefits: reduce cognitive load, simpler interface, advanced options available. Common in forms, settings." },
    { id: 'ux15', q: "What is microinteraction?", a: "Small moment of interaction: button hover, success message, loading spinner. Provide feedback, guide users, make experience delightful. Details matter." },
    { id: 'ux16', q: "Explain dark mode design considerations", a: "Use dark backgrounds, lighter text, reduced contrast, preserve hierarchy. Test readability, consider OLED savings. Not just inverted colors." },
    { id: 'ux17', q: "What is accessibility (a11y) in design?", a: "Design for all users, including those with disabilities. Considerations: color contrast, keyboard navigation, screen readers, text alternatives, focus states." },
    { id: 'ux18', q: "Explain A/B testing in design", a: "Compare two versions to see which performs better. Test: one variable at a time, statistical significance, segment users. Data-driven design decisions." },
    { id: 'ux19', q: "What is a design sprint?", a: "5-day process: Monday (define), Tuesday (diverge), Wednesday (decide), Thursday (prototype), Friday (test). Quick validation, reduce risk." },
    { id: 'ux20', q: "Explain the golden ratio in design", a: "1.618 ratio found in nature. Use for: layout proportions, typography scaling, image sizing. Creates naturally pleasing, balanced designs." },
    { id: 'ux21', q: "What is negative space and why is it important?", a: "Empty space around elements. Benefits: improves readability, creates breathing room, guides focus, builds hierarchy. Don't fear white space." },
    { id: 'ux22', q: "Explain typography hierarchy", a: "Use type size/weight to show importance. Headlines: large, bold. Body: readable size. Labels: smaller, lighter. Creates scanning order, improves readability." },
    { id: 'ux23', q: "What is card-based design?", a: "Content in cards: self-contained, scannable, mobile-friendly. Each card: single concept, image, title, action. Popular in dashboards, feeds, e-commerce." },
    { id: 'ux24', q: "Explain gesture-based UI design", a: "Design for touch: swipe, pinch, drag. Common gestures: scroll, tap, swipe. Provide visual cues. Consider platform conventions (iOS vs Android)." },
    { id: 'ux25', q: "What is feedback and why is it important?", a: "System communicates result of action. Types: success, error, loading, confirmation. Prevents confusion, builds trust, guides next steps." },
    { id: 'ux26', q: "Explain responsive vs adaptive design", a: "Responsive: fluid layouts adjust to any size. Adaptive: different layouts for specific breakpoints. Responsive is more common now." },
    { id: 'ux27', q: "What is the 8-point grid system?", a: "Spacing in multiples of 8px. Creates consistency: margins, padding, component sizing. Speeds design, ensures rhythm. Industry standard." },
    { id: 'ux28', q: "Explain emotional design", a: "Design that evokes feelings. Three levels: visceral (immediate), behavioral (use), reflective (memories). Aim for positive emotions. Delight users." },
    { id: 'ux29', q: "What is cognitive load in UI design?", a: "Amount of mental effort to process information. Reduce: simple language, clear labels, progressive disclosure, visual cues. Don't overwhelm users." },
    { id: 'ux30', q: "Explain design criticism and feedback sessions", a: "Share work, ask specific questions, focus on problems not solutions, be constructive. Help improve designs, build team culture, share knowledge." }
  ]
};

router.get('/', (req, res) => {
  const categories = Object.keys(questions).map(cat => ({
    name: cat,
    displayName: cat === 'webdev' ? 'Web Development' : 
                 cat === 'datascience' ? 'Data Science' :
                 cat === 'devops' ? 'DevOps & Cloud' :
                 cat === 'mobile' ? 'Mobile Development' :
                 cat === 'database' ? 'Database' :
                 cat === 'companydomains' ? 'Company Domains' :
                 cat === 'fullstack' ? 'Full Stack Development' :
                 cat === 'frontend' ? 'Frontend Development' :
                 cat === 'backend' ? 'Backend Development' :
                 cat === 'blockchain' ? 'Blockchain Development' :
                 cat === 'uiux' ? 'UI/UX Design' :
                 cat.charAt(0).toUpperCase() + cat.slice(1).replace(/([A-Z])/g, ' $1'),
    count: questions[cat].length
  }));
  res.json({ categories });
});

router.get('/:category', (req, res) => {
  const { category } = req.params;
  if (!questions[category]) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.json({ category, questions: questions[category] });
});

router.get('/:category/random', (req, res) => {
  const { category } = req.params;
  const { count = 5 } = req.query;
  
  if (!questions[category]) {
    return res.status(404).json({ message: 'Category not found' });
  }
  
  const shuffled = [...questions[category]].sort(() => 0.5 - Math.random());
  res.json({ questions: shuffled.slice(0, parseInt(count)) });
});

// AI Answer Analysis Endpoint
router.post('/analyze', (req, res) => {
  const { userAnswer, correctAnswer, question } = req.body;
  
  if (!userAnswer || !correctAnswer) {
    return res.status(400).json({ message: 'Missing userAnswer or correctAnswer' });
  }
  
  const analysis = analyzeAnswer(userAnswer, correctAnswer, question);
  res.json(analysis);
});

// Text Analysis Functions
function analyzeAnswer(userAnswer, correctAnswer, question) {
  const userAns = userAnswer.toLowerCase().trim();
  const corrAns = correctAnswer.toLowerCase().trim();
  
  // Extract key terms from correct answer
  const keyTerms = extractKeyTerms(correctAnswer);
  const matchedTerms = keyTerms.filter(term => userAns.includes(term));
  const termMatchPercent = (matchedTerms.length / keyTerms.length) * 100;
  
  // Calculate similarity score
  const similarity = calculateSimilarity(userAns, corrAns);
  
  // Check for key concepts
  const concepts = extractConcepts(correctAnswer);
  const matchedConcepts = concepts.filter(concept => userAns.includes(concept));
  const conceptPercent = concepts.length > 0 ? (matchedConcepts.length / concepts.length) * 100 : 0;
  
  // Calculate overall score (weighted average)
  // Give more weight to keyword matching - if user has main keywords, they should get credit
  const baseScore = Math.round(
    (termMatchPercent * 0.5) + 
    (similarity * 20) + 
    (conceptPercent * 0.3)
  );
  
  // If key terms match is significant, boost the score
  let score = baseScore;
  if (termMatchPercent >= 40 && baseScore < 50) {
    score = 50; // At least partial credit if significant keywords matched
  }
  if (termMatchPercent >= 60 && baseScore < 70) {
    score = 70; // Good credit for good keyword match
  }
  if (termMatchPercent >= 80 && baseScore < 85) {
    score = 85; // High credit for excellent keyword match
  }
  
  // Determine grade and feedback
  let grade, feedback, isCorrect;
  
  // Count how many keywords matched
  const keywordCount = matchedTerms.length;
  const totalKeywordCount = keyTerms.length;
  const hasAnyKeywords = keywordCount > 0;
  
  // Very lenient - if user wrote ANY relevant keyword, mark as correct
  if (keywordCount >= 1 || score >= 50) {
    grade = score >= 80 ? 'Excellent' : (score >= 60 ? 'Good' : 'Partial');
    isCorrect = true;
    feedback = 'Good! You covered some key points.';
  } else if (score >= 30) {
    grade = 'Partial';
    isCorrect = true;
    feedback = 'You have some correct points.';
  } else {
    grade = 'Needs Improvement';
    isCorrect = false;
    feedback = 'Your answer needs more detail.';
  }
  
  // Identify missing key points
  const missingTerms = keyTerms.filter(term => !userAns.includes(term));
  
  return {
    score: Math.min(100, Math.max(0, score)),
    grade,
    isCorrect,
    feedback,
    matchedTerms: matchedTerms.length,
    totalTerms: keyTerms.length,
    matchedConcepts: matchedConcepts.length,
    totalConcepts: concepts.length,
    missingPoints: missingTerms.slice(0, 3),
    analysis: {
      termMatch: Math.round(termMatchPercent),
      similarity: Math.round(similarity * 100),
      conceptMatch: Math.round(conceptPercent)
    }
  };
}

function extractKeyTerms(text) {
  // Common technical terms and important words
  const stopWords = ['the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 
    'may', 'might', 'must', 'can', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 
    'by', 'from', 'as', 'into', 'through', 'during', 'before', 'after', 'above', 
    'below', 'between', 'and', 'but', 'or', 'nor', 'so', 'yet', 'both', 'either',
    'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'it', 'its'];
  
  const words = text.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.includes(word));
  
  // Prioritize technical terms
  const technicalPatterns = [
    /^(api|http|sql|html|css|js|json|xml|rest|soap)/i,
    /^(docker|kubernetes|k8s|jenkins|ci|cd|devops)/i,
    /^(aws|azure|gcp|cloud|vm|container)/i,
    /^(ml|ai|dl|nlp|cnn|rnn|neural)/i,
    /^(oop|api|sql|nosql|mysql|mongo|postgresql)/i,
    /^(agile|scrum|kanban|waterfall|sprint)/i,
    /^(algorithm|data|structure|tree|graph|stack|queue)/i
  ];
  
  const technicalTerms = words.filter(word => 
    technicalPatterns.some(pattern => pattern.test(word))
  );
  
  const otherTerms = words.filter(word => 
    !technicalPatterns.some(pattern => pattern.test(word))
  );
  
  return [...technicalTerms, ...otherTerms].slice(0, 15);
}

function extractConcepts(text) {
  // Extract key concepts/phrases
  const concepts = [];
  
  // Common technical concept patterns
  const patterns = [
    /\b(continuous integration|continuous deployment|ci\/cd)\b/gi,
    /\b(containerization|container orchestration)\b/gi,
    /\b(microservices|monolithic architecture)\b/gi,
    /\b(machine learning|deep learning|neural network)\b/gi,
    /\b(supervised learning|unsupervised learning)\b/gi,
    /\b(rest api|graphql|soap api)\b/gi,
    /\b(database management|relational database|nosql)\b/gi,
    /\b(agile methodology|scrum|kanban)\b/gi,
    /\b(test-driven development|tdd|unit testing)\b/gi,
    /\b(infrastructure as code|iac|terraform)\b/gi,
    /\b(load balancing|horizontal scaling|vertical scaling)\b/gi,
    /\b(caching|redis|memcached)\b/gi,
    /\b(message queue|kafka|rabbitmq)\b/gi,
    /\b(cap theorem|eventual consistency|acid)\b/gi,
    /\b(oauth|jwt|authentication|authorization)\b/gi
  ];
  
  patterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      concepts.push(...matches.map(m => m.toLowerCase()));
    }
  });
  
  return [...new Set(concepts)].slice(0, 10);
}

function calculateSimilarity(str1, str2) {
  // Simple word-based similarity
  const words1 = new Set(str1.split(/\s+/).filter(w => w.length > 2));
  const words2 = new Set(str2.split(/\s+/).filter(w => w.length > 2));
  
  if (words1.size === 0 || words2.size === 0) return 0;
  
  let matches = 0;
  words1.forEach(word => {
    if (words2.has(word)) matches++;
  });
  
  // Jaccard similarity
  const union = new Set([...words1, ...words2]).size;
  return matches / union;
}

module.exports = router;