import { View, Text,TextInput,StyleSheet } from 'react-native'
import React from 'react'

export default InputField = ({ label, value, onChangeText, keyboardType = 'default' }) => (
    <View style={styles.form}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );

const styles = StyleSheet.create({
    form: {
        marginTop: 20,
        width: '100%',
      },
      label: {
        position: 'absolute',
        top: -10,
        left: 10,
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        zIndex: 1,
        color:'gray'
      },
      input: {
          width: '100%',
          padding: 10,
          marginBottom: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          color:'black'
        },
})