import React, { useState } from 'react';
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

const NewSightingStack = createStackNavigator();

function NewSightingForm({ navigation }) {
  const [formSection, setFormSection] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <Animated.View
          style={
            (styles.innerProgressBar,
            formSection == 0 ? styles.thirtyThree : null,
            formSection == 1 ? styles.sixtySix : null,
            formSection == 2 ? styles.oneHundred : null)
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
                  name="cloud-upload"
                  type="font-awesome"
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
            name="x"
            type="feather"
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
