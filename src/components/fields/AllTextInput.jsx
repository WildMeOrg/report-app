// Component that returns a TextInput based on the given schema
import React from 'react';
import { TextInput, Alert } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';

export default function AllTextInput(rest) {
  const { name, schema, props } = rest;
  return (
    <TextInput
      style={
        schema.displayType !== 'longstring'
          ? globalStyles.inputField
          : [globalStyles.inputField, styles.multiLine]
      }
      autoCorrect={false}
      multiline={schema.displayType === 'longstring'}
      rowsMax={schema.displayType === 'longstring' ? 5 : undefined}
      onChangeText={props.handleChange(`customFields.${name}`)}
      value={props.values.customFields[name]}
      onBlur={props.handleBlur(`customFields.${name}`)}
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
    />
  );
}
