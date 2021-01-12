import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import newSightingStyles from '../styles/newSightingStyles';
import Typography from '../components/Typography';
import { useTheme } from '@react-navigation/native';
import { get } from 'lodash-es';
import DateTimePicker from '@react-native-community/datetimepicker'; //for testing
import { Picker } from '@react-native-community/picker'; //for testing
import SelectMultiple from 'react-native-select-multiple'; //for testing
import { Button } from 'react-native';
import testSettingsPacket from '../constants/testSettingsPacket';
// import standardFrom from '../components/fields/standardForm';
import NetInfo from '@react-native-community/netinfo';

const NewSightingStack = createStackNavigator();

function NewSightingForm({ navigation }) {
  //FOR TESTING PURPOSES ONLY
  //Date time picker tests
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [mode2, setMode2] = useState('date');
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const showMode = (currMode) => {
    setShow(true);
    setMode(currMode);
  };
  const showMode2 = (currMode) => {
    setShow2(true);
    setMode2(currMode);
  };
  const showDatePicker = () => {
    showMode('date');
  };
  const showTimePicker = () => {
    showMode('time');
  };
  const showDatePicker2 = () => {
    showMode2('date');
  };
  const showTimePicker2 = () => {
    showMode2('time');
  };
  function formatDate(date) {
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Date(date).toLocaleDateString([], options);
  }
  const onChange = (event, selectedDate) => {
    const currDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currDate);
  };
  const onChange2 = (event, selectedDate) => {
    const currDate = selectedDate || date2;
    setShow2(Platform.OS === 'ios');
    setDate2(currDate);
  };
  //select constants
  const selectOptions = [
    { label: 'hark', value: 'hark' },
    { label: 'do not hark', value: 'do not hark' },
    { label: 'hark2', value: 'hark2' },
    { label: 'hark3', value: 'hark3' },
  ];
  const [choice, setChoice] = useState(selectOptions[0].label);
  //multiselect constants
  const multiSelectOptions = [
    { label: 'Choice 1', value: 'Choice 1', key: '1' },
    { label: 'Choice 2', value: 'Choice 2', key: '2' },
    { label: 'Choice 3', value: 'Choice 3', key: '3' },
    { label: 'Choice 4', value: 'Choice 4', key: '4' },
  ];
  const [selectedItems, setSelectedItems] = useState([]);
  const onSelectionsChange = (items) => {
    setSelectedItems(items);
  };
  //lat long constants
  const [lat, setLat] = useState('0.0');
  const [long, setLong] = useState('0.0');
  //area constants
  const [north, setNorth] = useState('0.0');
  const [east, setEast] = useState('0.0');
  const [south, setSouth] = useState('0.0');
  const [west, setWest] = useState('0.0');
  //END OF TEST

  const errorData = 'Error no data';
  const [formSection, setFormSection] = useState(0); //what is the current section/screen in the form
  const [formFields, setFormFields] = useState(''); //all the custom fields
  const [views, setViews] = useState([]); //the custom field view for each section
  const [numCategories, setNumCategories] = useState(0); //number of custom field categories
  // const numStandardCategories = 4; //num categories in the standard form
  const [customValidation, setCustomValidation] = useState('');
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
    customFields: yup.object().shape(
      customValidation
      //   {
      //   testind_test_field: yup.string().required('This Field is Required'),
      //   berryTypes: yup.string().required('This Field is Required'),
      //   Magicness: yup.string().required('This Field is Required'),
      //   testo: yup.string().required('This Field is Required'),
      //  }
    ),
  });
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
    // console.log(formSection);
    const appConfig = await getConfig();
    const customRequiredFields = [];
    //console.log(appConfig);
    if (appConfig) {
      const customFields = [];
      appConfig['site.custom.customFieldCategories']['value'].map(
        (category) => {
          customFields.push(category);
          //console.log(category);
          appConfig[sightingFormFields[category.type]]['value'][
            'definitions'
          ].map((field) => {
            //console.log(field);
            if (field.required) {
              const customArray = [];
              customArray.push(field.name);
              customArray.push(field.type);
              customRequiredFields.push(customArray);
            }
          });
        }
      );
      //console.log(customValidation);
      // const customArray = []
      // appConfig['site.custom.customFieldCategories']['value'].map(
      //   (category) => {
      //     customFields.push(category);
      //   }
      // );
      const test = customRequiredFields.reduce(
        (obj, item) => ({
          ...obj,
          [item[0]]:
            item[1] === 'string'
              ? yup.string().required('This is Required')
              : yup.number().required('This is Required'),
        }),
        {}
      );
      //console.log(test);
      setCustomValidation(test);
      setViews(customFields);
      setFormFields(appConfig);
    }
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     getConfig();
  //     if (props !== null) {
  //       console.log('here');
  //       form(props);
  //     }
  //   }
  //   fetchData();
  // }, [numCategories]);

  // useEffect(() => {
  //   console.log('here 1');
  //   if (props) {
  //     console.log('here');
  //     form(props);
  //   }
  //   // form();
  //   // console.log('here');
  // }, [views, formSection]);

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
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          NetInfo.fetch().then((state) => {
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
          //resetForm();

          //setFormSection(0);
          //navigation.navigate(screens.home);
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
                      isValid={
                        formikProps.touched.title && !formikProps.errors.title
                      }
                      isInvalid={
                        formikProps.touched.title && formikProps.errors.title
                      }
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
                        //onPress={() => [setFormSection(1), form(formikProps)]}
                        onPress={() => [
                          console.log(formikProps.touched),
                          console.log(formikProps.errors),
                          formikProps.handleSubmit(),
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
                      onBlur={formikProps.handleBlur('status')}
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
                        formikProps.touched.relationships &&
                          formikProps.errors.relationships &&
                          globalStyles.inputInvalid,
                      ]}
                      autoCorrect={false}
                      onChangeText={formikProps.handleChange('relationships')}
                      value={formikProps.values.relationships}
                      onBlur={formikProps.handleBlur('relationships')}
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
                      onChangeText={formikProps.handleChange(
                        'photographerName'
                      )}
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
                      onChangeText={formikProps.handleChange(
                        'photographerEmail'
                      )}
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
                    <View style={[styles.horizontal, styles.bottomElement]}>
                      <TouchableOpacity onPress={() => setFormSection(1)}>
                        <View style={[styles.button, styles.buttonInactive]}>
                          <Typography
                            id="BACK"
                            style={globalStyles.buttonText}
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setFormSection(3)}>
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
                      {/* <View>{views[formSection - 3]}</View> */}
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
                          {/* {views[formSection - 3]['label']} */}
                        </Text>
                        {views[0] ? (
                          formFields[
                            //   sightingFormFields[views[formSection - 3].type]
                            // ]['value']['definitions'].map((item) => (
                            sightingFormFields[views[formSection - 3].type]
                          ]['value']['definitions'].map((item) => (
                            // { item.schema != null && item.schema.category != cat.id) ? <></> :
                            <CustomField
                              key={item.id}
                              id={item.id}
                              required={item.required}
                              schema={item.schema}
                              name={item.name}
                              displayType={item.displayType}
                              props={formikProps}
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
                            setFormSection(formSection + 1),
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
