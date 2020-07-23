import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  icon: {
    width: 26,
    height: 26,
  },
  linearGradient: {
    flex: 1,
    width,
    height,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
});

export default styles;
