import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';
import React from 'react';
import UserAvatar from 'react-native-user-avatar';

export default function ContactCard({item, navigation}) {
    const OpenChat = () => {
        navigation.navigate('Chat', { recipient: item });
    }
  return (
    <TouchableNativeFeedback onPress={OpenChat}>
      <View style={styles.cardContainer}>
      <UserAvatar size={36} name={`${item.firstName} ${item.lastName}`} />
        <Text style={{fontWeight: 'bold',color:'black', fontSize: 17,marginLeft:10}}>
          {' '}
          {item.firstName} {item.lastName}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 13,
  },
});
