# Database Schema

This schema translates our data models into a concrete Firestore structure.

## `users` collection

  * **Path:** `users/{userId}`
  * **Sub-collections:** `vehicles`

## `vehicles` sub-collection

  * **Path:** `users/{userId}/vehicles/{vehicleId}`
  * **Sub-collections:** `sessionLogs`

## `sessionLogs` sub-collection

  * **Path:** `users/{userId}/vehicles/{vehicleId}/sessionLogs/{logId}`

## `tracks` collection

  * **Path:** `tracks/{trackId}`
