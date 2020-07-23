import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-native-button';
import { View } from 'react-native';
import styles from '../../styles/Messages.style';

class CodeSelect extends React.Component {
  buttonStyle(code) {
    if (this.props.currentCode.id === code.id) {
      return { fontWeight: 'bold', fontSize: 18, color: 'black' };
    }
    return { fontWeight: 'bold', fontSize: 18, color: code.color };
  }
  containerStyle(code) {
    if (this.props.currentCode.id === code.id) {
      return {
        padding: 10, height: 40, overflow: 'hidden', borderRadius: 10, backgroundColor: code.color,
      };
    }
    return {
      padding: 10, height: 40, overflow: 'hidden', borderRadius: 10, borderColor: code.color, borderWidth: 1, backgroundColor: 'white',
    };
  }
  render() {
    const { allCodes, update } = this.props;
    const buttonList = allCodes.map(code => (
      <Button
        key={code.id}
        onPress={e => update(code, e)}
        style={this.buttonStyle(code)}
        containerStyle={this.containerStyle(code)}
      >
        {code.desc}
      </Button>
    ));
    return (
      <View style={styles.codeSelect}>
        {buttonList}
      </View>
    );
  }
}
CodeSelect.defaultProps = {
  allCodes: [],
};
CodeSelect.propTypes = {
  allCodes: PropTypes.array,
  update: PropTypes.func.isRequired,
  currentCode: PropTypes.object.isRequired,
};

export default CodeSelect;
