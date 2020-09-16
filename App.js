import 'react-native-gesture-handler'; // this import MUST come first
import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './auth/Login';
import Loading from './screens/Loading';
import screens from './constants/screens';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={screens.home}
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name={screens.login} component={Login} />
        <Stack.Screen name={screens.loading} component={Loading} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {
  return (
    <Button
      title="Switch to Login View"
      onPress={() => navigation.navigate(screens.login)}
    />
  );
};
