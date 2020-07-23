import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  view: {
    display: 'flex',
    justifyContent: 'space-around',
    flex: 1,
    width,
    height: (height * 0.935),
    marginBottom: (height * 0.4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
  },
  icon: {
    fontSize: 40,
    height: 42,
    color: 'white',
  },
  actionBtn: {
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 1.0,
    shadowRadius: 2,
  },
  callToAction: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: (height * 0.15),
  },
});

export default styles;
