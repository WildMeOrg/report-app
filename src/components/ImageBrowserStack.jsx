import React, { useState } from 'react';
import { Text, Button, View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import screens from '../constants/screens';
import theme from '../constants/theme';
import { ImageBrowser } from 'expo-image-picker-multiple';
import * as ImageManipulator from 'expo-image-manipulator';
import globalStyles from '../styles/globalStyles';
import Typography from './Typography';
import imgProps from '../constants/imageFormat.js';

const ImageBrowserComponent = () => {
  const [selected, setSelected] = useState(false);
  const [submitBtn, setSubmitBtn] = useState();

  // Reduce the size of the image and compress for faster network transmission
  const processImageAsync = async (uri) => {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: imgProps.maxWidth } }],
      {
        compress: imgProps.compressionRatio,
        format: imgProps.format,
      }
    );
    return file;
  };

  const imagesCallback = async (photos) => {
    const selectedPhotos = [];
    for (let photo of photos) {
      console.log(photo);
      const sPhoto = await processImageAsync(photo.uri);
      selectedPhotos.push({
        uri: sPhoto.uri,
        name: photo.filename,
        type: 'image/jpg',
      });
    }
  };

  const updateHandler = (count, onSubmit) => {
    console.log(count + ' images selected');
    if (count > 0) {
      setSubmitBtn(
        <View style={selectStyles.submit}>
          <Icon
            reverse
            name="check"
            type="material-icons"
            size={36}
            color={theme.green}
            onPress={() => onSubmit()}
          />
        </View>
      );
    } else {
      setSubmitBtn(<></>);
    }
  };

  // Draw Selection Box over the images
  const renderSelectedComponent = (number) => (
    <View style={selectStyles.view}>
      <Text style={selectStyles.text}>{number}</Text>
    </View>
  );

  // Default case for ImageBrowser header
  const emptyStayComponent = <Text>No Photos Selected</Text>;

  return (
    <View style={{ height: '100%' }}>
      {submitBtn}
      <ImageBrowser
        max={10}
        loadCompleteMetadata={true}
        onChange={updateHandler}
        callback={imagesCallback}
        renderSelectedComponent={renderSelectedComponent}
        emptyStayComponent={emptyStayComponent}
      />
    </View>
  );
};

/////////////////////////////
// Image Browser Stack Screen
/////////////////////////////

const ImageBrowserStack = createStackNavigator();

export default function ImageBrowserStackScreen({ navigation }) {
  // Store array of photos to return in state
  const [photos, setPhotos] = React.useState({});

  return (
    <ImageBrowserStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        // eslint-disable-next-line react/display-name
        headerLeft: () => (
          <Icon
            name="arrow-back"
            type="material-icons"
            color={theme.black}
            onPress={() => {
              // Todo: Add `react-native-dialogbox` when back with selection
              navigation.navigate(screens.newSighting);
            }}
            iconStyle={globalStyles.iconLeft}
          />
        ),
      }}
    >
      <ImageBrowserStack.Screen
        name={screens.imageBrowser}
        component={ImageBrowserComponent}
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  view: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: theme.green,
    borderColor: '#FFF',
    borderWidth: 1,
  },
  submit: {
    position: 'absolute',
    bottom: 7,
    right: 7,
    zIndex: 2,
  },
});
