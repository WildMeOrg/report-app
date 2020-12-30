import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';

export default function SelectInput(rest) {
  //TODO Typography
  //TODO possibly make a style for the picker?
  //TODO validation
  const { name, schema, props } = rest;
  const [choice, setChoice] = useState(schema.choices[0].label);
  return (
    <Picker
      selectedValue={choice}
      style={{ height: 50, width: 200, margin: '5%' }}
      onValueChange={(itemValue) => setChoice(itemValue)}
    >
      {schema.choices.map((item) => {
        return (
          <Picker.Item label={item.label} value={item.value} key={item.id} />
        );
      })}
    </Picker>
  );
}
