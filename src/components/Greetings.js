import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';

export default function Greetings() {
  const userData = useSelector((state) => state?.Auth?.userData);

  return (
    <View style={styles.container}>
      <View><Text style={styles.greeting}>Hello <Text style={styles.name}>{userData?.firstName}</Text>!</Text></View>
      <LottieView
        source={require('../LotteAnimations/StudentStudying.json')}
        style={styles.lottieView}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    height: 100,
    marginHorizontal:10,
    paddingHorizontal:10,
    marginTop: 40,
    backgroundColor: '#eee',
    borderRadius: 10,

  },
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#555',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'royalblue',
  },
  lottieView: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: 150,
    width: 150,
  },
});
