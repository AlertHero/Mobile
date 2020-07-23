import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-circular-action-menu';
import { View, Dimensions, Text } from 'react-native';
import styles from '../../styles/home/alertButton.style';
import Logo from './Logo';

import ALL_CHANNELS_QUERY from '../../graphql/queries/channels';
import CODES_QUERY from '../../graphql/queries/codes';

const { width } = Dimensions.get('window');
class AlertButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alt: false,
      textOp: 1,
      chanels: [],
      text: 'Tap for Codes',
    };
    this.goToPost = this.goToPost.bind(this);
    this.flipLogo = this.flipLogo.bind(this);
    this.goToPost = this.goToPost.bind(this);
    this.test = this.test.bind(this);
  }
  componentDidMount() {
    setInterval(() => { this.switchMsg(); }, 10000);
  }
  componentWillReceiveProps({ allChannels, error }) {
    if (error) {
      console.log(error);
    }
    if (allChannels) {
      this.setState({ channels: allChannels });
    }
  }
  async switchMsg() {
    const msg1 = 'Tap for Codes';
    const msg2 = 'Hold to Send Severe Code';
    switch (this.state.text) {
      case msg1:
        this.setState({ text: msg2 });
        break;
      case msg2:
        this.setState({ text: msg1 });
        break;
      default:
        this.setState({ text: msg1 });
    }
  }
  async flipLogo() {
    await this.setState(prevState => ({ alt: !prevState.alt }));
    if (this.state.alt) {
      this.setState({ textOp: 0 });
    } else {
      this.setState({ textOp: 1 });
    }
  }
  async goToPost(code) {
    const { navigate } = this.props.nav;
    const { channels } = this.state;
    this.flipLogo();
    await navigate('NewMessage', { code, channels });
  }
  test() {
    console.log('long press');
  }

  render() {
    const { alt, textOp, text } = this.state;
    const { style, loading, allCodes } = this.props;
    let btns;
    if (allCodes.length > 1) {
      btns = allCodes.map(code => (
        <ActionButton.Item
          size={70}
          key={code.id}
          title={code.desc}
          buttonColor={code.color}
          onPress={e => this.goToPost(code, e)}
        >
          <Icon name="md-alert" style={styles.icon} />
        </ActionButton.Item>
      ));
    }
    return (
      <View style={[styles.view, style || {}]}>
        <Text style={[styles.callToAction, { opacity: textOp }]}>
          {text}
        </Text>
        {loading ?
          <ActionButton buttonColor="#f6cccc" icon={<Logo />} size={140} radius={150} degrees={0} /> :
          <ActionButton
            style={styles.actionBtn}
            buttonColor="#d60000"
            btnOutRange="#f6cccc"
            outRangeScale={0.75}
            icon={<Logo alt={alt} />}
            size={(width * 0.4)}
            radius={(width * 0.4)}
            degrees={0}
            onPress={this.flipLogo}
            onLongPress={this.test}
          >
            {btns}
          </ActionButton>
        }
      </View>
    );
  }
}
AlertButton.defaultProps = {
  style: {},
  loading: false,
  allCodes: [],
};
AlertButton.propTypes = {
  style: PropTypes.object,
  loading: PropTypes.bool,
  nav: PropTypes.object.isRequired,
  allCodes: PropTypes.array,
};

const channelsQuery = graphql(ALL_CHANNELS_QUERY, {
  props: ({ data: { loading, allChannels } }) => ({
    loading, allChannels,
  }),
});
const codesQuery = graphql(CODES_QUERY, {
  props: ({ data: { loading, allCodes } }) => ({
    loading, allCodes,
  }),
});

export default compose(
  codesQuery,
  channelsQuery,
)(AlertButton);

