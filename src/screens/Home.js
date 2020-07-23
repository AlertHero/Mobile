import React from 'react';
import { graphql, compose } from 'react-apollo';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import Header from '../components/Header';
import Statusbar from '../components/Statusbar';
import AlertButton from '../components/home/AlertButton';
import { authCheck } from '../utils';
import styles from '../styles/Home.style';

class Home extends React.Component {
  static navigationOptions = {
    title: 'AlertHero',
    tabBarIcon: ({ tintColor }) => (
      <Image source={require('../img/home.png')} style={[styles.icon, {tintColor: tintColor}]} />
    ),
  };
  componentWillMount() {
    authCheck(this.props);
  }

  render() {
    const { title } = Home.navigationOptions;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Statusbar />
        <Header title={title} nav={navigation}/>
        <AlertButton nav={navigation} />
      </View>
    );
  }
}

export default Home;
