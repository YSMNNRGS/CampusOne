import React, {useState, useContext} from 'react';
import {View, TextInput, ImageBackground, Text} from 'react-native';
import CustomButton from '../components/CustomButton';
import {AppContext} from '../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthScreen({navigation}) {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {setStudent} = useContext(AppContext);

  const handleSignup = async () => {
    const studentData = {
      email,
      password,
      name: "Student",
      semester: "1",
      gpa: "3.5",
      cgpa: "3.5",
      sap: "12345"
    };

    await AsyncStorage.setItem('student', JSON.stringify(studentData));
    await AsyncStorage.setItem('loggedIn','true');

    setStudent(studentData);
    navigation.replace("Main");
  };

  const handleLogin = async () => {
    const data = await AsyncStorage.getItem('student');
    const user = JSON.parse(data);

    if(user && user.email === email && user.password === password){
      await AsyncStorage.setItem('loggedIn','true');
      setStudent(user);
      navigation.replace("Main");
    }
  };

  return (
    <ImageBackground source={require('../../assets/bg.jpg')} style={{flex:1, justifyContent:'center'}}>
      <TextInput placeholder="Email" onChangeText={setEmail}/>
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword}/>

      <CustomButton title="Login" onPress={handleLogin}/>
      <CustomButton title="Signup" onPress={handleSignup}/>
    </ImageBackground>
  );
}