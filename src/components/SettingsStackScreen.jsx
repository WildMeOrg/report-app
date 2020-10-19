import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import screens from '../constants/screens';
import Settings from '../screens/settings/Settings';
import theme from '../constants/theme';
import Typography from './Typography';

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
        name={screens.setings}
        component={Settings}
        options={{
          headerTitle: () => (
            <Typography style={styles.headerText} id="SETTINGS" />
          ),
        }}
      />
    </LoginStack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 14,
  },
  icon: {
    marginLeft: 16,
  },
});
