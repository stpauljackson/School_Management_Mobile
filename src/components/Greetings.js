import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Greetings() {
    const userData = useSelector((state) => state?.Auth?.userData);
  return (
      <Text style={styles.greeting}>Hello {userData?.name}</Text>
  )
}

const styles = StyleSheet.create({
    greeting:{
        color: 'royalblue',
        fontSize: 30,
        marginHorizontal:10
    }
})