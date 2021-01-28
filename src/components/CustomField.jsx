import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import screens from '../constants/screens';
import theme from '../constants/theme';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/newSightingStyles';
import LabeledInput from './LabeledInput';
import Typography from './Typography';

export default function CustomField({ id, required, name, ...rest }) {
  const { schema, props } = rest;
  const displayName = schema && schema.label || name;
  const description = schema && schema.description || '';

  return (
    <View>
      <Text style={[globalStyles.inputHeader, globalStyles.h2Text]}>
        <Text>
          {displayName}
          {required && ' * '}
        </Text>
        {props.touched.customFields &&
          props.errors.customFields &&
          props.errors.customFields[name] && (
            <Typography
              id="FIELD_REQUIRED"
              style={[
                globalStyles.h2TextInvalid,
                { fontFamily: 'Lato-Italic' },
              ]}
            />
          )}
      </Text>
      {description != '' && (
        <>
          <Text style={[globalStyles.subText, globalStyles.basicText]}>
            {description}
          </Text>
        </>
      )}
      {/* LabeledInput contains the actual custom field for input */}
      <LabeledInput name={name} props={props} {...rest} />
    </View>
  );
}
