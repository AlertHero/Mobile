import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-native-button';
import { graphql, compose } from 'react-apollo';
import { Kohana } from 'react-native-textinput-effects';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import { View, Image, Text, Alert, ActivityIndicator, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { wsLink } from '../../App';
import { login } from '../utils/auth';
import styles from '../styles/login.style';

import { VERIFY_MUTATION } from '../graphql/mutations/login';

class Verify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.verifyAuth = this.verifyAuth.bind(this);
  }
  async verifyAuth() {
    const id = await AsyncStorage.getItem('id');
    const { otp } = this.state;
    if (!otp) {
      Alert.alert('No CodeEntered');
    } else if (otp.length !== 7) {
      Alert.alert('Invalid Code');
    } else {
      const res = await this.props.verify2FA({ otp, id });
      const { ok, token, refreshToken } = res.data.verify2FA;
      if (ok) {
        await login(token, refreshToken);
        await wsLink.subscriptionClient.tryReconnect();
        await this.props.navigation.navigate('Home');
      } else {
        Alert.alert('Error Vailidating');
      }
    }
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
              style={{ backgroundColor: '#ffffff', borderRadius: 10 }}
              label="Enter Code"
              iconClass={MaterialsIcon}
              iconName="lock"
              iconColor="#d60000"
              labelStyle={{ color: '#000' }}
              inputStyle={{ color: '#000' }}
              onChangeText={otp => this.setState({ otp })}
              keyboardType="numeric"
              maxLength={7}
              useNativeDriver
            />
          </View>

          <Button
            onPress={this.verifyAuth}
            style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}
            containerStyle={styles.submit}
            disabledContainerStyle={this.state.loading}
          >
            ENTER
          </Button>
          <View style={styles.divider} />
        </View>

      </KeyboardAvoidingView>
    );
  }
}
Verify.propTypes = {
  navigation: PropTypes.object.isRequired,
  verify2FA: PropTypes.func.isRequired,
};

const verifyMutation = graphql(VERIFY_MUTATION, {
  props: ({ mutate }) => ({
    verify2FA: ({ otp, id }) =>
      mutate({
        variables: { otp, id },
      }),
  }),
});

export default compose(verifyMutation)(Verify);
