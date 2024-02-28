import {SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../components/Header';
// import Card from '../components/Card';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';

const screenData = [
    { name: 'Events', gradient: { start: 'orangered', end: 'gold' } },
    { name: 'TimeTable', gradient: { start: 'orangered', end: 'gold' } },
    { name: 'Attendance', gradient: { start: 'aquamarine', end: 'lime' } },
    { name: 'Assignment', gradient: { start: 'orangered', end: 'gold' } },
    { name: 'Examinations', gradient: { start: '#ffafbd', end: '#ffafbd' } },
    { name: 'Results', gradient: { start: 'yellow', end: 'lightcoral' } },
  ];
  
export default function Home() {
  const fetchData = async () => {
    try {
      const userDocument = await firestore()
        .collection('users')
        .doc('eO7PU0APNsRMrHAkNfcS')
        .get();

      if (userDocument.exists) {
        // Access the document data using the data() method
        const userData = userDocument.data();
        console.log('fetchData', userData);
      } else {
        console.log('Document does not exist');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };
  useEffect(() => {
    //fetchData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Header />
      {/* <FlatList
      data={screenData}
      keyExtractor={(item) => item.name}
      renderItem={({item}) => <Card item={item}  />}
      numColumns={2} 
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    marginTop: StatusBar.currentHeight,
  },
  greetings: {

  }
});
