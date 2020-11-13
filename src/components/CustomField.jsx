import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import screens from '../constants/screens';
import theme from '../constants/theme';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/newSightingStyles';
import LabeledInput from './LabeledInput.jsx';

export default function CustomField({ id, required, name, ...rest }) {
  const { schema } = rest;
  const displayName =
    schema != null && schema.label != null ? schema.label : name;

  return (
    // TODO: display description, required, name should be label, what if label doesn't exist
    <View>
      <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>
        {displayName}
      </Text>
      {/* LabeledInput contains the actual custom field for input */}
      <LabeledInput {...rest} />
    </View>
  );
}
