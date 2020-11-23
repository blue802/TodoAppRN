import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';

import styles from './styles';

const MenuButton = ({name, onPress, iconName}) => {
  return (
    <TouchableHighlight
      onPress={() => onPress()}
      style={styles.btnClickContain}
      underlayColor="rgba(128, 128, 128, 0.1)">
      <View style={styles.btnContainer}>
        <Icon name={iconName} style={styles.btnIcon} />
        <Text style={styles.btnText}>{name}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default MenuButton;

MenuButton.prototype = {
  name: PropTypes.string,
  onPress: PropTypes.func,
  iconName: PropTypes.string,
};
