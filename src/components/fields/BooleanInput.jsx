import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';
import { Switch } from 'react-native-gesture-handler';
import theme from '../../constants/theme';
export default function BooleanInput(rest) {
  const { name, schema, props } = rest;
  const [choice, setChoice] = useState(false);
  return (
    // <Picker
    //   selectedValue={props.values.customFields[name] || choice}
    //   style={{ marginHorizontal: '5%' }}
    //   onValueChange={(itemValue) => {
    //     [
    //       setChoice(itemValue),
    //       props.setFieldValue(`customFields.${name}`, itemValue),
    //     ];
    //   }}
    //   onBlur={props.handleBlur(`customFields.${name}`)}
    // >
    //   <Picker.Item label={'False'} value={false} key={0} />
    //   <Picker.Item label={'True'} value={true} key={1} />
    // </Picker>
    <Switch
      trackColor={{ true: theme.green, false: theme.grey }}
      thumbColor={theme.white}
      style={{ marginHorizontal: '5%' }}
      onValueChange={() => setChoice(!choice)}
      value={choice}
    />
  );
}
