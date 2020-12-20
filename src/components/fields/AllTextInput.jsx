// Component that returns a TextInput based on the given schema
import React from 'react';
import { TextInput, Alert } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';
import getIn from 'formik';

export default function AllTextInput(rest) {
  // console.log('AllText');
  // console.log(rest);
  const { name, schema, props } = rest;
  console.log('TOUCHED: ');
  console.log(props.touched);
  console.log('ERRORS: ');
  console.log(props.errors);
  console.log(name + ': ' + props.values.customFields[name]);
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
      onChangeText={props.handleChange(`customFields.${name}`)}
      // onChangeText={(e) =>
      //   props.handleChange('customFields')({
      //     ...props.values.customFields,
      //     [name]: e.value,
      //   })
      // }
      value={props.values.customFields[name]}
      onBlur={props.onBlur}
      // isValid={
      //   getIn(props.touched, `customFields.${name}`) &&
      //   !getIn(props.errors, `customFields.${name}`)
      // }
      // isInvalid={
      //   getIn(props.touched, `customFields.${name}`) &&
      //   getIn(props.errors, `customFields.${name}`)
      // }
      isValid={
        (props.touched.customFields && props.touched.customFields.name) && (!props.errors.customFields && !props.errors.customFields.name)
      }
      isInvalid={
        (props.touched.customFields && props.touched.customFields.name) && (props.errors.customFields && props.errors.customFields.name)
      }
    />
  );
}
