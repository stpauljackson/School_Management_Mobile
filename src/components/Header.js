import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Header({navigation}) {
  return (
    <View style={styles.container}>
       <TouchableNativeFeedback onPress={()=>navigation.toggleDrawer()}><Ionicons name="menu" size={25} color="black" /></TouchableNativeFeedback> 
      
      <Text style={styles.text}>School App</Text>
      <TouchableNativeFeedback onPress={()=>navigation.navigate('Notifications')}>
        <Ionicons name="notifications" size={25} color="black" />
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  text: {
    fontSize: 27,
    fontWeight: 'bold',
  },
});
