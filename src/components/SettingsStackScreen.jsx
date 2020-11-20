import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import screens from '../constants/screens';
import Settings from '../screens/settings/Settings';
import theme from '../constants/theme';
import Typography from './Typography';
import globalStyles from '../styles/globalStyles';

const LoginStack = createStackNavigator();

export default function LoginStackScreen({ navigation }) {
  return (
    <LoginStack.Navigator
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
      <LoginStack.Screen
        name={screens.setings}
        component={Settings}
        options={{
          headerTitle: () => (
            <Typography style={globalStyles.headerText} id="SETTINGS" />
          ),
        }}
      />
    </LoginStack.Navigator>
  );
}