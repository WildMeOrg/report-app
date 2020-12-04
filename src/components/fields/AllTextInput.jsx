// Component that returns a TextInput based on the given schema
import React from 'react';
import { TextInput, Alert } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';

export default function AllTextInput(rest) {
  // console.log('AllText');
  // console.log(rest);
  const { name, schema, props } = rest;
  // Right now this just handles string or longstring, stuff to handle integer/floats inputs should be added
  return (
    // <TextInput
    //   style={
    //     schema.displayType !== 'longstring'
    //       ? [globalStyles.inputField]
    //       : [globalStyles.inputField, styles.multiLine]
    //   }
    //   autoCorrect={false}
    //   multiline={schema.displayType === 'longstring'}
    //   rowsMax={schema.displayType === 'longstring' ? 5 : undefined}
    // />
    <TextInput
      style={
        schema.displayType !== 'longstring'
          ? [
              globalStyles.inputField,
              props.touched.customFields &&
                props.errors.customFields &&
                globalStyles.inputInvalid,
            ]
          : [
              globalStyles.inputField,
              styles.multiLine,
              props.touched.customFields &&
                props.errors.customFields &&
                globalStyles.inputInvalid,
            ]
      }
      autoCorrect={false}
      multiline={schema.displayType === 'longstring'}
      rowsMax={schema.displayType === 'longstring' ? 5 : undefined}
      onChangeText={(e) =>
        props.handleChange('customFields')({
          ...props.values.customFields,
          [name]: e.value,
        })
      }
      value={props.values.customFields[name] || ''}
      onBlur={props.onBlur}
      isValid={props.touched.customFields && !props.errors.customFields}
      isInvalid={props.touched.customFields && props.errors.customFields}
    />
  );
}
