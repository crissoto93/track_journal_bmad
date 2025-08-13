# Requirements

## Functional Requirements (FR)

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

## Non-Functional Requirements (NFR)

* **NFR1: Offline Capability:** The app **must** be fully functional without an active internet connection, allowing users to create, view, and edit logs. Data must sync automatically with the cloud when connectivity is restored.
* **NFR2: UI/UX Design:** The application will feature a modern, clean, and minimalistic aesthetic with a dark color scheme. Main navigation will be handled by an intuitive bottom navigation bar.
* **NFR3: Cross-Platform Support:** The application must be built using a cross-platform framework (React Native) to run on both iOS and Android from a single codebase.
* **NFR4: Data Integrity:** All user data, especially session logs, must be saved reliably to the device in offline mode and synced accurately to the backend without data loss.
* **NFR5: Offline Session Persistence:** Initial user sign-up and log-in require an active internet connection to authenticate. Once a user has an active session, the app will persist that session, allowing full offline access for subsequent uses without needing to re-authenticate online.
