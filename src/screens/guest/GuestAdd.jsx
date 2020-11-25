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
import HumpbackTail from '../../../assets/images/humpbackTail.jpg';

const GuestAdd = ({ navigation }) => {
  return (
    <ImageBackground source={HumpbackTail} style={styles.image}>
      <View style={styles.darken}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate(screens.newSighting)}
            styles={styles.flexItem}
          >
            <View style={styles.button}>
              <View style={styles.buttonText}>
                <Icon
                  name="add"
                  type="material-icons"
                  size={18}
                  color={theme.white}
                />
                <Text style={[styles.contentText]}> Add Sighting </Text>
              </View>
            </View>
          </TouchableOpacity>

          <View
            style={[styles.horizontal, styles.contentSpacing, styles.flexItem]}
          >
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
        </View>
      </View>
    </ImageBackground>
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
    alignSelf: 'center',
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
    borderRadius: 30,
    marginTop: '75%',
    marginBottom: '5%',
  },
  buttonText: {
    marginHorizontal: '5%',
    marginVertical: '3%',
    textAlign: 'right',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
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

export default GuestAdd;
