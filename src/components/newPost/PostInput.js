import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    borderColor: '#dbdbdb',
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  input: {
    backgroundColor: 'white',
    color: 'black',
    height: 32,
    paddingHorizontal: 8,
  },
  sendButtonContainer: {
    paddingRight: 12,
    paddingVertical: 6,
  },
  sendButton: {
    height: 32,
    width: 32,
  },
  iconStyle: {
    marginRight: 0,
  },
});

const sendButton = send => (
  <Icon.Button
    backgroundColor="#d60000"
    borderRadius={5}
    color="white"
    iconStyle={styles.iconStyle}
    name="send"
    onPress={send}
    size={16}
    style={styles.sendButton}
  />
);

class PostInput extends React.Component {
  constructor(props) {
    super(props);
    this.sendNewPost = this.sendNewPost.bind(this);
  }
  async sendNewPost() {
    await this.textInput.blur();
    await this.props.send(this.state.text);
    await this.textInput.clear();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={(ref) => { this.textInput = ref; }}
            onChangeText={text => this.setState({ text })}
            style={styles.input}
            placeholder="Type your message here"
          />
        </View>
        <View style={styles.sendButtonContainer}>
          {sendButton(this.sendNewPost)}
        </View>
      </View>
    );
  }
}
PostInput.propTypes = {
  send: PropTypes.func.isRequired,
};

export default PostInput;
