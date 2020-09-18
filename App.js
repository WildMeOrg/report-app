import 'react-native-gesture-handler'; // this import MUST come first
import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/login/Login';
import screens from './src/constants/screens';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import theme from './src/constants/theme';

const HomeStack = createStackNavigator();
const LoginStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon
            name="bars"
            type="font-awesome"
            color={theme.primary}
            onPress={() => navigation.toggleDrawer()}
            solid
          />
        ),
      }}
    >
      <HomeStack.Screen name={screens.home} component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

const LoginStackScreen = ({ navigation }) => {
  return (
    <LoginStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon
            name="bars"
            type="font-awesome"
            color={theme.primary}
            onPress={() => navigation.toggleDrawer()}
            solid
          />
        ),
      }}
    >
      <LoginStack.Screen name={screens.login} component={Login} />
    </LoginStack.Navigator>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <Button
      title="Switch to Login View"
      onPress={() => navigation.navigate(screens.login)}
    />
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name={screens.home} component={HomeStackScreen} />
        <Drawer.Screen name={screens.login} component={LoginStackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
