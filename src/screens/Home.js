import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Header from '../components/Header';
import Card from '../components/Card';
import Greetings from '../components/Greetings';

const screenData = [
    { key:'Announcements',name: 'Announcements'},
    { key:'TimeTable',name: 'TimeTable'},
    { key:'Attendance',name: 'Take Attendance'},
    { key:'Upload Marks',name: 'Upload Marks' },
    { key:'Examinations',name: 'Examinations' },
    { key:'Results',name: 'Results' },
  ];
  
export default function Home({navigation}) {

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Greetings />
      <FlatList
      data={screenData}
      keyExtractor={(item) => item.name}
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
