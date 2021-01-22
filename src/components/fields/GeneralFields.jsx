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

export default function GeneralFields(input) {
  const { formikProps } = input;
  return (
    <View>
      <Typography
        id="TITLE"
        style={[
          globalStyles.h2Text,
          globalStyles.inputHeader,
          formikProps.touched.title &&
            formikProps.errors.title &&
            globalStyles.h2TextInvalid,
        ]}
      />
      <TextInput
        style={[globalStyles.inputField]}
        autoCorrect={false}
        onChangeText={formikProps.handleChange('title')}
        value={formikProps.values.title}
        onBlur={formikProps.handleBlur('title')}
        isValid={formikProps.touched.title && !formikProps.errors.title}
        isInvalid={formikProps.touched.title && formikProps.errors.title}
      />
      <Typography
        id="LOCATION"
        style={[
          globalStyles.h2Text,
          globalStyles.inputHeader,
          formikProps.touched.location &&
            formikProps.errors.location &&
            globalStyles.h2TextInvalid,
        ]}
      />
      <TextInput
        style={[globalStyles.inputField]}
        autoCorrect={false}
        onChangeText={formikProps.handleChange('location')}
        value={formikProps.values.location}
        onBlur={formikProps.handleBlur('location')}
        isValid={formikProps.touched.location && !formikProps.errors.location}
        isInvalid={formikProps.touched.location && formikProps.errors.location}
      />
      <Typography
        id="SIGHTING_CONTEXT"
        style={[
          globalStyles.h2Text,
          globalStyles.inputHeader,
          formikProps.touched.sightingContext &&
            formikProps.errors.sightingContext &&
            globalStyles.h2TextInvalid,
        ]}
      />
      <TextInput
        style={[globalStyles.inputField, styles.multiLine]}
        autoCorrect={false}
        multiline
        numberOfLines={5}
        onChangeText={formikProps.handleChange('sightingContext')}
        value={formikProps.values.sightingContext}
        onBlur={formikProps.handleBlur('sightingContext')}
        isValid={
          formikProps.touched.sightingContext &&
          !formikProps.errors.sightingContext
        }
        isInvalid={
          formikProps.touched.sightingContext &&
          formikProps.errors.sightingContext
        }
      />
    </View>
  );
}
