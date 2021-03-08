import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/newSightingStyles';
import theme from '../constants/theme';
import Typography from '../components/Typography';
import Uppy from '@uppy/core';
import UppyFilePicker from '@uppy/react-native';

export default function UppyComponent() {
  const [showUppy, setShowUppy] = useState(true);
  const uppy = new Uppy({
    onBeforeFileAdded: (currentFile, files) => {
      //console.log('TESTING:', currentFile);
      console.log('files:', files);
    },
    restrictions: {
      allowedFileTypes: ['.png', '.jpg', '.jpeg'],
    },
  });
  const hideFilePicker = () => {
    console.log('success:');
    setShowUppy(false);
  };
  return (
    <View>
      <TouchableOpacity>
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
      />
    </View>
  );
}
