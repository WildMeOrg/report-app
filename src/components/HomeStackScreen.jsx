import React from 'react';
import { Button, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import screens from '../constants/screens';
import theme from '../constants/theme';

const HomeStack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <Button
      title="Switch to Login View"
      onPress={() => navigation.navigate(screens.login)}
    />
  );
};

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
