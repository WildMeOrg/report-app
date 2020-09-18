import 'react-native-gesture-handler'; // this import MUST come first
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Icon } from 'react-native-elements';
import Login from './src/screens/login/Login';
import screens from './src/constants/screens';
import CustomDrawerContent from './components/CustomDrawerContent';
import theme from './src/constants/theme';

const HomeStack = createStackNavigator();
const LoginStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const loadFonts = () =>
  Font.loadAsync({
    'Lato-Regular': require('./assets/fonts/Lato/Lato-Regular.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato/Lato-Bold.ttf'),
  });

const HomeStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator
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
      <HomeStack.Screen
        name={screens.home}
        component={HomeScreen}
        options={{
          headerTitle: () => <Text style={styles.headerText}>Home</Text>,
        }}
      />
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
  const [fontsLoaded, setfontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          {/* As new screens are made, put them here to be able to view them */}
          <Drawer.Screen name={screens.home} component={HomeStackScreen} />
          <Drawer.Screen name={screens.login} component={LoginStackScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setfontsLoaded(true)}
      />
    );
  }
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
