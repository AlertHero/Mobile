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
  textName: {
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default styles;