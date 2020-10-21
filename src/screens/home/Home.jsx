import React from 'react';
import { ScrollView, Text, View, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Typography from '../../components/Typography';
import theme from '../../constants/theme';
import Humpback from '../../../assets/humpback.jpg';
import Hummingbird from '../../../assets/hummingbird.jpg';
import RedPanda from '../../../assets/redPanda.jpg';
import Octopus from '../../../assets/octopus.jpg';
import WhaleShark from '../../../assets/whaleshark.jpg';
import ForestLizard from '../../../assets/lizard.jpg';
import Elephant from '../../../assets/elephant.jpg';
import Jaguar from '../../../assets/jaguar.jpg';
import globalStyles from '../../styles/globalStyles';
import screens from '../../constants/screens';

/** <SightingCard> : A functional component that creates the sighting cards on the homepage
 *    @props
 *      name  -- the name of the sighting displayed in larger, upper text
 *      image -- the imported image to be used for the cover of the card
 *      date  -- the date of the sighting displayed in smaller, lower text
 */
const SightingCard = (props) => {
  const state = useContext(State);

  return (
    <View style={cardElementStyles.sightingCard}>
      <Image style={cardElementStyles.imageCover} source={props.image} />
      <View style={cardElementStyles.sightingInfo}>
        <View style={cardElementStyles.sightingText}>
          <Text style={cardElementStyles.sightingTitle}>
            {/*{props.name}*/}
            {state.text}
          </Text>
          <Text style={cardElementStyles.sightingDate}>
            {props.date}
          </Text>
        </View>
        <Icon
          name="more-vert"
          type="materialicons"
          size={28}
          color={theme.black}
        />
      </View>
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  // TODO: Move to state
  var sightings = [
    {
      id: 1,
      image: Humpback,
      name: 'Humpback Whale',
      date: 'September 23rd, 2019',
      synced: true,
      inProgress: false,
    },
    {
      id: 2,
      image: Hummingbird,
      name: "Anna's Hummingbird",
      date: 'September 23rd, 2019',
      synced: true,
      inProgress: false,
    },
    {
      id: 3,
      image: RedPanda,
      name: 'Red Panda',
      date: 'September 23rd, 2019',
      synced: true,
      inProgress: false,
    },
    {
      id: 4,
      image: Octopus,
      name: 'Maldives Octopus',
      date: 'September 23rd, 2019',
      synced: true,
      inProgress: false,
    },
    {
      id: 5,
      image: WhaleShark,
      name: 'Whale Shark',
      date: 'September 23rd, 2019',
      synced: true,
      inProgress: false,
    },
    {
      id: 6,
      image: ForestLizard,
      name: 'Indonesian Forest Liza...',
      date: 'September 23rd, 2019',
      synced: true,
      inProgress: false,
    },
    {
      id: 7,
      image: Elephant,
      name: 'African Bush Elephant',
      date: 'September 23rd, 2019',
      synced: true,
      inProgress: false,
    },
    {
      id: 8,
      image: Jaguar,
      name: 'North American Jaguar',
      date: 'September 23rd, 2019',
      synced: true,
      inProgress: false,
    },
  ];

  return (
    <View>
      {/* TODO: Turn from ScrollView into something FlatView for performance in long term(?) */}
      <ScrollView contentContainerStyle={bodyStyles.content}>
        <View style={bodyStyles.sortBy}>
          <Typography id="LAST_ADDED" style={globalStyles.h2Text} />
          <Icon
            name="arrowdown"
            type="antdesign"
            size={18}
            color={theme.black}
          />
        </View>
        <TouchableOpacity
          style={bodyStyles.addNew}
          onPress={() => navigation.navigate(screens.newSightings[0])}
        >
          <Typography id="NEW_SIGHTING" style={bodyStyles.addNewText} />
        </TouchableOpacity>
        {
          // Procedurally generate the cards from the sightings array
          sightings.map((sighting) => {
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
  // sortByText: {
  //   fontFamily: 'Lato-Regular',
  //   fontSize: 16,
  // },
  addNew: {
    marginVertical: 11,
    width: '94%',
    padding: 25,
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#888',
    borderRadius: 6,
  },
  addNewText: {
    marginLeft: 75,
    marginRight: 75,
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
    marginVertical: 10,
    marginVertical: 10,
    width: '95%',
    height: 80,
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 6,
    // TODO: Relpace with react-native-shadow
    // iOS
    shadowColor: theme.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    // Android
    elevation: 2,
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
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
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
