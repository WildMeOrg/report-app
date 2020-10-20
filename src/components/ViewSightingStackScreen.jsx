import React from 'react';
import { Text, StyleSheet, Image, View, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import screens from '../constants/screens';
import { Icon } from 'react-native-elements';
import Humpback from '../../assets/humpback.jpg';
import theme from '../constants/theme';
import globalStyles from '../styles/globalStyles';
import Typography from './Typography';

const ViewSightingStack = createStackNavigator();

const ViewSightingScreen = ({ Navigation }) => {
  return (
    //hardcoded to be replaced for later
    <View style={styles.InfoView}>
      <Image style={styles.image} source={Humpback} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.InfoHeader}>Humpback</Text>
        <Text style={styles.InfoText}>9/20/2020</Text>
        <View style={styles.Divider} />
        <Typography id="SIGHTING" style={styles.Title} />
        <View style={styles.Divider} />
        <Typography id="SPECIES" style={styles.InfoHeader} />
        <Text style={styles.InfoText}>Humpback Whale</Text>
        <Typography id="TITLE" style={styles.InfoHeader} />
        <Text style={styles.InfoHeader}>Title</Text>
        <Text style={styles.InfoText}>Humpy</Text>
        <Typography id="LOCATION" style={styles.InfoHeader} />
        <Text style={styles.InfoHeader}>Location</Text>
        <Text style={styles.InfoText}>Portland, OR</Text>
        <Typography id="SIGHTING_CONTEXT" style={styles.InfoHeader} />
        <Text style={styles.InfoText}>
          I saw it. The thing was absolutly massive bro.
        </Text>
      </ScrollView>
    </View>
  );
};

export default function ViewSightingStackScreen({ navigation }) {
  return (
    <ViewSightingStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon
            name="bars"
            type="font-awesome"
            color={theme.black}
            onPress={() => navigation.toggleDrawer()}
            iconStyle={styles.icon}
          />
        ),
        headerRight: () => (
          <Icon
            name="times"
            type="font-awesome"
            color={theme.black}
            onPress={() => navigation.navigate(screens.home)}
            iconStyle={styles.icon2}
          />
        ),
      }}
    >
      <ViewSightingStack.Screen
        name={screens.viewSighting}
        component={ViewSightingScreen}
        options={{
          headerTitle: () => (
            <Typography id="VIEW_SIGHTING" style={styles.headerText} />
          ),
        }}
      />
    </ViewSightingStack.Navigator>
  );
}
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
  image: {
    width: '100%',
    height: '40%',
    alignItems: 'center',
  },
  InfoView: {
    flex: 1,
    marginBottom: 10,
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
    // fontFamily: 'Lato-Regular',
    // fontSize: 18,
    // marginTop: 5,
    marginLeft: 20,
    // opacity: 0.5,
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
    marginHorizontal: '5%',
    marginTop: 10,
    borderBottomColor: '#2C2C2C',
    borderBottomWidth: 0.5,
    opacity: 0.5,
  },
});
