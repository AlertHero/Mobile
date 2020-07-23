import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cccccc',
  },
  logoContainer: {
    marginTop: 150,
    marginBottom: 'auto',
    alignItems: 'center',
  },
  logo: {
    width: (width * 0.7),
    height: ((width * 0.7) / 1.8),
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 50,
    marginBottom: 40,
  },
  appTitleSpan: {
    color: '#d60600',
  },
});

export default styles;
