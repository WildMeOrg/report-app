import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
} from 'react-native';
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
            <Text style={cardElementStyles.sightingTitle}>{props.title}: "{props.name}"</Text>
            <Text style={cardElementStyles.sightingDate}>{props.message}</Text>
          </View>
          <View style={cardElementStyles.close}>
            <Icon
              name="close"
              type="material-icons"
              size={16}
              marginTop={5}
            />
          </View>
        </View>
      </View>
    )
  } else {
    return (
      <View style={cardElementStyles.old}>
        <Image style={cardElementStyles.imageCover} source={props.image} />
        <View style={cardElementStyles.sightingInfo}>
          <View style={cardElementStyles.sightingText}>
            <Text style={cardElementStyles.sightingTitle}>{props.title}: "{props.name}"</Text>
            <Text style={cardElementStyles.sightingDate}>{props.message}</Text>
          </View>
          <View style={cardElementStyles.close}>
            <Icon
              name="close"
              type="material-icons"
              size={16}
              marginTop={5}
            />
          </View>
        </View>
      </View>
    )
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
        {notifications.filter(notification => notification.new === true)
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
          })
        }
      </View>
      <View style={bodyStyles.unreadBanner}>
        <Typography id="UNREAD" style={globalStyles.h2Text} />
      </View>
      {notifications.filter(notification => notification.new === false)
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
        })
      }
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
            iconStyle={styles.icon}
          />
        ),
        headerRight: () => (
          <Icon
            name="close"
            type="material-icons"
            color={theme.black}
            onPress={() => navigation.navigate(screens.home)}
            iconStyle={styles.icon2}
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
  unread: {
    paddingBottom: 26,
    borderStyle: 'solid',
    borderWidth: 5,
    borderTopWidth: 5,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderColor: theme.primary,
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
    marginTop: -21,
    marginBottom: 10,
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
    backgroundColor: "white",
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
    backgroundColor: "white",
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
    backgroundColor: "white",
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
  }
});


const notificationCardStyle = StyleSheet.create({
  notificationCard: {
    flexDirection: 'row',
    width: '90%',
    height: 80,
    marginLeft: '5%',
    marginTop: '2%',
    marginBottom: '2%',
    borderStyle: 'solid',
    borderRadius: 6,
    borderColor: '#2C2C2C',
    borderWidth: 1,
  },
  imageCover: {
    borderRadius: 6,
    width: '25%',
    height: '100%',
    flexDirection: 'row',
  },
  info: {
    paddingTop: 20,
    paddingRight: 20,
    alignItems: 'center',
    flex: 2.5,
  },
  title: {
    fontSize: 18,
  },
  message: {
    fontSize: 16,
  },
});
const styles = StyleSheet.create({
  headerText: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
  },
  icon: {
    marginLeft: 16,
  },
  icon2: {
    marginRight: 16,
  },
  editIcon: {
    marginTop: '2%',
    marginLeft: '90%',
  },
  image: {
    marginLeft: '20%',
    width: 250,
    height: 250,
    alignItems: 'center',
    borderRadius: 250 / 2,
  },
  InfoView: {
    flex: 1,
    marginBottom: 10,
  },
  Name: {
    color: '#2c2c2c',
    fontFamily: 'Lato-Regular',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 25,
    marginLeft: '31%',
  },
  InfoHeader: {
    color: '#2c2c2c',
    fontFamily: 'Lato-Regular',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
  InfoText: {
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    marginTop: 5,
    marginLeft: 20,
    opacity: 0.5,
  },
  Title: {
    color: '#2c2c2c',
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
    fontSize: 22,
    marginTop: 10,
    fontWeight: 'bold',
  },
  Divider: {
    marginLeft: 25,
    marginTop: 10,
    borderBottomColor: '#2C2C2C',
    borderBottomWidth: 0.5,
    width: 375,
    opacity: 0.5,
  },
});
