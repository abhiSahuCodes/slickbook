# SlickBook - Appointment Scheduling App

Slickbook is a React Native mobile application built for booking appointments with various local providers (Doctors, Salons, Fitness Trainers, Dentists, Therapists, Nutritionists). 

## Project Overview

This app offers a fully featured appointment booking experience where a user can login, browse providers by category, view provider details including available time slots, book an appoinment, view their upcoming and past bookings, and cancel active appointments.

## Tech Stack & Libraries

- **React Native & Expo**: Used as the core framework for building cross-platform (iOS & Android) mobile apps quickly and reliably.
- **React Navigation**: Core library for managing the app structure. Uses native stack for Auth flow and Details screens, and bottom tabs for the main dashboard.
- **React Native Paper**: A fast and accessible UI component library following Material Design principles. Speeds up development and ensures visual consistency.
- **React Native Safe Area Context**: Helps safely render UIs around device notches, status bars, and home indicators.
- **AsyncStorage**: Used for local, persistent storage to simulate a database. Handles persisting users, appointments, and providers so state isn't reset on app reload.
- **Date-fns**: A modern, lightweight library for robust date parsing, formatting, and mathematical operations. 
- **Expo Vector Icons**: For all the iconography across tabs and cards.

# Folder Structure

**App.js** - Main application entry point providing Contexts and Theme

**app.json** - Expo config, sets app name, slug, and orientation

**src/data/** - Seed data for mock users, providers, and generated slots
- mockData.js

**src/context/** - Global state management
- AuthContext.js - Global state for authentication (currentUser)
- AppointmentContext.js - Global state for providers and appointments

**src/utils/** - Utility functions and helpers
- storage.js - Wrapper around AsyncStorage for persisting data
- dateHelpers.js - Date manipulation and formatting tools (via date-fns)

**src/navigation/** - Navigation configuration
- RootNavigator.js - Navigator handling Auth vs Main App routing

**src/screens/auth/** - Authentication screens
- LoginScreen.js
- RegisterScreen.js

**src/screens/providers/** - Searching and booking providers
- ProviderListScreen.js
- ProviderDetailScreen.js

**src/screens/appointments/** - User's bookings
- AppointmentsScreen.js

**src/screens/profile/** - User's profile operations
- ProfileScreen.js

**src/components/** - Reusable UI components
- ProviderCard.js
- SlotPicker.js
- AppointmentCard.js
- EmptyState.js
```

## How to Run Locally

1. **Prerequisites:** Ensure you have Node.js and npm installed. Download Expo Go on your physical test device, or install an iOS Simulator / Android Emulator.
2. **Install Dependencies:**
   ```bash
   cd slickbook
   npm install
   ```
3. **Start the Development Server:**
   ```bash
   npx expo start
   ```
4. **Launch the App:**
   - Press `i` to open in iOS Simulator (macOS only)
   - Press `a` to open in Android Emulator
   - Or scan the QR code printed in the terminal with the Expo Go app.

## Test Credentials

Upon first boot, the app seeds itself with 3 test users that you can use to login.

- **User 1:** Email: `user1@test.com` / Password: `password123`
- **User 2:** Email: `user2@test.com` / Password: `password123`
- **User 3:** Email: `user3@test.com` / Password: `password123`

## Key Assumptions Made

- Real-time features are not needed; state operations simulate DB latency via local storage.
- Provider availability logic assumes that generating slots sequentially from "today" for 6 days is sufficient for the demo context.
- Once an appointment is booked, the generic mock provider loses that specific slot temporarily, mimicking a real database change.
- A user's session remains alive endlessly until they tap Logout.

## How to Build APK / IPA

To create a production build for Android (APK or AAB) or iOS, use EAS (Expo Application Services):
```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile preview    # For APK
```

## Known Limitations

- Image URLs are fetched dynamically using `pravatar`. They might take a split second to load over weak internet connections.
- Help/Support menu options just launch "Coming Soon" alerts.
- There is no automated password recovery flow.


