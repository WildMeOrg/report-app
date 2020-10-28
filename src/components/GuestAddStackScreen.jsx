import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import screens from '../constants/screens';
import GuestAdd from '../screens/guest/GuestAdd';
import theme from '../constants/theme';
import Typography from './Typography';
import globalStyles from '../styles/globalStyles';

const GuestAddStack = createStackNavigator();

export default function GuestAddStackScreen({ navigation }) {
  return (
    <GuestAddStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        // eslint-disable-next-line react/display-name
        headerLeft: () => (
          <Icon
            name="menu"
            type="feather"
            color={theme.black}
            onPress={() => navigation.toggleDrawer()}
            iconStyle={globalStyles.iconLeft}
          />
        ),
      }}
    >
      <GuestAddStack.Screen
        name={screens.guestAdd}
        component={GuestAdd}
        options={{
          // eslint-disable-next-line react/display-name
          headerTitle: () => (
            <Typography id="APP_NAME" style={globalStyles.headerText} />
          ),
        }}
      />
    </GuestAddStack.Navigator>
  );
}
