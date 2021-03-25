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
        {Object.keys(sighting).map((field) => {
          const excludeList = [
            'customFields',
            'image',
            'id',
            'name',
            'date',
            'synced',
            'inProgress',
          ];
          if (!excludeList.includes(field.toString())) {
            //customFields are handled later
            const header = (
              <Text style={globalStyles.inputHeader} key={field + 'Header'}>
                {field.toString()}
              </Text>
            );
            const body = (
              <Text
                style={[globalStyles.basicText, styles.InfoText]}
                key={field + 'Body'}
              >
                {sighting[field].toString()}
              </Text>
            );
            return [header, body];
          }
          return;
        })}
        {Object.keys(sighting.customFields).map((field) => {
          var jsBody;
          const fieldType = sighting.customFields[field].Type;
          const fieldValue = sighting.customFields[field].Value;
          const jsHeader = (
            <Text
              style={globalStyles.inputHeader}
              key={field.toString() + 'Header'}
            >
              {field.toString()}
            </Text>
          );
          if (fieldType === 'DateTimePicker') {
            const date = new Date(fieldValue.Value);
            jsBody = (
              <Text
                style={[globalStyles.basicText, styles.InfoText]}
                key={field.toString() + fieldType.toString()}
              >
                {date.toDateString()}
              </Text>
            );
          } else if (fieldType === 'DateRangePicker') {
            const sDate = new Date(fieldValue.Start);
            const eDate = new Date(fieldValue.End);
            jsBody = (
              <Text
                style={[globalStyles.basicText, styles.InfoText]}
                key={field.toString() + fieldType.toString()}
              >
                Start: {sDate.toDateString() + ' '} End: {eDate.toDateString()}
              </Text>
            );
          } else if (fieldType === 'MultiSelect') {
            jsBody = (
              <Text
                style={[globalStyles.basicText, styles.InfoText]}
                key={field.toString() + fieldType.toString()}
              >
                {fieldValue.join(', ')}
              </Text>
            );
          } else if (fieldType === 'LatLongInput') {
            jsBody = (
              <Text
                style={[globalStyles.basicText, styles.InfoText]}
                key={field.toString() + fieldType.toString()}
              >
                Latitude: {fieldValue.Lat} Longitude: {fieldValue.Long}
              </Text>
            );
          } else if (fieldType === 'AreaInput') {
            jsBody = (
              <Text
                style={[globalStyles.basicText, styles.InfoText]}
                key={field.toString() + fieldType.toString()}
              >
                North: {fieldValue.North + ' '} East: {fieldValue.East + ' '}{' '}
                South: {fieldValue.South + ' '} West: {fieldValue.West + ' '}
              </Text>
            );
          } else {
            jsBody = (
              <Text
                style={[globalStyles.basicText, styles.InfoText]}
                key={field.toString() + fieldType.toString()}
              >
                {fieldValue.toString()}
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
