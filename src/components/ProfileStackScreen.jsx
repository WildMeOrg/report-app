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
import { Icon } from 'react-native-elements';
import theme from '../constants/theme';
import globalStyles from '../styles/globalStyles';
import profilePic from '../../assets/images/joeShmo.jpg';

const ProfileStack = createStackNavigator();

const ProfileScreen = ({ navigation }) => {
  return (
    //hardcoded to be replaced for later
    <View style={styles.InfoView}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Icon
          name="more-vert"
          type="material-icons"
          size={28}
          color={theme.black}
          style={styles.editIcon}
          //add onPress eventually
        />
        <Image style={styles.image} source={profilePic} />
        <Text style={[globalStyles.h2Text, styles.Name]}>Joe Schmoe</Text>
        <View style={styles.Divider} />
        <Text style={[globalStyles.h2Text, styles.InfoHeader]}>
          Organization
        </Text>
        <Text style={[globalStyles.basicText, styles.InfoText]}>
          The Schmoe Conservation
        </Text>
        <Text style={[globalStyles.h2Text, styles.InfoHeader]}>Email</Text>
        <Text style={[globalStyles.basicText, styles.InfoText]}>
          schmoe.joe@email.com
        </Text>
        <Text style={[globalStyles.h2Text, styles.InfoHeader]}>
          Phone Number
        </Text>
        <Text style={[globalStyles.basicText, styles.InfoText]}>
          (503)123-4567
        </Text>
        <Text style={[globalStyles.h2Text, styles.InfoHeader]}>Location</Text>
        <Text style={[globalStyles.basicText, styles.InfoText]}>
          Portland, OR
        </Text>
      </ScrollView>
    </View>
  );
};
export default function ProfileStackScreen({ navigation }) {
  return (
    <ProfileStack.Navigator
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
      <ProfileStack.Screen
        name={screens.profile}
        component={ProfileScreen}
        options={{
          headerTitle: () => (
            <Text style={globalStyles.headerText}>Profile</Text>
          ),
        }}
      />
    </ProfileStack.Navigator>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 25,
    marginLeft: '33%',
  },
  InfoHeader: {
    color: '#2c2c2c',
    marginTop: 20,
    marginLeft: 20,
  },
  InfoText: {
    marginTop: 5,
    marginLeft: 20,
    opacity: 0.75,
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
