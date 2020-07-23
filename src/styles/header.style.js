import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  header: {
    flex: 0,
    height: (height * 0.065),
    padding: 10,
    backgroundColor: '#eeeeee',
    zIndex: -1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
  icon: {
    height: 25,
    width: 25,
    marginRight: 20,
  },
  leftIcon: {
    height: 25,
    width: 25,
    marginLeft: 'auto',
  },
  rightIcon: {
    height: 25,
    width: 25,
    marginRight: 'auto',
  },
  appTitleSpan: {
    color: '#d60600',
  },
});

export default styles;
