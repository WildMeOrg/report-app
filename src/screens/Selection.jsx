import React, { useContext, useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Switch,
  Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Typography from '../components/Typography';
import theme from '../constants/theme';
import globalStyles from '../styles/globalStyles';
import screens from '../constants/screens';
import { ReportContext } from '../context/report-context';
import selection from '../constants/wildbooks';
import AsyncStorage from '@react-native-community/async-storage';

const WildbookCard = (props) => {
  //TODO use context to keep track of what wildbook
  //was authorized
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('loggedIn');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  const removeLogin = async () => {
    try {
      await AsyncStorage.removeItem('loggedIn');
    } catch (e) {
      // remove error
    }
  };
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = async (name) => {
    const loggedInfo = await getData();
    if (loggedInfo) {
      if (isEnabled) {
        setIsEnabled(false);
        removeLogin();
      } else if (name === loggedInfo.wildbook) {
        setIsEnabled(true);
      } else {
        Alert.alert(`Already Signed into ${loggedInfo.wildbook}`);
      }
    } else {
      props.nav.navigate('Login', {
        screen: 'Login1',
        params: { name: props.name },
      });
    }
  };
  return (
    <View style={cardElementStyles.sightingCard}>
      <Image style={cardElementStyles.imageCover} source={props.image} />
      <View style={cardElementStyles.sightingInfo}>
        <View style={cardElementStyles.sightingText}>
          <Text style={cardElementStyles.sightingTitle}>{props.name}</Text>
        </View>
        <Switch
          // TODO use the theme colors
          trackColor={{ true: theme.green, false: theme.grey }}
          thumbColor={theme.white}
          onValueChange={() => toggleSwitch(props.name)}
          value={isEnabled}
        />
      </View>
    </View>
  );
};
const SelectionScreen = ({ navigation }) => {
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
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'visible',
    paddingBottom: 5,
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
  sightingInfo: {
    paddingLeft: 22,
    paddingRight: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 2.5,
    alignItems: 'center',
  },
  imageCover: {
    resizeMode: 'cover',
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
export default SelectionScreen;
