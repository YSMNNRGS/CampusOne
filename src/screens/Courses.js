import React from 'react';
import {View} from 'react-native';
import CourseCard from '../components/CourseCard';

export default function Courses(){

  const courses = [
    {name:"DSA", time:"9-10"},
    {name:"OS", time:"10-11"},
    {name:"DB", time:"11-12"},
    {name:"AI", time:"1-2"},
    {name:"ML", time:"2-3"},
    {name:"CN", time:"3-4"},
    {name:"SE", time:"4-5"},
  ];

  return (
    <View>
      {courses.map((c,i)=>(
        <CourseCard key={i} course={c}/>
      ))}
    </View>
  );
}