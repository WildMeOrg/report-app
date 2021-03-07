import React, { useContext } from 'react';
import { Text, StyleSheet, Image, View, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import screens from '../constants/screens';
import { Icon } from 'react-native-elements';
import Humpback from '../../assets/images/humpback.jpg';
import theme from '../constants/theme';
import globalStyles from '../styles/globalStyles';
import Typography from './Typography';
import { ReportContext } from '../context/report-context';
import {SliderBox} from "react-native-image-slider-box";

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
  if(sighting === undefined){
    return null;
  }
  var keyVal = 0; //used for keys 
  return (
     //TODO need to add customfields sections 
     <View style={styles.InfoView} key={keyVal}>
     {/* <Image style={styles.image} source={sighting.image} /> */}
     <SliderBox images={sighting.image} sliderBoxHeight={250}/>
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
       {
         //TODO figure out fileInput 
         sighting.customFields.map((field) => {
          var jsHeader;
          var jsBody; 
          var componentArray = []; // to be used for custom fields
          jsHeader= <Text style={globalStyles.inputHeader} key={keyVal}>{field.Title}</Text>
          keyVal++;
          if(field.Type === "DateTimePicker"){
            var date = new Date(field.Value); 
            jsBody= <Text style={[globalStyles.basicText, styles.InfoText]} key={keyVal}>
            {date.toDateString()}
          </Text>
          }
          else if(field.Type === "DateRangePicker"){
            var sDate = new Date(field.Value.Start);
            var eDate = new Date(field.Value.End);
            jsBody = <Text style={[globalStyles.basicText, styles.InfoText]} key={keyVal}>
            Start: {sDate.toDateString()} {"\n"}End: {eDate.toDateString()}
          </Text>
          }
          else if(field.Type === "MultiSelect"){
            const arrLen = field.Value.length;
            var counter = 1;
            jsBody= <Text style={[globalStyles.basicText, styles.InfoText]} key={keyVal}>
            {field.Value.map((item,i) => {
              if(counter === arrLen){
                return(item);
              }
              counter++;
              return(item+", ")
              })}
          </Text>
          }
          else if(field.Type === "LatLongInput"){
            jsBody= <Text style={[globalStyles.basicText, styles.InfoText]} key={keyVal}>
            Latitude: {field.Value.Lat} Longitude: {field.Value.Long} 
          </Text>
          }
          else if(field.Type === "Area"){
            jsBody= <Text style={[globalStyles.basicText, styles.InfoText]} key={keyVal}>
            North: {field.Value.North} East: {field.Value.East} South: {field.Value.South} West: {field.Value.West}
          </Text>
          }else{
            jsBody= <Text style={[globalStyles.basicText, styles.InfoText]} key={keyVal}>
            {field.Value}
          </Text>
          }
          componentArray.push(jsHeader);
          componentArray.push(jsBody);
          keyVal++;
          return(componentArray);
        })
       }
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
