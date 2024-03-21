import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import Header from '../components/Header';
import Card from '../components/Card';
import Greetings from '../components/Greetings';

const screenData = [
  {key: 'Announcements', name: 'Announcements', iconName: 'megaphone'},
  {key: 'Assignments', name: 'Assignments',iconName: 'document-text'},
  {key: 'Attendance', name: 'Take Attendance', iconName: 'people'},
  {key: 'Upload Marks', name: 'Upload Marks', iconName: 'cloud-upload'},
  {key: 'Examinations', name: 'Examinations', iconName: 'school'},
  {key: 'Results', name: 'Results', iconName: 'bar-chart'},
  {key: 'Calendar', name: 'Calendar', iconName: 'calendar'},
  {key: 'TimeTable', name: 'TimeTable', iconName: 'time'},
];

export default function Home({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Greetings />
      <FlatList
        data={screenData}
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
