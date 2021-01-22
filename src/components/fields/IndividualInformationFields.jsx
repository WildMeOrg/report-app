// Component that returns a TextInput based on the given schema
import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';
import Typography from '../../components/Typography';
import theme from '../../constants/theme';

export default function IndividualInformation(input) {
  const { formikProps } = input;

  return (
    <View>
      <Typography
        id="PHOTOGRAPHER_NAME"
        style={[
          globalStyles.h2Text,
          globalStyles.inputHeader,
          formikProps.touched.photographerName &&
            formikProps.errors.photographerName &&
            globalStyles.h2TextInvalid,
        ]}
      />
      <TextInput
        style={[globalStyles.inputField]}
        autoCorrect={false}
        onChangeText={formikProps.handleChange('photographerName')}
        value={formikProps.values.photographerName}
        onBlur={formikProps.handleBlur('photographerName')}
        isValid={
          formikProps.touched.photographerName &&
          !formikProps.errors.photographerName
        }
        isInvalid={
          formikProps.touched.photographerName &&
          formikProps.errors.photographerName
        }
      />
      <Typography
        id="PHOTOGRAPHER_EMAIL"
        style={[
          globalStyles.h2Text,
          globalStyles.inputHeader,
          formikProps.touched.photographerEmail &&
            formikProps.errors.photographerEmail &&
            globalStyles.h2TextInvalid,
        ]}
      />
      <TextInput
        style={[globalStyles.inputField]}
        autoCorrect={false}
        onChangeText={formikProps.handleChange('photographerEmail')}
        value={formikProps.values.photographerEmail}
        onBlur={formikProps.handleBlur('photographerEmail')}
        isValid={
          formikProps.touched.photographerEmail &&
          !formikProps.errors.photographerEmail
        }
        isInvalid={
          formikProps.touched.photographerEmail &&
          formikProps.errors.photographerEmail
        }
      />
    </View>
  );
}
