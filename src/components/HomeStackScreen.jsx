import React, { useState, useContext } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import screens from '../constants/screens';
import theme from '../constants/theme';
import Typography from './Typography';
import HomeScreen from '../screens/home/Home.jsx';
import { TextInput } from 'react-native-gesture-handler';
import globalStyles from '../styles/globalStyles';
import AsyncStorage from '@react-native-community/async-storage';
import { ReportContext } from '../context/reportContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const HomeStack = createStackNavigator();

export default function HomeStackScreen({ navigation }) {
  // AsyncStorage.getItem('REPORTS', (err, result) => {
  //   //console.log(JSON.parse(result).sightings[1].name);
  // });
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
                onChangeText={(text) => searchFunc(text)}
              />
            ),
          }}
        />
      </HomeStack.Navigator>
    );
  } else {
    return (
      <>
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
                <Typography style={globalStyles.headerText} id="APP_NAME" />
              ),
            }}
          />
        </HomeStack.Navigator>
        <View style={bodyStyles.addNewPosition}>
          <TouchableOpacity
            onPress={() => navigation.navigate(screens.newSighting)}
          >
            <LinearGradient
              colors={['#21BDC1', '#41D06A']}
              start={[0, 0]}
              end={[1, 1]}
              style={bodyStyles.addNew}
            >
              <Text style={bodyStyles.addNewText}>+</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const bodyStyles = StyleSheet.create({
  addNewPosition: {
    // backgroundColor: theme.red,
    height: Dimensions.get('window').width * 0.07,
    width: Dimensions.get('window').width * 0.07,
    // marginTop: 15,
    // marginBottom: 10,
    // padding: '5%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: '7%',
    // iOS
    shadowColor: theme.black,
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.35,
    // shadowRadius: 2.6,
    // // Android
    // elevation: 3,
  },
  addNew: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // marginTop: 15,
    // marginBottom: 10,
    // width: Dimensions.get('window').width * 0.9, // Looks dumb but is necessary
    height: '100%',
    width: '100%',
    // padding: 25,
    justifyContent: 'center',
    alignContent: 'center',
    // borderStyle: 'dashed',
    // borderWidth: 1,
    // borderColor: theme.primary,
    borderRadius: Dimensions.get('window').width * 0.09,
    // backgroundColor: theme.primary,
    // margin: '0%',
    // Android
    shadowRadius: 2.6,
    elevation: 4,
  },
  addNewText: {
    fontSize: 45,
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    color: theme.white,
    // margin: '0%',
  },
});

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
