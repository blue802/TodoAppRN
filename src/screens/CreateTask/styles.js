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
    marginBottom: 100,
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
  inputWrap: {
    marginBottom: 32,
  },
  input: {
    fontSize: 24,
  },
  btnWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'gray',
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
    color: 'gray',
  },
  pickerWrap: {
    width: 130,
    height: 44,
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'gray',
  },
  picker: {
    width: 130,
    color: 'gray',
    fontSize: 16,
  },
  btnCreate: {
    width: 160,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 56 / 2,
    backgroundColor: '#3F2FFF',
  },
  footer: {
    alignItems: 'flex-end',
  },
});

export default styles;
