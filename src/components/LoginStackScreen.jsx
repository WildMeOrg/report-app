import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import screens from '../constants/screens';
import Login from '../screens/login/Login';
import theme from '../constants/theme';

const LoginStack = createStackNavigator();

export default function LoginStackScreen({ navigation }) {
  return (
    <LoginStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon
            name="bars"
            type="font-awesome"
            color={theme.black}
            onPress={() => navigation.toggleDrawer()}
            iconStyle={styles.icon}
          />
        ),
      }}
    >
      <LoginStack.Screen
        name={screens.login}
        component={Login}
        options={{
          headerTitle: () => <Text style={styles.headerText}>Login</Text>,
        }}
      />
    </LoginStack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
  },
  icon: {
    marginLeft: 16,
  },
});
