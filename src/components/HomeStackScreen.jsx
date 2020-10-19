import React from 'react';
import {
  Button,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import screens from '../constants/screens';
import theme from '../constants/theme';
import HomeScreen from '../screens/home/Home.jsx';

const HomeStack = createStackNavigator();

export default function HomeStackScreen({ navigation }) {
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
            iconStyle={headerStyles.iconLeft}
          />
        ),
        headerRight: () => (
          <Icon
            name="search"
            type="font-awesome"
            color={theme.black}
            //onPress={() => navigation.toggleDrawer()} TODO: replace with search bar in the banner
            iconStyle={headerStyles.iconRight}
          />
        ),
      }}
    >
      <HomeStack.Screen
        name={screens.home}
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <Text style={headerStyles.headerText}>WildMe Report</Text>
          ),
        }}
      />
    </HomeStack.Navigator>
  );
}

const headerStyles = StyleSheet.create({
  headerText: {
    fontFamily: 'Lato-Regular',
    fontSize: 20,
  },
  iconLeft: {
    marginLeft: 16,
  },
  iconRight: {
    marginRight: 16,
  },
});
