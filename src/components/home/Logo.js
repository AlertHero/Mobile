import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  logo: { tintColor: 'white' },
  logoAlt: { tintColor: '#d60000' },
});

const Logo = props => (
  <View>
    {props.alt ?
      <Image
        style={[styles.logoAlt]}
        source={require('../../img/logo(small).png')}
      /> :
      <Image
        style={[styles.logo]}
        source={require('../../img/logo(small).png')}
      />
    }
  </View>
);
Logo.defaultProps = {
  alt: false,
};
Logo.propTypes = {
  alt: PropTypes.bool,
};

export default Logo;
