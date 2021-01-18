import { Text, View } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';

export default function AreaInput(rest) {
  const { name, schema, props } = rest;
  const [north, setNorth] = useState('0.0');
  const [east, setEast] = useState('0.0');
  const [south, setSouth] = useState('0.0');
  const [west, setWest] = useState('0.0');
  //TODO test
  return (
    <View>
      <View style={styles.horizontal}>
        <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>N:</Text>
        <TextInput
          style={[globalStyles.inputField, { width: '20%' }]}
          keyboardType={'numeric'}
          placeholder={'0.0'}
          autoCorrect={false}
          value={north}
          onChangeText={(val) => setNorth(val)}
        />
        <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>E:</Text>
        <TextInput
          style={[globalStyles.inputField, { width: '20%' }]}
          keyboardType={'numeric'}
          placeholder={'0.0'}
          autoCorrect={false}
          value={east}
          onChangeText={(val) => setEast(val)}
        />
      </View>
      <View style={styles.horizontal}>
        <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>S:</Text>
        <TextInput
          style={[globalStyles.inputField, { width: '20%' }]}
          keyboardType={'numeric'}
          placeholder={'0.0'}
          autoCorrect={false}
          value={south}
          onChangeText={(val) => setSouth(val)}
        />
        <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>W:</Text>
        <TextInput
          style={[globalStyles.inputField, { width: '20%' }]}
          keyboardType={'numeric'}
          placeholder={'0.0'}
          autoCorrect={false}
          value={west}
          onChangeText={(val) => setWest(val)}
        />
      </View>
    </View>
  );
}
