import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-community/google-signin';

import {useUserProvider} from '../../providers/UserProvider';
import {actionTypes} from '../../reducers/UserReducer';
import GoogleSignIn from '../../components/GoogleSignIn/GoogleSignIn';
import {
  getUserFromLocalStorage,
  addUserToLocalStorage,
} from '../../services/UserStorage';
import {addNewTaskToLocalStorage} from '../../services/ServicesStorage';
import styles from './styles';

GoogleSignin.configure({
  webClientId:
    '944158487722-9tp5r3gipg4s4o37na7c59ga2ioi280l.apps.googleusercontent.com',
});

const LoginScreen = () => {
  const [state, dispatch] = useUserProvider();
  const user = getUserFromLocalStorage();

  useEffect(() => {
    if (user) {
      dispatch({type: actionTypes.SET_USER, payload: user});
    }
  }, [dispatch, user]);

  async function handleLogin() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(googleCredential)
      .then((res) => {
        addUserToLocalStorage(res.user);
        dispatch({type: actionTypes.SET_USER, payload: res.user});
        firestore()
          .collection('todos')
          .orderBy('createAt', 'desc')
          .onSnapshot((snap) => {
            snap.forEach((doc) => {
              if (doc.data().userId === res.user.uid) {
                addNewTaskToLocalStorage({
                  id: doc.id,
                  ...doc.data(),
                  createAt: doc.data().createAt.toDate(),
                });
              }
            });
          });
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
