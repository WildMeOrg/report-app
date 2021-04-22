import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import theme from '../constants/theme';
import screens from '../constants/screens';
import selection from '../constants/wildbooks';
import AsyncStorage from '@react-native-community/async-storage';

const WildbookCard = (props) => {
  const loggedInfo = JSON.parse(props.loggedInfo);

  const isEnabled = loggedInfo && loggedInfo.wildbook === props.name;

  const toggleSwitch = async (name) => {
    if (loggedInfo && name === loggedInfo.wildbook) {
      props.nav.navigate(screens.home);
    } else {
      props.nav.navigate('Login', {
        screen: 'Login1',
        params: { name },
      });
    }
  };
  return (
    <TouchableOpacity
      onPress={() => toggleSwitch(props.name)}
      style={cardElementStyles.touchableOpacityHolder}
      key={props.id}
    >
      <View
        style={
          isEnabled
            ? cardElementStyles.sightingCard
            : [
              cardElementStyles.sightingCard,
              { backgroundColor: theme.lightGrey },
            ]
        }
      >
        <Image
          style={
            isEnabled
              ? cardElementStyles.imageCover
              : [cardElementStyles.imageCover, { opacity: 0.5 }]
          }
          source={props.image}
        />
        <View style={cardElementStyles.sightingText}>
          <Text
            style={
              isEnabled
                ? cardElementStyles.sightingTitle
                : [cardElementStyles.sightingTitle, { opacity: 0.5 }]
            }
          >
            {props.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const SelectionScreen = ({ navigation }) => {
  const [functionLoggin, setFunctionLoggin] = useState(null);

  const fetchLoggin = async () => {
    const loggin = await AsyncStorage.getItem('loggedIn', (err, result) => {
      return JSON.parse(result);
    });
    setFunctionLoggin(loggin);
  };
  fetchLoggin();

  return (
    <View style={bodyStyles.parentView}>
      <ScrollView contentContainerStyle={bodyStyles.content}>
        {selection.wildbooks.map((wildbook) => {
          return (
            <WildbookCard
              key={wildbook.id}
              image={wildbook.logo}
              name={wildbook.name}
              nav={navigation}
              loggedInfo={functionLoggin}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
const bodyStyles = StyleSheet.create({
  parentView: {
    height: '100%',
    backgroundColor: theme.white,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    overflow: 'visible',
    padding: 5,
    marginVertical: '5%',
    backgroundColor: theme.white,
  },
  sortBy: {
    width: '100%',
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
  },
  addNew: {
    marginTop: 15,
    marginBottom: 10,
    width: Dimensions.get('window').width * 0.9,
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
    width: 150,
  },
  sightingCard: {
    flexDirection: 'column',
    marginVertical: 7,
    width: '100%',
    height: 175,
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#CCC',
    backgroundColor: 'white',
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
  imageCover: {
    resizeMode: 'cover',
    width: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: '50%',
    flex: 1,
    // overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  sightingText: {
    justifyContent: 'center',
    height: 36,
    marginVertical: '5%',
  },
  sightingTitle: {
    fontSize: 18,
    fontFamily: 'Lato-Regular',
    justifyContent: 'center',
    textAlign: 'center',
  },
  // sightingDate: {
  //   fontSize: 12,
  //   fontFamily: 'Lato-Regular',
  //   color: '#777',
  // },
});
export default SelectionScreen;
