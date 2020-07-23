import React from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { graphql, compose } from 'react-apollo';
import SettingsList from 'react-native-settings-list';
import { View, Image, Button, Text } from 'react-native';

import { getTokens } from '../utils/auth';
import StatusBar from '../components/Statusbar';
import Header from '../components/Header';
import styles from '../styles/Settings.style';
import { logout } from '../utils/auth';

import USER_QUERY from '../graphql/queries/users';

class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../img/settings.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      pushValue: false,
      switchValue: false,
      locationValue: false,
    };
    this.logoutPress = this.logoutPress.bind(this);
    this.onPushChange = this.onPushChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
  }
  componentWillMount() {
    this.getUser();
  }
  componentWillReceiveProps({getUser}) {
    if (getUser) {
      this.setState({ user: getUser });
    }
  }
  async getUser() {
    const jwt = await getTokens();
    const data = await jwtDecode(jwt.token);
    await this.props.navigation.setParams({ user: data.user });
  }
  async logoutPress() {
    const loggedOut = await logout();
    if (loggedOut === true) {
      await this.props.navigation.navigate('Login');
    }
  }
  onPushChange(value) {
    this.setState({pushValue: value});
  }
  onLocationChange(value) {
    this.setState({locationValue: value});
  }

  render() {
    const { title } = Settings.navigationOptions;
    const { navigation } = this.props;
    const { pushValue, locationValue, switchValue, user } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar />
        <Header direction={'back'} title={title} nav={navigation}/>
        {!user? null: 
          <View style={{marginLeft: 10}}>
            <Text style={styles.textName}>{user.firstName} {user.lastName}</Text>
            <Text style={styles.text}>{user.phone}</Text>
            <Text style={styles.text}>{user.email}</Text>
          </View>
        }
        <SettingsList>
          <SettingsList.Item
            hasNavArrow={false}
            switchState={pushValue}
            switchOnValueChange={this.onPushChange}
            hasSwitch={true}
            title='Push Notifications'
          />
          <SettingsList.Item
            hasNavArrow={false}
            switchState={locationValue}
            switchOnValueChange={this.onLocationChange}
            hasSwitch={true}
            title='Off Campus Notifications'
          />
          <SettingsList.Item 
            hasNavArrow={false} 
            onPress={this.logoutPress}
            title='Logout'
          />
        </SettingsList>
      </View>
    );
  }
}

const userQuery = graphql(USER_QUERY, {
  skip: (ownProps) => !ownProps.navigation.state.params,
  options: ownProps => ({ variables: { id: ownProps.navigation.state.params.user.id || 1} }),
  props: ({ data: { loading, getUser, refetch, } }) => ({
    loading, getUser, refetch,
  }),
});

export default compose(userQuery)(Settings);
