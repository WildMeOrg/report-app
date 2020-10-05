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
import Logo from '../../../assets/logo.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import theme from '../../constants/theme';
import { ThemeConsumer } from 'react-native-elements';
import globalStyles from '../../styles/globalStyles';

const Login = () => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [responseData, onChangeResponseData] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const authenticate = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await axios.request({
        url: `${houstonUrl}/api/v1/auth/sessions`,
        method: 'post',
        data: {
          email,
          password,
        },
      });

      onChangeResponseData(JSON.stringify(response.data));
    } catch (loginError) {
      onChangeResponseData(loginError.name + ': ' + loginError.message);
    }
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

      <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>
        Username
      </Text>

      <TextInput
        style={globalStyles.inputFields}
        onChangeText={(input) => onChangeEmail(input)}
        value={email}
        autoCorrect={false}
        autoCompleteType='email'
        textContentType='emailAddress'
        autoCapitalize='none'
      />

      <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>
        Password
      </Text>

      <TextInput
        style={globalStyles.inputFields}
        onChangeText={(input) => onChangePassword(input)}
        value={password}
        autoCorrect={false}
        autoCompleteType='password'
        textContentType='password'
        autoCapitalize='none'
        secureTextEntry
      />

      <View style={styles.forgotView}>
        <TouchableOpacity style={styles.forgot}>
          <Text style={[globalStyles.basicText]}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            authenticate(email, password);
          }}
        >
          <Text style={globalStyles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.guestView}>
        <TouchableOpacity style={styles.guest}>
          <Text style={[globalStyles.basicText]}>Continue as guest</Text>
        </TouchableOpacity>
      </View>

      {/*This text field display login success or unsuccesful response from server*/}
      <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 25 }}>
        {responseData}
      </Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  parent: {
    justifyContent: 'center',
    backgroundColor: theme.white,
  },
  logoView: {
    height: '50%',
    width: '50%',
    marginLeft: '25%',
    marginRight: '25%',
  },
  logo: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  // inputFields: {
  //   textAlign: 'center',
  //   marginLeft: '15%',
  //   marginRight: '15%',
  //   fontSize: 16,
  //   height: '5%',
  //   borderWidth: 2,
  //   borderColor: '#C0C0C0',
  //   borderRadius: 5,
  // },
  // textFontInput: {
  //   marginLeft: '15%',
  //   marginTop: '5%',
  //   marginBottom: '2%',
  //   fontSize: 16,
  //   fontFamily: 'Lato-Regular',
  // },
  // textFontLogin: {
  //   fontSize: 16,
  //   fontFamily: 'Lato-Regular',
  //   color: theme.white,
  // },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%',
    marginBottom: '2%',
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
    marginTop: '2%',
    marginRight: '5%',
  },
  // fontBasicText: {
  //   fontSize: 16,
  //   fontFamily: 'Lato-Regular',
  //   color: '#2C2C2C80',
  // },
});

export default Login;
