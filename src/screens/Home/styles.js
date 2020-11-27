import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9FF',
    padding: 32,
  },
  btnCreate: {
    width: 64,
    height: 64,
    position: 'absolute',
    bottom: 32,
    right: 32,
    borderRadius: 64 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3F2FFF',
  },
  plusIcon: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 4,
  },
  hiStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    color: 'gray',
  },
});

export default styles;
