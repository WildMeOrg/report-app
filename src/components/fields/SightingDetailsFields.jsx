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

export default function SightingDetailsFields(input) {
  const { formikProps } = input;

  return (
    <View>
      <Typography
        id="STATUS"
        style={(globalStyles.h2Text, globalStyles.inputHeader)}
      />
      <TextInput
        style={[
          globalStyles.inputField,
          formikProps.touched &&
            formikProps.touched.status &&
            formikProps.errors.status &&
            globalStyles.inputInvalid,
        ]}
        autoCorrect={false}
        onChangeText={formikProps.handleChange('status')}
        value={formikProps.values.status}
        onBlur={formikProps.handleBlur('status')}
        isValid={formikProps.touched.status && !formikProps.errors.status}
        isInvalid={formikProps.touched.status && formikProps.errors.status}
      />
      <Typography
        id="RELATIONSHIPS"
        style={(globalStyles.h2Text, globalStyles.inputHeader)}
      />
      <TextInput
        style={[
          globalStyles.inputField,
          formikProps.touched.relationships &&
            formikProps.errors.relationships &&
            globalStyles.inputInvalid,
        ]}
        autoCorrect={false}
        onChangeText={formikProps.handleChange('relationships')}
        value={formikProps.values.relationships}
        onBlur={formikProps.handleBlur('relationships')}
        isValid={
          formikProps.touched.relationships && !formikProps.errors.relationships
        }
        isInvalid={
          formikProps.touched.relationships && formikProps.errors.relationships
        }
      />
      <Typography
        id="MATCH_INDIVIDUAL"
        style={(globalStyles.h2Text, globalStyles.inputHeader)}
      />
      <TextInput
        style={[
          globalStyles.inputField,
          formikProps.touched.matchIndividual &&
            formikProps.errors.matchIndividual &&
            globalStyles.inputInvalid,
        ]}
        autoCorrect={false}
        onChangeText={formikProps.handleChange('matchIndividual')}
        value={formikProps.values.matchIndividual}
        onBlur={formikProps.handleBlur('matchIndividual')}
        isValid={
          formikProps.touched.matchIndividual &&
          !formikProps.errors.matchIndividual
        }
        isInvalid={
          formikProps.touched.matchIndividual &&
          formikProps.errors.matchIndividual
        }
      />
    </View>
  );
}
