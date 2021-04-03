import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import screens from '../constants/screens';
import theme from './Typography';
import Typography from './Typography';
import globalStyles from '../styles/globalStyles';
import HelpPageScreen from '../screens/HelpPage';

const HelpPageStack = createStackNavigator();

export default function HelpPageStackScreen({ navigation }) {
  return (
    <HelpPageStack.Navigator
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
        headerRight: () => (
          <Icon
            name="close"
            type="material-icons"
            color={theme.black}
            onPress={() => navigation.navigate(screens.home)}
            iconStyle={styles.closeButton}
          />
        ),
      }}
    >
      <HelpPageStack.Screen
        name={screens.helpPage}
        component={HelpPageScreen}
        options={{
          headerTitle: () => (
            <Typography style={globalStyles.headerText} id="HELP" />
          ),
        }}
      />
    </HelpPageStack.Navigator>
  );
}
const styles = StyleSheet.create({
    closeButton: {
      marginRight: 16,
    },
  });