import React from 'react';
import {
  StyleSheet,
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

const NewSightingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <Animated.View style={(styles.innerProgressBar, styles.thirtyThree)} />
      </View>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        style={styles.keyboardView}
        scrollEnabled={true}
      >
        <View style={styles.addNew}>
          <TouchableOpacity
            onPress={() => navigation.navigate(screens.newSightings[0])}
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
          {' '}
          Title{' '}
        </Text>
        <TextInput style={globalStyles.inputFields} autoCorrect={false} />
        <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>
          {' '}
          Location{' '}
        </Text>
        <TextInput style={globalStyles.inputFields} autoCorrect={false} />
        <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>
          {' '}
          Sighting Context{' '}
        </Text>
        <TextInput
          style={[globalStyles.inputFields, styles.multiLine]}
          autoCorrect={false}
          multiline={true}
          numberOfLines={5}
        />

        <View style={styles.keyboardView} />
      </KeyboardAwareScrollView>

      <View style={styles.buttonContainer}>
        <View style={styles.horizontal}>
          <TouchableOpacity>
            <View style={[styles.button, globalStyles.invisible]}>
              <Text style={globalStyles.buttonText}>Back</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(screens.newSightings[1])}
          >
            <View style={(globalStyles.button, styles.button)}>
              <Text style={globalStyles.buttonText}>Next </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function NewSightingStackScreen({ navigation }) {
  return (
    <NewSightingStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerRight: () => (
          <Icon
            name="times"
            type="font-awesome"
            color={theme.black}
            onPress={() => navigation.navigate(screens.home)}
            iconStyle={globalStyles.icon}
          />
        ),
      }}
    >
      <NewSightingStack.Screen
        name={screens.newSighting}
        component={NewSightingScreen}
        options={{
          headerTitle: () => (
            <Text style={globalStyles.headerText}>Sighting Info</Text>
          ),
        }}
      />
    </NewSightingStack.Navigator>
  );
}
