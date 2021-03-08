import React, { useState, useEffect } from 'react';
import { Icon } from 'react-native-elements';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/newSightingStyles';
import theme from '../constants/theme';
import Typography from '../components/Typography';
import * as ImagePicker from 'expo-image-picker';
import Uppy from '@uppy/core';
import TESTFILE from '../../assets/images/giraffe.jpg';

export default function UppyComponent() {
  const [test, setTest] = useState('');
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions in upload photos.');
      }
      6;
    })();
  }, []);

  const pickImage = async () => {
    const uppy = new Uppy({
      onBeforeFileAdded: (currentFile, files) => {
        console.log('TESTING:', currentFile);
        console.log('files:', files);
      },
      restrictions: {
        allowedFileTypes: ['.png', '.jpg', '.jpeg'],
      },
    });
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      exif: true,
      allowsMultipleSelection: true,
    });
    console.log(result);
    if (!result.cancelled) {
      setTest(result.uri);
      console.log('TEST STATE:', test);
      try {
        uppy.addFile({
          source: 'file input',
          name: 'test_file',
          data: result.uri,
        });
      } catch (error) {
        if (error.isRestriction) {
          console.log('Restriction error:', error);
        } else {
          console.error(error);
        }
      }
    }
  };
  return (
    <View>
      <View style={styles.addNew}>
        <TouchableOpacity onPress={pickImage}>
          <Icon
            name="cloud-upload"
            type="font-awesome"
            color={theme.black}
            iconStyle={styles.addText}
            size={40}
          />
          <Typography
            id="ADD_IMAGES"
            style={(globalStyles.inputHeader, styles.addText)}
          />
        </TouchableOpacity>
      </View>
      <View>
        {test != '' && (
          <>
            <Image
              style={{ width: 200, height: 200 }}
              source={{ uri: test }}
            ></Image>
          </>
        )}
      </View>
    </View>
  );
}
