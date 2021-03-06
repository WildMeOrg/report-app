import React, { useState, useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import screens from '../constants/screens';
import theme from '../constants/theme';
import globalStyles from '../styles/globalStyles';
import NewSighting from '../screens/newSighting/newSighting.jsx';
import { StackActions } from '@react-navigation/native';

const NewSightingStack = createStackNavigator();

export default function NewSightingStackScreen({ navigation }) {
  const currentSection = 0;
  const exitForm = (currentSection) => {
    if (currentSection === 0) {
      StackActions.pop(1);
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
        name={'New Sighting'}
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
