import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function DashboardCard({iconName,name,value}) {
  return (
    <View  style={styles.cardContainer}>
      <Ionicons name={iconName} size={25} color="black" />
        <Text style={styles.cardText}>{name} : <Text style={{...styles.cardText,color:'royalblue'}}>{value}</Text>  </Text>    
    </View>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
      flex: 1,
      width: '100%',
      margin: 10,
      padding: 15,
      backgroundColor: '#fff',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    cardText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
  });