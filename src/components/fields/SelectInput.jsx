import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';
//import DropDownPicker from 'react-native-dropdown-picker';

export default function SelectInput(rest) {
  //TODO Typography
  //TODO possibly make a style for the picker?
  //TODO validation
  const { name, schema, props } = rest;
  const [choice, setChoice] = useState(schema.choices[0].label);
  return (
    <Picker
      selectedValue={props.values.customFields[name]}
      style={{ marginHorizontal: '5%', height: 125 }}
      itemStyle={{ height: 125 }}
      onValueChange={props.handleChange(`customFields.${name}`)}
      onBlur={props.handleBlur(`customFields.${name}`)}
    >
      <Picker.Item
        label="Please Select An Option"
        value="Default Option"
        key="0"
      />
      {schema.choices.map((item) => {
        return (
          <Picker.Item label={item.label} value={item.value} key={item.id} />
        );
      })}
    </Picker>
  );
}
