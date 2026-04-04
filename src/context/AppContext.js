import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({children}) => {
  const [student, setStudent] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    loadTheme();
    loadStudent();
  }, []);

  const loadTheme = async () => {
    const savedTheme = await AsyncStorage.getItem('theme');
    if(savedTheme) setTheme(savedTheme);
  };

  const loadStudent = async () => {
    const data = await AsyncStorage.getItem('student');
    if(data) setStudent(JSON.parse(data));
  };

  const updateTheme = async (value) => {
    setTheme(value);
    await AsyncStorage.setItem('theme', value);
  };

  return (
    <AppContext.Provider value={{student, setStudent, theme, updateTheme}}>
      {children}
    </AppContext.Provider>
  );
};