import React from 'react';
import { Button, ScrollView, Text, View, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import screens from '../constants/screens';
import theme from '../constants/theme';
import Humpback from '../../assets/humpback.jpg';
import Hummingbird from '../../assets/hummingbird.jpg';
import RedPanda from '../../assets/redPanda.jpg';
import Octopus from '../../assets/octopus.jpg';
import WhaleShark from '../../assets/whaleshark.jpg';
import ForestLizard from '../../assets/lizard.jpg';
import Elephant from '../../assets/elephant.jpg';
import Jaguar from '../../assets/jaguar.jpg';

const HomeStack = createStackNavigator();

const HomeScreen = ({ nagivation }) => {
  return (
    <View>
      {/* TODO: Turn from ScrollView into something FlatView */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.sortBy}>
          <Text style={styles.fontLato}>
            Last Added
          </Text>
          <Icon
            name="arrowdown"
            type="antdesign"
            size={18}
            color={theme.black}
          />
        </View>
        <View style={styles.addNew}>
          <Text style={styles.addNewText}>
            + Add new sighting
          </Text>
        </View>
        {/* TODO: Split following into separate "SightingCards" function based creation */}
        <View style={styles.sightingCard}>
          <Image style={styles.imageCover} source={Humpback} />
          <View style={styles.sightingInfo}>
            <View style={styles.sightingText}>
              <Text style={styles.sightingTitle}>
                Humpback Whale
              </Text>
              <Text style={styles.sightingDate}>
                September 23rd, 2019
              </Text>
            </View>
            <Icon
              name="more-vert"
              type="materialicons"
              size={28}
              color={theme.black}
            />
          </View>
        </View>
        <View style={styles.sightingCard}>
          <Image style={styles.imageCover} source={Hummingbird} />
          <View style={styles.sightingInfo}>
            <View style={styles.sightingText}>
              <Text style={styles.sightingTitle}>
                Anna's Hummingbird
              </Text>
              <Text style={styles.sightingDate}>
                September 23rd, 2019
              </Text>
            </View>
            <Icon
              name="more-vert"
              type="materialicons"
              size={32}
              color={theme.black}
            />
          </View>
        </View>
        <View style={styles.sightingCard}>
          <Image style={styles.imageCover} source={RedPanda} />
          <View style={styles.sightingInfo}>
            <View style={styles.sightingText}>
              <Text style={styles.sightingTitle}>
                Red Panda
              </Text>
              <Text style={styles.sightingDate}>
                September 23rd, 2019
              </Text>
            </View>
            <Icon
              name="more-vert"
              type="materialicons"
              size={32}
              color={theme.black}
            />
          </View>
        </View>
        <View style={styles.sightingCard}>
          <Image style={styles.imageCover} source={Octopus} />
          <View style={styles.sightingInfo}>
            <View style={styles.sightingText}>
              <Text style={styles.sightingTitle}>
                Maldives Octopus
              </Text>
              <Text style={styles.sightingDate}>
                September 23rd, 2019
              </Text>
            </View>
            <Icon
              name="more-vert"
              type="materialicons"
              size={32}
              color={theme.black}
            />
          </View>
        </View>
        <View style={styles.sightingCard}>
          <Image style={styles.imageCover} source={WhaleShark} />
          <View style={styles.sightingInfo}>
            <View style={styles.sightingText}>
              <Text style={styles.sightingTitle}>
                Whale Shark
              </Text>
              <Text style={styles.sightingDate}>
                September 23rd, 2019
              </Text>
            </View>
            <Icon
              name="more-vert"
              type="materialicons"
              size={32}
              color={theme.black}
            />
          </View>
        </View>
        <View style={styles.sightingCard}>
          <Image style={styles.imageCover} source={ForestLizard} />
          <View style={styles.sightingInfo}>
            <View style={styles.sightingText}>
              <Text style={styles.sightingTitle}>
                Indonesian Forest Liza...
              </Text>
              <Text style={styles.sightingDate}>
                September 23rd, 2019
              </Text>
            </View>
            <Icon
              name="more-vert"
              type="materialicons"
              size={32}
              color={theme.black}
            />
          </View>
        </View>
        <View style={styles.sightingCard}>
          <Image style={styles.imageCover} source={Elephant} />
          <View style={styles.sightingInfo}>
            <View style={styles.sightingText}>
              <Text style={styles.sightingTitle}>
                African Bush Elephant
              </Text>
              <Text style={styles.sightingDate}>
                September 23rd, 2019
              </Text>
            </View>
            <Icon
              name="more-vert"
              type="materialicons"
              size={32}
              color={theme.black}
            />
          </View>
        </View>
        <View style={styles.sightingCard}>
          <Image style={styles.imageCover} source={Jaguar} />
          <View style={styles.sightingInfo}>
            <View style={styles.sightingText}>
              <Text style={styles.sightingTitle}>
                North American Jaguar
              </Text>
              <Text style={styles.sightingDate}>
                September 23rd, 2019
              </Text>
            </View>
            <Icon
              name="more-vert"
              type="materialicons"
              size={32}
              color={theme.black}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

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
            iconStyle={styles.iconLeft}
          />
        ),
        headerRight: () => (
          <Icon
            name="search"
            type="font-awesome"
            color={theme.black}
            //onPress={() => navigation.toggleDrawer()} TODO: replace with search bar in the banner
            iconStyle={styles.iconRight}
          />
        )
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

// TODO: Cleanup the styles into something more organized and clean
// TODO: Go through and insert theme colors instead of hard-set if possible
// TODO: Define font usage throughout the app? Discuss
// TODO: Clean up explicit numbers and check on different displays
const styles = StyleSheet.create({
  headerText: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
  },
  iconLeft: {
    marginLeft: 16,
  },
  iconRight: {
    marginRight: 16,
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'visible',
    paddingBottom: 5,
  },
  sortBy: {
    width: 102,
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
  },
  fontLato: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
  },
  addNew: {
    marginVertical: 11,
    marginVertical: 11,
    width: '94%',
    padding: 25,
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#888',
    borderRadius: 6,
  },
  addNewText: {
    fontSize: 20,
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    color: '#888',
  },
  sightingCard: {
    flexDirection: 'row',
    marginVertical: 10,
    marginVertical: 10,
    width: '95%',
    height: 80,
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 6,
    // TODO: Relpace with react-native-shadow
    // iOS
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    // Android
    elevation: 2,
  },
  sightingInfo: {
    paddingLeft: 22,
    paddingRight: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 2,
    alignItems: 'center',
  },
  imageCover: { // This particularly needs to be cleaned up and made work better
    resizeMode: 'cover', // Doesn't work?
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    height: 78,
    flex: 1,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  sightingText: {
    justifyContent: 'space-around',
    height: 36,
  },
  sightingTitle: {
    fontSize: 18,
    fontFamily: 'Lato-Regular',
  },
  sightingDate: {
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    color: "#777",
  },
});
