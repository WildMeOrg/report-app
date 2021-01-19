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
  //console.log(props);
  const [choice, setChoice] = useState(schema.choices[0].label);
  return (
    // //error: undefined evaluating 'item.label.length'
    // <DropDownPicker
    //   items={[schema.choices]}
    //   defaultIndex={0}
    //   containerStyle={{ height: 40 }}
    //   onChangeItem={(item) => console.log(item)}
    // />
    <Picker
      //selectedValue={choice}
      selectedValue={props.values.customFields[name]}
      //style={{ height: '50%', width: '50%', margin: '5%' }}
      style={{ marginHorizontal: '5%', height: 125 }}
      itemStyle={{height: 125}}
      //onValueChange={(itemValue) => setChoice(itemValue)}
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
