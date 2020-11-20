import React, { useContext, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Typography from '../../components/Typography';
import theme from '../../constants/theme';
import globalStyles from '../../styles/globalStyles';
import screens from '../../constants/screens';
import { ReportContext } from '../../context/report-context';

/** <SightingCard> : A functional component that creates the sighting cards on the homepage
 *    @props
 *      name  -- the name of the sighting displayed in larger, upper text
 *      image -- the imported image to be used for the cover of the card
 *      date  -- the date of the sighting displayed in smaller, lower text
 */
const SightingCard = (props) => {
  return (
    <View style={cardElementStyles.sightingCard}>
      <Image style={cardElementStyles.imageCover} source={props.image} />
      <View style={cardElementStyles.sightingInfo}>
        <View style={cardElementStyles.sightingText}>
          <Text style={cardElementStyles.sightingTitle}>{props.name}</Text>
          <Text style={cardElementStyles.sightingDate}>{props.date}</Text>
        </View>
        <Icon
          name="more-vert"
          type="material-icons"
          size={28}
          color={theme.black}
        />
      </View>
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const [state, dispatch] = useContext(ReportContext);

  return (
    <View style={bodyStyles.parentView}>
      {/* TODO: Turn from ScrollView into something FlatView for performance in long term(?) */}
      <ScrollView contentContainerStyle={bodyStyles.content}>
        <View style={bodyStyles.sortBy}>
          <Typography id="LAST_ADDED" style={globalStyles.h2Text} />
          <Icon
            name="arrow-downward"
            type="material-icons"
            size={18}
            color={theme.black}
          />
        </View>
        <TouchableOpacity
          style={bodyStyles.addNew}
          onPress={() => navigation.navigate(screens.newSighting)}
        >
          <Typography id="NEW_SIGHTING" style={bodyStyles.addNewText} />
        </TouchableOpacity>
        {
          // Procedurally generate the cards from the sightings array
          state.sightings.map((sighting) => {
            return (
              //TODO:  change the onPress depending on the sighting card
              //currently they all go to the same card
              <TouchableOpacity
                onPress={() => navigation.navigate(screens.viewSighting)}
                style={cardElementStyles.touchableOpacityHolder}
                key={sighting.id}
              >
                <SightingCard
                  key={sighting.id}
                  image={sighting.image}
                  name={sighting.name}
                  date={sighting.date}
                />
              </TouchableOpacity>
            );
          })
        }
      </ScrollView>
    </View>
  );
};

// TODO: Clean up explicit numbers and check on different displays
const bodyStyles = StyleSheet.create({
  parentView: {
    height: '100%',
    backgroundColor: theme.white,
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'visible',
    paddingBottom: 5,
    backgroundColor: theme.white,
  },
  sortBy: {
    width: 102,
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
  },
  addNew: {
    marginTop: 15,
    marginBottom: 10,
    width: Dimensions.get('window').width*.9, // Looks dumb but is necessary
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
});

const cardElementStyles = StyleSheet.create({
  touchableOpacityHolder: {
    width: '95%',
  },
  sightingCard: {
    flexDirection: 'row',
    marginVertical: 7,
    width: '95%',
    height: 80,
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#CCC',
    backgroundColor: "white",
    borderRadius: 6,
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
});

export default HomeScreen;
