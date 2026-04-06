import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import EditProfile from '../screens/EditProfile';
import Settings from '../screens/Settings';
import Courses from '../screens/Courses';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="Courses" component={Courses}/>
      <Tab.Screen name="Settings" component={Settings}/>
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Auth" component={AuthScreen}/>
        <Stack.Screen name="Main" component={Tabs}/>
        <Stack.Screen name="EditProfile" component={EditProfile}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}