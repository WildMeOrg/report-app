import React from 'react';
import { ActivityIndicator, StyleSheet, View, Image } from 'react-native';
import Logo from '../../assets/logo.png';
import theme from '../../constants/theme';

export default function loadingScreen() {
  return (
    <View style={styles.content}>
      <Image source={Logo} />
      <ActivityIndicator
        style={styles.spinner}
        size="large"
        color={theme.primary}
      />
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
