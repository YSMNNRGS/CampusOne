import React, {useContext} from 'react';
import {View, Switch} from 'react-native';
import {AppContext} from '../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings({navigation}) {

  const {theme, updateTheme} = useContext(AppContext);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    updateTheme(newTheme);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('loggedIn');
    navigation.replace('Auth');
  };

  const reset = async () => {
    await AsyncStorage.clear();
    navigation.replace('Auth');
  };

  return (
    <View>
      <Switch value={theme === 'dark'} onValueChange={toggleTheme}/>
    </View>
  );
}