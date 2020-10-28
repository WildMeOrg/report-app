import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import screens from '../constants/screens';
import GuestHome from '../screens/guest/GuestHome';
import theme from '../constants/theme';
import Typography from './Typography';
import globalStyles from '../styles/globalStyles';

const GuestHomeStack = createStackNavigator();

export default function GuestHomeStackScreen({ navigation }) {
  return (
    <GuestHomeStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon
            name="menu"
            type="feather"
            color={theme.black}
            onPress={() => navigation.toggleDrawer()}
            iconStyle={globalStyles.iconLeft}
          />
        ),
      }}
    >
      <GuestHomeStack.Screen
        name={screens.guestHome}
        component={GuestHome}
        options={{
          headerTitle: () => (
            <Typography id="APP_NAME" style={globalStyles.headerText} />
          ),
        }}
      />
    </GuestHomeStack.Navigator>
  );
}
