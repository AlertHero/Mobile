import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-check-box';
import { Text, TouchableHighlight, Button, FlatList, View } from 'react-native';
import styles from '../../styles/Messages.style';

import allChannelsQuery from '../../graphql/queries/channels';

class GroupList extends React.Component {
  setCode(code) {
    console.log(code);
  }
  renderItem = ({item}) => (
    <CheckBox
      key={item.id}
      style={{ flex: 1, padding: 10 }}
      onClick={(e) => { this.props.update(item) }}
      isChecked={false}
      leftText={item.name}
    />
  );
  render() {
    const { loading } = this.props;
    if (loading) { return (<View />); }
    return (
      <View>
        <FlatList
          style={styles.groupList}
          data={this.props.channels}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

export default GroupList;
