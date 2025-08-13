# Data Models

## User

  * **Purpose:** Represents a registered user of the application.
  * **Firestore Path:** `users/{userId}`
  * **TypeScript Interface:**
    ```typescript
    interface User {
      id: string;
      name: string;
      email: string;
      createdAt: Date;
    }
    ```

## Vehicle

  * **Purpose:** Represents a single vehicle in a user's "My Garage".
  * **Firestore Path:** `users/{userId}/vehicles/{vehicleId}`
  * **TypeScript Interface:**
    ```typescript
    interface Vehicle {
      id: string;
      userId: string;
      make: string;
      model: string;
      year?: number;
      trim?: string;
    }
    ```

## SessionLog

  * **Purpose:** Contains all the data for a single track session.
  * **Firestore Path:** `users/{userId}/vehicles/{vehicleId}/sessionLogs/{logId}`
  * **TypeScript Interface:**
    ```typescript
    interface SessionLog {
      id: string;
      vehicleId: string;
      eventName?: string;
      sessionDate: Date;
      trackInfo: {
        trackId: string;
        trackName: string;
      };
      fastestLap?: string;
      averageLap?: string;
      driverRating: number;
      notes?: string;
      tireData: { [corner: string]: { coldPsi: number; hotPsi: number; } };
    }
    ```

## Track

  * **Purpose:** A global, public collection of racetrack information to be used in searchable drop-downs.
  * **Firestore Path:** `tracks/{trackId}`
  * **TypeScript Interface:**
    ```typescript
    interface Track {
      id: string;
      name: string;
      location?: { latitude: number; longitude: number; };
      country: string;
    }
    ```
