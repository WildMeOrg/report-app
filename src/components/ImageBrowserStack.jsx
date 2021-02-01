import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import screens from '../constants/screens';
import theme from '../constants/theme';
import { ImageBrowser } from 'expo-image-picker-multiple';
import globalStyles from '../styles/globalStyles';
import Typography from './Typography';

const ImageBrowserComponent = () => {
  return (
    <ImageBrowser
      max={10}
      onChange={(callback) => {}}
      callback={(num, onSubmit) => {}}
    />
  );
};

const ImageBrowserStack = createStackNavigator();

export default function ImageBrowserStackScreen({ navigation }) {
  return (
    <ImageBrowserStack.Navigator
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
      <ImageBrowserStack.Screen
        name={screens.imageBrowser}
        component={ImageBrowserComponent}
        options={{
          headerTitle: () => (
            <Typography id="SELECT_IMAGES" style={globalStyles.headerText} />
          ),
        }}
      />
    </ImageBrowserStack.Navigator>
  );
}
