import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import screens from '../constants/screens';
import theme from '../constants/theme';
import { ImageBrowser } from 'expo-image-picker-multiple';
import globalStyles from '../styles/globalStyles';
import Typography from './Typography';
import { ImageSelectContext } from '../context/imageSelectContext.jsx';

const ImageBrowserComponent = ({ navigation }) => {
  const [state, dispatch] = useContext(ImageSelectContext);
  const setImages = (input) => {
    dispatch({
      type: 'set',
      images: input,
    });
  };

  const imagesCallback = (callback) => {
    callback
      .then(async (photos) => {
        const photosToRet = [];
        for (let photo of photos) {
          photosToRet.push({
            uri: photo.uri,
            name: photo.filename,
            type: 'image/jpg',
          });
        }
        setImages(photosToRet);
        navigation.navigate('New Sighting');
      })
      .catch((e) => console.error(e));
  };

  const renderDoneButton = (count, onSubmit) => {
    if (count > 0) {
      return (
        <Icon
          name="check"
          type="material-icons"
          color={theme.black}
          onPress={onSubmit}
          iconStyle={globalStyles.icon}
        />
      );
    } else return null;
  };

  const updateHandler = (count, onSubmit) => {
    navigation.setOptions({
      headerRight: () => renderDoneButton(count, onSubmit),
    });
  };

  // Draw Selection Box over the images
  const renderSelectedComponent = (number) => (
    <View style={selectStyles.view}>
      <Text style={selectStyles.text}>{number}</Text>
    </View>
  );

  return (
    <View style={{ height: '100%' }}>
      <ImageBrowser
        loadCompleteMetadata={false}
        onChange={updateHandler}
        callback={imagesCallback}
        renderSelectedComponent={renderSelectedComponent}
      />
    </View>
  );
};

/////////////////////////////
// Image Browser Stack Screen
/////////////////////////////

const ImageBrowserStack = createStackNavigator();

export default function ImageBrowserStackScreen({ navigation }) {
  const [state, dispatch] = useContext(ImageSelectContext);
  const clearImages = () => {
    dispatch({ type: 'clear' });
  };

  return (
    <ImageBrowserStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        // eslint-disable-next-line react/display-name
        headerLeft: () => (
          <Icon
            name="close"
            type="material-icons"
            color={theme.black}
            onPress={() => {
              // TODO: Add `react-native-dialogbox` when back with selection
              clearImages();
              navigation.navigate('New Sighting');
            }}
            iconStyle={globalStyles.iconLeft}
          />
        ),
      }}
    >
      <ImageBrowserStack.Screen
        name={screens.imageBrowser}
        component={ImageBrowserComponent}
        initialParams={{ navigation: navigation }}
        options={{
          // eslint-disable-next-line react/display-name
          headerTitle: () => (
            <Typography id="SELECT_IMAGES" style={globalStyles.headerText} />
          ),
        }}
      />
    </ImageBrowserStack.Navigator>
  );
}

const selectStyles = StyleSheet.create({
  text: {
    color: '#000',
    padding: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  view: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '100%',
    backgroundColor: theme.primary,
  },
});
