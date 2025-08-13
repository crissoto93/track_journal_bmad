# Epics and Stories

## Epic 1: Foundation & User Onboarding
**Goal:** Establish the core application foundation, including project setup and user authentication, allowing a user to securely sign up for an account and log in.

* **Story 1.1: Project Initialization & Firebase Setup**
   * *As a Developer, I want a new React Native project initialized with all core dependencies and connected to a Firebase project, so that I have a stable foundation to start building features.*
   * **Acceptance Criteria:** 1. A new React Native project is created. 2. Firebase SDK is installed and configured for iOS/Android. 3. The app connects to the Firebase project on startup. 4. A basic placeholder screen is visible.
* **Story 1.2: Email/Password Sign-up**
   * *As a new user, I want to be able to sign up for an account using my email and a password, so that I can create my personal Track Journal account.*
   * **Acceptance Criteria:** 1. A sign-up screen is created. 2. Input validation is present. 3. "Sign Up" creates a user in Firebase Auth. 4. A user document is created in Firestore. 5. The user is navigated to the dashboard on success. 6. Clear error messages are shown on failure.
* **Story 1.3: Email/Password Log-in & Session Management**
   * *As a returning user, I want to log in with my email and password and remain logged in, so that I can access my saved data.*
   * **Acceptance Criteria:** 1. A log-in screen is created with a "Forgot Password" link. 2. "Log In" authenticates with Firebase. 3. The user is navigated to the dashboard on success. 4. The user's session is persisted. 5. Clear error messages are shown on failure. 6. "Forgot Password" triggers the reset flow.
* **Story 1.4: Social Logins (Google & Apple)**
   * *As a new or returning user, I want to sign up or log in using my Google or Apple account, so that I can access the app without creating a new password.*
   * **Acceptance Criteria:** 1. Social login buttons are added to auth screens. 2. Tapping the buttons initiates the Firebase social auth flows. 3. A user document is created in Firestore on first-time social sign-in. 4. The user is navigated to the dashboard on success.

## Epic 2: Core Logging Workflow
**Goal:** Implement the primary value of the app by enabling users to create vehicle profiles in their "Garage" and to log all critical data for a new track session.

* **Story 2.1: View "My Garage" and Add Vehicle**
   * *As a driver, I want to see a list of my cars and be able to add a new car to my garage, so that I can organize my vehicles for session logging.*
   * **Acceptance Criteria:** 1. A "My Garage" screen is created. 2. The screen lists the user's vehicles. 3. An "Add Vehicle" button opens a form. 4. Make/Model fields use the searchable drop-down component (FR8). 5. Submitting creates a new vehicle in Firestore. 6. The new vehicle appears in the list.
* **Story 2.2: Edit Vehicle Details**
   * *As a driver, I want to be able to edit the details of a car in my garage, so that I can keep my vehicle information up to date.*
   * **Acceptance Criteria:** 1. Tapping a vehicle navigates to an edit screen. 2. The user can modify and save changes. 3. Saving updates the vehicle document in Firestore. 4. Updates are reflected in the "My Garage" list.
* **Story 2.3: Dashboard and New Session Initiation**
   * *As a driver, I want to start a new session log from a dashboard by selecting my vehicle and the racetrack, so that I can begin logging data for a session.*
   * **Acceptance Criteria:** 1. A main Dashboard screen is created. 2. The screen has selectors for vehicle and racetrack. 3. The racetrack selector uses the searchable drop-down (FR8). 4. A "Start" button is disabled until both are selected. 5. Tapping the button navigates to the logging form.
* **Story 2.4: Session Logging Form Data Entry**
   * *As a driver, I want to fill out a detailed form with all relevant data from my track session, so that I have a complete record of my performance and setup.*
   * **Acceptance Criteria:** 1. A Session Logging Form is created. 2. The form includes all fields from FR5. 3. The form is fully functional offline (NFR1). 4. Saving creates a new session document in Firestore. 5. The user receives confirmation after saving.

## Epic 3: Session History & Data Review
**Goal:** Allow users to review, edit, and derive value from their past performance data by building the session history list and the detailed session view.

* **Story 3.1: Session History List View**
   * *As a driver, I want to see a chronological list of all my past sessions, so that I can easily find and access my historical data.*
   * **Acceptance Criteria:** 1. A "Session History" screen is created. 2. It displays a list of sessions, sorted by date. 3. Each item shows key summary info. 4. The list works offline. 5. The list is performant.
* **Story 3.2: Filter Session History**
   * *As a driver, I want to filter my session history by vehicle and by racetrack, so that I can quickly find specific logs for comparison.*
   * **Acceptance Criteria:** 1. Filter controls are added to the history screen. 2. The vehicle filter is populated from "My Garage". 3. Applying filters updates the list. 4. Filters can be cleared. 5. Filtering works offline.
* **Story 3.3: View and Edit a Saved Session**
   * *As a driver, I want to open a past session to see all its details and be able to edit them, so that I can review my data and correct any mistakes.*
   * **Acceptance Criteria:** 1. Tapping a session navigates to a detail screen. 2. The screen displays all logged data in a read-only format. 3. An "Edit" button is present. 4. Tpping "Edit" opens the logging form pre-populated with session data. 5. Saving updates the session document in Firestore. 6. Updates are reflected in the history/detail views.
