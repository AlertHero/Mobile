import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  actionContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    height: 50,
    width: (width - 100),
    marginBottom: 50,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: (width * 0.7),
    height: ((width * 0.7) / 1.8),
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 50,
    marginBottom: 50,
  },
  appTitleSpan: {
    color: '#d60600',
  },
  loadingContainer: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  switchAction: {
    paddingHorizontal: 4,
    color: 'blue',
  },
  submit: {
    padding: 10,
    height: ((width * 0.4) / 4),
    width: (width * 0.4),
    overflow: 'hidden',
    backgroundColor: '#d60000',
  },
  register: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007aff',
    marginTop: 50,
  },
});

export default styles;
