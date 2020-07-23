import React from 'react';
import { Dimensions } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Home from './screens/Home'; // eslint-disable-line
import Login from './screens/Login'; // eslint-disable-line
import Messages from './screens/Messages';  // eslint-disable-line
import NewMessage from './screens/NewMessage'; // eslint-disable-line
import Settings from './screens/Settings'; // eslint-disable-line
import Verify from './screens/Verify'; // eslint-disable-line
import Register from './screens/Register';
import SplashScreen from './screens/SplashScreen';

const { height, width } = Dimensions.get('window');
// Our main scene with tabs
const MainScreenNavigator = TabNavigator({
  Messages: { screen: Messages },
  Home: { screen: Home },
  Settings: { screen: Settings },
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: true,
  initialRouteName: 'Home',
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
    activeTintColor: '#fff',
    style: {
      backgroundColor: '#111',
      height: (height * 0.07),
      width,
    },
    indicatorStyle: {
      display: 'none',
    },
  },
});
// Navigation stack for our app
export const AppNavigator = StackNavigator({
  SplashScreen: { screen: SplashScreen },
  Main: { screen: MainScreenNavigator },
  Login: { screen: Login },
  Verify: { screen: Verify },
  Register: { screen: Register },
  NewMessage: { screen: NewMessage },
}, {
  mode: 'modal',
  headerMode: 'none',
  initialRouteName: 'SplashScreen',
  navigationOptions: {
    gesturesEnabled: false,
  },
});

export default () => (<AppNavigator />);
