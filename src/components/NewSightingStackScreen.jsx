import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import { Formik } from 'formik';
import screens from '../constants/screens';
import theme from '../constants/theme';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/newSightingStyles';
import * as ImagePicker from 'expo-image-picker';
import * as yup from 'yup';

const NewSightingStack = createStackNavigator();

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  location: yup.string().required('Location is required'),
  sightingContext: yup
    .string()
    .required('Sighting Context is required')
    .min(8, 'Sighting Context must be more than 8 charaters')
    .max(255, 'Sighting Context must be less than 255 charaters'),
  status: yup.string(),
  relationships: yup.string(),
  matchIndividual: yup.string(),
  photographerName: yup
    .string()
    .required('Photographer Name is required')
    .min(3, 'Photographer Name must be atleast 3 charaters')
    .max(30, 'Photographer Name must be less than 30 charaters'),
  photographerEmail: yup
    .string()
    .email('Photographer Email is not valid')
    .required('Photographer Email is required'),
});

function NewSightingForm({ navigation }) {
  const [formSection, setFormSection] = useState(0);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions in upload photos.');
      }
      6;
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      exif: true,
      allowsMultipleSelection: true,
    });

    console.log(result);

    if (!result.cancelled) {
      // setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <Animated.View
          style={
            (styles.innerProgressBar,
            formSection === 0 && styles.thirtyThree,
            formSection === 1 && styles.sixtySix,
            formSection === 2 && styles.oneHundred)
          }
        />
      </View>
      <Formik
        initialValues={{
          title: '',
          location: '',
          sightingContext: '',
          status: '',
          relationships: '',
          matchIndividual: '',
          photographerName: '',
          photographerEmail: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          Alert.alert('Form Response', JSON.stringify(values, undefined, 4));
          resetForm();

          setFormSection(0);
          navigation.navigate(screens.home);
        }}
      >
        {(formikProps) => {
          return (
            <>
              <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                style={styles.keyboardView}
                scrollEnabled={true}
              >
                {formSection === 0 && (
                  <>
                    <View style={styles.addNew}>
                      <TouchableOpacity onPress={pickImage}>
                        <Icon
                          name="cloud-upload"
                          type="font-awesome"
                          color={theme.black}
                          iconStyle={styles.addText}
                          size={40}
                        />
                        <Text
                          style={[globalStyles.inputHeader, styles.addText]}
                        >
                          Add Images
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={[globalStyles.h2Text, globalStyles.inputHeader]}
                    >
                      Title
                    </Text>
                    <TextInput
                      style={globalStyles.inputFields}
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
                    />
                    {formikProps.touched.title && formikProps.errors.title && (
                      <Text style={globalStyles.errorText}>
                        {formikProps.errors.title}
                      </Text>
                    )}
                    <Text
                      style={[globalStyles.h2Text, globalStyles.inputHeader]}
                    >
                      Location
                    </Text>
                    <TextInput
                      style={globalStyles.inputFields}
                      autoCorrect={false}
                      onChangeText={formikProps.handleChange('location')}
                      value={formikProps.values.location}
                      onBlur={formikProps.onBlur}
                      isValid={
                        formikProps.touched.location &&
                        !formikProps.errors.location
                      }
                      isInvalid={
                        formikProps.touched.location &&
                        formikProps.errors.location
                      }
                    />
                    {formikProps.touched.location &&
                      formikProps.errors.location && (
                        <Text style={globalStyles.errorText}>
                          {formikProps.errors.location}
                        </Text>
                      )}
                    <Text
                      style={[globalStyles.h2Text, globalStyles.inputHeader]}
                    >
                      Sighting Context
                    </Text>
                    <TextInput
                      style={[globalStyles.inputFields, styles.multiLine]}
                      autoCorrect={false}
                      multiline={true}
                      numberOfLines={5}
                      onChangeText={formikProps.handleChange('sightingContext')}
                      value={formikProps.values.sightingContext}
                      onBlur={formikProps.onBlur}
                      isValid={
                        formikProps.touched.sightingContext &&
                        !formikProps.errors.sightingContext
                      }
                      isInvalid={
                        formikProps.touched.sightingContext &&
                        formikProps.errors.sightingContext
                      }
                    />
                    {formikProps.touched.sightingContext &&
                      formikProps.errors.sightingContext && (
                        <Text style={globalStyles.errorText}>
                          {formikProps.errors.sightingContext}
                        </Text>
                      )}
                    <View style={styles.keyboardView} />
                  </>
                )}
                {formSection === 1 && (
                  <>
                    <Text
                      style={[globalStyles.h2Text, globalStyles.inputHeader]}
                    >
                      Status
                    </Text>
                    <TextInput
                      style={globalStyles.inputFields}
                      autoCorrect={false}
                      onChangeText={formikProps.handleChange('status')}
                      value={formikProps.values.status}
                      onBlur={formikProps.onBlur}
                      isValid={
                        formikProps.touched.status && !formikProps.errors.status
                      }
                      isInvalid={
                        formikProps.touched.status && formikProps.errors.status
                      }
                    />
                    {formikProps.touched.status &&
                      formikProps.errors.status && (
                        <Text style={globalStyles.errorText}>
                          {formikProps.errors.status}
                        </Text>
                      )}
                    <Text
                      style={[globalStyles.h2Text, globalStyles.inputHeader]}
                    >
                      Relationships
                    </Text>
                    <TextInput
                      style={globalStyles.inputFields}
                      autoCorrect={false}
                      onChangeText={formikProps.handleChange('relationships')}
                      value={formikProps.values.relationships}
                      onBlur={formikProps.onBlur}
                      isValid={
                        formikProps.touched.relationships &&
                        !formikProps.errors.relationships
                      }
                      isInvalid={
                        formikProps.touched.relationships &&
                        formikProps.errors.relationships
                      }
                    />
                    {formikProps.touched.relationships &&
                      formikProps.errors.relationships && (
                        <Text style={globalStyles.errorText}>
                          {formikProps.errors.tirelationshipstle}
                        </Text>
                      )}
                    <Text
                      style={[globalStyles.h2Text, globalStyles.inputHeader]}
                    >
                      Match Individual
                    </Text>
                    <TextInput
                      style={globalStyles.inputFields}
                      autoCorrect={false}
                      onChangeText={formikProps.handleChange('matchIndividual')}
                      value={formikProps.values.matchIndividual}
                      onBlur={formikProps.onBlur}
                      isValid={
                        formikProps.touched.matchIndividual &&
                        !formikProps.errors.matchIndividual
                      }
                      isInvalid={
                        formikProps.touched.matchIndividual &&
                        formikProps.errors.matchIndividual
                      }
                    />
                    {formikProps.touched.matchIndividual &&
                      formikProps.errors.matchIndividual && (
                        <Text style={globalStyles.errorText}>
                          {formikProps.errors.matchIndividual}
                        </Text>
                      )}
                  </>
                )}
                {formSection === 2 && (
                  <>
                    <Text
                      style={[globalStyles.h2Text, globalStyles.inputHeader]}
                    >
                      Photographer name
                    </Text>
                    <TextInput
                      style={globalStyles.inputFields}
                      autoCorrect={false}
                      onChangeText={formikProps.handleChange(
                        'photographerName'
                      )}
                      value={formikProps.values.photographerName}
                      onBlur={formikProps.onBlur}
                      isValid={
                        formikProps.touched.photographerName &&
                        !formikProps.errors.photographerName
                      }
                      isInvalid={
                        formikProps.touched.photographerName &&
                        formikProps.errors.photographerName
                      }
                    />
                    {formikProps.touched.photographerName &&
                      formikProps.errors.photographerName && (
                        <Text style={globalStyles.errorText}>
                          {formikProps.errors.photographerName}
                        </Text>
                      )}
                    <Text
                      style={[globalStyles.h2Text, globalStyles.inputHeader]}
                    >
                      Photographer email
                    </Text>
                    <TextInput
                      style={globalStyles.inputFields}
                      autoCorrect={false}
                      onChangeText={formikProps.handleChange(
                        'photographerEmail'
                      )}
                      value={formikProps.values.photographerEmail}
                      onBlur={formikProps.onBlur}
                      isValid={
                        formikProps.touched.photographerEmail &&
                        !formikProps.errors.photographerEmail
                      }
                      isInvalid={
                        formikProps.touched.photographerEmail &&
                        formikProps.errors.photographerEmail
                      }
                    />
                    {formikProps.touched.photographerEmail &&
                      formikProps.errors.photographerEmail && (
                        <Text style={globalStyles.errorText}>
                          {formikProps.errors.photographerEmail}
                        </Text>
                      )}
                  </>
                )}
              </KeyboardAwareScrollView>
              {formSection === 0 && (
                <View style={styles.buttonContainer}>
                  <View style={styles.horizontal}>
                    <TouchableOpacity>
                      <View style={[styles.button, globalStyles.invisible]}>
                        <Text style={globalStyles.buttonText}>Back</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFormSection(1)}>
                      <View style={(globalStyles.button, styles.button)}>
                        <Text style={globalStyles.buttonText}>Next </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {formSection === 1 && (
                <View style={styles.buttonContainer}>
                  <View style={styles.horizontal}>
                    <TouchableOpacity onPress={() => setFormSection(0)}>
                      <View style={[styles.button, styles.buttonInactive]}>
                        <Text style={globalStyles.buttonText}> Back </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFormSection(2)}>
                      <View style={styles.button}>
                        <Text style={globalStyles.buttonText}>Next</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {formSection === 2 && (
                <View style={styles.buttonContainer}>
                  <View style={styles.horizontal}>
                    <TouchableOpacity onPress={() => setFormSection(1)}>
                      <View style={[styles.button, styles.buttonInactive]}>
                        <Text style={globalStyles.buttonText}>Back</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        formikProps.handleSubmit();
                      }}
                      disabled={formikProps.isSubmitting}
                    >
                      <View style={styles.button}>
                        <Text style={globalStyles.buttonText}>Upload</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </>
          );
        }}
      </Formik>
    </View>
  );
}

export default function NewSightingStackScreen({ navigation }) {
  return (
    <NewSightingStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerRight: () => (
          <Icon
            name="close"
            type="material-icons"
            color={theme.black}
            onPress={() => {
              navigation.navigate(screens.home);
            }}
            iconStyle={globalStyles.icon}
          />
        ),
      }}
    >
      <NewSightingStack.Screen
        name={screens.newSighting}
        component={NewSightingForm}
        options={{
          headerTitle: () => (
            <Text style={globalStyles.headerText}>Sighting Info</Text>
          ),
        }}
      />
    </NewSightingStack.Navigator>
  );
}
