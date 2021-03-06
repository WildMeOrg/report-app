import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';
import { Switch } from 'react-native-gesture-handler';
import theme from '../../constants/theme';
export default function BooleanInput(rest) {
  const { name, schema, props, id } = rest;
  const { displayType } = rest;
  const type = (schema && schema.displayType) || displayType;
  const [choice, setChoice] = useState(false);
  return (
    <Switch
      trackColor={{ true: theme.primary, false: theme.grey }}
      thumbColor={theme.white}
      style={{ marginHorizontal: '5%' }}
      onValueChange={() => [
        setChoice(!choice),
        props.setFieldValue(`customFields.${name}`, {
          Type: type,
          id,
          Value: !choice,
        }),
      ]}
      onBlur={props.handleBlur(`customFields.${name}`)}
      value={
        (props.values.customFields[name] &&
          props.values.customFields[name].Value) ||
        choice
      }
    />
  );
}
