import React, {useEffect, useMemo} from 'react';
import { StatusBar, StyleSheet,View, Text, TouchableNativeFeedback} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

import Header from '../components/Header';
import Card from '../components/Card';
import Greetings from '../components/Greetings';


const screenData = {
  teacher: [
    {key: 'Announcements', name: 'Announcements', iconName: 'megaphone'},
    {key: 'Assignments', name: 'Assignments', iconName: 'document-text'},
    {key: 'Attendance', name: 'Take Attendance', iconName: 'people'},
    {key: 'Upload Marks', name: 'Upload Marks', iconName: 'cloud-upload'},
    {key: 'Examinations', name: 'Examinations', iconName: 'school'},
    {key: 'Results', name: 'Results', iconName: 'bar-chart'},
    {key: 'Calendar', name: 'Calendar', iconName: 'calendar'},
    {key: 'TimeTable', name: 'TimeTable', iconName: 'time'},
  ],
  student: [
    {key: 'Announcements', name: 'Announcements', iconName: 'megaphone'},
    {key:'User Details' , name: 'My Details', iconName: 'people'},
  ],
  admin: [
    {key:'Dashboard' , name: 'Dashboard', iconName: 'home'},
    {key: 'Announcements', name: 'Announcements', iconName: 'megaphone'},
    {key: 'Classes', name: 'Students', iconName: 'school',params:{type:'student'}},
    {key:'Users' , name: 'Teachers', iconName: 'person-add',params:{type:'teacher',title:'Teachers'}},
    {key:'Users' , name: 'Employees', iconName: 'person-add',params:{type:'employee',title:'Employees'}},
  ],
  employee: [
    {key: 'Announcements', name: 'Announcements', iconName: 'megaphone'},
    {key: 'Assignments', name: 'Assignments', iconName: 'document-text'},
    {key: 'Attendance', name: 'Take Attendance', iconName: 'people'},
    {key: 'Upload Marks', name: 'Upload Marks', iconName: 'cloud-upload'},
    {key: 'Results', name: 'Results', iconName: 'bar-chart'},
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