import { Text, View } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';
export default function LatLongInput(rest) {
  const { name, schema, props, id } = rest;
  const { displayType } = rest;
  const type = (schema && schema.displayType) || displayType;
  const [lat, setLat] = useState('0.0');
  const [long, setLong] = useState('0.0');
  return (
    //TODO typography
    <View style={styles.horizontal}>
      <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>Lat: </Text>
      <TextInput
        style={[globalStyles.inputField, { width: '20%' }]}
        keyboardType={'numeric'}
        placeholder={'0.0'}
        autoCorrect={false}
        value={
          (props.values.customFields[name] &&
            props.values.customFields[name]['Value'][0]) ||
          lat
        }
        onBlur={props.handleBlur(`customFields.${name}`)}
        onChangeText={(val) => {
          [
            setLat(val),
            props.setFieldValue(`customFields.${name}`, {
              Type: type,
              id,
              Value: [val, long],
            }),
          ];
        }}
      />
      <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>
        Long:{' '}
      </Text>
      <TextInput
        style={[globalStyles.inputField, { width: '20%' }]}
        keyboardType={'numeric'}
        placeholder={'0.0'}
        autoCorrect={false}
        value={
          (props.values.customFields[name] &&
            props.values.customFields[name]['Value'][1]) ||
          long
        }
        onBlur={props.handleBlur(`customFields.${name}`)}
        onChangeText={(val) => {
          [
            setLong(val),
            props.setFieldValue(`customFields.${name}`, {
              Type: type,
              id,
              Value: [lat, val],
            }),
          ];
        }}
      />
    </View>
  );
}
