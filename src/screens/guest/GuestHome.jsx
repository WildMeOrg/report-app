import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import theme from '../../constants/theme';
import { baseUrl } from '../../constants/urls';
import AsyncStorage from '@react-native-community/async-storage';
import screens from '../../constants/screens';
import { ThemeConsumer } from 'react-native-elements';
import globalStyles from '../../styles/globalStyles';
import Typography from '../../components/Typography';
import HumpbackTail from '../../../assets/humpbackTail.jpg';

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
          <View style={[styles.horizontal, styles.contentSpacing]}>
            <Text style={styles.contentText}> Have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(screens.login)}
            >
              <Text style={(styles.contentText, styles.underline)}>
                {' '}
                Log in{' '}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate(screens.guestAdd)}
          >
            <View style={styles.button}>
              <View style={styles.buttonText}>
                <Text style={[styles.contentText]}> Continue as guest </Text>
                <Icon
                  name="arrow-forward"
                  type="material-icons"
                  size={18}
                  color={theme.white}
                />
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
    margin: '5%',
    marginTop: '25%',
  },
  contentText: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: theme.white,
    marginHorizontal: '0%',
    marginVertical: '2%',
  },
  contentSpacing: {
    marginHorizontal: '5%',
  },
  button: {
    backgroundColor: theme.primary,
    alignSelf: 'center',
    marginBottom: '15%',
    borderRadius: 30,
    borderRadius: 30,
  },
  buttonText: {
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
