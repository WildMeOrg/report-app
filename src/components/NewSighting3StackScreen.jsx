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

const NewSighting3Stack = createStackNavigator();

const NewSighting3Screen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <Animated.View style={[styles.innerProgressBar, styles.oneHundred]} />
      </View>
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#ffffff' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        style={styles.keyboardView}
        scrollEnabled={true}
      >
        <Text style={globalStyles.inputHeader}> Photographer name </Text>
        <TextInput style={globalStyles.inputFields} autoCorrect={false} />
        <Text style={globalStyles.inputHeader}> Photographer email </Text>
        <TextInput style={globalStyles.inputFields} autoCorrect={false} />
      </KeyboardAwareScrollView>
      <View style={styles.buttonContainer}>
        <View style={styles.horizontal}>
          <TouchableOpacity
            onPress={() => navigation.navigate(screens.newSightings[1])}
          >
            <View style={[styles.button, styles.buttonInactive]}>
              <Text style={globalStyles.buttonText}>Back</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate(screens.home)}>
            <View style={styles.button}>
              <Text style={globalStyles.buttonText}>Upload</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function NewSighting3StackScreen({ navigation }) {
  return (
    <NewSighting3Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerRight: () => (
          <Icon
            name='times'
            type='font-awesome'
            color={theme.black}
            onPress={() => navigation.navigate(screens.home)}
            iconStyle={globalStyles.icon}
          />
        ),
      }}
    >
      <NewSighting3Stack.Screen
        name={screens.newSighting3}
        component={NewSighting3Screen}
        options={{
          headerTitle: () => (
            <Text style={globalStyles.headerText}>Photographer Info</Text>
          ),
        }}
      />
    </NewSighting3Stack.Navigator>
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
//     width: '100%',
//     height: 3,
//     backgroundColor: theme.primary,
//   },
//   keyboardView: {
//     flex: 1,
//     backgroundColor: theme.white,
//   },
//   headerText: {
//     fontFamily: 'Lato-Regular',
//     fontSize: 14,
//   },
//   icon: {
//     marginRight: 16,
//   },
//   inputHeader: {
//     fontFamily: 'Lato-Regular',
//     fontSize: 16,
//     margin: '5%',
//     marginBottom: '3%',
//     color: theme.black,
//   },
//   inputFields: {
//     textAlign: 'left',
//     marginHorizontal: '5%',
//     fontSize: 16,
//     borderColor: '#2c2c2c80',
//     borderWidth: 1,
//     borderRadius: 6,
//     padding: '2%',
//   },
//   multiLine: {
//     height: 150,
//   },
//   button: {
//     backgroundColor: theme.primary,
//     paddingVertical: 12,
//     paddingHorizontal: 50,
//     borderRadius: 20,
//     margin: '5%',
//   },
//   buttonInactive: {
//     backgroundColor: '#CACACA',
//   },
//   buttonText: {
//     color: theme.white,
//     fontSize: 16,
//     alignSelf: 'center',
//   },
//   horizontal: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignContent: 'center',
//   },
//   container: {
//     flex: 1,
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
