import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

export default function CustomButton({title,onPress}){
  return (
    <TouchableOpacity onPress={onPress} style={{padding:10,backgroundColor:'blue'}}>
      <Text style={{color:'white'}}>{title}</Text>
    </TouchableOpacity>
  );
}