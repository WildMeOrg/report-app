import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';
import { Switch } from 'react-native-gesture-handler';
import theme from '../../constants/theme';
export default function BooleanInput(rest) {
  const { name, schema, props } = rest;
  const [choice, setChoice] = useState(false);
  console.log(props);
  return (
    <Switch
      trackColor={{ true: theme.green, false: theme.grey }}
      thumbColor={theme.white}
      style={{ marginHorizontal: '5%' }}
      onValueChange={() => [
        setChoice(!choice),
        props.setFieldValue(`customFields.${name}`, !choice),
      ]}
      onBlur={props.handleBlur(`customFields.${name}`)}
      value={choice}
    />
  );
}
