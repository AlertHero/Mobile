import React from 'react';
import { View, Image, ActivityIndicator, Text } from 'react-native';
import { authCheck } from '../utils';
import styles from '../styles/splash.style';

class SplashScreen extends React.Component {
  componentWillMount() {
    authCheck(this.props, 500);
  }

  render() {
    return (
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../img/logo.png')} />
        <Text style={styles.appTitle}>Alert<Text style={styles.appTitleSpan}>Hero</Text></Text>
        <ActivityIndicator />
      </View>
    );
  }
}

export default SplashScreen;
