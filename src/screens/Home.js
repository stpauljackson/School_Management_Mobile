import React, {useEffect, useMemo} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Button} from 'react-native';
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
    {key: 'Assignments', name: 'Assignments', iconName: 'document-text'},
    {key: 'Attendance', name: 'Take Attendance', iconName: 'people'},
    {key: 'Upload Marks', name: 'Upload Marks', iconName: 'cloud-upload'},
    {key: 'Results', name: 'Results', iconName: 'bar-chart'},
  ],
  admin: [
    {key: 'Announcements', name: 'Announcements', iconName: 'megaphone'},
    {key: 'Assignments', name: 'Assignments', iconName: 'document-text'},
    {key: 'Students', name: 'Students', iconName: 'people'},
    {key: 'Teachers', name: 'Teachers', iconName: 'school'},
    {key: 'Examinations', name: 'Examinations', iconName: 'school'},
    {key: 'Results', name: 'Results', iconName: 'bar-chart'},
    {key: 'Calendar', name: 'Calendar', iconName: 'calendar'},
    {key: 'TimeTable', name: 'TimeTable', iconName: 'time'},
  ],
  employee: [
    {key: 'Announcements', name: 'Announcements', iconName: 'megaphone'},
    {key: 'Assignments', name: 'Assignments', iconName: 'document-text'},
    {key: 'Attendance', name: 'Take Attendance', iconName: 'people'},
    {key: 'Upload Marks', name: 'Upload Marks', iconName: 'cloud-upload'},
    {key: 'Results', name: 'Results', iconName: 'bar-chart'},
  ],
};

export default function Home({navigation}) {
  const userData = useSelector(state => state?.Auth?.userData);
  const data = useMemo(() => screenData[userData.type], [userData.type]);

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
});
