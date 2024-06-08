import React from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default Button = ({ onPress, title,iconName }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
        <Ionicons name={iconName} size={19} color="white" />
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'royalblue',
    borderRadius: 5,
    paddingVertical: 10,
    elevation: 3,
    height:40,
    paddingHorizontal:10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight:5
  },
});


