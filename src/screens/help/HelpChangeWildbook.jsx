import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import screens from '../../constants/screens';
import theme from '../../constants/theme';
import globalStyles from '../../styles/globalStyles';
import Typography from '../../components/Typography';
import { Dimensions } from 'react-native';
import changeWildbook1 from '../../../assets/images/HelpPage/ChangeWildbook1.png';
import changeWildbook2 from '../../../assets/images/HelpPage/ChangeWildbook2.png';
import changeWildbook3 from '../../../assets/images/HelpPage/ChangeWildbook3.png';
import changeWildbook4 from '../../../assets/images/HelpPage/ChangeWildbook4.png';
import changeWildbook5 from '../../../assets/images/HelpPage/ChangeWildbook5.png';

const winWidth = Dimensions.get('window').width;
const imageRatio = winWidth / 700; // The 700 is the px width of the images

const Instruction = (props) => {
  const typographyID = `HELP_CHANGE_WILDBOOK_${props.number}`;
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

const HelpChangeWildbook = ({ navigation }) => {
  const [helpSection, setHelpSection] = useState(0);

  return (
    <View style={styles.content}>
      <ScrollView style={styles.helpPage}>
        {helpSection === 0 && (
          <>
            <Image
              style={styles.helpImage}
              source={changeWildbook1}
              resizeMode={'contain'}
            />
            <Instruction number={1} />
            <View style={[styles.horizontal, styles.bottomElement]}>
              {/* // TODO: why not working?? */}
              <TouchableOpacity
                onPress={() => navigation.navigate(screens.helpPage)}
              >
                <View style={[styles.button, styles.buttonInactive]}>
                  <Typography id="BACK" style={globalStyles.buttonText} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setHelpSection(1)}>
                <View style={styles.button}>
                  <Typography id="NEXT" style={globalStyles.buttonText} />
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
        {helpSection === 1 && (
          <>
            <Image
              style={styles.helpImage}
              source={changeWildbook2}
              resizeMode={'contain'}
            />
            <Instruction number={2} />
            <View style={[styles.horizontal, styles.bottomElement]}>
              <TouchableOpacity onPress={() => setHelpSection(0)}>
                <View style={[styles.button, styles.buttonInactive]}>
                  <Typography id="BACK" style={globalStyles.buttonText} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setHelpSection(2)}>
                <View style={styles.button}>
                  <Typography id="NEXT" style={globalStyles.buttonText} />
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
        {helpSection === 2 && (
          <>
            <Image
              style={styles.helpImage}
              source={changeWildbook3}
              resizeMode={'contain'}
            />
            <Instruction number={3} />
            <Instruction number={4} />
            <View style={[styles.horizontal, styles.bottomElement]}>
              <TouchableOpacity onPress={() => setHelpSection(1)}>
                <View style={[styles.button, styles.buttonInactive]}>
                  <Typography id="BACK" style={globalStyles.buttonText} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setHelpSection(3)}>
                <View style={styles.button}>
                  <Typography id="NEXT" style={globalStyles.buttonText} />
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
        {helpSection === 3 && (
          <>
            <Image
              style={styles.helpImage}
              source={changeWildbook4}
              resizeMode={'contain'}
            />
            <Instruction number={5} />
            <Instruction number={6} />
            <View style={[styles.horizontal, styles.bottomElement]}>
              <TouchableOpacity onPress={() => setHelpSection(2)}>
                <View style={[styles.button, styles.buttonInactive]}>
                  <Typography id="BACK" style={globalStyles.buttonText} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setHelpSection(4)}>
                <View style={styles.button}>
                  <Typography id="NEXT" style={globalStyles.buttonText} />
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
        {helpSection === 4 && (
          <>
            <Image
              style={styles.helpImage}
              source={changeWildbook5}
              resizeMode={'contain'}
            />
            <Instruction number={7} />
            <View style={[styles.horizontal, styles.bottomElement]}>
              <TouchableOpacity onPress={() => setHelpSection(3)}>
                <View style={[styles.button, styles.buttonInactive]}>
                  <Typography id="BACK" style={globalStyles.buttonText} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(screens.home);
                  setHelpSection(0);
                }}
              >
                <View style={styles.button}>
                  <Typography id="DONE" style={globalStyles.buttonText} />
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    height: '100%',
    backgroundColor: theme.white,
  },
  helpPage: {
    flex: 1,
    height: '100%',
  },
  helpImage: {
    width: winWidth,
    height: 800 * imageRatio,
  },
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
});

export default HelpChangeWildbook;
