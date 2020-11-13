import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import screens from '../constants/screens';
import theme from '../constants/theme';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/newSightingStyles';
import AsyncStorage from '@react-native-community/async-storage';
import { baseUrl } from '../constants/urls';
import sightingFormFields from '../constants/sightingFormFields';
import CustomField from './CustomField.jsx';
import newSightingStyles from '../styles/newSightingStyles';

const NewSightingStack = createStackNavigator();

function NewSightingForm({ navigation }) {
  const [formSection, setFormSection] = useState(0);
  const [formFields, setFormFields] = useState('');
  const [views, setViews] = useState([]);
  const [numCategories, setNumCategories] = useState(0);

  //gets data, sets formFields, calls form
  useEffect(
    () => {
      async function fetchData() {
        const value = await axios(
          `${baseUrl}/api/v0/configuration/__bundle_setup`
        );
        await AsyncStorage.getItem('appConfiguration');
        if (value !== null) {
          setFormFields(value);
          form();
          setNumCategories(
            value['data']['response']['configuration'][
              'site.custom.customFieldCategories'
            ]['value'].length
          );
        }
      }
      fetchData();
    },
    [formFields],
    numCategories
  );

  //sets views to display fields
  const form = async () => {
    if (
      formFields !== '' &&
      formSection - 3 < numCategories &&
      formSection - 3 >= 0
    ) {
      const cat =
        formFields['data']['response']['configuration'][
          'site.custom.customFieldCategories'
        ]['value'][formSection - 3];
      const componentPromises = (
        <View>
          <Text style={[globalStyles.h2Text, globalStyles.sectionHeader]}>
            {cat['label']}
          </Text>
          {formFields['data']['response']['configuration'][
            sightingFormFields[cat.type]
          ]['value']['definitions'].map((item) => (
            <CustomField
              key={item.id}
              id={item.id}
              required={item.required}
              schema={item.schema}
              name={item.name}
              displayType={item.displayType}
            />
          ))}
        </View>
      );
      // const componentPromises = (
      //   <View>
      //     {formFields['data']['response']['configuration'][
      //       'site.custom.customFieldCategories'
      //     ]['value'].map((cat) => (
      //       <View key={cat.id}>
      //         <View style={newSightingStyles.divider} />
      //         <Text style={[globalStyles.h2Text, globalStyles.sectionHeader]}>
      //           {cat['label']}
      //         </Text>
      //         <View style={newSightingStyles.divider} />
      //         {formFields['data']['response']['configuration'][
      //           sightingFormFields[cat.type]
      //         ]['value']['definitions'].map((item) => (
      //           <CustomField
      //             key={item.id}
      //             id={item.id}
      //             required={item.required}
      //             schema={item.schema}
      //             name={item.name}
      //             displayType={item.displayType}
      //           />
      //         ))}
      //       </View>
      //     ))}
      //   </View>
      // );
      setViews(componentPromises);
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
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        style={styles.keyboardView}
        scrollEnabled={true}
      >
        {formSection === 0 ? (
          <>
            <View style={styles.addNew}>
              <TouchableOpacity
                onPress={() => navigation.navigate(screens.newSighting)}
              >
                <Icon
                  name="add-a-photo"
                  type="material-icons"
                  color={theme.black}
                  iconStyle={styles.addText}
                  size={40}
                />
                <Text style={[globalStyles.inputHeader, styles.addText]}>
                  Add Images
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>
              Title
            </Text>
            <TextInput style={globalStyles.inputFields} autoCorrect={false} />
            <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>
              Location
            </Text>
            <TextInput style={globalStyles.inputFields} autoCorrect={false} />
            <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>
              Sighting Context
            </Text>
            <TextInput
              style={[globalStyles.inputFields, styles.multiLine]}
              autoCorrect={false}
              multiline={true}
              numberOfLines={5}
            />
            <View style={styles.keyboardView} />
          </>
        ) : null}
        {formSection === 1 ? (
          <>
            <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>
              Status
            </Text>
            <TextInput style={globalStyles.inputFields} autoCorrect={false} />
            <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>
              Relationships
            </Text>
            <TextInput style={globalStyles.inputFields} autoCorrect={false} />
            <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>
              Match Individual
            </Text>
            <TextInput style={globalStyles.inputFields} autoCorrect={false} />
          </>
        ) : null}
        {formSection === 2 ? (
          <>
            <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>
              Photographer name
            </Text>
            <TextInput style={globalStyles.inputFields} autoCorrect={false} />
            <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>
              Photographer email
            </Text>
            <TextInput style={globalStyles.inputFields} autoCorrect={false} />
          </>
        ) : null}
        {formSection > 2 ? (
          <>
            <React.Suspense fallback="Loading views...">
              <View>{views}</View>
            </React.Suspense>
          </>
        ) : null}
      </KeyboardAwareScrollView>
      {formSection === 0 ? (
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
      ) : null}
      {formSection === 1 ? (
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
      ) : null}
      {formSection === 2 ? (
        <View style={styles.buttonContainer}>
          <View style={styles.horizontal}>
            <TouchableOpacity onPress={() => setFormSection(1)}>
              <View style={[styles.button, styles.buttonInactive]}>
                <Text style={globalStyles.buttonText}> Back </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFormSection(3)}>
              <View style={styles.button}>
                <Text style={globalStyles.buttonText}>Next</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      {formSection > 2 && formSection < numCategories + 2 ? (
        <View style={styles.buttonContainer}>
          <View style={styles.horizontal}>
            <TouchableOpacity onPress={() => setFormSection(formSection - 1)}>
              <View style={[styles.button, styles.buttonInactive]}>
                <Text style={globalStyles.buttonText}> Back </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFormSection(formSection + 1)}>
              <View style={styles.button}>
                <Text style={globalStyles.buttonText}>Next</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      {formSection === numCategories + 2 ? (
        <View style={styles.buttonContainer}>
          <View style={styles.horizontal}>
            <TouchableOpacity onPress={() => setFormSection(formSection - 1)}>
              <View style={[styles.button, styles.buttonInactive]}>
                <Text style={globalStyles.buttonText}>Back</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFormSection(0);
                navigation.navigate(screens.home);
              }}
            >
              <View style={styles.button}>
                <Text style={globalStyles.buttonText}>Upload</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
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
