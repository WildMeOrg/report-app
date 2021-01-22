import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';

export default function FileInput(rest) {
  const { name, schema, props } = rest;
  const [file, setFile] = useState(); //file to be used
  const [fileName, setFileName] = useState('');
  const getFile = async () => {
    const res = await DocumentPicker.getDocumentAsync({});
    if (res.type !== 'cancel') {
      setFile(res);
      setFileName(res.name);
      props.setFieldValue(`customFields.${name}`, res);
    }
  };
  const deleteFile = () => {
    setFile();
    setFileName('');
    props.setFieldValue(`customFields.${name}`, null);
  };

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      <Text
        style={[globalStyles.h2Text, globalStyles.inputHeader]}
        numberOfLines={1}
      >
        Add File:{' '}
        {(props.values.customFields[name] &&
          props.values.customFields[name].name) ||
          fileName}
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
