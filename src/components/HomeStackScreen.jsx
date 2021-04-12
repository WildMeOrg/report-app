import React, { useState, useContext } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import screens from '../constants/screens';
import theme from '../constants/theme';
import Typography from './Typography';
import HomeScreen from '../screens/home/Home.jsx';
import NewSighting from '../screens/newSighting/newSighting.jsx';
import { TextInput } from 'react-native-gesture-handler';
import globalStyles from '../styles/globalStyles';
import AsyncStorage from '@react-native-community/async-storage';
import { ReportContext } from '../context/reportContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { HeaderBackButton } from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';
import { ImageSelectContext } from '../context/imageSelectContext.jsx';

const HomeStack = createStackNavigator();

export default function HomeStackScreen({ navigation }) {
  // AsyncStorage.getItem('REPORTS', (err, result) => {
  //   //console.log(JSON.parse(result).sightings[1].name);
  // });
  const [onHome, setOnHome] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [reportState, reportDispatch] = useContext(ReportContext);
  const searchFunc = (input) => {
    reportDispatch({
      type: 'search',
      text: input,
    });
  };

  const [imageSelectState, imageSelectDispatch] = useContext(ImageSelectContext);
  const clearImages = () => {
    imageSelectDispatch({ type: 'clear' });
  };

  const popAction = StackActions.pop(1);

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
          options={{
            headerTitle: () => (
              <TextInput
                placeholder="Search"
                autoFocus={true}
                style={headerStyles.searchBar}
                keyboardType={'ascii-capable'}
                onChangeText={(text) => searchFunc(text)}
              />
            ),
          }}
        >
          {(props) => <HomeScreen {...props} searching={isSearching} />}
        </HomeStack.Screen>
      </HomeStack.Navigator>
    );
  } else {
    return (
      <>
        <HomeStack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            // eslint-disable-next-line react/display-name
            headerLeft: () => (
              <Icon
                name="menu"
                type="material-icons"
                color={theme.black}
                onPress={() => navigation.toggleDrawer()}
                iconStyle={headerStyles.iconLeft}
              />
            ),
            // eslint-disable-next-line react/display-name
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
            options={{
              // eslint-disable-next-line react/display-name
              headerTitle: () => (
                <Typography style={globalStyles.headerText} id="APP_NAME" />
              ),
            }}
          >
            {(props) => <HomeScreen {...props} searching={isSearching} />}
          </HomeStack.Screen>
          <HomeStack.Screen
            name={'New Sighting'}
            component={NewSighting}
            options={{
              // eslint-disable-next-line react/display-name
              headerTitle: 'General info',
              headerTitleStyle: {
                fontFamily: 'Lato-Regular',
                fontStyle: 'normal',
              },
              // eslint-disable-next-line react/display-name
              headerRight: () => (
                <Icon
                  name="close"
                  type="material-icons"
                  color={theme.black}
                  onPress={() => {
                    clearImages();
                    navigation.dispatch(popAction);
                    setOnHome(true);
                  }}
                  iconStyle={globalStyles.icon}
                />
              ),
              headerLeft: () => null,
            }}
          />
        </HomeStack.Navigator>
      </>
    );
  }
}

const headerStyles = StyleSheet.create({
  headerText: {
    fontSize: 24,
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
