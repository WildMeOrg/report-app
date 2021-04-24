import React, { useState } from 'react';
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
  const displayName = (schema && schema.label) || name;
  const description = (schema && schema.description) || '';

  const [submitAttempts, setSubmitAttempts] = useState(props.submitCount);

  //separate style for boolean custom fields
  if (schema.displayType === 'boolean') {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginHorizontal: '4%' }}>
          <Text style={[globalStyles.inputHeader, globalStyles.h2Text]}>
            {displayName}
            {required && '*'}
          </Text>
          {props.submitCount > submitAttempts &&
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
          {description != '' && (
            <>
              <Text style={[globalStyles.subText, globalStyles.basicText]}>
                {description}
              </Text>
            </>
          )}
        </View>
        {/* LabeledInput contains the actual custom field for input */}
        <View
          style={{ marginLeft: '75%', marginTop: '3%', position: 'absolute' }}
        >
          <LabeledInput name={name} props={props} {...rest} />
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text style={[globalStyles.inputHeader, globalStyles.h2Text]}>
          {displayName}
          {required && '*'}
        </Text>
        {props.submitCount > submitAttempts &&
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
}
