import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Animated
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon, withTheme } from "react-native-elements";
import screens from "../constants/screens";
import theme from "../constants/theme";
import { setStatusBarHidden } from "expo-status-bar";

const NewSightingStack = createStackNavigator();

const NewSightingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <Animated.View style={[styles.innerStyle, { width: "33%" },]} />
      </View>
      <Text style={styles.inputHeader}> Title </Text>
      <TextInput style={styles.inputFields} autoCorrect={false} />
      <Text style={styles.inputHeader}> Location </Text>
      <TextInput style={styles.inputFields} autoCorrect={false} />
      <Text style={styles.inputHeader}> Sighting Context </Text>
      <TextInput
        style={[styles.inputFields, styles.multiLine]}
        autoCorrect={false}
        multiline={true}
        numberOfLines={5}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.horizontal}>
          <TouchableOpacity>
            <View style={[styles.button, styles.buttonInactive]}>
              <Text style={styles.buttonText}>Back</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate(screens.newSighting2)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Next </Text>
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
        headerTitleAlign: "center",
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
      <NewSightingStack.Screen
        name={screens.newSighting}
        component={NewSightingScreen}
        options={{
          headerTitle: () => (
            <Text style={styles.headerText}>Sighting Info</Text>
          ),
        }}
      />
    </NewSightingStack.Navigator>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    width: "100%",
    height: 3,
    backgroundColor: "#EDEDED",
    justifyContent: "center",
  },
  innerStyle: {
    width: "100%",
    height: 3,
    backgroundColor: "#CDABFD",
  },
  headerText: {
    fontFamily: "Lato-Regular",
    fontSize: 14,
  },
  icon: {
    marginRight: 16,
  },
  inputHeader: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    margin: "5%",
    marginBottom: "3%",
    color: "#2c2c2c"
  },
  inputFields: {
    textAlign: "left",
    marginHorizontal: "5%",
    fontSize: 16,
    borderColor: "#2c2c2c80",
    borderWidth: 1,
    borderRadius: 6,
    padding: "2%",
  },
  multiLine: {
    height: 150,
  },
  button: {
    backgroundColor: "#CDABFD",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 20,
    margin: "5%"
  },
  buttonInactive: {
    opacity: 0
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    alignSelf: "center"
  },
  horizontal: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#ffffff"
  },
  buttonContainer: {
    position: "absolute", //Here is the trick
    bottom: 0,
    alignSelf: "center",
    margin: "5%"
  }
});
