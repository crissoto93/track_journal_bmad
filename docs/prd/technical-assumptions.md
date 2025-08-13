# Technical Assumptions

## Repository Structure: Monorepo

* A single repository will be used to house the React Native application and any future related code.

## Service Architecture: Client-BaaS (Backend-as-a-Service)

* The application will be built using a Client-BaaS model, with the React Native mobile app communicating directly with Google Firebase services.

## Testing Requirements: Unit + Integration Testing

* The quality assurance strategy will focus on a combination of unit tests and integration tests using the Jest framework.

## Additional Technical Assumptions and Requests

* **Frontend Framework:** React Native
* **Backend Platform:** Google Firebase (including Authentication and Firestore services)
* **Database:** Firestore (NoSQL)
* **Offline Capability:** This is a mandatory requirement that will be handled by Firestore's persistence features.
