import { Text, View } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';
export default function LatLongInput(rest) {
  const { name, schema, props } = rest;
  const [lat, setLat] = useState('0.0');
  const [long, setLong] = useState('0.0');
  return (
    //TODO typography and validation
    <View style={styles.horizontal}>
      <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>Lat: </Text>
      <TextInput
        style={[globalStyles.inputField, { width: '20%' }]}
        keyboardType={'numeric'}
        placeholder={'0.0'}
        autoCorrect={false}
        value={lat}
        onChangeText={(val) => setLat(val)}
      />
      <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>
        Long:{' '}
      </Text>
      <TextInput
        style={[globalStyles.inputField, { width: '20%' }]}
        keyboardType={'numeric'}
        placeholder={'0.0'}
        autoCorrect={false}
        value={long}
        onChangeText={(val) => setLong(val)}
      />
    </View>
  );
}
