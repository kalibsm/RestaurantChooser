# RestaurantChooser — App Description

**Course:** Mobile Application Development — Semester 2  
**Student:** Sidi Mohamed El Eyil  
**Weeks:** 3–8  
**Platform:** React Native + Expo (SDK 54)

---

## Overview

RestaurantChooser is a mobile app that helps a group of people decide where to eat. Users manage a list of restaurants and a list of people, then run a decision flow that randomly picks a restaurant while allowing participants to veto choices they don't want.

---

## Features

### Restaurants
- Add restaurants with full details: name, cuisine type, price level, rating, phone, address, website, and delivery availability
- View all saved restaurants in a scrollable list
- Delete any restaurant with a confirmation prompt
- All data persisted locally with AsyncStorage

### People
- Add people with first name, last name, and relationship type
- View all saved people in a list
- Delete any person with a confirmation prompt
- All data persisted locally with AsyncStorage

### Decision Flow
A five-screen guided flow for choosing a restaurant as a group:

1. **Decision Time** — tap the food image to start; validates that people and restaurants exist before proceeding
2. **Who's Going** — select which people are participating using checkboxes; at least one must be selected
3. **Pre-Filters** — optionally narrow down restaurants by cuisine, max price, min rating, and delivery availability before the random pick
4. **Choice** — randomly picks a restaurant from the filtered list; each participant can veto one pick (removing that restaurant and themselves from future vetoes); if only one restaurant remains it is selected automatically
5. **Post Choice** — displays the final chosen restaurant with all its details; "All Done" resets the flow

---

## Screens

| Screen | File | Description |
|--------|------|-------------|
| Restaurants List | `screens/restaurants/listScreen.js` | Lists all saved restaurants, delete action |
| Add Restaurant | `screens/restaurants/addScreen.js` | Form to add a new restaurant |
| People List | `screens/people/listScreen.js` | Lists all saved people, delete action |
| Add Person | `screens/people/addScreen.js` | Form to add a new person |
| Decision Time | `screens/decision/decisionScreen.js` | Landing screen for the decision flow |
| Who's Going | `screens/decision/whosGoingScreen.js` | Checkbox selection of participants |
| Pre-Filters | `screens/decision/preFiltersScreen.js` | Optional filter pickers |
| Choice | `screens/decision/choiceScreen.js` | Random pick with veto system |
| Post Choice | `screens/decision/postChoiceScreen.js` | Final result display |

---

## Navigation Structure

```
App.js
└── NavigationContainer  (inside components/navigation.js)
    └── Material Top Tab Navigator
        ├── Restaurants Tab
        │   └── Native Stack Navigator
        │       ├── RestaurantsList
        │       └── RestaurantsAdd
        ├── Decision Tab
        │   └── Native Stack Navigator
        │       ├── DecisionTimeScreen
        │       ├── WhosGoingScreen
        │       ├── PreFiltersScreen
        │       ├── ChoiceScreen
        │       └── PostChoiceScreen
        └── People Tab
            └── Native Stack Navigator
                ├── PeopleList
                └── PeopleAdd
```

---

## Folder Structure

```
RestaurantChooser/
├── App.js                          Entry point
├── app.json                        Expo configuration
├── index.js                        Expo entry registration
├── assets/                         Images and icons
│   ├── appIcon.png
│   ├── splash.png
│   ├── icon-restaurants.png
│   ├── icon-decision.png
│   ├── icon-people.png
│   ├── its-decision-time.android.png
│   └── its-decision-time.ios.png
├── components/
│   ├── navigation.js               Tab navigator + NavigationContainer
│   ├── customButton.js             Reusable button (text, disabled, styles)
│   └── customTextInput.js          Reusable labeled text input with error display
├── screens/
│   ├── restaurants/
│   │   ├── restaurantsScreen.js    Stack navigator for restaurants
│   │   ├── listScreen.js           Restaurant list
│   │   ├── addScreen.js            Add restaurant form
│   │   └── validators.js           Name, phone, address, website validators
│   ├── people/
│   │   ├── peopleScreen.js         Stack navigator for people
│   │   ├── listScreen.js           People list
│   │   ├── addScreen.js            Add person form
│   │   └── validators.js           First name, last name validators
│   └── decision/
│       ├── decisionScreenNavigation.js  Stack navigator for decision flow
│       ├── decisionScreen.js            Decision Time landing screen
│       ├── whosGoingScreen.js           Participant selection
│       ├── preFiltersScreen.js          Restaurant filters
│       ├── choiceScreen.js              Random pick + veto logic
│       └── postChoiceScreen.js          Final result
```

---

## Reusable Components

### CustomButton (`components/customButton.js`)
A touchable button with configurable text, styles, width, and disabled state.

| Prop | Type | Description |
|------|------|-------------|
| `text` | string | Button label |
| `onPress` | function | Press handler |
| `buttonStyle` | object | Override button container style |
| `textStyle` | object | Override label style |
| `width` | string / number | Optional fixed width |
| `disabled` | bool | Gray background, press blocked when true |

### CustomTextInput (`components/customTextInput.js`)
A labeled text input that displays a red error message below when invalid.

| Prop | Type | Description |
|------|------|-------------|
| `label` | string | Field label above the input |
| `value` | string | Controlled value |
| `onChangeText` | function | Change handler |
| `maxLength` | number | Max character limit |
| `error` | string | Error message shown in red below input |
| `keyboardType` | string | e.g. `phone-pad`, `url` |
| `autoCapitalize` | string | e.g. `none`, `sentences` |

---

## Validation

### Restaurant validators (`screens/restaurants/validators.js`)

| Function | Rule |
|----------|------|
| `validateName` | Required, min 2 chars, regex `^[a-zA-Z0-9\s,'-]*$` |
| `validatePhone` | Required, 10–15 digits, no letters |
| `validateAddress` | Required, must contain a number and letters |
| `validateWebsite` | Required, must start with `http://` or `https://` |

### People validators (`screens/people/validators.js`)

| Function | Rule |
|----------|------|
| `validateFirstName` | Required, min 2 chars, same regex as name |
| `validateLastName` | Required, min 2 chars, same regex as name |

---

## Data Storage

All data is stored locally on the device using `@react-native-async-storage/async-storage`.

| Key | Value | Shape |
|-----|-------|-------|
| `"restaurants"` | JSON array | `{ key, name, cuisine, price, rating, phone, address, website, delivery }` |
| `"people"` | JSON array | `{ key, firstName, lastName, relationship }` |

Keys are generated at creation time: `r_${Date.now()}` for restaurants, `p_${Date.now()}` for people.

---

## Decision Flow — Veto System

Each participant starts with `vetoed: "no"`. When a participant vetoes a pick:
- That restaurant is removed from the pool
- That participant's `vetoed` field is set to `"yes"` — they cannot veto again
- If all participants have vetoed, the Veto button is disabled
- If the pool reaches 0 restaurants → alert "Game over", return to start
- If the pool reaches exactly 1 restaurant → navigate directly to Post Choice

---

## Tech Stack

| Library | Version | Purpose |
|---------|---------|---------|
| Expo | ~54.0.0 | Build toolchain and runtime |
| React Native | 0.81.5 | Mobile UI framework |
| React | 19.1.0 | UI library |
| @react-navigation/native | ^7.x | Navigation core |
| @react-navigation/native-stack | ^7.x | Stack navigators |
| @react-navigation/material-top-tabs | ^7.x | Tab navigator |
| @react-native-async-storage/async-storage | ^3.x | Local data persistence |
| @react-native-picker/picker | ^2.x | Dropdown pickers |
| expo-checkbox | ~5.0.8 | Checkboxes in Who's Going screen |
| expo-constants | ~18.x | Device/platform constants |
| expo-status-bar | ~3.x | Status bar control |
| react-native-toast-message | ^2.x | In-app toast notifications |
| react-native-gesture-handler | ~2.x | Swipe and gesture support |
| react-native-screens | ~4.x | Native screen containers |
| react-native-safe-area-context | ~5.x | Safe area insets |
| react-native-pager-view | 6.x | Tab swipe animation |
| prop-types | ^15.x | Runtime prop validation |

---

## How to Run

```bash
# Install dependencies
npm install

# Start the development server
npx expo start

# Run on Android emulator
npx expo start --android

# Run on iOS simulator
npx expo start --ios

# Run in browser
npx expo start --web
```

Scan the QR code with the **Expo Go** app (SDK 54) on your phone to run on a real device.

---

## Known Platform Notes

- **Android back button** on the Who's Going screen shows a confirmation alert before leaving the decision flow
- **Picker height** is platform-specific: taller on iOS (scroll wheel), compact on Android (dropdown)
- **Splash screen** is configured for both mobile (`app.json → splash`) and web (`app.json → web.splash`)
- **Tab icons** are tinted red when active using React Navigation's `tabBarActiveTintColor`
