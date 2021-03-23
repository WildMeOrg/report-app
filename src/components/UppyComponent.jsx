import React, { useState, useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/newSightingStyles';
import Typography from '../components/Typography';
import { baseUrl } from '../constants/urls';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import uuid from 'uuid-random';
import { ImageSelectContext } from '../context/imageSelectContext.jsx';

export default function UppyComponent() {
  const [state, dispatch] = useContext(ImageSelectContext);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [reuploadComplete, setreUploadComplete] = useState(false);
  const [isUploading, setUploading] = useState(false);

  const setUploadID = (uploadID, submissionID) => {
    dispatch({
      type: 'uppy',
      submissionID: submissionID,
      uploadID: uploadID,
    });
  };

  const uppy = new Uppy({
    restrictions: {
      allowedFileTypes: ['.png', '.jpg', '.jpeg', '.heic'],
    },
  });

  const upload = () => {
    setreUploadComplete(false);
    setUploading(true);
    const uuidTemp = uuid();
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
        uppy.upload();
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
        'x-tus-transaction-id': uuidTemp,
      },
    });

    uppy.on('upload-error', (file, error, response) => {
      setUploading(false);
      console.log('error with file:', file.id);
      console.log('error message:', error);
    });

    uppy.on('error', (error) => {
      setUploading(false);
      console.error(error.stack);
    });

    uppy.on('complete', (uppyState) => {
      setUploading(false);
      setUploadID(uppyState.uploadID, uuidTemp);
      setUploadComplete(true);
      setreUploadComplete(true);
    });
  };

  return (
    <View style={styles.container}>
      {uploadComplete ? (
        <>
          {reuploadComplete ? (
            <Typography
              id="IMAGE_UPLOAD_SUCCESSFUL"
              style={[
                globalStyles.h2Text,
                { alignSelf: 'center', fontSize: 16 },
              ]}
            />
          ) : null}
          <TouchableOpacity
            style={[globalStyles.button, styles.imageButton]}
            onPress={upload}
            disabled={isUploading}
          >
            <Typography id="IMAGE_REUPLOAD" style={globalStyles.buttonText} />
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={[globalStyles.button, styles.imageButton]}
          onPress={upload}
          disabled={isUploading}
        >
          <Typography id="IMAGE_UPLOAD" style={globalStyles.buttonText} />
        </TouchableOpacity>
      )}
    </View>
  );
}
