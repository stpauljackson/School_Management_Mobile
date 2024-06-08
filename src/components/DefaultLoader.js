import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'


export default DefaultLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
  