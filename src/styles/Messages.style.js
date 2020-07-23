import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  loading: {
    justifyContent: 'center',
    flex: 1,
  },
  header: {
    flex: 0,
    height: (height * 0.07),
    padding: 10,
  },
  groupContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  groupName: {
    fontWeight: 'bold',
    flex: 0.7,
  },
  icon: {
    width: 26,
    height: 26,
  },
  actionButtonIcon: {
    fontSize: 35,
    height: 35,
    color: 'white',
  },
  message: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width,
  },
  post: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginRight: 10,
    marginBottom: 5,
    marginLeft: 10,
  },
  messageCode: {
    width: 15,
    height: 'auto',
  },
  postContent: {
    backgroundColor: '#d4d4d4',
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 14,
    paddingRight: 14,
    width: (width * 0.9),
  },
  postUser: {
    fontSize: 14,
    fontWeight: '700',
  },
  postText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '300',
  },
  time: {
    fontSize: 12,
    fontWeight: '100',
    color: 'grey',
  },
  codeSelect: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    marginBottom: 15,
  },
  groupsContainer: {
    height: (height * 0.12),
  },
  postFooter: {
    marginTop: 10,
    marginBottom: 5,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  groupList: {
    marginTop: 15,
    height: (height * 0.3),
  },
});

export default styles;
