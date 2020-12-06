import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9FF',
    padding: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 32,
  },
  body: {
    flex: 1,
  },
  icon: {
    fontSize: 24,
    color: 'gray',
  },
  btnClose: {
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'gray',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#bcb8b1',
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    color: 'gray',
  },
});

export default styles;
