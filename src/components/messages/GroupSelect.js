import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-check-box';
import { View, Text, TouchableHighlight, StyleSheet, PixelRatio } from 'react-native';

import Header from '../Header';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    flex: 1,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderColor: '#eeeeee',
    borderWidth: 1,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#aaaaaa',
    marginRight: 20,
    marginLeft: 20,
    alignSelf: 'center',
  },
});

const GroupSelect = ({ open, close, groups }) => {
  return (
    <View style={styles.container}>
      <Header direction="group" title="Groups" closeMenu={close} />
      {groups.map(channel =>
          (<CheckBox
            key={channel.id}
            style={{ flex: 1, padding: 10 }}
            onClick={() => { console.log('checked'); }}
            isChecked={false}
            leftText={channel.name}
          />))
        }
      <TouchableHighlight
        style={styles.button}
        underlayColor="#B5B5B5"
        onPress={() => { close(); }}
      >
        <Text>Close</Text>
      </TouchableHighlight>
    </View>
  );
};
GroupSelect.propTypes = {
  open: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
  close: PropTypes.func.isRequired,
};
export default GroupSelect;
