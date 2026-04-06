import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function CourseCard({course}){
  return (
    <TouchableOpacity>
      <View style={{padding:10, margin:10, backgroundColor:'#eee'}}>
        <Text>{course.name}</Text>
        <Text>{course.time}</Text>
      </View>
    </TouchableOpacity>
  );
}