import React, { useRef, useState } from 'react';
import { Image, ScrollView, View, StyleSheet } from 'react-native';
import screens from '../../constants/screens';
import theme from '../../constants/theme';
import { Dimensions } from 'react-native';
import newSighting1 from '../../../assets/images/HelpPage/NewSighting1.png';
import newSighting2_1 from '../../../assets/images/HelpPage/NewSighting2.1.png';
import newSighting2_2 from '../../../assets/images/HelpPage/NewSighting2.2.png';
import newSighting3 from '../../../assets/images/HelpPage/NewSighting3.png';
import newSighting4 from '../../../assets/images/HelpPage/NewSighting4.png';
import { Instruction, PageNavigationButtons } from './HelpElements';

const HelpAddSighting = ({ navigation }) => {
  const [helpSection, setHelpSection] = useState(0);
  const scrollReference = useRef();
  // TODO: Abstract into PageNavigationButtons
  const scrollTop = () => {
    setTimeout(
      () => scrollReference.current?.scrollTo({ y: 0, animated: true }),
      0
    );
  };

  return (
    <View style={styles.content}>
      <ScrollView style={styles.helpPage} ref={scrollReference}>
        {helpSection === 0 && (
          <>
            <Image
              style={styles.helpImage}
              source={newSighting1}
              resizeMode={'contain'}
            />
            <Instruction section={'HELP_ADD_SIGHTING'} number={1} />
            <PageNavigationButtons
              onBackward={() => navigation.goBack()}
              onForward={() => setHelpSection(1)}
              postNavigate={scrollTop}
            />
          </>
        )}
        {helpSection === 1 && (
          <>
            <Image
              style={styles.helpImage}
              source={newSighting2_1}
              resizeMode={'contain'}
            />
            <Instruction section={'HELP_ADD_SIGHTING'} number={2} />
            <Instruction section={'HELP_ADD_SIGHTING'} number={3} />
            <PageNavigationButtons
              onBackward={() => setHelpSection(0)}
              onForward={() => setHelpSection(2)}
              postNavigate={scrollTop}
            />
          </>
        )}
        {helpSection === 2 && (
          <>
            <Image
              style={styles.helpImage}
              source={newSighting2_2}
              resizeMode={'contain'}
            />
            <Instruction section={'HELP_ADD_SIGHTING'} number={4} />
            <Instruction section={'HELP_ADD_SIGHTING'} number={5} />
            <PageNavigationButtons
              onBackward={() => setHelpSection(1)}
              onForward={() => setHelpSection(3)}
              postNavigate={scrollTop}
            />
          </>
        )}
        {helpSection === 3 && (
          <>
            <Image
              style={styles.helpImage}
              source={newSighting3}
              resizeMode={'contain'}
            />
            <Instruction section={'HELP_ADD_SIGHTING'} number={6} />
            <Instruction section={'HELP_ADD_SIGHTING'} number={7} />
            <PageNavigationButtons
              onBackward={() => setHelpSection(2)}
              onForward={() => setHelpSection(4)}
              postNavigate={scrollTop}
            />
          </>
        )}
        {helpSection === 4 && (
          <>
            <Image
              style={styles.helpImage}
              source={newSighting4}
              resizeMode={'contain'}
            />
            <Instruction section={'HELP_ADD_SIGHTING'} number={8} />
            <PageNavigationButtons
              onBackward={() => setHelpSection(3)}
              onForward={() => {
                navigation.navigate(screens.home);
                setHelpSection(0);
              }}
              forwardName={'DONE'}
              postNavigate={scrollTop}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

const winWidth = Dimensions.get('window').width;
const imageRatio = winWidth / 700; // The 700 is the px width of the images

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
});

export default HelpAddSighting;
