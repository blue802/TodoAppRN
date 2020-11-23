import React from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';

import styles from './styles';

const Avatar = ({avatarUrl}) => {
  return (
    <View style={styles.imageWrap}>
      <Image source={{uri: avatarUrl}} style={styles.image} />
    </View>
  );
};

export default Avatar;

Avatar.prototype = {
  avatarUrl: PropTypes.string,
};
