import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import update from 'immutability-helper';
import { Buffer } from 'buffer';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Drawer from 'react-native-drawer';
import { FlatList, StyleSheet, Dimensions, Text, Image, ActivityIndicator, TouchableHighlight, View } from 'react-native';

import StatusBar from '../components/Statusbar';
import Header from '../components/Header';
import Post from '../components/messages/Post';
import Channel from '../components/messages/Channel';
import GroupSelect from '../components/messages/GroupSelect';
import NewPostButton from '../components/messages/NewPostButton';
import styles from '../styles/Messages.style';
import { logout } from '../utils/auth';

import ALL_CHANNELS_QUERY from '../graphql/queries/channels';
import MESSAGES_QUERY from '../graphql/queries/messages';
import MESSAGE_SUBSCRIPTION from '../graphql/subscriptions/messages';

class Messages extends React.Component {
  static navigationOptions = {
    title: 'Messages',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../img/messages.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
  constructor(props) {
    super(props);
    let id = '1';
    this.state = {
      chanels: [],
      channelId: '1',
      currentChannel: { id },
    };

    this.onRefresh = this.onRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderChannel = this.renderChannel.bind(this);
    this.closeControlPanel = this.closeControlPanel.bind(this);
    this.openControlPanel = this.openControlPanel.bind(this);
  }
  componentWillMount() {
    this.unsubscribe = this.subscribe(this.state.currentChannel.id);
  }
  componentWillReceiveProps({ allChannels, messagesRelay, channelId, error }) {
    if (error) {
      console.log(error);
    }
    if (allChannels) {
      console.log(allChannels);
      this.setState({ channels: allChannels });
    }
    if (messagesRelay) {
      console.log(messagesRelay);
      this.setState({ messagesRelay });
    }
    if (this.state.currentChannel.id !== channelId) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
    }
  }
  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
  updateChannel = async (channelId) => {
    console.log(channelId);
    this.setState({ channelId });
  }
  subscribe = (channelId) => {
    this.props.subscribeToMore({
      document: MESSAGE_SUBSCRIPTION,
      variables: {
        channelId,
      },
      updateQuery: (prev, { subscriptionData: { data } }) => {
        if (!data) {
          return prev;
        }
        const newMessage = data.newChannelMessage;
        return update(prev, {
          messagesRelay: {
            edges: {
              $unshift: [{
                __typename: prev.messagesRelay.__typename,
                node: newMessage,
                cursor: newMessage.id.toString().toString('base64'),
              }],
            },
          },
        });
      },
      onError: async (err) => {
        await logout();
        await this.props.navigation.navigate('Login');
      },
    });
  }
  onRefresh() {
    this.props.refetch();
  }
  onEndReached() {
    const { messagesRelay, fetchMore } = this.props;
    fetchMore({
      variables: {
        last: 15,
        channelId: this.state.currentChannel.id,
        after: messagesRelay.edges[messagesRelay.edges.length - 1].cursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return previousResult; }
        return update(previousResult, {
          messagesRelay: {
            edges: { $push: fetchMoreResult.messagesRelay.edges },
            pageInfo: { $set: fetchMoreResult.messagesRelay.pageInfo },
          },
        });
      },
    }).then((res) => {
      if (res.data.messagesRelay.edges.length === 0) {
        this.setState({ hasMore: false });
        notification.open({
          duration: 3,
          placement: 'topRight',
          message: 'No More Messages',
        });
      }
    });
  }
  renderFooter() {
    return (
      <View style={{ paddingVertical: 15 }} >
        <ActivityIndicator animating size="large" />
      </View>
    );
  }
  closeControlPanel = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };
  keyExtractor = item => item.node.id;
  keyExtractorCh = item => item.id;
  renderMessage = ({ item }) => <Post post={item.node} />;
  renderChannel = ({ item }) => <Channel group={item} active={this.state.channelId} update={this.updateChannel} />;

  render() {
    const { title } = Messages.navigationOptions;
    const { loading, networkStatus, navigation } = this.props;
    const { messagesRelay, channels } = this.state;
    if (loading) {
      return (
        <View style={[styles.loading, styles.container]}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar />
        <Drawer
          type="overlay"
          ref={(ref) => this._drawer = ref}
          tweenDuration={150}
          content={<GroupSelect groups={channels} open={this.openControlPanel} close={this.closeControlPanel} />}
        >
          <Header direction={'forward'} title={title} nav={navigation} openMenu={this.openControlPanel} />
          {!messagesRelay ? null : (
            <FlatList
              data={messagesRelay.edges}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderMessage}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={0.2}
              onRefresh={this.onRefresh}
              refreshing={networkStatus === 4}
              ListFooterComponent={this.renderFooter}
            />
          )}
          <NewPostButton navigation={this.props.navigation} channels={channels} />
        </Drawer>
      </View>
    );
  }
}
Messages.propTypes = {
  fetchMore: PropTypes.func.isRequired,
  subscribeToMore: PropTypes.func.isRequired,
};

const channelsQuery = graphql(ALL_CHANNELS_QUERY, {
  props: ({ data: { loading, allChannels } }) => ({
    loading, allChannels,
  }),
});
const messagesQuery = graphql(MESSAGES_QUERY, {
  options: () => ({ variables: { last: 15, after: '', channelId: 1 }, fetchPolicy: 'network-only' }),
  props: ({
    data: {
      fetchMore, loading, messagesRelay, refetch, subscribeToMore,
    },
  }) => ({
    loading, messagesRelay, fetchMore, refetch, subscribeToMore,
  }),
});

export default compose(
  messagesQuery,
  channelsQuery,
)(Messages);
