import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-native-button';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  channelContainer: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 25,
    marginRight: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  activeChannel: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    backgroundColor: '#0000001A',
  },
  button: {
    color: 'rgba(214,0,0,1)',
    padding: 10,
  },
  appTitle: {
    fontSize: 50,
    marginBottom: 40,
  },
  appTitleSpan: {
    color: '#d60600',
  },
});

class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active,
      isActive: this.props.group.id === this.active,
    };
  }
  componentWillReceiveProps({ active }) {
    console.log(active);
    if (this.state.active !== active) {
      this.setState({ active });
    }
  }
  render() {
    const { group, update } = this.props;
    const { isActive } = this.state;
    const { id, name } = group;
    return (
      <View key={id} style={styles.channelContainer}>
        <Button
          onPress={() => update(id)}
          style={[styles.button, isActive && styles.activeChannel]}
        >
          {name[0] + name[1]}
        </Button>
        <Text>{name}</Text>
      </View>
    );
  }
}
Channel.propTypes = {
  active: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
};

export default Channel;
