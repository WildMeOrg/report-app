import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';

export default function FileInput(rest) {
  //TODO testing & validation
  const { name, schema, props } = rest;
  const [file, setFile] = useState(); //file to be used
  const [fileName, setFileName] = useState('');
  const getFile = async () => {
    const res = await DocumentPicker.getDocumentAsync({});
    console.log(res);
    if (res.type !== 'cancel') {
      setFile(res);
      setFileName(res.name);
    }
  };
  const deleteFile = () => {
    setFile();
    setFileName('');
  };

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      <Text
        style={[globalStyles.h2Text, globalStyles.inputHeader]}
        numberOfLines={1}
      >
        {' '}
        Add File: {fileName}
      </Text>
      <Icon
        name="note-add"
        type="material-icons"
        onPress={getFile}
        style={{ paddingHorizontal: 10 }}
        raised={true}
      />
      <Icon
        name="remove-circle"
        type="material-icons"
        onPress={deleteFile}
        raised={true}
      />
    </View>
  );
}
