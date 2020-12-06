import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

import useCategory from '../../hooks/useCategory';
import styles from './styles';

const Category = ({category, color, navigation}) => {
  const {todos, total, done} = useCategory(category);
  let progress = total === 0 ? 0 : Math.round((done / total) * 100);

  const goToDetailsScreen = () => {
    navigation.navigate('CategoryDetails', {todos, category});
  };

  return (
    <TouchableHighlight style={styles.box} onPress={goToDetailsScreen}>
      <View>
        <Text style={styles.desc}>
          {done} / {total} tasks
        </Text>
        <Text style={styles.title}>{category}</Text>
        <Text style={{...styles.desc, fontSize: 12, textAlign: 'right'}}>
          {progress}%
        </Text>
        <View style={styles.progressWrap}>
          <View
            style={{
              ...styles.progress,
              width: `${progress}%`,
              height: '100%',
              backgroundColor: color,
              shadowColor: color,
            }}></View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default Category;
