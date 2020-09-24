import 'react-native-gesture-handler'; // this import MUST come first
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import HomeStackScreen from './src/components/HomeStackScreen';
import LoginStackScreen from './src/components/LoginStackScreen';
import NewSightingStackScreen from './src/components/NewSightingStackScreen';
import NewSighting2StackScreen from './src/components/NewSighting2StackScreen';
import NewSighting3StackScreen from './src/components/NewSighting3StackScreen';
import ViewSightingStackScreen from './src/components/ViewSightingStackScreen';
import screens from './src/constants/screens';
import CustomDrawerContent from './src/components/CustomDrawerContent';
import SettingsStackScreen from './src/components/SettingsStackScreen';

const Drawer = createDrawerNavigator();

const loadFonts = () =>
  Font.loadAsync({
    'Lato-Regular': require('./assets/fonts/Lato/Lato-Regular.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato/Lato-Bold.ttf'),
  });

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
          <Drawer.Screen
            name={screens.setings}
            component={SettingsStackScreen}
          />
          <Drawer.Screen
            name={screens.newSightings[0]}
            component={NewSightingStackScreen}
          />
          <Drawer.Screen
            name={screens.newSightings[1]}
            component={NewSighting2StackScreen}
          />
          <Drawer.Screen
            name={screens.newSightings[2]}
            component={NewSighting3StackScreen}
          />
          <Drawer.Screen
            name={screens.viewSighting}
            component={ViewSightingStackScreen}
          />
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
