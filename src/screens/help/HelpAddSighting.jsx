import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
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
import newSighting1 from '../../../assets/images/HelpPage/NewSighting1.png';
import newSighting2_1 from '../../../assets/images/HelpPage/NewSighting2.1.png';
import newSighting2_2 from '../../../assets/images/HelpPage/NewSighting2.2.png';
import newSighting3 from '../../../assets/images/HelpPage/NewSighting3.png';
import newSighting4 from '../../../assets/images/HelpPage/NewSighting4.png';

const winWidth = Dimensions.get('window').width;
const imageRatio = winWidth / 700; // The 700 is the px width of the images

const Instruction = (props) => {
  const typographyID = `HELP_ADD_SIGHTING_${props.number}`;
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

const HelpAddSighting = ({ navigation }) => {
  const [helpSection, setHelpSection] = useState(0);

  return (
    <View style={styles.content}>
      <ScrollView style={styles.helpPage}>
        {helpSection === 0 && (
          <>
            <Image
              style={styles.helpImage}
              source={newSighting1}
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
              source={newSighting2_1}
              resizeMode={'contain'}
            />
            <Instruction number={2} />
            <Instruction number={3} />
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
              source={newSighting2_2}
              resizeMode={'contain'}
            />
            <Instruction number={4} />
            <Instruction number={5} />
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
              source={newSighting3}
              resizeMode={'contain'}
            />
            <Instruction number={6} />
            <Instruction number={7} />
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
              source={newSighting4}
              resizeMode={'contain'}
            />
            <Instruction number={8} />
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
    color: theme.green,
  },
  instructionText: {
    paddingRight: 30,
    flexGrow: 1,
  },
  button: {
    backgroundColor: theme.green,
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
    marginTop: 7,
    marginBottom: 15,
  },
});

export default HelpAddSighting;
