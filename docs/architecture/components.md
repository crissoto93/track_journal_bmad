# Components

## Component List

  * **Authentication Module (Frontend):** Manages all client-side logic for user sign-up, log-in, log-out, and session management.
  * **Data Service / Repository (Frontend):** Manages all data interactions with Firestore, implementing the Repository Pattern.
  * **UI Library (Frontend):** A collection of reusable UI elements (buttons, forms, cards, etc.).
  * **Firebase Authentication (Backend):** A managed service that handles secure user identity.
  * **Firestore Service (Backend):** A managed service that provides the database and enforces Security Rules.

## Component Interaction Diagram

```mermaid
graph TD
    subgraph Track Journal App (Client)
        A[UI Library] --> B[Authentication Module];
        A --> C[Data Service / Repository];
    end

    subgraph Firebase (Backend)
        D[Firebase Authentication];
        E[Firestore Service];
    end

    B --> D;
    C --> E;
```
