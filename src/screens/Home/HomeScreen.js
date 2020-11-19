import React from 'react';
import {View, Text} from 'react-native';
import {useUser} from '../../UserProvider';

const HomeScreen = () => {
  const [{user}, dispath] = useUser();

  return (
    <View>
      <Text>Home</Text>
      <Text>Hello {user.displayName}</Text>
    </View>
  );
};

export default HomeScreen;
