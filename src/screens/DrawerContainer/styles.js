import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    backgroundColor: '#190A56',
    position: 'relative',
  },
  content: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    color: '#fff',
  },
  username: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 32,
  },
  btnClose: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'gray',
    position: 'absolute',
    top: 64,
    right: 0,
    opacity: 0.5,
  },
  icon: {
    fontSize: 32,
    color: 'gray',
  },
});

export default styles;
