# Backend Architecture

## Service Architecture (Serverless)

  * **Organization:** Future Firebase Functions will be organized in `packages/functions/src/` with subdirectories like `http/` and `firestore/`.

## Database Architecture & Security

  * **Security:** The core of the backend is the set of **Firestore Security Rules** that ensure a user can only access their own data.

## Authentication and Authorization

  * **Authorization:** Enforced exclusively by the Firestore Security Rules.
