import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 64,

    // flexDirection: 'row',
  },
  rowBack: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#FAF9FF',
    borderRadius: 8,
  },
  message: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 16,
    color: 'gray',
  },
  btnUndo: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: 'gray',
  },
  rowFront: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  iconTrash: {
    fontSize: 20,
    color: 'gray',
  },
  icon: {
    fontSize: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 16,
  },
  trash: {
    position: 'absolute',
    top: '40%',
    right: 6,
  },
});

export default styles;
