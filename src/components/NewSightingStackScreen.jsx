import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Animated } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import * as yup from 'yup';
import screens from '../constants/screens';
import theme from '../constants/theme';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/newSightingStyles';
import Typography from '../components/Typography';
import NetInfo from '@react-native-community/netinfo';

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
    .min(3, 'Photographer Name must be at least 3 charaters')
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
    const result = await ImagePicker.launchImageLibraryAsync({
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
          let netInfo = null;
          NetInfo.fetch().then((state) => {
            netInfo = state;
            if (netInfo.isInternetReachable) {
              alert(
                'Internet Reachable: ' + JSON.stringify(values, undefined, 4)
              );
            } else {
              AsyncStorage.getItem('SightingSubmissions', (err, result) => {
                if (result) {
                  let updatedSubmissions = JSON.parse(result);
                  updatedSubmissions.push(values);

                  AsyncStorage.setItem(
                    'SightingSubmissions',
                    JSON.stringify(updatedSubmissions)
                  );
                } else {
                  AsyncStorage.setItem(
                    'SightingSubmissions',
                    JSON.stringify([values])
                  );
                }
              });
              alert('No Internet', JSON.stringify(values, undefined, 4));
            }
          });

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
                scrollEnabled
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
                        <Typography
                          id="ADD_IMAGES"
                          style={(globalStyles.inputHeader, styles.addText)}
                        />
                      </TouchableOpacity>
                    </View>
                    <Typography
                      id="TITLE"
                      style={(globalStyles.h2Text, globalStyles.inputHeader)}
                    />
                    <TextInput
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
                    />
                    <Typography
                      id="LOCATION"
                      style={(globalStyles.h2Text, globalStyles.inputHeader)}
                    />
                    <TextInput
                      style={[
                        globalStyles.inputField,
                        formikProps.touched.location &&
                          formikProps.errors.location &&
                          globalStyles.inputInvalid,
                      ]}
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
                    <Typography
                      id="SIGHTING_CONTEXT"
                      style={(globalStyles.h2Text, globalStyles.inputHeader)}
                    />
                    <TextInput
                      style={[
                        globalStyles.inputField,
                        styles.multiLine,
                        formikProps.touched.sightingContext &&
                          formikProps.errors.sightingContext &&
                          globalStyles.inputInvalid,
                      ]}
                      autoCorrect={false}
                      multiline
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
                    <View style={[styles.horizontal, styles.bottomElement]}>
                      <TouchableOpacity>
                        <View style={[styles.button, globalStyles.invisible]}>
                          <Typography
                            id="BACK"
                            style={globalStyles.buttonText}
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setFormSection(1)}>
                        <View style={(globalStyles.button, styles.button)}>
                          <Typography
                            id="NEXT"
                            style={globalStyles.buttonText}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
                {formSection === 1 && (
                  <>
                    <Typography
                      id="STATUS"
                      style={(globalStyles.h2Text, globalStyles.inputHeader)}
                    />
                    <TextInput
                      style={[
                        globalStyles.inputField,
                        formikProps.touched.status &&
                          formikProps.errors.status &&
                          globalStyles.inputInvalid,
                      ]}
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
                    <Typography
                      id="RELATIONSHIPS"
                      style={(globalStyles.h2Text, globalStyles.inputHeader)}
                    />
                    <TextInput
                      style={[
                        globalStyles.inputField,
                        formikProps.touched.status &&
                          formikProps.errors.status &&
                          globalStyles.inputInvalid,
                      ]}
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
                    <View style={[styles.horizontal, styles.bottomElement]}>
                      <TouchableOpacity onPress={() => setFormSection(0)}>
                        <View style={[styles.button, styles.buttonInactive]}>
                          <Typography
                            id="BACK"
                            style={globalStyles.buttonText}
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setFormSection(2)}>
                        <View style={styles.button}>
                          <Typography
                            id="NEXT"
                            style={globalStyles.buttonText}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
                {formSection === 2 && (
                  <>
                    <Typography
                      id="PHOTOGRAPHER_NAME"
                      style={(globalStyles.h2Text, globalStyles.inputHeader)}
                    />
                    <TextInput
                      style={[
                        globalStyles.inputField,
                        formikProps.touched.photographerName &&
                          formikProps.errors.photographerName &&
                          globalStyles.inputInvalid,
                      ]}
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
                    <Typography
                      id="PHOTOGRAPHER_EMAIL"
                      style={(globalStyles.h2Text, globalStyles.inputHeader)}
                    />
                    <TextInput
                      style={[
                        globalStyles.inputField,
                        formikProps.touched.photographerEmail &&
                          formikProps.errors.photographerEmail &&
                          globalStyles.inputInvalid,
                      ]}
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
                    <View style={[styles.horizontal, styles.bottomElement]}>
                      <TouchableOpacity onPress={() => setFormSection(1)}>
                        <View style={[styles.button, styles.buttonInactive]}>
                          <Typography
                            id="BACK"
                            style={globalStyles.buttonText}
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          formikProps.handleSubmit();
                        }}
                        disabled={formikProps.isSubmitting}
                      >
                        <View style={styles.button}>
                          <Typography
                            id="UPLOAD"
                            style={globalStyles.buttonText}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </KeyboardAwareScrollView>
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
            <Typography id="SIGHTING_INFO" style={globalStyles.headerText} />
          ),
        }}
      />
    </NewSightingStack.Navigator>
  );
}
