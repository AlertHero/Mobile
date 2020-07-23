import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import styles from '../styles/header.style';

const Header = ({
  title, direction, style, nav, openMenu, closeMenu,
}) => {
  let content = (
    <View style={[styles.row, { justifyContent: 'center' }]}>
      <Text style={[styles.text]}>{title}</Text>
    </View>
  );
  switch (direction) {
    case 'group':
      content = (
        <View style={[styles.row]}>
          <Text style={[styles.text]}>{title}</Text>
          <TouchableHighlight style={[styles.leftIcon]} underlayColor="rgba(0, 0, 0, 0.0)" onPress={() => closeMenu()}>
            <Image source={require('../img/close.png')} style={[styles.leftIcon]} />
          </TouchableHighlight>
        </View>
      );
      break;
    case 'back':
      content = (
        <View style={[styles.row]}>
          <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.0)" onPress={() => nav.goBack()}>
            <Image source={require('../img/back.png')} style={[styles.icon]} />
          </TouchableHighlight>
          <Text style={[styles.text]}>{title}</Text>
        </View>
      );
      break;
    case 'back-post':
      content = (
        <View style={[styles.row]}>
          <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.0)" onPress={() => nav.goBack()}>
            <Image source={require('../img/back.png')} style={[styles.icon]} />
          </TouchableHighlight>
          <Text style={[styles.text]}>{title}</Text>
        </View>
      );
      break;
    case 'forward':
      content = (
        <View style={[styles.row]}>
          <TouchableHighlight style={[styles.rightIcon]} underlayColor="rgba(0, 0, 0, 0.0)" onPress={() => openMenu()}>
            <Image source={require('../img/menu.png')} style={[styles.rightIcon]} />
          </TouchableHighlight>
          <Text style={[styles.text]}>{title}</Text>
          <TouchableHighlight style={[styles.leftIcon]} underlayColor="rgba(0, 0, 0, 0.0)" onPress={() => nav.goBack()}>
            <Image source={require('../img/forward.png')} style={[styles.leftIcon]} />
          </TouchableHighlight>
        </View>
      );
      break;
    default:
      content = (
        <View style={[styles.row, { justifyContent: 'center' }]}>
          <Text style={styles.text}>Alert<Text style={styles.appTitleSpan}>Hero</Text></Text>
        </View>
      );
  }

  return (
    <View style={[styles.header, style || {}]}>
      {content}
    </View>
  );
};
Header.defaultProps = {
  nav: {},
  style: {},
  direction: '',
  openMenu: () => {},
  closeMenu: () => {},
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
  direction: PropTypes.string,
  style: PropTypes.object,
  nav: PropTypes.object,
  openMenu: PropTypes.func,
  closeMenu: PropTypes.func,
};


export default Header;
