import { StyleSheet } from 'react-native';
import theme from '../constants/theme';

export default StyleSheet.create({
  headerText: {
    fontFamily: 'Lato-Regular',
    fontSize: 20,
  },
  icon: {
    marginRight: 16,
  },
  iconLeft: {
    marginLeft: 16,
  },
  h2Text: {
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    color: theme.black,
    fontStyle: 'normal',
  },
  h2TextInvalid: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    marginHorizontal: '5%',
    marginBottom: '3%',
    color: theme.red,
  },
  buttonText: {
    color: theme.white,
    fontSize: 16,
    alignSelf: 'center',
  },
  basicText: {
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#2C2C2C80',
  },
  inputHeader: {
    fontSize: 18,
    margin: '5%',
    marginBottom: '3%',
    fontStyle: 'normal',
  },
  subText: {
    fontSize: 18,
    marginHorizontal: '5%',
    marginBottom: '3%',
  },
  sectionHeader: {
    fontSize: 20,
    margin: '5%',
    marginBottom: '3%',
  },
  inputField: {
    textAlign: 'left',
    marginHorizontal: '5%',
    fontSize: 16,
    borderColor: '#2c2c2c80',
    borderWidth: 1,
    borderRadius: 6,
    padding: '2%',
    margin: 1,
  },
  inputInvalid: {
    borderWidth: 2,
    backgroundColor: '#ff2c2c16',
    borderColor: '#ff2c2cff',
    margin: 0,
  },
  invisible: {
    opacity: 0,
  },
  errorText: {
    color: 'red',
    fontFamily: 'Lato-Regular',
    marginHorizontal: '8%',
    marginTop: 4,
  },
});
