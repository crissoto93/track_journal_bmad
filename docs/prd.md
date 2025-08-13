# Track Journal Product Requirements Document (PRD)

### 1. Goals and Background Context

#### Goals

The primary goals for the Track Journal MVP and its subsequent versions are:
* Cultivate a core community of 500 to 1,000 highly engaged 'founding members'.
* Provide an effortless and reliable logging experience that becomes an indispensable part of a user's track day routine.
* Enable users to leverage their own historical data to make more informed setup decisions.
* Validate the concept of an AI-driven voice assistant for post-MVP development.
* Build a stable, driver-centric foundation that can support future team collaboration features.

#### Background Context

For motorsport enthusiasts, the current methods for logging vehicle setup and performance data are inefficient—relying on paper logbooks that are easily lost or damaged—or are non-existent for the casual driver. This leads to lost data and missed opportunities for performance optimization.

Track Journal solves this by providing a driver-centric mobile application that makes data logging accessible, reliable, and fast. By leveraging the user's phone and offering robust offline capabilities, it removes the barriers to entry. The long-term vision is to introduce a unique AI assistant that will allow for near-instant, voice-based data capture, making it the most efficient solution on the market.

#### Change Log

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| August 10, 2025 | 1.0 | Initial draft of PRD from Project Brief | John, PM |

---
### 2. Requirements

#### Functional Requirements (FR)

* **FR1: User Authentication:** Users must be able to sign up and log in using an email/password combination, Google, or Apple ID. A "Forgot Password" flow must be included.
* **FR2: Driver-Centric Account:** Upon first sign-up, a personal account is created for the user, which will own all of their vehicles and session logs.
* **FR3: Vehicle Profile Management ("My Garage"):** Users can add and edit vehicle profiles, with "Make" and "Model" as required fields. The "My Garage" view will display all vehicles belonging to the user.
* **FR4: Session Creation:** The user must be able to initiate a new session log by selecting a vehicle from their garage and a racetrack (via GPS or manual search).
* **FR5: Session Logging:** The app must provide a detailed data-entry screen for a single track session, which includes fields for:
    * Session header information (Event Name, Date, Temp, Conditions).
    * Car & Session Data: Optional fields for **Fastest Lap** and **Average Lap** times, setup changes, and other data.
    * Tire data for that session (Cold/Hot PSI, Temps for each corner).
    * Driver notes, session goals, outcomes, and a 1-5 star rating.
* **FR6: Session History & Editing:** Users can view a list of all their past sessions, with the ability to filter by vehicle and racetrack. Tapping a session opens a view of the full log. Users must be able to edit previously saved sessions.
* **FR7: Pre-populated Data:** The application will ship with a pre-populated local list of common racetracks and vehicle makes/models to streamline data entry.
* **FR8: Data Entry Assistance:** When a user is selecting data like a vehicle make/model or a racetrack, the interface must provide a searchable drop-down list of the pre-populated options. Crucially, the component must also allow the user to enter a custom value if their selection is not available in the list.

#### Non-Functional Requirements (NFR)

* **NFR1: Offline Capability:** The app **must** be fully functional without an active internet connection, allowing users to create, view, and edit logs. Data must sync automatically with the cloud when connectivity is restored.
* **NFR2: UI/UX Design:** The application will feature a modern, clean, and minimalistic aesthetic with a dark color scheme. Main navigation will be handled by an intuitive bottom navigation bar.
* **NFR3: Cross-Platform Support:** The application must be built using a cross-platform framework (React Native) to run on both iOS and Android from a single codebase.
* **NFR4: Data Integrity:** All user data, especially session logs, must be saved reliably to the device in offline mode and synced accurately to the backend without data loss.
* **NFR5: Offline Session Persistence:** Initial user sign-up and log-in require an active internet connection to authenticate. Once a user has an active session, the app will persist that session, allowing full offline access for subsequent uses without needing to re-authenticate online.

---
### 3. User Interface Design Goals

#### Overall UX Vision

The user experience will be optimized for speed and clarity, designed for use in a potentially hectic racetrack environment. The guiding principle is "Get in, log data, get out." The interface should be intuitive, with minimal distractions, allowing a driver to capture their thoughts and data quickly and accurately.

#### Key Interaction Paradigms

* **Rapid Data Entry:** Forms will feature large touch targets and smart defaults. The flow of the session log will follow a driver's natural post-session mental checklist.
* **Bottom Tab Navigation:** A simple bottom navigation bar will provide access to the main sections of the app (e.g., New Session, Garage, History).
* **Visual-First Logging:** Where possible, data entry will be supported by visual aids, such as a simple graphic of the car for inputting tire pressures and temperatures at each corner.

#### Core Screens and Views

* Authentication Screens (Sign-up, Log-in)
* Dashboard / New Session Screen
* "My Garage" Screen
* Vehicle Detail/Edit Screen
* Session Logging Form
* Session History Screen
* Session Detail View Screen

#### Accessibility

* The application will target **WCAG AA** compliance to ensure it is usable by people with common disabilities.

#### Branding

* The visual style will adhere to the "dark color scheme with silver/white accents" requirement.

#### Target Device and Platforms

* The application will be designed as a mobile-first experience for **iOS and Android** devices.

---
### 4. Technical Assumptions

#### Repository Structure: Monorepo

* A single repository will be used to house the React Native application and any future related code.

#### Service Architecture: Client-BaaS (Backend-as-a-Service)

* The application will be built using a Client-BaaS model, with the React Native mobile app communicating directly with Google Firebase services.

#### Testing Requirements: Unit + Integration Testing

* The quality assurance strategy will focus on a combination of unit tests and integration tests using the Jest framework.

#### Additional Technical Assumptions and Requests

* **Frontend Framework:** React Native
* **Backend Platform:** Google Firebase (including Authentication and Firestore services)
* **Database:** Firestore (NoSQL)
* **Offline Capability:** This is a mandatory requirement that will be handled by Firestore's persistence features.

---
### 5. Epics and Stories

#### Epic 1: Foundation & User Onboarding
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

#### Epic 2: Core Logging Workflow
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

#### Epic 3: Session History & Data Review
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