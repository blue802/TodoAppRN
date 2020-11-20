import React from 'react';
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
