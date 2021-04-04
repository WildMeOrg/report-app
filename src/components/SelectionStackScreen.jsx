import React, { useState, useContext } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import screens from '../constants/screens';
import theme from '../constants/theme';
import Typography from './Typography';
import HomeScreen from '../screens/home/Home.jsx';
import globalStyles from '../styles/globalStyles';
import Selection from '../screens/Selection';

const SelectionStack = createStackNavigator();

export default function SelectionStackScreen({ navigation }) {
  return (
    <SelectionStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon
            name="menu"
            type="material-icons"
            color={theme.black}
            onPress={() => navigation.toggleDrawer()}
            iconStyle={globalStyles.iconLeft}
          />
        ),
      }}
    >
      <SelectionStack.Screen
        name={screens.selection}
        component={Selection}
        options={{
          headerTitle: () => (
            <Typography style={globalStyles.headerText} id="CHOOSE_WILDBOOK" />
          ),
        }}
      />
    </SelectionStack.Navigator>
  );
}
const styles = StyleSheet.create({
  closeButton: {
    marginRight: 16,
  },
});
