# Restaurant Chooser App - Part 1

**Student: Sidi Mohamed El Eyil**  
**Course: Mobile Application Development - Week 3-5**  
**Date: March 2026**

## 📱 Project Overview

Restaurant Chooser is a React Native application designed to help groups of people decide where to eat. This is **Part 1** of the project, implementing the foundational features for managing restaurants and people.

### Features Implemented in Part 1

✅ **Restaurant Management**
- Add new restaurants with detailed information
- View list of all restaurants
- Delete restaurants with confirmation
- Data persistence using AsyncStorage

✅ **People Management**
- Add new people to the group
- View list of all people
- Delete people with confirmation
- Data persistence using AsyncStorage

✅ **Form Validation**
- Name validation (length, characters)
- Phone number validation (format, digits)
- Address validation (street number and name)
- Website validation (URL format, protocol)
- Cuisine, price, and rating validation

✅ **User Experience**
- Material Top Tabs navigation (3 tabs)
- Toast notifications for success/error messages
- Confirmation dialogs for destructive actions
- Clean, professional UI design
- Reusable components

## 🚀 Getting Started

### Prerequisites

- Node.js v12+ (recommended v18+)
- npm or yarn
- Expo Go app (for mobile testing)
- Android Studio or Xcode (optional, for emulators)

### Installation

1. **Clone or navigate to the project**:
   ```bash
   cd RestaurantChooser
   ```

2. **Install dependencies** (already done if you just created the project):
   ```bash
   npm install
   ```

### Running the App

1. **Start the development server**:
   ```bash
   npx expo start
   ```

2. **Run on your device/emulator**:
   - **Mobile Device**: Scan QR code with Expo Go app
   - **Android Emulator**: Press `a`
   - **iOS Simulator**: Press `i` (Mac only)
   - **Web Browser**: Press `w`

## 📂 Project Structure

```
RestaurantChooser/
├── App.js                              # Main app entry point
├── navigation/
│   └── navigation.js                   # Material Top Tabs navigator
├── components/
│   ├── customButton.js                 # Reusable button component
│   ├── customTextInput.js              # Reusable text input component
│   └── customPicker.js                 # Reusable picker component
├── screens/
│   ├── decisionScreen.js               # Decision tab (placeholder for Part 2)
│   ├── restaurants/
│   │   ├── restaurantsScreen.js        # Stack navigator for restaurants
│   │   ├── listScreen.js               # Restaurant list view
│   │   └── addScreen.js                # Add restaurant form
│   └── people/
│       ├── peopleScreen.js             # Stack navigator for people
│       ├── listScreen.js               # People list view
│       └── addScreen.js                # Add person form
├── utils/
│   └── validators.js                   # Validation functions
├── assets/                             # Images and icons
├── package.json                        # Dependencies
└── README.md                          # This file
```

## 🎨 Features Breakdown

### 1. Navigation Structure

**Material Top Tabs** with 3 tabs:
- **Restaurants** (🍴): Manage restaurant list
- **Decision** (🎯): Placeholder for decision feature (Part 2)
- **People** (👥): Manage people list

Each tab has:
- Custom color scheme
- Icon emoji
- Active/inactive states

### 2. Restaurant Management

**Add Restaurant Form** includes:
- Name (text input, required)
- Cuisine Type (picker: American, Chinese, French, Italian, Mexican, Other)
- Price Level (picker: $ to $$$$$)
- Rating (picker: 1-5 stars)
- Phone Number (phone keyboard, validated)
- Address (text input, validated)
- Website (URL keyboard, validated)

**Restaurant List** displays:
- Restaurant name
- Cuisine type with emoji
- Price level (dollar signs)
- Star rating
- Phone number
- Address
- Website (truncated)
- Delete button

### 3. People Management

**Add Person Form** includes:
- Name (text input, required, validated)

**People List** displays:
- Avatar with first letter
- Person name
- Delete button

### 4. Validation Rules

**Name Validation**:
- Required field
- Minimum 2 characters
- Only letters, spaces, hyphens, apostrophes

**Phone Validation**:
- Required field
- 10-15 digits
- No letters allowed

**Address Validation**:
- Required field
- Minimum 5 characters
- Must contain street number (digits)
- Must contain street name (letters)

**Website Validation**:
- Required field
- Must start with http:// or https://
- Valid URL format

**Cuisine/Price/Rating Validation**:
- Must be selected from available options
- Valid range checks

### 5. Data Persistence

**AsyncStorage** is used to store:
- `restaurants`: Array of restaurant objects
- `people`: Array of person objects

Data structure:
```javascript
// Restaurant object
{
  id: 1234567890,
  name: "Joe's Pizza",
  cuisine: "Italian",
  price: 2,
  rating: 4,
  phone: "+1 234-567-8900",
  address: "123 Main St, City, State",
  website: "https://joespizza.com"
}

// Person object
{
  id: 1234567890,
  name: "John Doe"
}
```

## 📦 Dependencies

```json
{
  "expo": "~55.0.6",
  "react": "19.2.0",
  "react-native": "0.83.2",
  "@react-navigation/native": "^7.1.33",
  "@react-navigation/native-stack": "^7.14.4",
  "@react-navigation/material-top-tabs": "^7.0.8",
  "@react-native-async-storage/async-storage": "^2.1.2",
  "react-native-toast-message": "^2.2.1",
  "react-native-pager-view": "^7.1.3",
  "react-native-screens": "~4.23.0",
  "react-native-safe-area-context": "~5.6.2",
  "react-native-gesture-handler": "~2.22.1",
  "expo-constants": "~17.0.3",
  "prop-types": "^15.8.1"
}
```

## 🧪 Testing Checklist

### Restaurants
- [ ] Add a new restaurant with all fields
- [ ] View restaurant in the list
- [ ] Delete a restaurant (confirm dialog appears)
- [ ] Try adding with missing fields (validation errors show)
- [ ] Try adding with invalid phone/website (validation errors show)
- [ ] Close and reopen app (data persists)

### People
- [ ] Add a new person
- [ ] View person in the list
- [ ] Delete a person (confirm dialog appears)
- [ ] Try adding with empty name (validation error shows)
- [ ] Try adding with invalid characters (validation error shows)
- [ ] Close and reopen app (data persists)

### Navigation
- [ ] Switch between tabs
- [ ] Navigate from list to add screen
- [ ] Navigate back from add screen
- [ ] Toast notifications appear correctly

## 🔧 Troubleshooting

### Metro Bundler Issues
```bash
npx expo start -c
```

### Port Already in Use
```bash
npx kill-port 8081
npx expo start
```

### Dependency Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### AsyncStorage Not Working
- Clear app data/cache
- Restart the app
- Check console for errors

## 🎯 Part 2 Features (Coming in Week 5-6)

The Decision screen will be implemented in Part 2 with:
- **Who's Going**: Select people attending
- **Filter Restaurants**: Filter by cuisine, price, rating
- **Random Selection**: Algorithm to choose restaurant
- **Veto System**: Allow people to veto choices
- **Final Decision**: Display chosen restaurant with details

## 📚 Key Concepts Demonstrated

1. **React Navigation**: Material Top Tabs, Stack Navigation
2. **State Management**: useState, useEffect hooks
3. **Data Persistence**: AsyncStorage API
4. **Form Validation**: Custom validation functions
5. **Component Reusability**: Custom components with PropTypes
6. **User Feedback**: Toast notifications, Alert dialogs
7. **Code Organization**: Modular file structure
8. **Best Practices**: PropTypes validation, error handling

## 🎓 Learning Outcomes

By completing this project, you have learned:
- ✅ How to implement Material Top Tabs navigation
- ✅ How to use AsyncStorage for data persistence
- ✅ How to create reusable components with PropTypes
- ✅ How to implement form validation
- ✅ How to handle user interactions (add, delete, navigate)
- ✅ How to show Toast notifications
- ✅ How to organize a React Native project
- ✅ How to work with FlatList for rendering lists

## 📝 Notes

- All validation functions are in `utils/validators.js`
- Components use PropTypes for type checking
- AsyncStorage operations are wrapped in try-catch blocks
- Navigation uses React Navigation v6+
- Toast notifications use react-native-toast-message

## 🙏 Acknowledgments

- React Native Documentation
- React Navigation Documentation
- Expo Documentation
- Course materials and instructors

## 📄 License

This is a student project for educational purposes.

---

**Created with ❤️ by Sidi Mohamed El Eyil**  
March 2026 • Mobile Application Development
