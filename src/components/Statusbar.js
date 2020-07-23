import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  statusBarBackground: {
    height: (Platform.OS === 'ios') ? 20 : 20,
    backgroundColor: '#eeeeee',
  },
});

export default () => (
  <View style={styles.statusBarBackground} />
);
