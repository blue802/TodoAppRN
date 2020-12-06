import React from 'react';
import {View} from 'react-native';

import styles from './style';
import Category from '../../components/Category/Category';

const CategoryScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Category category="business" color="#00f5d4" navigation={navigation} />
      <Category category="family" color="#9b5de5" navigation={navigation} />
      <Category category="personal" color="#00bbf9" navigation={navigation} />
    </View>
  );
};

export default CategoryScreen;
