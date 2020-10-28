import 'react-native-gesture-handler'; // this import MUST come first

/* These polyfills are needed to support react-intl */
import Intl from 'intl';
import EnNumberFormat from 'intl/locale-data/jsonp/en.js';

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { IntlProvider } from 'react-intl';

import englishTranslations from './locale/en.json';
import spanishTranslations from './locale/es.json';

import HomeStackScreen from './src/components/HomeStackScreen';
import LoginStackScreen from './src/components/LoginStackScreen';
import NewSightingStackScreen from './src/components/NewSightingStackScreen';
import ViewSightingStackScreen from './src/components/ViewSightingStackScreen';
import ProfileStackScreen from './src/components/ProfileStackScreen';
import screens from './src/constants/screens';
import CustomDrawerContent from './src/components/CustomDrawerContent';
import SettingsStackScreen from './src/components/SettingsStackScreen';
import NotificationsStackScreen from './src/components/NotificationsStackScreen';
import getLocale from './src/utils/getLocale';
import { ReportContextProvider } from './src/context/report-context';

const messageMap = {
  en: englishTranslations,
  es: spanishTranslations,
};

const Drawer = createDrawerNavigator();

const loadFonts = () =>
  Font.loadAsync({
    'Lato-Regular': require('./assets/fonts/Lato/Lato-Regular.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato/Lato-Bold.ttf'),
  });

export default function App() {
  const [fontsLoaded, setfontsLoaded] = useState(false);
  const locale = getLocale();

  if (fontsLoaded) {
    return (
      <ReportContextProvider>
        <IntlProvider
          locale={locale}
          messages={messageMap[locale]}
          defaultLocale="en"
        >
          <NavigationContainer>
            <Drawer.Navigator
              drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
              {/* As new screens are made, put them here to be able to view them */}
              <Drawer.Screen name={screens.home} component={HomeStackScreen} />
              <Drawer.Screen
                name={screens.login}
                component={LoginStackScreen}
              />
              <Drawer.Screen
                name={screens.setings}
                component={SettingsStackScreen}
              />
              <Drawer.Screen
                name={screens.newSightings[0]}
                component={NewSightingStackScreen}
              />
              <Drawer.Screen
                name={screens.viewSighting}
                component={ViewSightingStackScreen}
              />
            </Drawer.Navigator>
          </NavigationContainer>
        </IntlProvider>
      </ReportContextProvider>
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
