# FitLocal Mobile

React Native app built with Expo for iOS and Android.

## Building iOS Without a Mac

Since we don't have a Mac, we use **EAS Build** to build the iOS app in the cloud.

### Setup

1. Install EAS CLI:
\`\`\`bash
npm install -g eas-cli
\`\`\`

2. Login to Expo:
\`\`\`bash
eas login
\`\`\`

3. Configure the project:
\`\`\`bash
eas build:configure
\`\`\`

4. Build for iOS (cloud build):
\`\`\`bash
eas build --platform ios --profile preview
\`\`\`

This will:
- Upload your code to Expo's cloud
- Build the iOS app remotely on Mac servers
- Generate an .ipa file you can install on devices

### Running the App

**Development (Expo Go):**
\`\`\`bash
npx expo start
\`\`\`
Then scan QR code with Expo Go app.

**Android (APK):**
\`\`\`bash
eas build --platform android
\`\`\`

**iOS Simulator (requires Mac):**
\`\`\`bash
npx expo run:ios
\`\`\`

## Project Structure

\`\`\`
src/
  screens/
    ProfileScreen.tsx    # User profile input
    GymStoreScreen.tsx   # Gym & store selection
    ResultsScreen.tsx    # Plan results
App.tsx                  # Navigation setup
\`\`\`
