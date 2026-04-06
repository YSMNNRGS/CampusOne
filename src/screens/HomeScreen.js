import React, {useContext, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {AppContext} from '../context/AppContext';

export default function HomeScreen({navigation}) {

  const {student} = useContext(AppContext);

  return (
    <View>
      <Text>{student?.name}</Text>
      <Text>{student?.sap}</Text>
      <Text>{student?.semester}</Text>
      <Text>{student?.gpa}</Text>
      <Text>{student?.cgpa}</Text>

      <TouchableOpacity onPress={()=>navigation.navigate('EditProfile')}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate('Courses')}>
        <Text>Courses</Text>
      </TouchableOpacity>
    </View>
  );
}