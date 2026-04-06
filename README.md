#📱 CampusONE – Student Portal Mobile App

A fully functional Student Portal Mobile Application built using React Native, designed to simulate a real-world student system with authentication, profile management, course tracking, and persistent local storage.

🚀 Project Overview

CampusONE is a frontend mobile app that allows students to:

Create an account (Signup)
Log in securely
View and edit their academic profile
Manage app settings (theme, logout, reset)
View enrolled courses

All data is stored locally using AsyncStorage, making the app fully functional without a backend.

This project focuses on real app behavior, not just UI — including persistence, state management, and navigation.

🎯 Core Features
🔐 Authentication
Login and Signup system
Stores user credentials and profile in AsyncStorage
Maintains login session
🏠 Home Dashboard
Displays student data:
Name
SAP ID
Semester
GPA / CGPA
Profile picture
Navigation to other screens
✏️ Edit Profile
Update:
Name
Semester
GPA / CGPA
Courses
Saves updates persistently
⚙️ Settings
Dark / Light theme toggle
Logout functionality
Reset app data (clears AsyncStorage)
📚 Enrolled Courses
Displays 7 courses in card UI
Each course includes:
Name
Timing
Clean UI with spacing and styling
🧠 Concepts & Technologies Used

This project strictly implements all required concepts:

🔹 Navigation
Nested Navigation
Stack Navigator + Bottom Tabs / Drawer
🔹 React Hooks
useState → local state handling
useEffect → load data from storage
useContext → global state (student + theme)
🔹 Async Programming
Async/Await
Promises
Data fetching from AsyncStorage
🔹 Local Storage
AsyncStorage used as a local database
Stores:
Users
Current session
Theme preferences
🔹 Component-Based Architecture
Reusable components:
CustomInput
CustomButton
Clean folder structure
🔹 UI Design
Custom fonts
Icons
TouchableOpacity
StatusBar
Switch component
Global + internal styling
🗂️ Project Structure
src/
│
├── components/        # Reusable UI components
├── screens/           # App screens (Auth, Home, Edit, Settings, Courses)
├── navigation/        # Navigation setup
├── context/           # Global state (AppContext)
├── utils/             # AsyncStorage logic
├── styles/            # Global styling and themes
💾 Data Storage Logic

All app data is handled through AsyncStorage:

USERS → All registered users
CURRENT_USER → Logged-in user
IS_LOGGED_IN → Session state
THEME → Light/Dark mode

This ensures:

Persistent login
Persistent profile data
Real app-like behavior
🔄 App Flow
User opens app
If logged in → Home screen
Else → Authentication screen
Signup Flow:
User enters full profile data
Data saved in AsyncStorage
Redirect to Home
Login Flow:
Validate credentials
Load saved user data
Redirect to Home
🧪 Testing Flow

To test the app properly:

Reset app data
Create a new account
Verify Home displays correct data
Edit profile → save changes
Logout → Login again
Confirm data persists
⚠️ Important Notes
Clear AsyncStorage before testing new updates
Old data structures may cause mismatch
App works fully offline (no backend)
📸 Screens Included
Authentication Screen (Login / Signup)
Home Dashboard
Edit Profile Screen
Settings Screen
Courses Screen
💡 Key Highlights
Real-world simulation using local storage
Clean UI with consistent theme
Fully persistent state
Modular and scalable structure
No dummy data — everything is user-driven
📌 Project Requirements Reference

This project was built strictly following the given requirements:

Navigation (Nested, multiple types)
React Hooks (useState, useEffect, useContext)
AsyncStorage integration
Async programming
Component structure
UI styling and interactivity

🛠️ Future Improvements
Backend integration (Firebase / Node.js)
Image upload for profile picture
Real-time notifications
API-based course data
👩‍💻 Author

Developed as part of a Mobile App Development midterm project using React Native.
