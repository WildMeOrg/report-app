import { StyleSheet } from 'react-native';
import theme from '../constants/theme';

const buttonPadding = 12;

export default StyleSheet.create({
  progressBar: {
    width: '100%',
    height: 3,
    backgroundColor: '#EDEDED',
    justifyContent: 'center',
  },
  thirtyThree: {
    height: 3,
    backgroundColor: theme.primary,
    width: '33%',
  },
  sixtySix: {
    height: 3,
    backgroundColor: theme.primary,
    width: '66%',
  },
  oneHundred: {
    height: 3,
    backgroundColor: theme.primary,
    width: '100%',
  },
  keyboardView: {
    flex: 1,
    backgroundColor: theme.white,
  },
  innerContainer: {
    flex: 1,
    flexGrow: 1,
  },
  addNew: {
    flexDirection: 'column',
    alignContent: 'center',
    backgroundColor: '#2C2C2C30',
    margin: '5%',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.black,
    borderRadius: 6,
    opacity: 0.5,
    paddingVertical: '7%',
  },
  addText: {
    alignSelf: 'center',
    margin: '1%',
  },
  multiLine: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: theme.primary,
    paddingVertical: buttonPadding,
    paddingHorizontal: 50,
    borderRadius: 20,
    margin: '5%',
  },
  buttonInactive: {
    backgroundColor: '#CACACA',
  },
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container: {
    flexGrow: 1,
    backgroundColor: theme.white,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    margin: '5%',
  },
  divider: {
    marginHorizontal: '5%',
    marginTop: 10,
    borderBottomColor: '#2C2C2C',
    borderBottomWidth: 0.5,
    opacity: 0.5,
  },
  bottomElement: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
});
