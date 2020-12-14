import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ripple from 'react-native-material-ripple';

import styles from './styles';

const MenuButton = ({name, onPress, iconName}) => {
  return (
    <Ripple
      rippleColor="violet"
      rippleOpacity={1}
      onPress={() => onPress()}
      style={styles.btnClickContain}>
      <View style={styles.btnContainer}>
        <Icon name={iconName} style={styles.btnIcon} />
        <Text style={styles.btnText}>{name}</Text>
      </View>
    </Ripple>
  );
};

export default MenuButton;

MenuButton.prototype = {
  name: PropTypes.string,
  onPress: PropTypes.func,
  iconName: PropTypes.string,
};
