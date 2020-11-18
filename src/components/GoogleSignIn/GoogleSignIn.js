import React from 'react';
import {Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId:
    '944158487722-9tp5r3gipg4s4o37na7c59ga2ioi280l.apps.googleusercontent.com',
});

const GoogleSignIn = () => {
  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <Button
      title="Google Sign-In"
      onPress={() =>
        onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
      }
    />
  );
};

export default GoogleSignIn;
