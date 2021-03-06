import React from 'react';
import { Text } from 'react-native';
import fieldList from './fields/fieldsList';
import globalStyles from '../styles/globalStyles';

export default function LabeledInput({ name, props, ...rest }) {
  const { displayType } = rest;
  const { schema } = rest;
  const type = (schema && schema.displayType) || displayType;
  const FieldComponent = fieldList[type];
  if (FieldComponent)
    return <FieldComponent name={name} props={props} {...rest} />;

  return (
    <Text style={[globalStyles.inputHeader, globalStyles.basicText]}>
      Not valid input
    </Text>
  );
}
