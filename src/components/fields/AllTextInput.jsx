/* eslint-disable prettier/prettier */
// Component that returns a TextInput based on the given schema
import React from 'react';
import { TextInput, Alert } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';
import { get } from 'lodash-es';

export default function AllTextInput(rest) {
  const { name, schema, props } = rest;
  const { displayType } = rest;
  const type = (schema && schema.displayType) || displayType;
  const onTextChange = (text) => {
    props.setFieldValue(`customFields.${name}`, {
      Type: type,
      Value: text,
    });
  };
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
      onChangeText={onTextChange}
      value={
        get(props, ['values', 'customFields', name, 'Value'],'')
      }
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
