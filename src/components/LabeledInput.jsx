import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';
import AllTextInput from './fields/AllTextInput';
import fieldList from './fields/fieldsList';
import globalStyles from '../styles/globalStyles';

export default function LabeledInput({ name, props, ...rest }) {
  // console.log('LabeledInput ' + rest);
  // console.log(rest);
  const { displayType } = rest;
  const { schema } = rest;

  // TODO: what if schema doesn't exist, what if displaytype doesnt exist
  const type =
    schema != null && schema.displayType != null
      ? schema.displayType
      : displayType;

  // console.log(type);
  const FieldComponent = fieldList[type];
  if (FieldComponent)
    return <FieldComponent name={name} props={props} {...rest} />;

  return (
    <Text style={[globalStyles.inputHeader, globalStyles.basicText]}>
      Not valid input
    </Text>
  );
}
