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
import { Icon, withTheme } from 'react-native-elements';
import screens from '../constants/screens';
import theme from '../constants/theme';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/newSightingStyles';

const NewSighting2Stack = createStackNavigator();

const NewSighting2Screen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <Animated.View style={[styles.innerProgressBar, styles.sixtySix]} />
      </View>

      <KeyboardAwareScrollView
        style={{ backgroundColor: '#ffffff' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        style={styles.keyboardView}
        scrollEnabled
      >
        <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>
          {' '}
          Status{' '}
        </Text>
        <TextInput style={globalStyles.inputFields} autoCorrect={false} />
        <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>
          {' '}
          Relationships{' '}
        </Text>
        <TextInput style={globalStyles.inputFields} autoCorrect={false} />
        <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>
          {' '}
          Match Individual{' '}
        </Text>
        <TextInput style={globalStyles.inputFields} autoCorrect={false} />
      </KeyboardAwareScrollView>
      <View style={styles.buttonContainer}>
        <View style={styles.horizontal}>
          <TouchableOpacity
            onPress={() => navigation.navigate(screens.newSightings[0])}
          >
            <View style={[styles.button, styles.buttonInactive]}>
              <Text style={globalStyles.buttonText}> Back </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(screens.newSightings[2])}
          >
            <View style={styles.button}>
              <Text style={globalStyles.buttonText}>Next</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function NewSighting2StackScreen({ navigation }) {
  return (
    <NewSighting2Stack.Navigator
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
      <NewSighting2Stack.Screen
        name={screens.newSighting2}
        component={NewSighting2Screen}
        options={{
          headerTitle: () => (
            <Text style={globalStyles.headerText}>Animal Info</Text>
          ),
        }}
      />
    </NewSighting2Stack.Navigator>
  );
}
