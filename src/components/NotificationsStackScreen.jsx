import React from 'react';
import {
  Button,
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
import Humpback from '../../assets/humpback.jpg';
import Hummingbird from '../../assets/hummingbird.jpg';
import RedPanda from '../../assets/redPanda.jpg';
import Octopus from '../../assets/octopus.jpg';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NotificationsStack = createStackNavigator();

const NotificationCard = (props) => {
  return (
    <View style={notificationCardStyle.notificationCard}>
      <Image style={notificationCardStyle.imageCover} source={props.image} />
      <View style={notificationCardStyle.info}>
        <Text style={[globalStyles.headerText, notificationCardStyle.title]}>
          {props.title}: {props.name}
        </Text>
        <Text style={[globalStyles.basicText, notificationCardStyle.message]}>
          {props.message}
        </Text>
      </View>
      <View>
        <Icon
          name="close"
          type="material-icons"
          size={16}
          marginRight="4%"
          marginTop="15%"
        />
        {
          /* Condiditonal icon if the notification has been seen */
          newCheck(props.new)
        }
      </View>
    </View>
  );
};

function newCheck(val) {
  if (val) {
    return (
      <Icon
        name="circle"
        type="font-awesome"
        size={14}
        marginTop="40%"
        marginRight="5%"
        color={theme.primary}
      />
    );
  } else {
    return null;
  }
}

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
    <View>
      {/* to be continued */}
      {notifications.map((notification) => {
        return (
          <TouchableOpacity key={notification.id}>
            <NotificationCard
              key={notification.id}
              image={notification.image}
              title={notification.title}
              name={notification.name}
              message={notification.message}
              new={notification.new}
            />
          </TouchableOpacity>
        );
      })}
    </View>
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
            <Text style={styles.headerText}>Notifications</Text>
          ),
        }}
      />
    </NotificationsStack.Navigator>
  );
}

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
