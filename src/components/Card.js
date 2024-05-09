import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Card({item,navigation}) {
    
    return (
        <TouchableOpacity 
        onPress={()=>navigation.navigate(item.key,item?.params)} 
        style={styles.cardContainer}>
            <Ionicons name={item?.iconName} size={25} color="black" />
          <Text style={styles.cardText}>{item.name}</Text>
        </TouchableOpacity>
      );
    }
    
    const styles = StyleSheet.create({
      cardContainer: {
        flex: 1,
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