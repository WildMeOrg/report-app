import { StyleSheet } from 'react-native';
import theme from '../constants/theme';

export default StyleSheet.create({
  headerText: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
  },
  icon: {
    marginRight: 16,
  },
  inputHeader: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    margin: '5%',
    marginBottom: '3%',
    color: theme.black,
  },
  inputFields: {
    textAlign: 'left',
    marginHorizontal: '5%',
    fontSize: 16,
    borderColor: '#2c2c2c80',
    borderWidth: 1,
    borderRadius: 6,
    padding: '2%',
  },
  invisible: {
    opacity: 0,
  },
  buttonText: {
    color: theme.white,
    fontSize: 16,
    alignSelf: 'center',
  },
});
