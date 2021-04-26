// eslint-disable-next-line react/display-name
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../../constants/theme';
import globalStyles from '../../styles/globalStyles';
import Typography from '../../components/Typography';

/**
 * Instruction element generates the labels underneath the image in each section
 * @param {*} props Expects:
 *    - 'section', which is used to string-build the Typography ID
 *    - 'number', the number that links the instruction to the image
 * @returns - JSX for the instruction text that relates to the image
 * @example - <Instruction section={'HELP_CHANGE_WILDBOOK'} number={1} />
 */
// eslint-disable-next-line react/display-name
const Instruction = (props) => {
  const typographyID = `${props.section}_${props.number}`;
  return (
    <View style={styles.instruction}>
      <Text
        style={[
          globalStyles.basicText,
          styles.instructionSubElement,
          styles.instructionNumber,
        ]}
      >
        {props.number}
      </Text>
      <Typography
        id={typographyID}
        style={[
          globalStyles.basicText,
          styles.instructionSubElement,
          styles.instructionText,
        ]}
      />
    </View>
  );
};

/**
 * PageNavigationButton generates the buttons for navigating between sections
 * @param {*} props Expects:
 *    - 'onBackward': is the function called onPress of the backward button
 *    - 'onForward': is the function called onPress of forward button
 *    - 'postNavigate': is the function called after onPress of a button
 *    - 'forwardName': [OPTIONAL] expects a Typography string to use in place
 *                      of "NEXT" for the forward button
 *    - 'backwardName': [OPTIONAL] expects a Typography string to use in place
 *                      of "BACK" for the backward button
 * @returns - JSX for the buttons to navigate to the previous/next page or exit
 * @example - <PageNavigationButtons
 *              onBackward={() => setHelpSection(0)}
 *              onForward={() => setHelpSection(2)}
 *              forwardValue={'DONE'}
 *            />
 */
const PageNavigationButtons = (props) => {
  const forwardName =
    props.forwardName === undefined ? 'NEXT' : props.forwardName;
  const backwardName =
    props.backwardName === undefined ? 'BACK' : props.backwardName;
  const postNavigate = props.postNavigate;
  // props.postNavigate === undefined ? () => {} : props.postNavigate;
  return (
    <View style={[styles.horizontal, styles.bottomElement]}>
      <TouchableOpacity
        onPress={() => {
          console.log('firing forward');
          props.onBackward();
          postNavigate();
        }}
      >
        <View style={[styles.button, styles.buttonInactive]}>
          <Typography id={backwardName} style={globalStyles.buttonText} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log('firing backward');
          props.onForward();
          postNavigate();
        }}
      >
        <View style={styles.button}>
          <Typography id={forwardName} style={globalStyles.buttonText} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  instruction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 5,
    borderBottomColor: '#2C2C2C',
    borderBottomWidth: 0.5,
  },
  instructionSubElement: {
    flex: 0,
    marginBottom: 10,
    marginHorizontal: 10,
    paddingVertical: 5,
    textAlignVertical: 'center',
    lineHeight: 25,
    color: theme.black,
  },
  instructionNumber: {
    paddingTop: 18,
    fontSize: 30,
    fontWeight: 'bold',
    color: theme.blue,
  },
  instructionText: {
    paddingRight: 30,
    flexGrow: 1,
  },
  button: {
    backgroundColor: theme.primary,
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 20,
    margin: '5%',
  },
  horizontal: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonInactive: {
    backgroundColor: '#CACACA',
  },
  bottomElement: {
    marginTop: 5,
    marginBottom: 10,
  },
});

export { Instruction, PageNavigationButtons };
