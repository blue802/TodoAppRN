import React from 'react';
import {View, Text} from 'react-native';

import GoogleSignIn from '../../components/GoogleSignIn/GoogleSignIn';

const LoginScreen = () => {
  return (
    <View>
      <Text>Login</Text>
      <GoogleSignIn />
    </View>
  );
};

export default LoginScreen;
