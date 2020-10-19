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

const NewSighting2Stack = createStackNavigator();

const NewSighting2Screen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <Animated.View style={styles.innerStyle} />
      </View>

      <KeyboardAwareScrollView
        style={{ backgroundColor: '#ffffff' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        style={styles.keyboardView}
        scrollEnabled={true}
      >
        <Text style={styles.inputHeader}> Status </Text>
        <TextInput style={styles.inputFields} autoCorrect={false} />
        <Text style={styles.inputHeader}> Relationships </Text>
        <TextInput style={styles.inputFields} autoCorrect={false} />
        <Text style={styles.inputHeader}> Match Individual </Text>
        <TextInput style={styles.inputFields} autoCorrect={false} />
      </KeyboardAwareScrollView>
      <View style={styles.buttonContainer}>
        <View style={styles.horizontal}>
          <TouchableOpacity
            onPress={() => navigation.navigate(screens.newSightings[0])}
          >
            <View style={[styles.button, styles.buttonInactive]}>
              <Text style={styles.buttonText}> Back </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(screens.newSightings[2])}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Next</Text>
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
            iconStyle={styles.icon}
          />
        ),
      }}
    >
      <NewSighting2Stack.Screen
        name={screens.newSighting2}
        component={NewSighting2Screen}
        options={{
          headerTitle: () => <Text style={styles.headerText}>Animal Info</Text>,
        }}
      />
    </NewSighting2Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    width: '100%',
    height: 3,
    backgroundColor: '#EDEDED',
    justifyContent: 'center',
  },
  innerStyle: {
    width: '66%',
    height: 3,
    backgroundColor: theme.primary,
  },
  keyboardView: {
    flex: 1,
    backgroundColor: theme.white,
  },
  headerText: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
  },
  icon: {
    marginRight: 16,
  },
  inputHeader: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    margin: '5%',
    marginBottom: '3%',
    color: theme.black,
  },
  inputFields: {
    textAlign: 'left',
    marginHorizontal: '5%',
    fontSize: 16,
    borderColor: '#2c2c2c80',
    borderWidth: 1,
    borderRadius: 6,
    padding: '2%',
  },
  multiLine: {
    height: 150,
  },
  button: {
    backgroundColor: theme.primary,
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 20,
    margin: '5%',
  },
  buttonInactive: {
    backgroundColor: '#CACACA',
  },
  buttonText: {
    color: theme.white,
    fontSize: 16,
    alignSelf: 'center',
  },
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: theme.white,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    margin: '5%',
  },
});
