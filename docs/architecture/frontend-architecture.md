# Frontend Architecture

## Component Architecture

  * **Organization:** Components will be organized in `src/components/` with subdirectories like `ui/`, `forms/`, and `lists/`. Top-level views will be in `src/screens/`.
  * **Template:** Components will be standard React functional components with TypeScript props and use the `StyleSheet` API.

## State Management Architecture

  * **Approach:** We will use React's built-in **Context API and Hooks** for simple global state (like auth status).

## Routing Architecture

  * **Library:** We will use **React Navigation**.
  * **Organization:** Logic will be in `src/navigation/`, with separate stacks for authentication and the main app, conditionally rendered based on auth state.

## Frontend Services Layer (Repository Pattern)

  * **Structure:** All Firebase communication will be in `src/services/`. UI components will call these services, not Firebase directly.
