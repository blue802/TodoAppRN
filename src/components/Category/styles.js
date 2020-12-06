import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  box: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 32,
    color: '#000',
    marginBottom: 16,
    textTransform: 'capitalize',
  },
  desc: {
    fontSize: 16,
    color: '#bcb8b1',
    marginBottom: 12,
  },
  progressWrap: {
    width: '100%',
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 4,
    marginBottom: 16,
  },
  progress: {
    height: '100%',
    borderRadius: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default styles;
