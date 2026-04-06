import React, {useState, useContext} from 'react';
import {View, TextInput} from 'react-native';
import CustomButton from '../components/CustomButton';
import {AppContext} from '../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfile({navigation}) {

  const {student,setStudent} = useContext(AppContext);

  const [name,setName] = useState(student.name);

  const save = async () => {
    const updated = {...student, name};
    await AsyncStorage.setItem('student', JSON.stringify(updated));
    setStudent(updated);
    navigation.goBack();
  };

  return (
    <View>
      <TextInput value={name} onChangeText={setName}/>
      <CustomButton title="Save" onPress={save}/>
    </View>
  );
}