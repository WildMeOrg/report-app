import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import globalStyles from '../../styles/globalStyles';
import { round } from 'lodash-es';
import styles from '../../styles/newSightingStyles';
import { View, TextInput } from 'react-native';

export default function FeetMetersInput(rest) {
  const { name, schema, props } = rest;
  const [choice, setChoice] = useState('Feet');
  const [measurement, setMeasurement] = useState(
    round((props.values.customFields[name] || 0) * 3.28084, 2).toString()
  );
  const onTextChange = (value) => {
    setMeasurement(value);
    props.setFieldValue(`customFields.${name}`, value);
    if (choice === 'Feet') {
      const tempVal = value * 0.3048;
      props.setFieldValue(`customFields.${name}`, tempVal);
    } else {
      props.setFieldValue(`customFields.${name}`, value);
    }
  };
  const onPickerChange = (value) => {
    if (choice === 'Meters') {
      setMeasurement(
        round(props.values.customFields[name] || 0 * 3.28084, 2).toString()
      );
      setChoice(value);
    } else {
      setMeasurement(round(props.values.customFields[name] || 0, 2).toString());
      setChoice(value);
    }
  };

  return (
    <View
      style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}
    >
      <TextInput
        style={[globalStyles.inputField, { width: '20%', height: '50%' }]}
        textAlign={'right'}
        keyboardType={'numeric'}
        placeholder={'0'}
        autoCorrect={false}
        value={measurement}
        onChangeText={onTextChange}
        onBlur={props.handleBlur(`customFields.${name}`)}
      />
      <Picker
        selectedValue={choice}
        style={{ height: 125, width: '50%' }}
        itemStyle={{ height: 125 }}
        onValueChange={onPickerChange}
      >
        <Picker.Item label={'Feet'} value={'Feet'} />
        <Picker.Item label={'Meters'} value={'Meters'} />
      </Picker>
    </View>
  );
}
