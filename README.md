# 📱 CampusONE – Student Portal Mobile App

A fully functional **Student Portal Mobile Application** built using **React Native**, designed to simulate a real-world student system with authentication, profile management, course tracking, and persistent local storage.

---

## 🚀 Project Overview

CampusONE allows students to:

- Create an account (Signup)
- Log in securely
- View their academic profile
- Edit their profile
- Manage app settings (theme, logout, reset)
- View enrolled courses

All data is stored locally using **AsyncStorage**, making the app fully functional without a backend.

---

## 🎯 Features

### 🔐 Authentication
- Login and Signup system
- Stores user credentials and profile in AsyncStorage
- Maintains login session

### 🏠 Home Dashboard
- Displays:
  - Name
  - SAP ID
  - Semester
  - GPA / CGPA
  - Profile picture
- Navigation to other screens

### ✏️ Edit Profile
- Update:
  - Name
  - Semester
  - GPA / CGPA
  - Courses
- Saves updates persistently

### ⚙️ Settings
- Dark / Light theme toggle
- Logout functionality
- Reset app data (clears AsyncStorage)

### 📚 Enrolled Courses
- Displays 7 courses in card layout
- Each course includes:
  - Name
  - Timing

---

## 🧠 Technologies & Concepts

### 🔹 Navigation
- Nested Navigation
- Stack Navigator + Bottom Tabs / Drawer

### 🔹 React Hooks
- `useState`
- `useEffect`
- `useContext`

### 🔹 Async Programming
- Async/Await
- Promises

### 🔹 Local Storage
- AsyncStorage used as a local database

Stores:
- Users
- Current session
- Theme preferences

### 🔹 UI & Components
- Custom components (Input, Button)
- Icons
- TouchableOpacity
- StatusBar
- Switch
- Global + internal styling
## 🗂️ Project Structure
src/
├── components/
├── screens/
├── navigation/
├── context/
├── utils/
├── styles/


---

## 💾 Data Storage

AsyncStorage keys used:

- `USERS`
- `CURRENT_USER`
- `IS_LOGGED_IN`
- `THEME`

Ensures:
- Persistent login
- Persistent profile data
- Real app-like behavior

---

## 🔄 App Flow

### On Launch
- If logged in → Home Screen
- Else → Authentication Screen

### Signup Flow
1. Enter full profile data
2. Data saved in AsyncStorage
3. Redirect to Home

### Login Flow
1. Validate credentials
2. Load user data
3. Redirect to Home

---

## 🧪 Testing Steps

1. Reset app data
2. Create a new account
3. Verify Home shows correct data
4. Edit profile → save changes
5. Logout
6. Login again
7. Confirm data persists

---

## ⚠️ Notes

- Clear AsyncStorage before testing updates
- App works fully offline
- No backend integration

---

## 📸 Screens

- Authentication (Login / Signup)
- Home Dashboard
- Edit Profile
- Settings
- Courses

---

## 💡 Highlights

- Fully functional without backend
- Persistent data using AsyncStorage
- Clean UI with theme support
- Modular and scalable structure

---

## 🛠️ Future Improvements

- Backend integration (Firebase / Node.js)
- Profile image upload
- Notifications
- API-based course data

---

## 👩‍💻 Author

Built as part of a **React Native Mobile App Development project**.



## 🗂️ Project Structure
