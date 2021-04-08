import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import theme from '../../constants/theme';
import screens from '../../constants/screens';
import { ThemeConsumer } from 'react-native-elements';
import globalStyles from '../../styles/globalStyles';
import Typography from '../../components/Typography';
import HumpbackTail from '../../../assets/images/humpbackTail.jpg';

const GuestHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={HumpbackTail} style={styles.image}>
        <View style={styles.darken}>
          <Text style={styles.largeHeader}> Welcome {'\n'} to Wild Me</Text>
          <Text style={[styles.contentText, styles.contentSpacing]}>
            {' '}
            You have logged in as a guest. To view {'\n'} past sightings or save
            a sighting to your {'\n'} account log in.{' '}
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate(screens.login)}>
            <View style={styles.button}>
              <View style={styles.buttonText}>
                <Text style={[styles.contentText]}> Login </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate(screens.guestAdd)}
          >
            <View style={styles.button2}>
              <View style={styles.buttonText2}>
                <Text style={[styles.contentText, { color: theme.primary }]}>
                  {' '}
                  Continue as guest{' '}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  largeHeader: {
    fontFamily: 'Lato-Regular',
    fontSize: 38,
    color: theme.white,
    textAlign: 'center',
    margin: '5%',
    marginTop: '25%',
  },
  contentText: {
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    fontSize: 16,
    color: theme.white,
    marginHorizontal: '0%',
    marginVertical: '2%',
  },
  contentSpacing: {
    marginHorizontal: '5%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: theme.primary,
    alignSelf: 'center',
    marginTop: '10%',
    marginBottom: '5%',
    borderRadius: 30,
    borderRadius: 30,
  },
  button2: {
    backgroundColor: 'transparent',
    borderColor: theme.primary,
    borderWidth: 5,
    alignSelf: 'center',
    marginBottom: '15%',
    borderRadius: 30,
    borderRadius: 30,
  },
  buttonText: {
    marginHorizontal: '16%',
    marginVertical: '3%',
    textAlign: 'right',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText2: {
    marginHorizontal: '5%',
    marginVertical: '3%',
    textAlign: 'right',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  darken: {
    flex: 1,
    backgroundColor: 'rgba(0,5,25,0.65)',
  },
  underline: {
    fontFamily: 'Lato-Regular',
    textDecorationLine: 'underline',
    color: theme.white,
    fontSize: 16,
  },
});

export default GuestHome;
