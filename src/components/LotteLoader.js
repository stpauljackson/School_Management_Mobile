import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LotteLoader = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../LotteAnimations/StudentRunning.json')}
        style={{width: "100%", height: "100%"}}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 5,
  },
});

export default LotteLoader;
