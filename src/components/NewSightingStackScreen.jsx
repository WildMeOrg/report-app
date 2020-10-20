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

// const styles = StyleSheet.create({
//   progressBar: {
//     width: '100%',
//     height: 3,
//     backgroundColor: '#EDEDED',
//     justifyContent: 'center',
//   },
//   innerStyle: {
//     width: '33%',
//     height: 3,
//     backgroundColor: theme.primary,
//   },
//   keyboardView: {
//     flex: 1,
//     backgroundColor: theme.white,
//   },
//   innerContainer: {
//     flex: 1,
//     flexGrow: 1,
//   },
//   addNew: {
//     flexDirection: 'column',
//     alignContent: 'center',
//     backgroundColor: '#2C2C2C30',
//     margin: '5%',
//     borderWidth: 1,
//     borderStyle: 'dashed',
//     borderColor: theme.black,
//     borderRadius: 6,
//     opacity: 0.5,
//     paddingVertical: '7%',
//   },
//   addText: {
//     alignSelf: 'center',
//     margin: '1%',
//   },
//   multiLine: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   button: {
//     backgroundColor: theme.primary,
//     paddingVertical: 12,
//     paddingHorizontal: 50,
//     borderRadius: 20,
//     margin: '5%',
//   },
//   horizontal: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   container: {
//     flexGrow: 1,
//     backgroundColor: theme.white,
//   },
//   buttonContainer: {
//     position: 'absolute',
//     bottom: 0,
//     alignSelf: 'center',
//     margin: '5%',
//   },
// });
