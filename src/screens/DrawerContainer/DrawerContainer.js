import React from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

import {removeUserFromLocalStorage} from '../../services/UserStorage';
import {useUserProvider} from '../../providers/UserProvider';
import {actionTypes} from '../../reducers/UserReducer';
import MenuButton from '../../components/MenuButton/MenuButton';
import Avatar from '../../components/Avatar/Avatar';
import styles from './styles';

const DrawerContainer = ({navigation}) => {
  const [{user}, dispatch] = useUserProvider();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <Avatar avatarUrl={user.photoURL} />
          <Text style={styles.username}>{user.displayName}</Text>
        </View>
        <MenuButton
          name="Home"
          iconName="tasks"
          onPress={() => {
            navigation.navigate('Home');
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          name="Category"
          iconName="balance-scale"
          onPress={() => {
            navigation.navigate('Category');
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          name="Achievement"
          iconName="trophy"
          onPress={() => {
            navigation.navigate('Achievement');
            navigation.closeDrawer();
          }}
        />
      </View>
      <MenuButton
        name="Sign out"
        iconName="sign-out-alt"
        onPress={async () => {
          try {
            await GoogleSignin.signOut();
            auth()
              .signOut()
              .then(() => {
                dispatch({type: actionTypes.SET_USER, payload: null});
                console.log('User signed out!');
              });
            await removeUserFromLocalStorage();
          } catch (error) {
            console.log(error);
          }
        }}
      />
    </View>
  );
};

export default DrawerContainer;

DrawerContainer.prototype = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
