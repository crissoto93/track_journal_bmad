# Tech Stack

| Category | Technology | Version | Purpose | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend Language** | TypeScript | **\~5.9** | Primary development language | Provides strong typing to reduce bugs and improve developer experience, especially with AI assistance. |
| **Frontend Framework**| React Native | **\~0.81** | Core framework for building the iOS & Android app | The chosen cross-platform solution with a massive community and support, ideal for AI-driven coding. |
| **UI Component Library**| React Native Paper | **\~5.14** | (Proposed) UI components | A popular, customizable library with a clean, modern aesthetic that aligns with our design goals. Follows Material Design principles. |
| **State Management** | React Context API | N/A | Local & simple global state | Built-in to React. It's the simplest solution for our MVP's needs, avoiding the complexity of a larger library until required. |
| **Backend Runtime** | Node.js | **\~22.x (LTS)** | Runtime for serverless functions | The standard for Firebase Functions, offering excellent performance and TypeScript support. |
| **Backend Platform** | Firebase Functions SDK| **\~5.0** | Serverless function development | The native SDK for building any future backend logic, such as the AI assistant. |
| **API Style** | Firebase SDK | **\~11.x** | Client-to-BaaS communication | Direct, secure, and real-time communication with Firestore and Auth, with built-in offline support. |
| **Database** | Firestore | N/A | Primary database for all app data | The chosen NoSQL database with robust offline and real-time capabilities, central to the app's function. |
| **Authentication** | Firebase Authentication | N/A | User sign-up and log-in services | Handles all authentication flows securely, including email, Google, and Apple providers. |
| **Testing Framework** | Jest | **\~29.x** | Unit and integration testing | The standard testing framework for React Native, providing a comprehensive testing environment. |
| **CI/CD Platform** | GitHub Actions | N/A | Automated builds and deployments | A flexible and powerful tool for automating our testing and release processes to the app stores. |
| **Monitoring & Logging**| Firebase Suite | N/A | App health and usage monitoring | Includes Crashlytics for error reporting and Performance Monitoring to track app speed and reliability. |
