import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import * as yup from 'yup';
import screens from '../constants/screens';
import theme from '../constants/theme';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/newSightingStyles';
import AsyncStorage from '@react-native-community/async-storage';
import { baseUrl } from '../constants/urls';
import sightingFormFields from '../constants/sightingFormFields';
import CustomField from './CustomField.jsx';
import Typography from '../components/Typography';
import testSettingsPacket from '../constants/testSettingsPacket';
// import standardForm from '../components/fields/standardForm';
import NetInfo from '@react-native-community/netinfo';
import GeneralFields from '../components/fields/GeneralFields';
import SightingDetailsFields from '../components/fields/SightingDetailsFields';
import IndividualInformationFields from './fields/IndividualInformationFields';

const NewSightingStack = createStackNavigator();

function NewSightingForm({ navigation }) {
  const errorData = 'Error no data';
  const [formSection, setFormSection] = useState(0); //what is the current section/screen in the form
  const [formFields, setFormFields] = useState(''); //all the custom fields
  const [views, setViews] = useState([]); //the custom field view for each section
  const [numCategories, setNumCategories] = useState(0); //number of custom field categories
  const [customValidation, setCustomValidation] = useState('');

  const validationSchema = [];
  const firstPageSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    location: yup.string().required('Location is required'),
    sightingContext: yup
      .string()
      .required('Sighting Context is required')
      .min(8, 'Sighting Context must be more than 8 charaters')
      .max(255, 'Sighting Context must be less than 255 charaters'),
  });
  validationSchema.push(firstPageSchema);
  const secondPageSchema = yup.object().shape({
    status: yup.string(),
    relationships: yup.string(),
    matchIndividual: yup.string(),
  });
  validationSchema.push(secondPageSchema);
  const thirdPageSchema = yup.object().shape({
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
  validationSchema.push(thirdPageSchema);
  const customPageSchema = yup.object().shape({
    customFields: yup.object().shape(customValidation[formSection - 3]),
  });
  validationSchema.push(customPageSchema);

  const getConfig = async () => {
    //-----TESTING START-----//
    try {
      // const settingsPacket = await axios(
      //   `${baseUrl}/api/v1/configuration/default/__bundle_setup`
      // );
      await AsyncStorage.setItem(
        'appConfiguration',
        //JSON.stringify(settingsPacket.data.response.configuration)
        JSON.stringify(testSettingsPacket)
      );
    } catch (settingsFetchError) {}
    //-----TESTING END-----//
    try {
      const value = JSON.parse(await AsyncStorage.getItem('appConfiguration'));
      if (value) {
        //console.log(value);
        setNumCategories(
          value['site.custom.customFieldCategories']['value'].length
        );
        return value;
        //setFormFields(value);
      }
    } catch (error) {}
  };

  //sets views to display fields
  const form = async (formikProps) => {
    const appConfig = await getConfig();
    const customRequiredFields = [];
    if (appConfig) {
      const customFields = [];
      appConfig['site.custom.customFieldCategories']['value'].map(
        (category) => {
          customFields.push(category);
          const categoryValidation = [];
          appConfig[sightingFormFields[category.type]]['value'][
            'definitions'
          ].map((field) => {
            if (field.required) {
              const customArray = [];
              customArray.push(field.name);
              customArray.push(field.type);
              categoryValidation.push(customArray);
            }
          });
          if (categoryValidation) {
            const test = categoryValidation.reduce(
              (obj, item) => ({
                ...obj,
                [item[0]]:
                  item[1] === 'string'
                    ? yup.string().required('This is Required')
                    : yup.number().required('This is Required'),
              }),
              {}
            );
            customRequiredFields.push(test);
          } else {
            customRequiredFields.push({});
          }
        }
      );
      setCustomValidation(customRequiredFields);
      setViews(customFields);
      setFormFields(appConfig);
    }
  };

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
            formSection == 0 ? styles.thirtyThree : null,
            formSection == 1 ? styles.thirtyThree : null,
            formSection == 2 ? styles.sixtySix : null,
            formSection > 2 && formSection < numCategories + 2
              ? styles.sixtySix
              : null,
            formSection == numCategories + 2 ? styles.oneHundred : null)
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
          customFields: {},
        }}
        validationSchema={validationSchema[formSection > 3 ? 3 : formSection]}
        onSubmit={(values, { resetForm }, formikProps) => {
          if (formSection === numCategories + 2) {
            NetInfo.fetch().then((state) => {
              console.log(state);
              if (state.isInternetReachable) {
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
          } else {
            setFormSection(formSection + 1);
          }
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
                    <View
                      style={styles.addNew}
                      onPress={navigation.navigate(screens.imageBrowser)}
                    >
                      <TouchableOpacity>
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
                    <GeneralFields formikProps={formikProps} />
                    <View style={[styles.horizontal, styles.bottomElement]}>
                      <TouchableOpacity>
                        <View style={[styles.button, globalStyles.invisible]}>
                          <Typography
                            id="BACK"
                            style={globalStyles.buttonText}
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => [
                          formikProps.handleSubmit(),
                          formikProps.setSubmitting(false),
                          form(formikProps),
                        ]}
                      >
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
                    <SightingDetailsFields formikProps={formikProps} />
                    <View style={[styles.horizontal, styles.bottomElement]}>
                      <TouchableOpacity onPress={() => setFormSection(0)}>
                        <View style={[styles.button, styles.buttonInactive]}>
                          <Typography
                            id="BACK"
                            style={globalStyles.buttonText}
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => [
                          formikProps.handleSubmit(),
                          formikProps.setSubmitting(false),
                        ]}
                      >
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
                    <IndividualInformationFields formikProps={formikProps} />
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
                        onPress={() => [
                          formikProps.handleSubmit(),
                          formikProps.setSubmitting(false),
                        ]}
                      >
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
                {formSection > 2 ? (
                  <>
                    <React.Suspense fallback="Loading Views...">
                      <View>
                        <Text
                          style={[
                            globalStyles.h2Text,
                            globalStyles.sectionHeader,
                          ]}
                        >
                          {views[0]
                            ? views[formSection - 3]['label']
                            : errorData}
                        </Text>
                        {views[0] ? (
                          formFields[
                            sightingFormFields[views[formSection - 3].type]
                          ]['value']['definitions'].map((item) => (
                            <CustomField
                              key={item.id}
                              id={item.id}
                              required={item.required}
                              schema={item.schema}
                              name={item.name}
                              displayType={item.displayType}
                              props={formikProps}
                              locationID={
                                formFields['site.custom.regions']['value'][
                                  'locationID'
                                ]
                              }
                            />
                          ))
                        ) : (
                          <Text style={globalStyles.subText}>{errorData}</Text>
                        )}
                      </View>
                    </React.Suspense>
                    {formSection > 2 && formSection < numCategories + 2 ? (
                      <View style={[styles.horizontal, styles.bottomElement]}>
                        <TouchableOpacity
                          onPress={() => [
                            setFormSection(formSection - 1),
                            form(formikProps),
                          ]}
                        >
                          <View style={[styles.button, styles.buttonInactive]}>
                            <Text style={globalStyles.buttonText}> Back </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => [
                            formikProps.handleSubmit(),
                            formikProps.setSubmitting(false),
                            form(formikProps),
                          ]}
                        >
                          <View style={styles.button}>
                            <Text style={globalStyles.buttonText}>Next</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    ) : null}
                    {formSection === numCategories + 2 ? (
                      <View style={[styles.horizontal, styles.bottomElement]}>
                        <TouchableOpacity
                          onPress={() => [
                            setFormSection(formSection - 1),
                            form(formikProps),
                          ]}
                        >
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
                    ) : null}
                  </>
                ) : null}
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
