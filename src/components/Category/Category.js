import React from 'react';
import {View, Text} from 'react-native';
import * as Progress from 'react-native-progress';
import Ripple from 'react-native-material-ripple';

import useCategory from '../../hooks/useCategory';
import styles from './styles';

const Category = ({navigation, category, color}) => {
  const {tasks, total, done} = useCategory(category);
  let progress = total === 0 ? 0 : done / total;

  const goToDetailsScreen = () => {
    navigation.navigate('CategoryDetails', {tasks, category});
  };

  return (
    <Ripple
      rippleColor={color}
      rippleOpacity={1}
      style={styles.box}
      onPress={goToDetailsScreen}>
      <View>
        <Text style={styles.desc}>
          {done} / {total} tasks
        </Text>
        <Text style={styles.title}>{category}</Text>
        <Text style={{...styles.desc, fontSize: 12, textAlign: 'right'}}>
          {Math.round(progress * 100)}%
        </Text>
        <Progress.Bar
          progress={progress}
          width={null}
          color={color}
          animationConfig={{bounciness: 16}}
        />
      </View>
    </Ripple>
  );
};

export default Category;
