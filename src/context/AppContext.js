import React, { createContext, useState, useEffect } from 'react';

import {
  clearAppStorage,
  getCurrentUser,
  getLoginStatus,
  getSavedTheme,
  loginUser,
  logoutUser,
  saveTheme,
  signupUser,
  updateCurrentUserProfile,
} from '../utils/storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [theme, setTheme] = useState('light');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
  try {
    const savedTheme = await getSavedTheme();
    if (savedTheme) setTheme(savedTheme);

    const loggedIn = await getLoginStatus();
    const user = await getCurrentUser();

    if (loggedIn && user) {
      setIsLoggedIn(true);
      setStudent(user);
    } else {
      setIsLoggedIn(false);
      setStudent(null);
    }
  } catch (error) {
    console.log('App init error:', error);
    setIsLoggedIn(false);
    setStudent(null);
  } finally {
    setIsAppLoading(false);
  }
};

  const handleSignup = async (signupData) => {
    const result = await signupUser(signupData);

    if (result.success) {
      setStudent(result.user);
      setIsLoggedIn(true);
    }

    return result;
  };

  const handleLogin = async (email, password) => {
    const result = await loginUser(email, password);

    if (result.success) {
      setStudent(result.user);
      setIsLoggedIn(true);
    }

    return result;
  };

  const handleLogout = async () => {
  await logoutUser();
  setStudent(null);
  setIsLoggedIn(false);
};

 const handleResetApp = async () => {
  await clearAppStorage();
  setStudent(null);
  setIsLoggedIn(false);
  setTheme('light');
};

  const handleThemeToggle = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    await saveTheme(newTheme);
  };

  const refreshStudent = async () => {
    const user = await getCurrentUser();
    setStudent(user);
    return user;
  };

  const handleProfileUpdate = async (updatedProfile) => {
    const result = await updateCurrentUserProfile(updatedProfile);

    if (result.success) {
      setStudent(result.user);
    }

    return result;
  };

  return (
    <AppContext.Provider
      value={{
        student,
        setStudent,
        theme,
        isLoggedIn,
        isAppLoading,
        handleSignup,
        handleLogin,
        handleLogout,
        handleResetApp,
        handleThemeToggle,
        refreshStudent,
        handleProfileUpdate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};