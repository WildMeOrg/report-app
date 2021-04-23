import React, { useState } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import { houstonUrl } from '../../constants/urls';
import Loading from '../loading/Loading';
import Logo from '../../../assets/images/scoutLogo.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import theme from '../../constants/theme';
import { baseUrl } from '../../constants/urls';
import AsyncStorage from '@react-native-community/async-storage';
import screens from '../../constants/screens';
import { ThemeConsumer } from 'react-native-elements';
import globalStyles from '../../styles/globalStyles';
import Typography from '../../components/Typography';

const Login = ({ navigation, route }) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [responseData, onChangeResponseData] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const authenticate = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await axios.request({
        url: `${baseUrl}/api/v1/auth/sessions`,
        method: 'post',
        withCredentials: true,
        data: {
          email,
          password,
        },
      });
      if (response.data != null) {
        await AsyncStorage.setItem(
          'loggedIn',
          JSON.stringify({
            wildbook: route.params.name,
            loggedIn: 'true',
          })
        );
        navigation.navigate(screens.home);
      }
      onChangeResponseData(JSON.stringify(response.data));
    } catch (loginError) {
      console.log('login error');
      alert(
        'Username and/or Password is Incorrect' +
          '\n' +
          loginError.name +
          ': ' +
          loginError.message
      );
      setIsLoading(false);
      return;
    }

    try {
      const settingsPacket = await axios(
        `${baseUrl}/api/v1/configuration/default/__bundle_setup`
      );
      await AsyncStorage.setItem(
        'appConfiguration',
        JSON.stringify(settingsPacket.data.response.configuration)
      );
    } catch (settingsFetchError) {
      onChangeResponseData(
        settingsFetchError.name + ': ' + settingsFetchError.message
      );
    }
    onChangeEmail('');
    onChangePassword('');
    setIsLoading(false);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <KeyboardAvoidingView
      style={styles.parent}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.logoView}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={styles.loginView}>
        <Typography
          id="USERNAME"
          style={(globalStyles.h2Text, globalStyles.inputHeader)}
        />

        <TextInput
          style={globalStyles.inputField}
          onChangeText={(input) => onChangeEmail(input)}
          value={email}
          autoCorrect={false}
          autoCompleteType="email"
          textContentType="emailAddress"
          autoCapitalize="none"
        />

        <Typography
          id="PASSWORD"
          style={(globalStyles.h2Text, globalStyles.inputHeader)}
        />

        <TextInput
          style={globalStyles.inputField}
          onChangeText={(input) => onChangePassword(input)}
          value={password}
          autoCorrect={false}
          autoCompleteType="password"
          textContentType="password"
          autoCapitalize="none"
          secureTextEntry
        />

        <View style={styles.forgotView}>
          <TouchableOpacity
            style={styles.forgot}
            onPress={() => {
              alert('Reset your password on the desktop site');
            }}
          >
            <Typography
              id="FORGOT_PASSWORD_QUESTION"
              style={globalStyles.basicText}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              authenticate(email, password);
            }}
          >
            <Typography style={globalStyles.buttonText} id="LOGIN" />
          </TouchableOpacity>
        </View>

        <View style={styles.guestView}>
          <TouchableOpacity
            style={styles.guest}
            onPress={() => navigation.navigate(screens.guestHome)}
          >
            <Typography id="CONTINUE_AS_GUEST" style={globalStyles.basicText} />
          </TouchableOpacity>
        </View>
      </View>

      {/* This text field display login success or unsuccesful response from server
      <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 25 }}>
        {responseData}
      </Text> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  parent: {
    justifyContent: 'center',
    backgroundColor: theme.white,
  },
  logoView: {
    height: '35%',
    width: '60%',
    marginLeft: '20%',
    marginRight: '20%',
    marginTop: '10%',
  },
  loginView: {
    height: '50%',
    marginBottom: '10%',
  },
  logo: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '4%',
  },
  buttonView: {
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: theme.primary,
    borderRadius: 5,
  },
  guest: {
    flexWrap: 'wrap',
  },
  guestView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%',
  },
  forgot: {
    flexWrap: 'wrap',
  },
  forgotView: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginVertical: '2%',
    marginRight: '5%',
  },
  // fontBasicText: {
  //   fontSize: 16,
  //   fontFamily: 'Lato-Regular',
  //   color: '#2C2C2C80',
  // },
});

export default Login;
