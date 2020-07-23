import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Messages.style';

import CODES_QUERY from '../../graphql/queries/codes';

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: props.channels,
      allCodes: [
        { desc: 'Loading Available Codes', color: '#000' },
      ],
    };
    this.goToPost = this.goToPost.bind(this);
  }
  componentWillReceiveProps({ allCodes, error, channels }) {
    if (error) {
      console.log(error);
    }
    if (allCodes) {
      this.setState({ allCodes });
    }
    if (channels) {
      this.setState({ channels });
    }
  }
  async goToPost(code) {
    const { navigate } = this.props.navigation;
    const { channels } = this.state;
    await navigate('NewMessage', { code, channels });
  }

  render() {
    const { allCodes } = this.state;
    const buttonList = allCodes.map((c, i) => (
      <ActionButton.Item
        key={i}
        buttonColor={c.color}
        title={c.desc}
        onPress={e => this.goToPost(c, e)}
      >
        <Icon name="md-alert" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    ));
    return (
      <ActionButton
        size={65}
        degrees={0}
        icon={<Icon name="md-chatbubbles" style={styles.actionButtonIcon} />}
        buttonColor="rgba(214,0,0,1)"
      >
        {buttonList}
      </ActionButton>
    );
  }
}
AddPost.defaultProps = {
  allCodes: [],
};
AddPost.propTypes = {
  channels: PropTypes.array.isRequired,
  allCodes: PropTypes.array,
  navigation: PropTypes.object.isRequired,
};

const codesQuery = graphql(CODES_QUERY, {
  options: { errorPolicy: 'all' },
  props: ({ data: { loading, allCodes } }) => ({
    loading, allCodes,
  }),
});

export default compose(codesQuery)(AddPost);
