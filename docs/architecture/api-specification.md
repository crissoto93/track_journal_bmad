# API Specification

The Track Journal application will not have a traditional server-hosted REST or GraphQL API. Instead, the React Native client will interact directly and securely with Google Firebase services using the official Firebase Client SDK.

The **"API contract"** is defined by the Firebase SDK methods and the Data Models we've outlined.

## Primary Interaction Patterns

  * **Authentication:** Handled by the Firebase Authentication SDK methods.
  * **Data Reading:** Handled by Firestore SDK methods like `getDoc`, `getDocs`, and real-time listeners like `onSnapshot`.
  * **Data Writing:** Handled by Firestore SDK methods like `addDoc`, `setDoc`, and `updateDoc`.
  * **Security & Authorization:** Enforced by **Firestore Security Rules** deployed on the Firebase backend, ensuring a user can only ever read and write their own data.
