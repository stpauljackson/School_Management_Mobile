import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';

export default function UploadMarks({navigation}) {
    const user = useSelector(state => state?.Auth?.user)
    const {classes} = useSelector(state => state?.Auth?.userData)

  return (
    <View style={{flex: 1, paddingBottom: 40}}>
        <FlatList
          data={classes}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Classes
              item={item}
              navigation={navigation}
            />
          )}
          numColumns={2} 
        />
      </View>
  )
}

const Classes = ({item,navigation}) => {
    return (
      <TouchableNativeFeedback onPress={()=>navigation.navigate('All Assignments',{classId:item.classId, headerTitle: `${item.class} ${item.section} (${item.subject})`})}>
        <View style={styles.cardContainer}>
          <Text style={styles.name}>{item.class} {item.section} ({item.subject})</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  const styles = StyleSheet.create({
    cardContainer: {
    flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
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
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'royalblue',
    },
    status: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    button: {
      width: '100%',
      position: 'absolute',
      bottom: 0,
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'royalblue',
    },
    buttonText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
    loadingIndicator: {
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // translucent background
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    }
  });