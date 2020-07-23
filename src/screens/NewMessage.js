import React from 'react';
import moment from 'moment';
import { Buffer } from 'buffer';
import { graphql, compose } from 'react-apollo';
import { StyleSheet, Text, View, Image, Dimensions, KeyboardAvoidingView } from 'react-native';
import Header from '../components/Header';
import StatusBar from '../components/Statusbar';
import CodeSelect from '../components/newPost/CodeSelect';
import GroupList from '../components/newPost/GroupList';
import PostInput from '../components/newPost/PostInput';
import styles from '../styles/app.style';

import MESSAGES_QUERY from '../graphql/queries/messages';
import CODES_QUERY from '../graphql/queries/codes';
import CREATE_MESSAGE_MUTATION from '../graphql/mutations/create-message';

class NewMessage extends React.Component {
  static navigationOptions = {
    title: 'New Message',
  };
  constructor(props) {
    super(props);
    this.state = {
      code: props.navigation.state.params.code,
      channelIds: [],
      channels: props.navigation.state.params.channels,
    };
    this.send = this.send.bind(this);
    this.updateCode = this.updateCode.bind(this);
    this.updateChannel = this.updateChannel.bind(this);
  }
  updateCode(code) {
    if (code !== this.state.code) {
      this.setState({ code });
    }
  }
  async updateChannel({ id }) {
    const channel = parseInt(id);
    const array = this.state.channelIds;
    if (array.includes(channel)) {
      const index = array.indexOf(channel);
      await array.splice(index, 1);
      await console.log(array);
      this.setState({ channelIds: array });
    } else {
      await array.push(channel);
      await console.log(array)
      this.setState({ channelIds: array });
    }
  }
  async send(text) {
    if (!text || !text.trim()) {
      return;
    }
    await this.props.createMessage({ 
      text, 
      channelId: 1, 
      codeId: this.state.code.id,
    });
    await this.props.navigation.goBack();
  }

  render() {
    const { title } = NewMessage.navigationOptions;
    const { loading, navigation, allCodes } = this.props;
    const { code, channels, channelIds } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar />
        <Header title={title} direction={'back-post'} nav={navigation}/>
        <CodeSelect 
          currentCode={code} 
          allCodes={allCodes} 
          update={this.updateCode}
        />
        <GroupList 
          channels={channels} 
          selected={channelIds}
          update={this.updateChannel}
        />
        <KeyboardAvoidingView
          behavior={'position'}
          keyboardVerticalOffset={20}
          style={{position: 'absolute', left: 0, right: 0, bottom: 20}}
        >
          <PostInput send={this.send} />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const newMessage = graphql(CREATE_MESSAGE_MUTATION, {
  props: ({ mutate }) => ({
    createMessage: ({ channelId, text, codeId }) =>
      mutate({
        variables: { channelId, text, codeId },
      }),
  }),
});
const codesQuery = graphql(CODES_QUERY, {
  props: ({ data: { loading, allCodes } }) => ({
    loading, allCodes,
  }),
});

export default compose(
  newMessage,
  codesQuery,
)(NewMessage);
