import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { houstonUrl } from '../constants/urls';

const Login = () => {
  const [email, onChangeEmail] = React.useState();
  const [password, onChangePassword] = React.useState();
  const [responseData, onChangeResponseData] = React.useState('Not Sent');

  const authenticate = async (email, password) => {
    try {
      onChangeResponseData('Sending...');
      const response = await axios.request({
        url: `${houstonUrl}/api/v1/auth/sessions`,
        method: 'post',
        data: {
          email,
          password,
        },
      });

      onChangeResponseData(JSON.stringify(response.data));
      return <Text>{response.data}</Text>;
    } catch (loginError) {
      console.error(loginError);
    }
  };

  return (
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
        secureTextEntry={true}
      />
      <Button
        title="Login"
        onPress={() => {
          authenticate(email, password);
        }}
      />

      <Text>{responseData}</Text>
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
