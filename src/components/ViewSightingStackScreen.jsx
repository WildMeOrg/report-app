import React, { useContext } from 'react';
import { Text, StyleSheet, Image, View, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import screens from '../constants/screens';
import { Icon } from 'react-native-elements';
import theme from '../constants/theme';
import globalStyles from '../styles/globalStyles';
import Typography from './Typography';
import { ReportContext } from '../context/reportContext';
import { SliderBox } from 'react-native-image-slider-box';

const ViewSightingStack = createStackNavigator();

const ViewSightingScreen = ({ navigation, route }) => {
  const [state, dispatch] = useContext(ReportContext);

  var sighting = state.sightings.filter((item) => {
    if (item.id === route.params.id) {
      return item;
    }
  })[0];
  //This is a bandage for a weird search bar bug.
  //console.log(sighting);
  if (sighting === undefined) {
    return null;
  }
  return (
    //TODO need to add customfields sections
    <View style={styles.InfoView} key={'Mainsection'}>
      {/* <Image style={styles.image} source={sighting.image} /> */}
      <SliderBox images={sighting.image} sliderBoxHeight={250} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={globalStyles.inputHeader}>{sighting.name}</Text>
        <Text style={[globalStyles.basicText, styles.InfoText]}>
          {sighting.date}
        </Text>
        <View style={styles.Divider} />
        <Typography id="SPECIES" style={globalStyles.inputHeader} />
        <Text style={[globalStyles.basicText, styles.InfoText]}>
          {sighting.species}
        </Text>
        <Typography id="TITLE" style={globalStyles.inputHeader} />
        <Text style={[globalStyles.basicText, styles.InfoText]}>
          {sighting.Title}
        </Text>
        <Typography id="LOCATION" style={globalStyles.inputHeader} />
        <Text style={[globalStyles.basicText, styles.InfoText]}>
          {sighting.Location}
        </Text>
        <Typography id="SIGHTING_CONTEXT" style={globalStyles.inputHeader} />
        <Text style={[globalStyles.basicText, styles.InfoText]}>
          {sighting.Context}
        </Text>
        {sighting.customFields.map((field) => {
          var jsBody;
          const jsHeader = (
            <Text style={globalStyles.inputHeader} key={field.Title + 'Header'}>
              {field.Title}
            </Text>
          );
          if (field.Type === 'DateTimePicker') {
            const date = new Date(field.Value);
            jsBody = (
              <Text
                style={[globalStyles.basicText, styles.InfoText]}
                key={field.Title + field.Type}
              >
                {date.toDateString()}
              </Text>
            );
          } else if (field.Type === 'DateRangePicker') {
            const sDate = new Date(field.Value.Start);
            const eDate = new Date(field.Value.End);
            jsBody = (
              <Text
                style={[globalStyles.basicText, styles.InfoText]}
                key={field.Title + field.Type}
              >
                Start: {sDate.toDateString()} {'\n'}End: {eDate.toDateString()}
              </Text>
            );
          } else if (field.Type === 'MultiSelect') {
            jsBody = (
              <Text
                style={[globalStyles.basicText, styles.InfoText]}
                key={field.Title + field.Type}
              >
                {field.Value.join(', ')}
              </Text>
            );
          } else if (field.Type === 'LatLongInput') {
            jsBody = (
              <Text
                style={[globalStyles.basicText, styles.InfoText]}
                key={field.Title + field.Type}
              >
                Latitude: {field.Value.Lat} Longitude: {field.Value.Long}
              </Text>
            );
          } else if (field.Type === 'Area') {
            jsBody = (
              <Text
                style={[globalStyles.basicText, styles.InfoText]}
                key={field.Title + field.Type}
              >
                North: {field.Value.North} East: {field.Value.East} South:{' '}
                {field.Value.South} West: {field.Value.West}
              </Text>
            );
          } else {
            jsBody = (
              <Text
                style={[globalStyles.basicText, styles.InfoText]}
                key={field.Title + field.Type}
              >
                {field.Value}
              </Text>
            );
          }
          return [jsHeader, jsBody];
        })}
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
      <ViewSightingStack.Screen
        name={screens.viewSighting}
        component={ViewSightingScreen}
        options={{
          headerTitle: () => (
            <Typography id="VIEW_SIGHTING" style={globalStyles.headerText} />
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
    marginLeft: 20,
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
