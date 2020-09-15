import React from 'react';
import { ActivityIndicator, StyleSheet, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../assets/logo.png';

export default function loadingScreen() {
  return (
    <View>
      <LinearGradient
        colors={['#21BDC1', '#41D06A']}
        style={styles.content}
        start={[0, 0]}
        end={[1, 0]}
      >
        <Image source={Logo} />
        <ActivityIndicator
          style={styles.spinner}
          size="large"
          color="#2C2C2C"
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    position: 'absolute',
    bottom: '15%',
  },
});
