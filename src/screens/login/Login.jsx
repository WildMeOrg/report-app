import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
<<<<<<< HEAD:src/screens/login/Login.jsx
import { houstonUrl } from '../../constants/urls';
=======
import { houstonUrl } from '../constants/urls';
import Loading from '../screens/loading/Loading';
>>>>>>> 5ad79eb0e40f7a6fee56f6ee90f6ce84dd82c54d:auth/Login.jsx

const Login = () => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
<<<<<<< HEAD:src/screens/login/Login.jsx
  const [responseData, onChangeResponseData] = useState('No request sent');
=======
  const [responseData, onChangeResponseData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
>>>>>>> 5ad79eb0e40f7a6fee56f6ee90f6ce84dd82c54d:auth/Login.jsx

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
    <View>
      <TextInput
        style={styles.inputFields}
        onChangeText={(input) => onChangeEmail(input)}
        value={email}
        placeholder="Email"
        autoCorrect={false}
        autoCompleteType="email"
        textContentType="emailAddress"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.inputFields}
        onChangeText={(input) => onChangePassword(input)}
        value={password}
        placeholder="Password"
        autoCorrect={false}
        autoCompleteType="password"
        textContentType="password"
        autoCapitalize="none"
        secureTextEntry
      />
      <Button
        title="Login"
        onPress={() => {
          authenticate(email, password);
        }}
      />

      <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 25 }}>
        {responseData}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputFields: {
    textAlign: 'center',
    marginLeft: '25%',
    marginRight: '25%',
    fontSize: 16,
  },
});

export default Login;
