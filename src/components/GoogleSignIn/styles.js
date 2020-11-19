import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: '#190A56',
    width: 240,
    paddingVertical: 16,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default styles;
