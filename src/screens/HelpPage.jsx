import React, { useContext, useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import theme from '../constants/theme';
import globalStyles from '../styles/globalStyles';
import HomeHelp from '../../assets/images/HelpPage/Home_Page_Help.png';
import FormHelp from '../../assets/images/HelpPage/Form_Page_Help.png';
import HamHelp from '../../assets/images/HelpPage/Hamburger_Page_Help.png';
import SightingHelp from '../../assets/images/HelpPage/Sighting_Help.png';
import SelectionHelp from '../../assets/images/HelpPage/WildBook_Selection_Page_Help.png';

const HelpPage = ({ navigation }) => {
  //TODO There is probably a better way to do this
  return (
    <View style={styles.content}>
      <ScrollView style={{ flex: 1 }}>
        <Text style={[globalStyles.basicText, styles.headerText]}>
          Home Screen
        </Text>
        <Image source={HomeHelp} style={styles.image} resizeMode={'contain'} />
        <Text style={[globalStyles.basicText, styles.headerText]}>
          1. New Sighting Button
        </Text>
        <Text style={[globalStyles.basicText, styles.infoText]}>
          This button will take you to the New Sighting form.
        </Text>
        <Text style={[globalStyles.basicText, styles.headerText]}>
          2. Sighting Card
        </Text>
        <Text style={[globalStyles.basicText, styles.infoText]}>
          To view information about a sighting, press this button.
        </Text>
        <Text style={[globalStyles.basicText, styles.headerText]}>
          3. Sort Dropdown Menu
        </Text>
        <Text style={[globalStyles.basicText, styles.infoText]}>
          This menu sorts sightings based on name and date.
        </Text>
        <Text style={[globalStyles.basicText, styles.headerText]}>
          4. Search Bar
        </Text>
        <Text style={[globalStyles.basicText, styles.infoText]}>
          Pulls out a search bar to search sightings by name
        </Text>
        <Text style={[globalStyles.basicText, styles.headerText]}>
          5. Hamburger Menu
        </Text>
        <Text style={[globalStyles.basicText, styles.infoText]}>
          Pulls out a menu with other options.
        </Text>
        <Text style={[globalStyles.basicText, styles.headerText]}>
          Form Page
        </Text>
        <Image source={FormHelp} style={styles.image} resizeMode={'contain'} />
        <Text style={[globalStyles.basicText, styles.headerText]}>
          1. Add Image Button
        </Text>
        <Text style={[globalStyles.basicText, styles.infoText]}>
          This button allows you to select images of the sighting.
        </Text>
        <Text style={[globalStyles.basicText, styles.headerText]}>
          2. Upload Image Button
        </Text>
        <Text style={[globalStyles.basicText, styles.infoText]}>
          This button uploads your images to the server.
        </Text>
        <Text style={[globalStyles.basicText, styles.headerText]}>
          3. Fields
        </Text>
        <Text style={[globalStyles.basicText, styles.infoText]}>
          These are the information fields you need to fill out in relation to
          the sighting. Fields marked with a "*" are required.
        </Text>
        <Text style={[globalStyles.basicText, styles.headerText]}>4. Exit</Text>
        <Text style={[globalStyles.basicText, styles.infoText]}>
          Closes the form and takes you back to the home screen.
        </Text>
        <Text style={[globalStyles.basicText, styles.headerText]}>
          Sighting Screen
        </Text>
        <Image
          source={SightingHelp}
          style={styles.image}
          resizeMode={'contain'}
        />
        <Text style={[globalStyles.basicText, styles.headerText]}>
          1. Image Viewer
        </Text>
        <Text style={[globalStyles.basicText, styles.infoText]}>
          Displays the images of the sighting. Swipe left or right to view more
          images.
        </Text>
        <Text style={[globalStyles.basicText, styles.headerText]}>
          2. Sighting Info
        </Text>
        <Text style={[globalStyles.basicText, styles.infoText]}>
          Here is the info relating to the sighting, scroll to view more.
        </Text>
        <Text style={[globalStyles.basicText, styles.headerText]}>
          Hamburger Menu
        </Text>
        <Image source={HamHelp} style={styles.image} resizeMode={'contain'} />
        <Text style={[globalStyles.basicText, styles.headerText]}>
          1. Profile
        </Text>
        <Text style={[globalStyles.basicText, styles.infoText]}>
          To view your profile information, press this.
        </Text>
        <Text style={[globalStyles.basicText, styles.headerText]}>
          2. New Sighting Button
        </Text>
        <Text style={[globalStyles.basicText, styles.infoText]}>
          Another button to access the new sighing form.
        </Text>
        <Text style={[globalStyles.basicText, styles.headerText]}>
          3. Settings
        </Text>
        <Text style={[globalStyles.basicText, styles.infoText]}>
          Change the apps settings here.
        </Text>
        <Text style={[globalStyles.basicText, styles.headerText]}>
          4. Change Wildbook
        </Text>
        <Text style={[globalStyles.basicText, styles.infoText]}>
          This button allows you to switch wildbooks. (For those who are
          applicable)
        </Text>
        <Text style={[globalStyles.basicText, styles.headerText]}>
          5. Log out
        </Text>
        <Text style={[globalStyles.basicText, styles.infoText]}>
          logs you out of your account. You will be asked to sign in on
          start-up.
        </Text>
        <Text style={[globalStyles.basicText, styles.headerText]}>
          WildBook Selection Screen
        </Text>
        <Image
          source={SelectionHelp}
          style={styles.image}
          resizeMode={'contain'}
        />
        <Text style={[globalStyles.basicText, styles.headerText]}>
          1. WildBook Choices
        </Text>
        <Text style={[globalStyles.basicText, styles.infoText]}>
          Select a WildBook to report a sighing to. If you have an account sign
          in, else report as a guest.
        </Text>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  content: {
    flex: 1,
    height: '100%',
    backgroundColor: theme.white,
  },
  infoText: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  headerText: {
    color: '#2c2c2c',
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 20,
  },
});
export default HelpPage;
