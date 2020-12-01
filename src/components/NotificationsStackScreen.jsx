import React from 'react';
import { Text, StyleSheet, Image, View, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import screens from '../constants/screens';
import { Icon, ThemeConsumer } from 'react-native-elements';
import theme from '../constants/theme';
import globalStyles from '../styles/globalStyles';
import Humpback from '../../assets/images/humpback.jpg';
import Hummingbird from '../../assets/images/hummingbird.jpg';
import RedPanda from '../../assets/images/redPanda.jpg';
import Octopus from '../../assets/images/octopus.jpg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Typography from '../components/Typography';

const NotificationsStack = createStackNavigator();

/** <SightingCard> : A functional component that creates the sighting cards on the homepage
 *    @props
 *      name  -- the name of the sighting displayed in larger, upper text
 *      image -- the imported image to be used for the cover of the card
 *      date  -- the date of the sighting displayed in smaller, lower text
 */
const NotificationCard = (props) => {
  if (props.new) {
    return (
      <View style={cardElementStyles.new}>
        <Image style={cardElementStyles.imageCover} source={props.image} />
        <View style={cardElementStyles.sightingInfo}>
          <View style={cardElementStyles.sightingText}>
            <Text style={cardElementStyles.sightingTitle}>
              {props.title}: "{props.name}"
            </Text>
            <Text style={cardElementStyles.sightingDate}>{props.message}</Text>
          </View>
          <TouchableOpacity style={cardElementStyles.close}>
            <Icon name="close" type="material-icons" size={16} marginTop={5} />
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={cardElementStyles.old}>
        <Image style={cardElementStyles.imageCover} source={props.image} />
        <View style={cardElementStyles.sightingInfo}>
          <View style={cardElementStyles.sightingText}>
            <Text style={cardElementStyles.sightingTitle}>
              {props.title}: "{props.name}"
            </Text>
            <Text style={cardElementStyles.sightingDate}>{props.message}</Text>
          </View>
          <TouchableOpacity style={cardElementStyles.close}>
            <Icon name="close" type="material-icons" size={16} marginTop={5} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const NotificationsScreen = ({ navigation }) => {
  var notifications = [
    {
      id: 1,
      image: Humpback,
      title: 'Sighting',
      name: 'Humpback',
      message: 'Added Successfully!',
      new: true,
    },
    {
      id: 2,
      image: Hummingbird,
      title: 'Sighting',
      name: 'Hummingbird',
      message: 'Added Successfully!',
      new: true,
    },
    {
      id: 3,
      image: RedPanda,
      title: 'New Sighting',
      name: 'Red Panda',
      message: 'Added By: Rick Astley',
      new: false,
    },
    {
      id: 4,
      image: Octopus,
      title: 'New Sighting',
      name: 'Octopus',
      message: 'Added By: Rick Astley',
      new: false,
    },
  ];
  return (
    <ScrollView>
      <View style={bodyStyles.unread}>
        {notifications
          .filter((notification) => notification.new === true)
          .map((notification) => {
            return (
              <View key={notification.id}>
                <NotificationCard
                  key={notification.id}
                  image={notification.image}
                  title={notification.title}
                  name={notification.name}
                  message={notification.message}
                  new={notification.new}
                />
              </View>
            );
          })}
        <View style={bodyStyles.unreadBanner}>
          <Typography id="UNREAD" style={globalStyles.h2Text} />
        </View>
      </View>
      {notifications
        .filter((notification) => notification.new === false)
        .map((notification) => {
          return (
            <View key={notification.id}>
              <NotificationCard
                key={notification.id}
                image={notification.image}
                title={notification.title}
                name={notification.name}
                message={notification.message}
              />
            </View>
          );
        })}
    </ScrollView>
  );
};

export default function NotificationsStackScreen({ navigation }) {
  return (
    <NotificationsStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon
            name="menu"
            type="material-icons"
            color={theme.black}
            onPress={() => navigation.toggleDrawer()}
            iconStyle={bodyStyles.icon}
          />
        ),
        headerRight: () => (
          <Icon
            name="close"
            type="material-icons"
            color={theme.black}
            onPress={() => navigation.navigate(screens.home)}
            iconStyle={bodyStyles.icon2}
          />
        ),
      }}
    >
      <NotificationsStack.Screen
        name={screens.notifications}
        component={NotificationsScreen}
        options={{
          headerTitle: () => (
            <Text style={globalStyles.headerText}>Notifications</Text>
          ),
        }}
      />
    </NotificationsStack.Navigator>
  );
}

const bodyStyles = StyleSheet.create({
  icon: {
    marginLeft: 16,
  },
  icon2: {
    marginRight: 16,
  },
  unread: {
    paddingTop: 5,
    marginBottom: 22,
    borderStyle: 'solid',
    borderWidth: 5,
    borderColor: theme.primary,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    // backgroundColor: theme.primary,
  },
  unreadBanner: {
    backgroundColor: theme.primary,
    fontWeight: 'bold',
    color: theme.primary,
    paddingVertical: 5,
    paddingHorizontal: 35,
    borderStyle: 'solid',
    borderWidth: 4,
    borderColor: theme.primary,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: -20,
    marginTop: 10,
  },
});

const cardElementStyles = StyleSheet.create({
  new: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.primary,
    borderRadius: 6,
    flexDirection: 'row',
    marginVertical: 7,
    width: '90%',
    height: 80,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    // iOS
    shadowColor: theme.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.6,
    // Android
    elevation: 3,
  },
  old: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#CCC',
    borderRadius: 6,
    flexDirection: 'row',
    marginVertical: 7,
    width: '90%',
    height: 80,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    // iOS
    shadowColor: theme.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.6,
    // Android
    elevation: 3,
  },
  touchableOpacityHolder: {
    width: '95%',
  },
  sightingCard: {
    flexDirection: 'row',
    marginVertical: 7,
    width: '90%',
    height: 80,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    // iOS
    shadowColor: theme.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.6,
    // Android
    elevation: 3,
  },
  sightingInfo: {
    paddingLeft: 22,
    paddingRight: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 2.5,
    alignItems: 'center',
  },
  imageCover: {
    resizeMode: 'cover', // TODO: Fix to dynamically take up space in View
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
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
    color: '#777',
  },
  close: {
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-start',
  },
});
