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
import useAsyncStorage from '../hooks/useAsyncStorage';

const WildbookCard = (props) => {
  console.log('Wildbookcard');
  // const loggedInfo = props.loggedInfo;
  const loggedInfo = useAsyncStorage('loggedIn');
  const [isEnabled, setIsEnabled] = useState(false);
  console.log('wildbook: ' + props.name);
  if (loggedInfo) {
    console.log('wildbook: ' + loggedInfo.wildbook);
  }
  useEffect(() => {
    setIsEnabled(loggedInfo && loggedInfo.wildbook === props.name);
  }, [loggedInfo]);
  // const loggedInfo = useAsyncStorage('loggedIn');
  // console.log(loggedInfo);
  // if (loggedInfo) {
  //   console.log(loggedInfo.wildbook);
  //   console.log(loggedInfo && loggedInfo.wildbook === props.name);
  // }
  // console.log('props name: ' + props.name);
  // const [isEnabled, setIsEnabled] = useState(
  //   loggedInfo && loggedInfo.wildbook === props.name
  // );
  // console.log(props.name + ': ' + isEnabled);
  //addListener is used to refresh the page when navigated to
  // React.useEffect(() => {
  //   const unsubscribe = props.nav.addListener('focus', () => {
  //     defaultState();
  //   });
  //   return unsubscribe;
  // }, [props.nav]);
  const removeLogin = async () => {
    try {
      await AsyncStorage.removeItem('loggedIn');
      //loggedInfo = null;
    } catch (e) {
      console.error(e);
    }
  };
  // const defaultState = async () => {
  //   console.log('in defaultState');
  //   if (!loggedInfo) {
  //     setIsEnabled(false);
  //   } else if (loggedInfo && loggedInfo.wildbook === props.name) {
  //     setIsEnabled(true);
  //   }
  // };
  const toggleSwitch = async (name) => {
    // console.log(name);
    if (loggedInfo) {
      console.log('loggedInfo');
      console.log(loggedInfo.wildbook);
      if (name === loggedInfo.wildbook) {
        setIsEnabled(true);
        props.nav.navigate(screens.home);
      } else {
        Alert.alert(`Already Signed into ${loggedInfo.wildbook}`);
      }
    } else {
      console.log('else');
      setIsEnabled(true);
      props.nav.navigate('Login', {
        screen: 'Login1',
        params: { name: props.name },
      });
    }
    // if (loggedInfo) {
    //   if (isEnabled) {
    //     setIsEnabled(false);
    //     removeLogin();
    //   } else if (name === loggedInfo.wildbook) {
    //     setIsEnabled(true);
    //   } else {
    //     Alert.alert(`Already Signed into ${loggedInfo.wildbook}`);
    //   }
    // } else {
    //   setIsEnabled(true);
    //   props.nav.navigate('Login', {
    //     screen: 'Login1',
    //     params: { name: props.name },
    //   });
    // }
  };
  return (
    <TouchableOpacity
      onPress={
        () => toggleSwitch(props.name)
        // navigation.navigate('Login', {
        //   screen: 'Login1',
        //   params: { name: wildbook.name },
        // })
      }
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
        {/* <View style={cardElementStyles.sightingInfo}> */}
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
        {/* <Switch
          // TODO use the theme colors
          trackColor={{ true: theme.green, false: theme.grey }}
          thumbColor={theme.white}
          onValueChange={() => toggleSwitch(props.name)}
          value={isEnabled}
        /> */}
        {/* </View> */}
      </View>
    </TouchableOpacity>
  );
};
const SelectionScreen = ({ navigation }) => {
  // const [loggedInfo, setLoggedInfo] = useState(useAsyncStorage('loggedIn'));
  // console.log('loggedinfo: ' + (loggedInfo && loggedInfo.wildbook));
  // useEffect(() => {
  //   setLoggedInfo(loggedInfo);
  // }, [loggedInfo]);
  console.log('in selection screen');
  return (
    <View style={bodyStyles.parentView}>
      <ScrollView contentContainerStyle={bodyStyles.content}>
        {selection.wildbooks.map((wildbook) => {
          return (
            // <TouchableOpacity
            //   onPress={() =>
            //     navigation.navigate('Login', {
            //       screen: 'Login1',
            //       params: { name: wildbook.name },
            //     })
            //   }
            //   style={cardElementStyles.touchableOpacityHolder}
            //   key={wildbook.id}
            // >
            <WildbookCard
              key={wildbook.id}
              image={wildbook.logo}
              name={wildbook.name}
              nav={navigation}
              // loggedInfo={loggedInfo}
            />
            // </TouchableOpacity>
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
    // flexDirection: 'column',
    // alignItems: 'center',
    // overflow: 'visible',
    // paddingBottom: 5,
    // backgroundColor: theme.white,
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
    // width: '5%',
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
  // sightingInfo: {
  //   paddingLeft: 22,
  //   paddingRight: 4,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   flex: 2.5,
  //   alignItems: 'center',
  // },
  imageCover: {
    resizeMode: 'cover',
    width: '100%',
    // borderTopLeftRadius: 5,
    // borderBottomLeftRadius: 5,
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
