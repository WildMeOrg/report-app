import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TouchableOpacity, Animated, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import * as yup from 'yup';
import screens from '../constants/screens';
import theme from '../constants/theme';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/newSightingStyles';
import AsyncStorage from '@react-native-community/async-storage';
import { baseUrl } from '../constants/urls';
import sightingFormFields from './fields/sightingFormFields';
import CustomField from './CustomField.jsx';
import Typography from '../components/Typography';
import testSettingsPacket from '../constants/testSettingsPacket';
import generalValidationSchema from './fields/validationSchema';
import NetInfo from '@react-native-community/netinfo';
import GeneralFields from '../components/fields/GeneralFields';
import SightingDetailsFields from '../components/fields/SightingDetailsFields';
import IndividualInformationFields from './fields/IndividualInformationFields';
import useAsyncStorage from '../hooks/useAsyncStorage';
import { ImageSelectContext } from '../context/imageSelectContext';
import UppyComponent from '../components/UppyComponent';
import NewSighting from '../screens/newSighting/newSighting.jsx';
import { color } from 'react-native-reanimated';
import { Button } from 'react-native';

const NewSightingStack = createStackNavigator();

export default function NewSightingStackScreen({ navigation }) {
  const currentSection = 0;
  const exitForm = (currentSection) => {
    console.log(currentSection);
    if (currentSection === 0) {
      navigation.navigate(screens.home);
    } else {
      console.log('Cannot close');
    }
  };
  return (
    <NewSightingStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        // eslint-disable-next-line react/display-name
        headerRight: () => (
          <Icon
            name="close"
            type="material-icons"
            color={theme.black}
            onPress={() => {
              exitForm(currentSection);
            }}
            iconStyle={globalStyles.icon}
          />
        ),
      }}
    >
      <NewSightingStack.Screen
        name={screens.newSighting}
        component={NewSighting}
        options={{
          headerTitle: 'General info',
          headerTitleStyle: {
            fontFamily: 'Lato-Regular',
            fontStyle: 'normal',
          },
        }}
      />
    </NewSightingStack.Navigator>
  );
}
