import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const GoogleSignIn = ({onGoogleButtonPress}) => {
  return (
    <TouchableHighlight
      underlayColor="#003459"
      onPress={() => onGoogleButtonPress()}
      style={styles.btnContainer}>
      <View>
        <Text style={styles.btnText}>GOOGLE SIGN-IN</Text>
      </View>
    </TouchableHighlight>
  );
};

export default GoogleSignIn;

GoogleSignIn.prototype = {
  onGoogleButtonPress: PropTypes.func.isRequired,
};
