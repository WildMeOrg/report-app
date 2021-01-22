import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';

export default function BooleanInput(rest) {
  const { name, schema, props } = rest;
  // console.log('here');
  // console.log(props.values);
  const [choice, setChoice] = useState(false);
  //TODO test
  return (
    <Picker
      selectedValue={props.values.customFields[name] || choice}
      style={{ marginHorizontal: '5%' }}
      onValueChange={(itemValue) => {
        [
          setChoice(itemValue),
          props.setFieldValue(`customFields.${name}`, itemValue),
        ];
      }}
      onBlur={props.handleBlur(`customFields.${name}`)}
    >
      <Picker.Item label={'False'} value={false} key={0} />
      <Picker.Item label={'True'} value={true} key={1} />
    </Picker>
  );
}
