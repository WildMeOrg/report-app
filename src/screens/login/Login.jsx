import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, Button, Image, KeyboardAvoidingView } from 'react-native';
import { houstonUrl } from '../../constants/urls';
import Loading from '../loading/Loading';
import Logo from '../../../assets/logo.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import theme from '../../constants/theme';
import screens from '../../constants/screens';
import { ThemeConsumer } from 'react-native-elements';

const Login = ({navigation}) => {
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
      if(JSON.stringify(response.data).includes("success")){
        navigation.navigate(screens.home);
      }
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
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={styles.logoView}>
        <Image 
          source={Logo}
          style = {styles.logo} 
        />
      </View>

      <Text style={styles.textFontInput}>
        Username
      </Text>

      <TextInput
        style={styles.inputFields}
        onChangeText={(input) => onChangeEmail(input)}
        value={email}
        autoCorrect={false}
        autoCompleteType="email"
        textContentType="emailAddress"
        autoCapitalize="none"
      />

      <Text style={styles.textFontInput}>
        Password
      </Text>

      <TextInput
        style={styles.inputFields}
        onChangeText={(input) => onChangePassword(input)}
        value={password}
        autoCorrect={false}
        autoCompleteType="password"
        textContentType="password"
        autoCapitalize="none"
        secureTextEntry
      />

      <View style={styles.forgotView}>
        <TouchableOpacity style={styles.forgot}>
          <Text style={[styles.fontBasicText,{color: '#2C2C2C80'}]}>
            Forgot password?
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            authenticate(email, password);
          }}
        >
          <Text style={styles.textFontLogin}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.guestView}>
        <TouchableOpacity style={styles.guest}>
          <Text style={[styles.fontBasicText,{color: '#2C2C2C80'}]}>
            Continue as guest
          </Text>
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
  inputFields: {
    textAlign: 'center',
    marginLeft: '15%',
    marginRight: '15%',
    fontSize: 16,
    height: '5%',
    borderWidth: 2,
    borderColor: '#C0C0C0',
    borderRadius: 5,
  },
  textFontInput: { 
    marginLeft: '15%',
    marginTop: '5%',
    marginBottom: '2%',
    fontSize: 16, 
    fontFamily: 'Lato-Regular'
  },
  textFontLogin: { 
    fontSize: 16, 
    fontFamily: 'Lato-Regular',
    color: theme.white,
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%',
    marginBottom: '2%',
  },
  buttonView: {
    marginTop: '5%',
    marginLeft: '15%',
    marginRight: '15%',
    backgroundColor: theme.primary,
    borderWidth: 2,
    borderColor: '#C0C0C000',
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
    marginRight: '15%',
  },
  fontBasicText: {
    fontSize: 16, 
    fontFamily: 'Lato-Regular',
  },
});

export default Login;
