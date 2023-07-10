import { StyleSheet, Image, View } from 'react-native';
import React from 'react';

import logo from '../../assets/images/logo.png';

export default function Logo() {
  return (
    <View style={styles.logoContainer}>
      <Image style={styles.logo} source={logo} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    height: 200,
  },
});
