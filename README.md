# RestaurantChooser

A React Native + Expo mobile app that helps a group of people decide where to eat. Built for the Mobile Application Development course (Weeks 3–8).

**Student:** Sidi Mohamed El Eyil
**Platform:** Android / iOS / Web
**Expo SDK:** 54

---

## What the App Does

1. **Manage Restaurants** — add restaurants with name, cuisine, price, rating, phone, address, website, and delivery info
2. **Manage People** — add people with first name, last name, and relationship
3. **Decision Flow** — a guided 5-screen flow that randomly picks a restaurant for your group, with a veto system so anyone can eliminate a pick once

---

## How to Run Locally

### Prerequisites

- Node.js 18+
- Expo Go app on your phone (SDK 54) — available on Google Play / App Store

### Install and Start

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/RestaurantChooser.git
cd RestaurantChooser

# Install dependencies
npm install

# Start the development server
npx expo start
```

Scan the QR code with Expo Go on your phone. You can also run on an emulator:

```bash
npx expo start --android   # Android emulator
npx expo start --ios       # iOS simulator (Mac only)
npx expo start --web       # Browser
```

### Troubleshooting

```bash
# Clear Metro cache
npx expo start -c

# Reinstall dependencies
rm -rf node_modules && npm install
```

---

## Expo Build

The app has been published via EAS Build.

**Build link:** https://expo.dev/accounts/kalibsm/projects/RestaurantChooser/builds/a3ea5d2f-8248-438c-81e1-ebb8f4f4985a

To install the APK directly on an Android device, open the link above and tap Download — no Play Store required.

---

## Project Structure

```
RestaurantChooser/
├── App.js                                  Entry point
├── app.json                                Expo + EAS configuration
├── eas.json                                EAS Build profiles
├── assets/                                 Icons, splash, tab images
├── components/
│   ├── navigation.js                       Tab navigator (NavigationContainer inside)
│   ├── customButton.js                     Reusable button component
│   └── customTextInput.js                  Reusable labeled text input
└── screens/
    ├── restaurants/
    │   ├── restaurantsScreen.js            Stack navigator
    │   ├── listScreen.js                   Restaurant list + delete
    │   ├── addScreen.js                    Add restaurant form
    │   └── validators.js                   Field validators
    ├── people/
    │   ├── peopleScreen.js                 Stack navigator
    │   ├── listScreen.js                   People list + delete
    │   ├── addScreen.js                    Add person form
    │   └── validators.js                   Field validators
    └── decision/
        ├── decisionScreenNavigation.js     Stack navigator
        ├── decisionScreen.js               Landing tap screen
        ├── whosGoingScreen.js              Checkbox participant selection
        ├── preFiltersScreen.js             Cuisine / price / rating / delivery filters
        ├── choiceScreen.js                 Random pick + veto modals
        └── postChoiceScreen.js             Final result display
```

---

## Navigation Structure

```
Tab Navigator (Material Top Tabs)
├── Restaurants  →  Stack (List → Add)
├── Decision     →  Stack (DecisionTime → WhosGoing → PreFilters → Choice → PostChoice)
└── People       →  Stack (List → Add)
```

---

## Data Storage

All data is saved locally on the device with AsyncStorage.

| Key | Contents |
|-----|----------|
| `"restaurants"` | `[{ key, name, cuisine, price, rating, phone, address, website, delivery }]` |
| `"people"` | `[{ key, firstName, lastName, relationship }]` |

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `expo` ~54.0.0 | Build toolchain |
| `react-native` 0.81.5 | Mobile UI framework |
| `@react-navigation/material-top-tabs` | Tab navigation |
| `@react-navigation/native-stack` | Screen navigation |
| `@react-native-async-storage/async-storage` | Local storage |
| `@react-native-picker/picker` | Dropdown pickers |
| `expo-checkbox` | Checkboxes in participant selection |
| `react-native-toast-message` | Toast notifications |

---

## Building with EAS

```bash
# Install EAS CLI
npm install -g eas-cli

# Log in to your Expo account
eas login

# Build a shareable APK (Android)
eas build --platform android --profile preview

# Build for production (Google Play)
eas build --platform android --profile production
```

The `preview` profile generates an `.apk` you can install directly on any Android device.
The `production` profile generates an `.aab` for the Google Play Store.
