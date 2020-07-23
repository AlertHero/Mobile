import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-native-button';
import { graphql, compose } from 'react-apollo';
import { Kohana } from 'react-native-textinput-effects';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  AsyncStorage,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from '../styles/login.style';

import LOGIN_MUTATION from '../graphql/mutations/login';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.login = this.login.bind(this);
  }
  async login() {
    const { phone } = this.state;
    if (!phone) {
      Alert.alert('No Phone Number Entered');
    } else if (phone.length !== 10) {
      Alert.alert('Invalid Phone Number');
    } else {
      const res = await this.props.register({ phone });
      const { ok, errors, id } = res.data.register;
      if (ok) {
        try {
          await AsyncStorage.setItem('id', id);
        } catch (err) {
          console.log(`AsyncStorage error: ${err.message}`);
        }
        await this.props.navigation.navigate('Verify');
      } else {
        const err = [];
        errors.forEach(({ path, message }) => {
          err[path] = message;
        });
        Alert.alert(
          'Login error', err.phone,
          [
            { text: 'OK', onPress: () => console.log('OK pressed') },
          ],
        );
      }
    }
  }
  async register() {
    // await this.props.navigation.navigate('Register');
    Alert.alert("This is a private beta.");
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
        keyboardVerticalOffset={-34}
      >
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../img/logo.png')} />
          <Text style={styles.appTitle}>Alert<Text style={styles.appTitleSpan}>Hero</Text></Text>
        </View>
        {this.state.loading ?
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View> : undefined}
      
        <View style={styles.actionContainer}>
          <View style={styles.inputContainer}>
            <Kohana
              style={{ backgroundColor: '#eeeeee' }}
              label="Phone Number"
              iconClass={MaterialsIcon}
              iconName="phone"
              iconColor="#d60000"
              labelStyle={{ color: '#000' }}
              inputStyle={{ color: '#000' }}
              onChangeText={phone => this.setState({ phone })}
              keyboardType="phone-pad"
              maxLength={10}
              useNativeDriver
            />
          </View>

          <Button
            onPress={this.login}
            style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}
            containerStyle={styles.submit}
            disabledContainerStyle={this.state.loading}
          >
            LOGIN
          </Button>
          <Text onPress={this.register} style={styles.register}>
            I DON&#39;T HAVE AN ACCOUNT
          </Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
Login.propTypes = {
  navigation: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
};

const loginMutation = graphql(LOGIN_MUTATION, {
  props: ({ mutate }) => ({
    register: ({ phone }) =>
      mutate({
        variables: { phone },
      }),
  }),
});

export default compose(loginMutation)(Login);
