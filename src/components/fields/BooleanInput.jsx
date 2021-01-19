import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';

export default function BooleanInput(rest) {
  const { name, schema, props } = rest;
  const [choice, setChoice] = useState(false);
  //TODO test
  return (
    <Picker
      selectedValue={choice}
      style={{ marginHorizontal: '5%' }}
      onValueChange={(itemValue) => setChoice(itemValue)}
    >
      <Picker.Item label={'False'} value={false} key={0} />
      <Picker.Item label={'True'} value={true} key={1} />
    </Picker>
  );
}
