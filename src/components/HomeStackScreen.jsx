import React, { useState, useContext } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import screens from '../constants/screens';
import theme from '../constants/theme';
import Typography from './Typography';
import HomeScreen from '../screens/home/Home.jsx';
import { TextInput } from 'react-native-gesture-handler';
import globalStyles from '../styles/globalStyles';
import { ReportContext } from '../context/report-context';

const HomeStack = createStackNavigator();

export default function HomeStackScreen({ navigation }) {
  AsyncStorage.getItem('REPORTS', (err, result) => {
    //console.log(JSON.parse(result).sightings[1].name);
  });
  const [isSearching, setIsSearching] = useState(false);
  const [state, dispatch] = useContext(ReportContext);
  const searchFunc = (input) => {
    dispatch({
      type: 'search',
      text: input,
    });
  };

  if (isSearching) {
    return (
      <HomeStack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Icon
              name="menu"
              type="material-icons"
              color={theme.black}
              onPress={() => navigation.toggleDrawer()}
              iconStyle={headerStyles.iconLeft}
            />
          ),
          headerRight: () => (
            <Icon
              name="close"
              type="material-icons"
              color={theme.black}
              onPress={() => {
                setIsSearching(false);
                searchFunc('');
              }}
              iconStyle={globalStyles.icon}
            />
          ),
        }}
      >
        <HomeStack.Screen
          name={screens.home}
          component={HomeScreen}
          options={{
            headerTitle: () => (
              <TextInput
                placeholder="Search"
                autoFocus={true}
                style={headerStyles.searchBar}
                keyboardType={'ascii-capable'}
                onChangeText={
                  (text) =>
                    searchFunc(text)
                }
              />
            ),
          }}
        />
      </HomeStack.Navigator>
    );
  } else {
    return (
      <HomeStack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Icon
              name="menu"
              type="material-icons"
              color={theme.black}
              onPress={() => navigation.toggleDrawer()}
              iconStyle={headerStyles.iconLeft}
            />
          ),
          headerRight: () => (
            <Icon
              name="search"
              type="material-icons"
              color={theme.black}
              onPress={() => setIsSearching(true)}
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
              <Typography style={headerStyles.headerText} id="APP_NAME" />
            ),
          }}
        />
      </HomeStack.Navigator>
    );
  }
}

const headerStyles = StyleSheet.create({
  headerText: {
    fontSize: 20,
  },
  iconLeft: {
    marginLeft: 16,
  },
  iconRight: {
    marginRight: 16,
  },
  searchBar: {
    textAlign: 'center',
    minWidth: '100%',
    height: '70%',
    borderStyle: 'solid',
    paddingLeft: '5%',
    paddingRight: '5%',
    borderRadius: 20,
    borderColor: '#2C2C2C',
    borderWidth: 1,
  },
});
