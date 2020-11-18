import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const MenuButton = ({name, onPress}) => {
  return (
    <TouchableHighlight
      onPress={() => onPress()}
      style={styles.btnClickContain}
      underlayColor="rgba(128, 128, 128, 0.1)">
      <View style={styles.btnContainer}>
        <Text style={styles.btnText}>{name}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default MenuButton;

MenuButton.prototype = {
  name: PropTypes.string,
  onPress: PropTypes.func,
};
