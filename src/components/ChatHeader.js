import {View, Text, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import UserAvatar from 'react-native-user-avatar';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {StyleSheet} from 'react-native';


export default ChatHeader = ({name,navigation}) => {
  return (
    <View style={styles.container}>
    <TouchableNativeFeedback onPress={() => {navigation.navigate('ChatHistory')}}>
      <Ionicons name="arrow-back-outline" size={25} color="black" />
      </TouchableNativeFeedback>
      <UserAvatar size={36} name={name} style={styles.avatar}/>
      <Text style={styles.name}>{' '}{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'start',
      marginTop: 10,
      borderBottomWidth: 1,
    borderBottomColor: 'royalblue',
      paddingHorizontal: 5,
      paddingVertical: 10,
    },
    avatar: {
      marginHorizontal: 10,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  