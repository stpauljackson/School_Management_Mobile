import React, {useEffect, useMemo} from 'react';
import { StatusBar, StyleSheet,View, Text, TouchableNativeFeedback} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

import Header from '../components/Header';
import Card from '../components/Card';
import Greetings from '../components/Greetings';


const screenData = {
  teacher: [
    {key: 'Announcements', name: 'Announcements', iconName: 'Announcements'},
    {key: 'Assignments', name: 'Assignments', iconName: 'Assignments'},
    {key: 'Attendance', name: 'Take Attendance', iconName: 'Take Attendance'},
    {key: 'Upload Marks', name: 'Upload Marks', iconName: 'Upload Marks'},
    {key: 'Calendar', name: 'Calendar', iconName: 'Calendar'},
    {key: 'TimeTable', name: 'TimeTable', iconName: 'TimeTable'},
    {key: 'Daily Planner', name: 'Daily Planner', iconName: 'TimeTable'},
  ],
  student: [
    {key: 'Announcements', name: 'Announcements', iconName: 'Announcements'},
    {key: 'All Assignments', name: 'Assignments', iconName: 'Assignments',params:{headerTitle:'Assignments'}},
    {key:'User Details' , name: 'My Details', iconName: 'My Details'},
    {key: 'Daily Planner', name: 'Daily Planner', iconName: 'TimeTable'},
    {key: 'Examinations', name: 'Examinations', iconName: 'Examinations'},
  ],
  admin: [
    {key:'Dashboard' , name: 'Dashboard', iconName: 'Dashboard'},
    {key: 'Announcements', name: 'Announcements', iconName: 'Announcements'},
    {key: 'Classes', name: 'Students', iconName: 'Students',params:{type:'student'}},
    {key:'Users' , name: 'Teachers', iconName: 'Teachers',params:{type:'teacher',title:'Teachers'}},
    {key:'Users' , name: 'Employees', iconName: 'Employees',params:{type:'employee',title:'Employees'}},
    {key:'Classes' , name: 'Examinations', iconName: 'Examinations',params:{type:'examination'}},
    {key: 'Daily Planner', name: 'Daily Planner', iconName: 'TimeTable'},
  ],
  employee: [
    {key: 'Announcements', name: 'Announcements', iconName: 'Announcements'},
    {key: 'Attendance', name: 'Take Attendance', iconName: 'Take Attendance'},
    {key: 'Upload Marks', name: 'Upload Marks', iconName: 'Upload Marks'},
    {key: 'Results', name: 'Results', iconName: 'Results'},
    {key: 'Daily Planner', name: 'Daily Planner', iconName: 'TimeTable'},
  ],
};

const getScreenList = userType => {
  return screenData[userType] ? screenData[userType] : [];
};

export default function Home({navigation}) {
  const userData = useSelector(state => state?.Auth?.userData);
  const data = getScreenList(userData?.type)
  useEffect(() => {
    console.log(userData);
  }, []);
  return (
    <View style={{backgroundColor:'white', flex:1}}>
      <Header navigation={navigation} />
      <Greetings />
      <Text style={{padding:10,fontWeight:'bold',fontSize:20,color:'#777',marginTop:10}}>Academics</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.name}
        renderItem={({item}) => <Card item={item} navigation={navigation} />}
        numColumns={2}
      />
      </View>
  );
}