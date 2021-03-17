import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TouchableOpacity, Animated, Image } from 'react-native';
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
import sightingFormFields from './fields/sightingFormFields';
import CustomField from './CustomField.jsx';
import Typography from '../components/Typography';
import testSettingsPacket from '../constants/testSettingsPacket';
import generalValidationSchema from './fields/validationSchema';
import NetInfo from '@react-native-community/netinfo';
import GeneralFields from '../components/fields/GeneralFields';
import SightingDetailsFields from '../components/fields/SightingDetailsFields';
import IndividualInformationFields from './fields/IndividualInformationFields';
import useAsyncStorage from '../hooks/useAsyncStorage';
import { ImageSelectContext } from '../context/imageSelectContext';
import UppyComponent from '../components/UppyComponent';
import { color } from 'react-native-reanimated';
import { Button } from 'react-native';

const NewSightingStack = createStackNavigator();

function NewSightingForm({ navigation }) {
  const errorData = 'Error no data';
  const settingsPacket = useAsyncStorage('appConfiguration');
  const sightingSubmissions = useAsyncStorage('SightingSubmissions');
  const [formSection, setFormSection] = useState(0); //what is the current section/screen
  const [formFields, setFormFields] = useState({}); //all the custom fields for each category
  const [views, setViews] = useState([]); //the different custom field sections
  const [numCategories, setNumCategories] = useState(0); //number of custom field categories
  const [customValidation, setCustomValidation] = useState('');
  const numGeneralForm = 3; //there are 3 general form screens
  const [imageState, imageStateDispatch] = useContext(ImageSelectContext); //Grab images from imageSelector

  const renderImage = (item, i) => {
    return (
      <Image
        style={{
          flexGrow: 1,
          height: 120,
          width: '33%',
        }}
        source={{ uri: item.uri }}
        key={i}
      />
    );
  };

  const validationSchema = [];
  generalValidationSchema.map((schema) => {
    validationSchema.push(schema);
  });
  const customPageSchema = yup.object().shape({
    customFields: yup
      .object()
      .shape(customValidation[formSection - numGeneralForm]),
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
    } catch (settingsFetchError) {
      console.error(settingsFetchError);
    }
    //-----TESTING END-----//
    try {
      if (settingsPacket) {
        console.log(settingsPacket);
        setNumCategories(
          settingsPacket['site.custom.customFieldCategories']['value'].length
        );
        return settingsPacket;
        //setFormFields(value);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //sets views to display fields
  const form = async (formikProps) => {
    const appConfig = await getConfig();
    const customRequiredFields = [];
    if (appConfig) {
      const customFields = [];
      const fieldsByCategory = {};
      appConfig['site.custom.customFieldCategories']['value'].map(
        (category) => {
          const fieldDefinitions =
            appConfig[sightingFormFields[category.type]]['value'][
              'definitions'
            ];
          const fields = fieldDefinitions.filter((field) => {
            return (
              field.schema &&
              field.schema.category &&
              field.schema.category === category.id
            );
          });
          const requiredFieldDefinitions = fields.filter(
            (field) => field.required
          );
          const categoryValidation = requiredFieldDefinitions.map((field) => {
            return [field.name, field.type];
          });
          if (fields.length > 0) {
            fieldsByCategory[category.label] = fields;
            customFields.push(category);
          }
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
      fieldsByCategory['Regions'] = appConfig['site.custom.regions'];
      setCustomValidation(customRequiredFields); // validation
      setViews(customFields); // category titles for custom fields
      setNumCategories(customFields.length); // number of screens for custom fields
      setFormFields(fieldsByCategory); // fields based on each category
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
        validationSchema={
          validationSchema[
            formSection > numGeneralForm ? numGeneralForm : formSection
          ]
        }
        onSubmit={(values, { resetForm }, formikProps) => {
          if (formSection === numCategories + 2) {
            NetInfo.fetch().then((state) => {
              // console.log(state);
              if (state.isInternetReachable) {
                alert(
                  'Internet Reachable: ' + JSON.stringify(values, undefined, 4)
                );
              } else {
                if (sightingSubmissions) {
                  let updatedSubmissions = sightingSubmissions;
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
                    {imageState.images.length == 0 ? (
                      <View style={styles.addNew}>
                        <TouchableOpacity
                          style={styles.addNewPadded}
                          onPress={() =>
                            navigation.navigate(screens.imageBrowser)
                          }
                        >
                          <Icon
                            name="add-a-photo"
                            type="material"
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
                    ) : (
                      <View>
                        <TouchableOpacity
                          style={styles.selectedImages}
                          onPress={() =>
                            navigation.navigate(screens.imageBrowser)
                          }
                        >
                          {imageState.images.map((item, i) =>
                            renderImage(item, i)
                          )}
                        </TouchableOpacity>
                      </View>
                    )}
                    <UppyComponent onPress={() => {}}></UppyComponent>
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
                          {views[formSection - numGeneralForm]
                            ? views[formSection - numGeneralForm]['label']
                            : errorData}
                        </Text>
                        {views[formSection - numGeneralForm] ? (
                          formFields[
                            views[formSection - numGeneralForm]['label']
                          ].map((item) => {
                            if (
                              item.schema &&
                              item.schema.category &&
                              item.schema.category ===
                                views[formSection - numGeneralForm].id
                            ) {
                              return (
                                <CustomField
                                  key={item.id}
                                  id={item.id}
                                  required={item.required}
                                  schema={item.schema}
                                  name={item.name}
                                  displayType={item.displayType}
                                  props={formikProps}
                                  locationID={
                                    formFields['Regions']['value']['locationID']
                                  }
                                />
                              );
                            }
                          })
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
                    {formSection === numCategories + (numGeneralForm - 1) ? (
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
