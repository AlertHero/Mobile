import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Text, View } from 'react-native';
import styles from '../../styles/Messages.style';

const Post = ({ post }) => {
  const {
    id, text, createdAt, user: { firstName, lastName }, code: { color },
  } = post;
  const swipeoutBtns = [
    {
      text: 'Button',
    },
  ];
  const time = moment(createdAt).format('LT');
  return (
    <View key={id} style={styles.message}>
      <View style={styles.post}>
        <View style={[styles.messageCode, { backgroundColor: color }]} />
        <View style={styles.postContent}>
          <Text style={styles.postUser}>
            {`${firstName}`} {`${lastName}`}
            <Text style={styles.time}> - {`${time}`}</Text>
          </Text>
          <Text style={styles.postText}>{`${text}`}</Text>
          {/* <View style={styles.postFooter}>
            <Text style={{ width: '50%', }}>Comments: </Text>
            <Text style={{ width: '50%', flexDirection:'column' }}>Comments 23</Text>
          </View> */}
        </View>
      </View>
    </View>
  );
};
Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
