// Component that returns a TextInput based on the given schema
import React from 'react';
import { TextInput } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';

export default function AllTextInput(rest) {
  const { schema } = rest;

  // Right now this just handles string or longstring, stuff to handle integer/floats inputs should be added
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
    />
  );
}
