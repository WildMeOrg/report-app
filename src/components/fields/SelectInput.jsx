import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';

export default function SelectInput(rest) {
  //TODO Typography
  //TODO possibly make a style for the picker?
  //TODO validation
  const { name, schema, props } = rest;
  console.log(props);
  const [choice, setChoice] = useState(schema.choices[0].label);
  return (
    <Picker
      //selectedValue={choice}
      selectedValue={props.values.customFields[name]}
      style={{ height: 50, width: 200, margin: '5%' }}
      //onValueChange={(itemValue) => setChoice(itemValue)}
      onValueChange={props.handleChange(`customFields.${name}`)}
      onBlur={props.onBlur}
      isValid={
        props.touched.customFields &&
        (!props.errors.customFields ||
          (props.errors.customFields && !props.errors.customFields.name))
      }
      isInvalid={
        props.touched.customFields &&
        props.errors.customFields &&
        props.errors.customFields.name
      }
    >
      {schema.choices.map((item) => {
        return (
          <Picker.Item label={item.label} value={item.value} key={item.id} />
        );
      })}
    </Picker>
  );
}
