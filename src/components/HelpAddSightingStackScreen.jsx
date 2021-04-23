import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import screens from '../constants/screens';
import theme from './Typography';
import Typography from './Typography';
import globalStyles from '../styles/globalStyles';
import HelpAddSighting from '../screens/help/HelpAddSighting';

const HelpAddSightingStack = createStackNavigator();

export default function HelpAddSightingStackScreen({ navigation }) {
  return (
    <HelpAddSightingStack.Navigator
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
            // TODO: Reset the help "page"?
            onPress={() => navigation.navigate(screens.helpPage)}
            iconStyle={styles.closeButton}
          />
        ),
      }}
    >
      <HelpAddSightingStack.Screen
        name={screens.helpPage}
        component={HelpAddSighting}
        options={{
          // eslint-disable-next-line react/display-name
          headerTitle: () => (
            <Typography
              style={globalStyles.headerText}
              id="HOW_TO_ADD_SIGHTING"
            />
          ),
        }}
      />
    </HelpAddSightingStack.Navigator>
  );
}
const styles = StyleSheet.create({
  closeButton: {
    marginRight: 16,
  },
});
