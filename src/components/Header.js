import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Header() {
  return (
    <View style={styles.container}>
       <Ionicons name='menu' size={25} color="black" />
       <Text style={styles.text}>School App</Text>
       <Ionicons name='notifications' size={25} color="black" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
  },
});

