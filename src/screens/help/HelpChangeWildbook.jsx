import React, { useRef, useState } from 'react';
import { Image, ScrollView, View, StyleSheet } from 'react-native';
import screens from '../../constants/screens';
import theme from '../../constants/theme';
import { Dimensions } from 'react-native';
import changeWildbook1 from '../../../assets/images/HelpPage/ChangeWildbook1.png';
import changeWildbook2 from '../../../assets/images/HelpPage/ChangeWildbook2.png';
import changeWildbook3 from '../../../assets/images/HelpPage/ChangeWildbook3.png';
import changeWildbook4 from '../../../assets/images/HelpPage/ChangeWildbook4.png';
import changeWildbook5 from '../../../assets/images/HelpPage/ChangeWildbook5.png';
import { Instruction, PageNavigationButtons } from './HelpElements';

const HelpChangeWildbook = ({ navigation }) => {
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
              source={changeWildbook1}
              resizeMode={'contain'}
            />
            <Instruction section={'HELP_CHANGE_WILDBOOK'} number={1} />
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
              source={changeWildbook2}
              resizeMode={'contain'}
            />
            <Instruction section={'HELP_CHANGE_WILDBOOK'} number={2} />
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
              source={changeWildbook3}
              resizeMode={'contain'}
            />
            <Instruction section={'HELP_CHANGE_WILDBOOK'} number={3} />
            <Instruction section={'HELP_CHANGE_WILDBOOK'} number={4} />
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
              source={changeWildbook4}
              resizeMode={'contain'}
            />
            <Instruction section={'HELP_CHANGE_WILDBOOK'} number={5} />
            <Instruction section={'HELP_CHANGE_WILDBOOK'} number={6} />
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
              source={changeWildbook5}
              resizeMode={'contain'}
            />
            <Instruction section={'HELP_CHANGE_WILDBOOK'} number={7} />
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

export default HelpChangeWildbook;
