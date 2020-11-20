import React from 'react';
import {View, Text} from 'react-native';

import {useUser} from '../../UserProvider';
import styles from './styles';

const HomeScreen = () => {
  const [{user}, dispath] = useUser();

  return (
    <View style={styles.containerStyle}>
      <Text>Home</Text>
      <Text>Hello {user.displayName}</Text>
    </View>
  );
};

export default HomeScreen;
