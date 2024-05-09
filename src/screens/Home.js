import React, {useEffect, useMemo} from 'react';
import {SafeAreaView, StatusBar, StyleSheet,View, Text, TouchableNativeFeedback} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

import Header from '../components/Header';
import Card from '../components/Card';
import Greetings from '../components/Greetings';
import auth from '@react-native-firebase/auth';
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
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Greetings />
      <FlatList
        data={data}
        keyExtractor={item => item.name}
        renderItem={({item}) => <Card item={item} navigation={navigation} />}
        numColumns={2}
      />
      <TouchableNativeFeedback  onPress={() => {
          auth().signOut()
            .then(() => console.log('logged out'))
            .catch(e => console.log('error logging out: ', e.message))
        }}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </View>
      </TouchableNativeFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    marginTop: StatusBar.currentHeight,
  },
  button: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'royalblue',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
