import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import screens from '../constants/screens';
import theme from './Typography';
import Typography from './Typography';
import globalStyles from '../styles/globalStyles';
import HelpChangeWildbook from '../screens/help/HelpChangeWildbook';

const HelpChangeWildbookStack = createStackNavigator();

export default function HelpChangeWildbookStackScreen({ navigation }) {
  return (
    <HelpChangeWildbookStack.Navigator
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
      <HelpChangeWildbookStack.Screen
        name={screens.helpPage}
        component={HelpChangeWildbook}
        options={{
          // eslint-disable-next-line react/display-name
          headerTitle: () => (
            <Typography style={globalStyles.headerText} id="HELP" />
          ),
        }}
      />
    </HelpChangeWildbookStack.Navigator>
  );
}
const styles = StyleSheet.create({
  closeButton: {
    marginRight: 16,
  },
});
