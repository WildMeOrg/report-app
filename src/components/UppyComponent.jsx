import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import axios from 'axios';
import { Icon } from 'react-native-elements';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/newSightingStyles';
import theme from '../constants/theme';
import Typography from '../components/Typography';
import { baseUrl } from '../constants/urls';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import UppyFilePicker from '@uppy/react-native';
import { ImageSelectContext } from '../context/imageSelectContext.jsx';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function UppyComponent() {
  const [state, dispatch] = useContext(ImageSelectContext);
  const title = 'Scout App Test';
  const description = 'Test Description';
  const [uuid, setuuid] = useState('');

  const uppy = new Uppy({
    restrictions: {
      allowedFileTypes: ['.png', '.jpg', '.jpeg', '.heic'],
    },
  });
  uppy.on('file-added', (file) => {
    //createSubmission();
    console.log('Added file', file);
  });

  const uploadTest = () => {
    setuuid(uuidv4());
    console.log(uuid);
    uppy.upload();
  };

  try {
    if (state.images.length) {
      uppy.cancelAll();
      state.images.map((file) => {
        uppy.addFile({
          name: file.name,
          source: 'Scout App',
          type: file.type,
          data: file,
        });
      });
      uploadTest();
    }
  } catch (error) {
    if (error.isRestriction) {
      console.log('Restriction error:', error);
    } else {
      console.error(error);
    }
  }

  uppy.use(Tus, {
    endpoint: `${baseUrl}/api/v1/submissions/tus`,
    headers: {
      'x-tus-transaction-id': uuid,
    },
  });

  uppy.on('upload', (data) => {
    console.log('UPLOADING:', data);
  });

  uppy.on('complete', (uppyState) => {
    console.log('COMPLETE UPLOAD:', uppyState);
  });

  return (
    <View>
      <Text>THIS IS WHERE UPPY IS</Text>
      {/* <TouchableOpacity>
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
      <UppyFilePicker
        uppy={uppy}
        show={showUppy}
        onRequestClose={hideFilePicker}
      /> */}
    </View>
  );
}
