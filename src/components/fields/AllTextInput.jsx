// Component that returns a TextInput based on the given schema
import React from 'react';
import { TextInput, Alert } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';

export default function AllTextInput(rest) {
  const { schema } = rest;
  const { props } = rest;
  // Right now this just handles string or longstring, stuff to handle integer/floats inputs should be added
  return (
    // <TextInput
    //   style={[
    //     globalStyles.inputField,
    //     props.touched.title && props.errors.title && globalStyles.inputInvalid,
    //   ]}
    //   autoCorrect={false}
    //   onChangeText={props.handleChange('title')}
    //   value={props.values.title}
    //   onBlur={props.onBlur}
    //   isValid={props.touched.title && !props.errors.title}
    //   isInvalid={props.touched.title && props.errors.title}
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
      onChangeText={props.handleChange('customFields')}
      value={props.values.customFields}
      onBlur={props.onBlur}
      isValid={props.touched.customFields && !props.errors.customFields}
      isInvalid={props.touched.customFields && props.errors.customFields}
    />
  );
}

{
  /* <TextInput
  style={[
    globalStyles.inputField,
    formikProps.touched.title &&
      formikProps.errors.title &&
      globalStyles.inputInvalid,
  ]}
  autoCorrect={false}
  onChangeText={formikProps.handleChange('title')}
  value={formikProps.values.title}
  onBlur={formikProps.onBlur}
  isValid={
    formikProps.touched.title && !formikProps.errors.title
  }
  isInvalid={
    formikProps.touched.title && formikProps.errors.title
  }
/> */
}