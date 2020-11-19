import React from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

import {useUser} from '../../UserProvider';
import {actionTypes} from '../../reducer';
import GoogleSignIn from '../../components/GoogleSignIn/GoogleSignIn';
import styles from './styles';

GoogleSignin.configure({
  webClientId:
    '944158487722-9tp5r3gipg4s4o37na7c59ga2ioi280l.apps.googleusercontent.com',
});

const LoginScreen = () => {
  const [state, dispatch] = useUser();

  async function handleLogin() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(googleCredential)
      .then((res) => {
        dispatch({type: actionTypes.SET_USER, payload: res.user});
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Login</Text>
      </View>
      <GoogleSignIn onGoogleButtonPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
