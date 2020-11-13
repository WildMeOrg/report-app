import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';

export default function AllTextInput(rest) {
  const { schema } = rest;

  return (
    <TextInput
      style={
        schema.displayType !== 'longstring'
          ? globalStyles.inputFields
          : [globalStyles.inputFields, styles.multiLine]
      }
      autoCorrect={false}
      multiline={schema.displayType === 'longstring'}
      rowsMax={schema.displayType === 'longstring' ? 5 : undefined}
    />
  );
}
