import 'react-native-gesture-handler'; // this import MUST come first
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './auth/login';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {
  return (
    <Button
      title="Switch to Login View"
      onPress={() => navigation.navigate('Login', { name: 'Bob' })}
    />
  );
};
const ProfileScreen = () => {
  return <Text>This is Jane's profile</Text>;
};
