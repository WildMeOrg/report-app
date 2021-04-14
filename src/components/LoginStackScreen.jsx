import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import screens from '../constants/screens';
import Login from '../screens/login/Login';
import theme from '../constants/theme';
import Typography from './Typography';
import globalStyles from '../styles/globalStyles';

const LoginStack = createStackNavigator();

export default function LoginStackScreen({ navigation, route }) {
  return (
    <LoginStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <LoginStack.Screen
        name="Login1"
        component={Login}
        options={{
          headerTitle: () => (
            <Typography id="LOGIN" style={globalStyles.headerText} />
          ),
        }}
      />
    </LoginStack.Navigator>
  );
}
