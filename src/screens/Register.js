import React from 'react';
import { View, Image, Text, Button } from 'react-native';
import styles from '../styles/splash.style';

class Register extends React.Component {
  goBack() {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.logoContainer}>
        <Button
          onPress={this.goBack}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Image style={styles.logo} source={require('../img/logo.png')} />
        <Text style={styles.appTitle}>Alert<Text style={styles.appTitleSpan}>Hero</Text></Text>

        <Text>Register Screen</Text>
      </View>
    );
  }
}

export default Register;
