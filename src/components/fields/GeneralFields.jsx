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

export default function GeneralFields() {
  // Right now this just handles string or longstring, stuff to handle integer/floats inputs should be added
  return (
    // <View>
    //   <Typography
    //     id="TITLE"
    //     style={(globalStyles.h2Text, globalStyles.inputHeader)}
    //   />
    //   <TextInput
    //     style={[
    //       globalStyles.inputField,
    //       formikProps.touched.title &&
    //         formikProps.errors.title &&
    //         globalStyles.inputInvalid,
    //     ]}
    //     autoCorrect={false}
    //     onChangeText={formikProps.handleChange('title')}
    //     value={formikProps.values.title}
    //     onBlur={formikProps.onBlur}
    //     isValid={formikProps.touched.title && !formikProps.errors.title}
    //     isInvalid={formikProps.touched.title && formikProps.errors.title}
    //   />
    //   <Typography
    //     id="LOCATION"
    //     style={(globalStyles.h2Text, globalStyles.inputHeader)}
    //   />
    //   <TextInput
    //     style={[
    //       globalStyles.inputField,
    //       formikProps.touched.location &&
    //         formikProps.errors.location &&
    //         globalStyles.inputInvalid,
    //     ]}
    //     autoCorrect={false}
    //     onChangeText={formikProps.handleChange('location')}
    //     value={formikProps.values.location}
    //     onBlur={formikProps.onBlur}
    //     isValid={formikProps.touched.location && !formikProps.errors.location}
    //     isInvalid={formikProps.touched.location && formikProps.errors.location}
    //   />
    //   <Typography
    //     id="SIGHTING_CONTEXT"
    //     style={(globalStyles.h2Text, globalStyles.inputHeader)}
    //   />
    //   <TextInput
    //     style={[
    //       globalStyles.inputField,
    //       styles.multiLine,
    //       formikProps.touched.sightingContext &&
    //         formikProps.errors.sightingContext &&
    //         globalStyles.inputInvalid,
    //     ]}
    //     autoCorrect={false}
    //     multiline
    //     numberOfLines={5}
    //     onChangeText={formikProps.handleChange('sightingContext')}
    //     value={formikProps.values.sightingContext}
    //     onBlur={formikProps.onBlur}
    //     isValid={
    //       formikProps.touched.sightingContext &&
    //       !formikProps.errors.sightingContext
    //     }
    //     isInvalid={
    //       formikProps.touched.sightingContext &&
    //       formikProps.errors.sightingContext
    //     }
    //   />
    // </View>
  );
}
