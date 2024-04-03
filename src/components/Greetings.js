import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Greetings() {
    const userData = useSelector((state) => state?.Auth?.userData);
  return (
      <Text style={styles.greeting}>Hello <Text style={styles.name}>{userData?.firstName}</Text> !</Text>
  )
}

const styles = StyleSheet.create({
    name:{
        color: 'royalblue',
        fontSize: 30,
        marginHorizontal:10
    },
    greeting: {
        color: 'black',
        fontSize: 30,
        marginHorizontal:10
    }
})