import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import MenuButton from '../../components/MenuButton/MenuButton';
import styles from './styles';

const DrawerContainer = ({navigation}) => {
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuButton
          name="Home"
          onPress={() => {
            navigation.navigate('Home');
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          name="Create Task"
          onPress={() => {
            navigation.navigate('CreateTask');
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          name="Edit Task"
          onPress={() => {
            navigation.navigate('EditTask');
            navigation.closeDrawer();
          }}
        />
      </View>
    </View>
  );
};

export default DrawerContainer;

DrawerContainer.prototype = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
