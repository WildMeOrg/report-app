import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';

export default function SelectInput(rest) {
  const { name, schema, props, id } = rest;
  const { displayType } = rest;
  const type = (schema && schema.displayType) || displayType;
  const onChoiceChange = (choice) => {
    props.setFieldValue(`customFields.${name}`, {
      Type: type,
      id,
      Value: choice,
    });
  };
  return (
    <Picker
      selectedValue={
        props.values.customFields[name] &&
        props.values.customFields[name]['Value']
      }
      style={{ marginHorizontal: '5%', height: 125 }}
      itemStyle={{ height: 125 }}
      onValueChange={onChoiceChange}
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
