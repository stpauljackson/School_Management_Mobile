import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function UserListCard({item, index, navigation}) {
  return (
    <TouchableNativeFeedback onPress={() => {navigation.navigate('User Details',{userInfo:item,name:`${item.firstName||''} ${item.lastName||''}`})}}>
      <View style={styles.cardContainer}>
        <Text style={{fontWeight:'bold',fontSize:20}}>{index+1}. {item.firstName} {item.lastName}</Text> 
        <Ionicons name="chevron-forward" size={25} color="gray" />
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          margin: 10,
          padding: 15,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
})