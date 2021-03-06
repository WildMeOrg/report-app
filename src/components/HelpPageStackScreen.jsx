import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import screens from '../constants/screens';
import theme from './Typography';
import Typography from './Typography';
import globalStyles from '../styles/globalStyles';
import HelpPageScreen from '../screens/help/HelpPage';

const HelpPageStack = createStackNavigator();

export default function HelpPageStackScreen({ navigation }) {
  return (
    <HelpPageStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        // eslint-disable-next-line react/display-name
        headerLeft: () => (
          <Icon
            name="menu"
            type="material-icons"
            color={theme.black}
            onPress={() => navigation.toggleDrawer()}
            iconStyle={globalStyles.iconLeft}
          />
        ),
        // eslint-disable-next-line react/display-name
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
          // eslint-disable-next-line react/display-name
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
